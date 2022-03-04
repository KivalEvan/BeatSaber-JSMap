'use strict';
// optimise lighting event by removing redundancy and merging Chroma event into one
// useful to get faster loading time, especially on high event count map
// any feedback send on Discord@Kival Evan#5480

// WARNING FOR CHROMA LIGHTER: this may not behave well yet, let me know if there's issue
// PLEASE CREATE BACKUP BEFORE RUNNING/SAVING THIS, I WILL NOT BE RESPONSIBLE FOR ANY LOSS

const fs = require('fs');

const INPUT_FILE = 'ExpertPlusStandardOriginal.dat';
const OUTPUT_FILE = 'ExpertPlusStandard.dat';

// you can modify these variable as you prefer
// uses beat time instead of real time
const eventStackTol = 0.001;
const ringStackTol = 0.05; // 1/20 precision

// beyond you're on your own
let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._events.sort((a, b) => a._time - b._time);
let _events = difficulty._events;
const initialCount = difficulty._events.length;

// constant variable, best to not touch unless you know what you're doing
// light value for static event such as OFF and ON event
const maxEventType = 17; // highest existing event type
const maxLightID = 127; // highest existing lightID
const lightStatic = [0, 1, 5];
const lightEvent = [0, 1, 2, 3, 4, 6, 7];
const eventTemplate = '{"_time":-999,"_type":0,"_value":0}';

const convertLightID = false;
const reduceRingStack = false;
const reduceLightId = true;

function matchColor(c1, c2) {
    if (c1 == null || c2 == null) {
        return false;
    }
    if (c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]) {
        if (
            (c1.length > 3 && c2.length > 3 && c1[3] !== c2[3]) ||
            (c1.length === 3 && c2.length > 3 && c2[3] !== 1) ||
            (c1.length > 3 && c2.length === 3 && c1[3] !== 1)
        ) {
            return false;
        }
        return true;
    }
    return false;
}

function matchLightID(ev, lightIDList) {
    if (Array.isArray(ev._customData._lightID)) {
        for (const id of ev._customData._lightID) {
            if (
                lightIDList[id]._value !== ev._value ||
                !matchColor(lightIDList[id]._color, ev._customData._color)
            ) {
                return false;
            }
        }
    }
    if (!isNaN(ev._customData._lightID)) {
        if (
            lightIDList[ev._customData._lightID]._value !== ev._value ||
            !matchColor(
                lightIDList[ev._customData._lightID]._color,
                ev._customData._color
            )
        ) {
            return false;
        }
    }
    return true;
}

console.log(`Initiating light optimisation script`);

const prevEvent = {};
for (let i = maxEventType; i >= 0; i--) {
    prevEvent[i] = JSON.parse(eventTemplate);
}

// not to be confused as above, this keep index of any same type event at same time
const eventAtTime = {};
for (let i = maxEventType; i >= 0; i--) {
    eventAtTime[i] = [];
}

// this stores lightID
const eventLightID = {};
for (let i = 0; i < lightEvent.length; i++) {
    eventLightID[lightEvent[i]] = {};
    for (let j = maxLightID; j >= 0; j--) {
        eventLightID[lightEvent[i]][j] = { _value: 0, _color: null };
    }
}

const ringID = {};
for (let i = 0; i < 31; i++) {
    ringID[i] = [1, 2].map((el) => el + i * 2);
}

for (let i = 0, len = _events.length; i < len; i++) {
    if (_events[i]._type !== 1) {
        continue;
    }
    if (typeof _events[i]._customData?._propID === 'number') {
        _events[i]._customData._lightID = ringID[_events[i]._customData._propID];
        delete _events[i]._customData._propID;
    }
}

let countRedundant = 0;
let countChroma = 0;
let flagRemove = false;
let flagChroma = false;
let evType = 0;
for (let i = 0, len = _events.length; i < len; i++) {
    flagRemove = false;
    flagChroma = false;
    evType = _events[i]._type;

    // skip old chroma event
    if (_events[i]._value > 2000000000) {
        continue;
    }

    // LIGHTING EVENT
    if ((evType >= 0 && evType <= 4) || evType === 6 || evType === 7) {
        // convert value 4 to standard 0 as off event
        if (_events[i]._value === 4) {
            _events[i]._value = 0;
        }

        // for current event that does not have _customData
        if (typeof _events[i]._customData === undefined) {
            if (_events[i]._time - prevEvent[evType]._time < eventStackTol) {
                flagRemove = true;
            }
            if (
                lightStatic.includes(_events[i]._value) &&
                _events[i]._value === prevEvent[evType]._value
            ) {
                // check if previous event had no _customData
                if (prevEvent[evType]._customData == null) {
                    flagRemove = true;
                }
            }
            // do funny for lightID
            if (!flagRemove) {
                for (let j = maxLightID; j >= 0; j--) {
                    eventLightID[evType][j] = {
                        _value: _events[i]._value,
                        _color: null,
                    };
                }
            }
        }

        // Chroma _customData is tricky
        if (_events[i]._customData) {
            // god help me
            // optimise lightID
            if (_events[i]._customData._lightID) {
                // yeet the redundant lightID event
                if (reduceLightId && matchLightID(_events[i], eventLightID[evType])) {
                    flagRemove = true;
                }
                if (!flagRemove && Array.isArray(_events[i]._customData._lightID)) {
                    _events[i]._customData._lightID.forEach((id) => {
                        eventLightID[evType][id]._value = _events[i]._value;
                        eventLightID[evType][id]._color =
                            _events[i]._customData._color || null;
                    });
                }
                if (!flagRemove && !isNaN(_events[i]._customData._lightID)) {
                    eventLightID[evType][_events[i]._customData._lightID]._value =
                        _events[i]._value;
                    eventLightID[evType][_events[i]._customData._lightID]._color =
                        _events[i]._customData._color || null;
                }
            }
            for (let j = 0; j < eventAtTime[evType].length; j++) {
                let lookupIndex = eventAtTime[evType][j];
                if (
                    _events[i]._time - _events[lookupIndex]._time < eventStackTol &&
                    _events[i]._customData._lightID &&
                    _events[lookupIndex]._customData &&
                    _events[lookupIndex]._customData._lightID
                ) {
                    // merge into one event
                    // honestly what the fuck?
                    if (
                        (matchColor(
                            _events[i]._customData._color,
                            _events[lookupIndex]._customData._color
                        ) &&
                            _events[i]._value === _events[lookupIndex]._value) ||
                        (_events[i]._value === _events[lookupIndex]._value &&
                            _events[i]._customData._color == null &&
                            _events[lookupIndex]._customData._color == null)
                    ) {
                        let temp;
                        if (Array.isArray(_events[i]._customData._lightID)) {
                            temp = _events[i]._customData._lightID;
                        }
                        if (!isNaN(_events[i]._customData._lightID)) {
                            temp = [_events[i]._customData._lightID];
                        }

                        // insert temp into eventAtTime
                        if (Array.isArray(_events[lookupIndex]._customData._lightID)) {
                            _events[lookupIndex]._customData._lightID =
                                _events[lookupIndex]._customData._lightID.concat(temp);
                        }
                        if (!isNaN(_events[lookupIndex]._customData._lightID)) {
                            _events[lookupIndex]._customData._lightID = [
                                _events[lookupIndex]._customData._lightID,
                            ].concat(temp);
                        }

                        // sort the lightID
                        _events[lookupIndex]._customData._lightID.sort((a, b) => a - b);

                        // console.log(
                        //     `Merging event ${
                        //         Math.round(_events[i]._time * 1000) / 1000
                        //     } type ${evType} ${
                        //         _events[i]._customData._color
                        //             ? `colour [${_events[i]._customData._color.join()}]`
                        //             : `value ${_events[i]._value}`
                        //     }: ${
                        //         Array.isArray(_events[i]._customData._lightID)
                        //             ? `[${_events[i]._customData._lightID.join()}]`
                        //             : _events[i]._customData._lightID
                        //     } => [${_events[lookupIndex]._customData._lightID.join()}]`
                        // );
                        flagChroma = true;
                        break;
                    }
                }
            }

            // remove redundancy
            if (
                _events[i]._customData._color &&
                !_events[i]._customData._lightID &&
                !_events[i]._customData._propID
            ) {
                if (
                    lightStatic.includes(_events[i]._value) &&
                    prevEvent[evType]._customData &&
                    prevEvent[evType]._customData._lightID == null &&
                    prevEvent[evType]._customData._propID == null &&
                    _events[i]._value === prevEvent[evType]._value &&
                    matchColor(
                        _events[i]._customData._color,
                        prevEvent[evType]._customData._color
                    )
                ) {
                    flagRemove = true;
                }
                if (!flagRemove) {
                    for (let j = maxLightID; j >= 0; j--) {
                        eventLightID[evType][j] = {
                            _value: _events[i]._value,
                            _color: _events[i]._customData._color,
                        };
                    }
                }
            }
        }
    }

    // LIGHT BOOST EVENT
    if (evType === 5) {
        if (_events[i]._time - prevEvent[evType]._time < eventStackTol) {
            flagRemove = true;
        }
        if (_events[i]._value === prevEvent[evType]._value) {
            flagRemove = true;
        }
    }

    // RING EVENT
    if (evType === 8) {
        if (_events[i]._time - prevEvent[evType]._time < eventStackTol) {
            flagRemove = true;
        }
        if (
            reduceRingStack &&
            _events[i]._customData == null &&
            _events[i]._time - prevEvent[evType]._time < ringStackTol
        ) {
            flagRemove = true;
        }
        // convert the value to 0 regardless as there is no difference
        _events[i]._value = 0;
    }
    if (evType === 9) {
        _events[i]._value = 0;
    }

    // LASER ROTATION EVENT
    if (evType === 12 || evType === 13) {
        if (
            _events[i]._customData == null &&
            _events[i]._time - prevEvent[evType]._time < eventStackTol
        ) {
            flagRemove = true;
        }
        if (
            _events[i]._customData == null &&
            _events[i]._value === 0 &&
            prevEvent[evType]._value === 0
        ) {
            flagRemove = true;
        }
    }

    // REMOVE EVENT
    if (flagRemove) {
        // console.log(
        //     `${i} iteration: Removing event ${
        //         Math.round(_events[i]._time * 1000) / 1000
        //     } type ${evType} value ${_events[i]._value}${
        //         _events[i]._customData ? ` customData ${_events[i]._customData}` : ''
        //     }`
        // );
        delete _events[i];
        countRedundant++;
        continue; // continue before save to prevent null
    }
    if (flagChroma) {
        delete _events[i];
        countChroma++;
        continue;
    }

    // SAVE PREVIOUS EVENT & ITERATION INDEX
    prevEvent[evType] = _events[i];
    for (let j = 0; j < eventAtTime[evType].length; j++) {
        if (_events[i]._time - _events[eventAtTime[evType][j]]._time >= eventStackTol) {
            eventAtTime[evType].splice(j, 1);
            j--;
        }
    }
    eventAtTime[evType].push(i);
}

difficulty._events = difficulty._events.filter((el) => typeof el != null);

// do the funny message
let message = `Light Optimiser`;
if (!countRedundant && !countChroma) {
    message += `\nNo optimisation initiated`;
}
if (countRedundant) {
    message += `\nRemoved ${countRedundant} redundant event(s)`;
}
if (countChroma) {
    message += `\nOptimised ${countChroma} Chroma event(s)`;
}

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
// recursion to deal with number formatting and delete null object but imma keep this name
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
                );
            }
        }
    }
}
deeperDaddy(difficulty);
difficulty._notes.sort(
    (a, b) =>
        parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
);
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);
const finalCount = difficulty._events.length;
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log(`${message}\n${initialCount} -> ${finalCount}`);

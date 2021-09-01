// optimise lighting event by removing redundancy and merging Chroma event into one
// useful to get faster loading time, especially on high event count map
// any feedback send on Discord@Kival Evan#5480

// WARNING FOR CHROMA LIGHTER: this may not behave well yet, let me know if there's issue
// PLEASE CREATE BACKUP BEFORE RUNNING/SAVING THIS, I WILL NOT BE RESPONSIBLE FOR ANY LOSS
const releaseVersion = 'release build 2';

// you can modify these variable as you prefer
// uses beat time instead of real time
const eventStackTol = 0.001;
const ringStackTol = 0.05; // 1/20 precision

// constant variable, best to not touch unless you know what you're doing
// light value for static event such as OFF and ON event
const maxEventType = 44; // highest existing event type
const maxLightID = 128; // highest existing lightID
const lightStatic = [0, 1, 5];
const lightEvent = [0, 1, 2, 3, 4, 6, 7];
const eventTemplate = '{"_time":-999,"_type":0,"_value":0,}';

function optimise(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const reduceRingStack = global.params[0] > 0;
    const reduceLightId = global.params[1] > 0;

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

    let countRedundant = 0;
    let countChroma = 0;
    let flagRemove = false;
    let flagChroma = false;
    let evType = 0;
    for (let i = 0, len = events.length; i < len; i++) {
        flagRemove = false;
        flagChroma = false;
        evType = events[i]._type;

        // skip old chroma event
        if (events[i]._value > 2000000000) {
            continue;
        }

        // LIGHTING EVENT
        if ((evType >= 0 && evType <= 4) || evType === 6 || evType === 7) {
            // convert value 4 to standard 0 as off event
            if (events[i]._value === 4) {
                events[i]._value = 0;
            }

            // for current event that does not have _customData
            if (events[i]._customData == null) {
                if (events[i]._time - prevEvent[evType]._time < eventStackTol) {
                    flagRemove = true;
                }
                if (
                    lightStatic.includes(events[i]._value) &&
                    events[i]._value === prevEvent[evType]._value
                ) {
                    // check if previous event had no _customData
                    if (prevEvent[evType]._customData == null) {
                        flagRemove = true;
                    }
                }
                // do funny for lightID
                if (!flagRemove) {
                    for (let j = maxLightID; j >= 0; j--) {
                        eventLightID[evType][j] = { _value: events[i]._value, _color: null };
                    }
                }
            }

            // Chroma _customData is tricky
            if (events[i]._customData) {
                // god help me
                // optimise lightID
                if (events[i]._customData._lightID) {
                    // yeet the redundant lightID event
                    if (reduceLightId && matchLightID(events[i], eventLightID[evType])) {
                        flagRemove = true;
                    }
                    if (!flagRemove && Array.isArray(events[i]._customData._lightID)) {
                        events[i]._customData._lightID.forEach((id) => {
                            eventLightID[evType][id]._value = events[i]._value;
                            eventLightID[evType][id]._color = events[i]._customData._color || null;
                        });
                    }
                    if (!flagRemove && !isNaN(events[i]._customData._lightID)) {
                        eventLightID[evType][events[i]._customData._lightID]._value =
                            events[i]._value;
                        eventLightID[evType][events[i]._customData._lightID]._color =
                            events[i]._customData._color || null;
                    }
                }
                for (let j = 0; j < eventAtTime[evType].length; j++) {
                    let lookupIndex = eventAtTime[evType][j];
                    if (
                        events[i]._time - events[lookupIndex]._time < eventStackTol &&
                        events[i]._customData._lightID &&
                        events[lookupIndex]._customData &&
                        events[lookupIndex]._customData._lightID
                    ) {
                        // merge into one event
                        // honestly what the fuck?
                        if (
                            (matchColor(
                                events[i]._customData._color,
                                events[lookupIndex]._customData._color
                            ) &&
                                events[i]._value === events[lookupIndex]._value) ||
                            (events[i]._value === events[lookupIndex]._value &&
                                events[i]._customData._color == null &&
                                events[lookupIndex]._customData._color == null)
                        ) {
                            let temp;
                            if (Array.isArray(events[i]._customData._lightID)) {
                                temp = events[i]._customData._lightID;
                            }
                            if (!isNaN(events[i]._customData._lightID)) {
                                temp = [events[i]._customData._lightID];
                            }

                            // insert temp into eventAtTime
                            if (Array.isArray(events[lookupIndex]._customData._lightID)) {
                                events[lookupIndex]._customData._lightID =
                                    events[lookupIndex]._customData._lightID.concat(temp);
                            }
                            if (!isNaN(events[lookupIndex]._customData._lightID)) {
                                events[lookupIndex]._customData._lightID = [
                                    events[lookupIndex]._customData._lightID,
                                ].concat(temp);
                            }

                            // sort the lightID
                            events[lookupIndex]._customData._lightID.sort((a, b) => a - b);

                            console.log(
                                `Merging event ${
                                    Math.round(events[i]._time * 1000) / 1000
                                } type ${evType} ${
                                    events[i]._customData._color
                                        ? `colour [${events[i]._customData._color.join()}]`
                                        : `value ${events[i]._value}`
                                }: ${
                                    Array.isArray(events[i]._customData._lightID)
                                        ? `[${events[i]._customData._lightID.join()}]`
                                        : events[i]._customData._lightID
                                } => [${events[lookupIndex]._customData._lightID.join()}]`
                            );
                            flagChroma = true;
                            break;
                        }
                    }
                }

                // remove redundancy
                if (
                    events[i]._customData._color &&
                    events[i]._customData._lightID == null &&
                    events[i]._customData._propID == null
                ) {
                    if (
                        lightStatic.includes(events[i]._value) &&
                        prevEvent[evType]._customData &&
                        prevEvent[evType]._customData._lightID == null &&
                        prevEvent[evType]._customData._propID == null &&
                        events[i]._value === prevEvent[evType]._value &&
                        matchColor(
                            events[i]._customData._color,
                            prevEvent[evType]._customData._color
                        )
                    ) {
                        flagRemove = true;
                    }
                    if (!flagRemove) {
                        for (let j = maxLightID; j >= 0; j--) {
                            eventLightID[evType][j] = {
                                _value: events[i]._value,
                                _color: events[i]._customData._color,
                            };
                        }
                    }
                }
            }
        }

        // LIGHT BOOST EVENT
        if (evType === 5) {
            if (events[i]._time - prevEvent[evType]._time < eventStackTol) {
                flagRemove = true;
            }
            if (events[i]._value === prevEvent[evType]._value) {
                flagRemove = true;
            }
        }

        // RING EVENT
        if (evType === 8) {
            if (events[i]._time - prevEvent[evType]._time < eventStackTol) {
                flagRemove = true;
            }
            if (
                reduceRingStack &&
                events[i]._customData == null &&
                events[i]._time - prevEvent[evType]._time < ringStackTol
            ) {
                flagRemove = true;
            }
            // convert the value to 0 regardless as there is no difference
            events[i]._value = 0;
        }
        if (evType === 9) {
            events[i]._value = 0;
        }

        // LASER ROTATION EVENT
        if (evType === 12 || evType === 13) {
            if (
                events[i]._customData == null &&
                events[i]._time - prevEvent[evType]._time < eventStackTol
            ) {
                flagRemove = true;
            }
            if (
                events[i]._customData == null &&
                events[i]._value === 0 &&
                prevEvent[evType]._value === 0
            ) {
                flagRemove = true;
            }
        }

        // REMOVE EVENT
        if (flagRemove) {
            console.log(
                `Removing event ${Math.round(events[i]._time * 1000) / 1000} type ${evType} value ${
                    events[i]._value
                }${events[i]._customData ? ` customData ${events[i]._customData}` : ''}`
            );
            delete events[i];
            countRedundant++;
            continue; // continue before save to prevent null
        }
        if (flagChroma) {
            delete events[i];
            countChroma++;
            continue;
        }

        // SAVE PREVIOUS EVENT & ITERATION INDEX
        prevEvent[evType] = events[i];
        for (let j = 0; j < eventAtTime[evType].length; j++) {
            if (events[i]._time - events[eventAtTime[evType][j]]._time >= eventStackTol) {
                eventAtTime[evType].splice(j, 1);
                j--;
            }
        }
        eventAtTime[evType].push(i);
    }

    // do the funny message
    let message = `Light Optimiser ${releaseVersion}`;
    if (countRedundant === 0 && countChroma === 0) {
        message += `\nNo optimisation initiated`;
    }
    if (countRedundant > 0) {
        message += `\nRemoved ${countRedundant} redundant event(s)`;
    }
    if (countChroma > 0) {
        message += `\nOptimised ${countChroma} Chroma event(s)`;
    }
    alert(message);
}

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
            !matchColor(lightIDList[ev._customData._lightID]._color, ev._customData._color)
        ) {
            return false;
        }
    }
    return true;
}

module.exports = {
    name: 'Light Optimiser',
    params: { 'Reduce Ring Stack': 0, 'Reduce LightID': 0 },
    run: optimise,
};

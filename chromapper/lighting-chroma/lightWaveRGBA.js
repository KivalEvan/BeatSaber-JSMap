// rgba: [any range] => set color RGBA
// duration: [0-inf] => duration from startID to endID
// invert: [>0 to enable] => start from endID to startID
// idStart: [1-inf] => set startID (see prop event)
// idEnd: [1-inf] => set endID
// idLightCount: [1-inf] => how many lightID in single prop
// idIgnore: [01234...] => ignore specific lightID in prop; '0' is disabled (if lightCount is 4, set 24 to ignore 2 and 4)
// eventType: [valid type] => set event type (0 -> backtop, 1 -> ring, ...)
// eventColor: [0,1] => set event value (0 -> red, 1 -> blue)
// repeat: [0-inf] => repeat placement for every duration
// repeatOffset: [any range] => offset repeat placement time

const Easings = require('./_easings.js');

function normalize(x, min, max) {
    return max - min > 0 ? (x - min) / (max - min) : 0;
}
function lerp(x, y, a) {
    return x + (y - x) * a;
}
function interpolateColor(colorStart, colorEnd, norm) {
    return colorEnd.map((color, i) => {
        if (colorStart[i] != null) {
            return lerp(colorStart[i], color, norm);
        }
    });
}

const parseRGBA = (rgba) => {
    rgba = rgba.split(',').map((el) => parseFloat(el));
    if (rgba.length > 2) {
        if (rgba.length === 3) {
            rgba.push(1);
        }
    } else {
        return null;
    }
    return rgba;
};

const eventTypeEnum = {
    'Ring Light': 1,
    Backtop: 0,
    'L Laser': 2,
    'R Laser': 3,
    Center: 4,
    'XL Laser': 6,
    'XR Laser': 7,
};

const eventColorEnum = {
    Red: 1,
    Blue: 5,
};

function light(
    cursor,
    notes,
    events,
    walls,
    _,
    global,
    data,
    customEvents,
    bpmChanges
) {
    // event type and color
    const eventType = eventTypeEnum[global.params[0]];
    const eventColor = eventColorEnum[global.params[1]];

    // chroma color
    const startRGBA = parseRGBA(global.params[2]);
    const endRGBA = parseRGBA(global.params[3]);
    if (!startRGBA || !endRGBA) {
        alert('invalid RGBA');
        return;
    }

    // time
    const cursorTime = cursor;
    const duration = Math.abs(global.params[8]);
    const invert = global.params[9] > 0;

    // lightID
    const idStart = parseInt(global.params[6].split('-')[0]);
    const idEnd = parseInt(global.params[6].split('-')[1]);
    const idLightCount = Math.abs(global.params[7]);
    const idOffset = Math.floor(global.params[8]);
    const idIgnore = global.params[9].split(',').map((el) => parseInt(el));

    // easing
    const durationEasing = Easings.func[global.params[10]];
    const colorEasing = Easings.func[global.params[11]];

    // repeat
    const maxRepeat = Math.abs(global.params[12]);
    const repeatOffset = global.params[13];

    const lightID = [];
    for (let i = 1; i <= idLightCount; i++) {
        if (!idIgnore.includes(i)) {
            lightID.push(i + idOffset);
        }
    }

    const maxIdStep = idEnd - idStart;
    for (let itRepeat = 0; itRepeat <= maxRepeat; itRepeat++) {
        const repeatTime = (duration + repeatOffset) * itRepeat;
        const currentLightID = [];
        for (let itIdStep = 0; itIdStep <= maxIdStep; itIdStep++) {
            lightID.forEach((id) =>
                currentLightID.push(
                    id +
                        (invert ? idEnd - itIdStep - 1 : itIdStep + idStart - 1) *
                            idLightCount
                )
            );
            const idStepTime = lerp(
                0,
                duration,
                durationEasing(normalize(itIdStep, 0, maxIdStep))
            );
            const tempLightID = [...currentLightID];
            const currentTime = cursorTime + repeatTime + idStepTime;
            const currentRGBA = interpolateColor(
                startRGBA,
                endRGBA,
                colorEasing(normalize(idStepTime, 0, maxIdStep))
            );
            events.push({
                _time: currentTime,
                _type: eventType,
                _value: eventColor,
                _customData: {
                    _color: currentRGBA,
                    _lightID: tempLightID,
                },
            });
        }
    }
}

module.exports = {
    name: 'Light Wave RGBA',
    params: {
        'Event Type': Object.keys(eventTypeEnum),
        'Event Color': Object.keys(eventColorEnum),
        'RGBA Start': '1,0,0,1',
        'RGBA End': '0,0,1,1',
        Duration: 2,
        Invert: false,
        'ID Start-End': '1-15',
        'ID Light Count': 4,
        'ID Offset': 0,
        'ID Ignore': '0',
        'Easing Duration': Easings.list,
        'Easing Color': Easings.list,
        Repeat: 0,
        'Repeat Offset': 0,
    },
    run: light,
    errorCheck: false,
};

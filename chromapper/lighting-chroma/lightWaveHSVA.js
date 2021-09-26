// require _easings.js

// hue: [0-inf] => set color hue (0 -> red, 120 -> green, 240 -> blue, 360 -> red, ...)
// saturation: [0-1] => color saturation
// value: [any range] => color value (higher is brighter)
// alpha: [any range] => color alpha
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
function HSVAtoRGBA(hue, saturation, value, alpha) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(hue * 6);
    f = hue * 6 - i;
    p = value * (1 - saturation);
    q = value * (1 - f * saturation);
    t = value * (1 - (1 - f) * saturation);
    switch (i % 6) {
        case 0:
            (r = value), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = value), (b = p);
            break;
        case 2:
            (r = p), (g = value), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = value);
            break;
        case 4:
            (r = t), (g = p), (b = value);
            break;
        case 5:
            (r = value), (g = p), (b = q);
            break;
    }
    return [r, g, b, alpha];
}
function interpolateColor(hsvaStart, hsvaEnd, norm) {
    return HSVAtoRGBA(...hsvaStart.map((hsva, i) => lerp(hsva, hsvaEnd[i], norm)));
}

const parseHSVA = (hsva) => {
    hsva = hsva.split(',').map((el) => parseFloat(el));
    if (hsva.length > 2) {
        hsva[0] = Math.floor(hsva[0] / 360) + ((hsva[0] / 360) % 1);
        hsva[1] = Math.min(Math.max(0, hsva[1]), 1);
        if (hsva.length === 3) {
            hsva.push(1);
        }
    } else {
        return null;
    }
    return hsva;
};
// because hue cannot be negative
const fixHSVA = (hsva1, hsva2) => {};

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
    const startHSVA = parseHSVA(global.params[2]);
    const endHSVA = parseHSVA(global.params[3]);
    if (!startHSVA || !endHSVA) {
        alert('invalid HSVA');
        return;
    }

    // time
    const cursorTime = cursor;
    const duration = Math.abs(global.params[4]);
    const invert = global.params[5];

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
    const repeatShiftHue =
        global.params[14] >= 0
            ? (global.params[14] / 360) % 1
            : (((global.params[14] % 360) + 360) / 360) % 1;

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
            const currentHSVA = interpolateColor(
                startHSVA,
                endHSVA,
                colorEasing(normalize(itIdStep, 0, maxIdStep))
            );
            events.push({
                _time: currentTime,
                _type: eventType,
                _value: eventColor,
                _customData: {
                    _color: currentHSVA,
                    _lightID: tempLightID,
                },
            });
        }
        startHSVA[0] += repeatShiftHue;
        endHSVA[0] += repeatShiftHue;
    }
}

module.exports = {
    name: 'Light Wave HSVA',
    params: {
        'Event Type': Object.keys(eventTypeEnum),
        'Event Color': Object.keys(eventColorEnum),
        'HSVA Start': '360,1,1,1',
        'HSVA End': '240,1,1,1',
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
        'Repeat Shift Hue': 0,
    },
    run: light,
    errorCheck: false,
};

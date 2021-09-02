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
// repeat: [0-inf] => repeat placement for every length + duration
// repeatOffset: [any range] => offset repeat placement time

// you can change easings here
// visit https://easings.net/ for more info
// you may need to understand built in Math function
const durationStepEasing = (x) => x;
const colorEasing = (x) => x;

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

function light(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const startHSVA = [
        Math.floor(global.params[0] / 360) + ((global.params[0] / 360) % 1),
        Math.min(Math.max(0, global.params[1]), 1),
        global.params[2],
        global.params[3],
    ];
    const endHSVA = [
        Math.floor(global.params[4] / 360) + ((global.params[4] / 360) % 1),
        Math.min(Math.max(0, global.params[5]), 1),
        global.params[6],
        global.params[7],
    ];
    const cursorTime = cursor;
    const duration = Math.abs(global.params[8]);
    const invert = global.params[9] > 0;
    const idStart = Math.abs(global.params[10]);
    const idEnd = Math.abs(global.params[11]);
    const idLightCount = Math.abs(global.params[12]);
    const idIgnore = global.params[13].toString();
    const eventType = Math.abs(global.params[14]);
    const eventColor = global.params[15] === 0 ? 5 : 1;
    const maxRepeat = Math.abs(global.params[16]);
    const repeatOffset = global.params[17];

    const lightID = [];
    for (let i = 1; i <= idLightCount; i++) {
        if (!idIgnore.includes(i.toString())) {
            lightID.push(i);
        }
    }

    const maxIdStep = idEnd - idStart;
    for (let itRepeat = 0; itRepeat <= maxRepeat; itRepeat++) {
        const repeatTime = (duration + repeatOffset) * itRepeat;
        const currentLightID = [];
        for (let itIdStep = 0; itIdStep <= maxIdStep; itIdStep++) {
            lightID.forEach((id) =>
                currentLightID.push(
                    id + (invert ? idEnd - itIdStep - 1 : itIdStep + idStart - 1) * idLightCount
                )
            );
            const idStepTime = lerp(
                0,
                duration,
                durationStepEasing(normalize(itIdStep, 0, maxIdStep))
            );
            const tempLightID = [...currentLightID];
            const currentTime = cursorTime + repeatTime + idStepTime;
            const currentHSVA = interpolateColor(
                startHSVA,
                endHSVA,
                colorEasing(normalize(colorStepTime, 0, length))
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
    }
}

module.exports = {
    name: 'Light Wave HSVA',
    params: {
        'start H': 360,
        'start S': 1,
        'start V': 1,
        'start A': 1,
        'end H': 240,
        'end S': 1,
        'end V': 1,
        'end A': 1,
        duration: 2,
        invert: 0,
        idStart: 1,
        idEnd: 15,
        idLightCount: 4,
        idIgnore: 0,
        eventType: 1,
        eventColor: 0,
        repeat: 0,
        repeatOffset: 0,
    },
    run: light,
};

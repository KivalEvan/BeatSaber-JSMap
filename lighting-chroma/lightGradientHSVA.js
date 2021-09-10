// script params is chonky, use this on windowed 4:3 reso

// hue: [0-inf] => set color hue (0 -> red, 120 -> green, 240 -> blue, 360 -> red, ...)
// saturation: [0-1] => color saturation
// value: [any range] => color value (higher is brighter)
// alpha: [any range] => color alpha
// duration: [0-inf] => duration from startID to endID
// length: [0-inf] => duration for color gradient
// step: [0-inf] => how many step should color gradient take
// light off: [>0 to enable] => replace to off event at the end of step
// off strobe: [>0 to enable] => place off event in between color step
// invert: [>0 to enable] => start from endID to startID
// idStart: [1-inf] => set startID (see prop event)
// idEnd: [1-inf] => set endID
// idLightCount: [1-inf] => how many lightID in single prop
// idOffset: [any range] => offset by lightID (useful for case like Skrillex)
// idIgnore: [01234...] => ignore specific lightID in prop; '0' is disabled (if lightCount is 4, set 24 to ignore 2 and 4)
// eventType: [valid type] => set event type (0 -> backtop, 1 -> ring, ...)
// eventColor: [0,1] => set event value (0 -> red, 1 -> blue)
// repeat: [0-inf] => repeat placement for every length + duration
// repeatOffset: [any range] => offset repeat placement time
// fillStart: [>0 to enable] => fill the light from startID to endID
// deleteLast: [>0 to enable] => delete the very last event (useful if you don't want overlap side effect)

// you can change easings here
// visit https://easings.net/ for more info
// you may need to understand built in Math function
const durationStepEasing = (x) => x;
const colorStepEasing = (x) => x;
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
    const length = Math.abs(global.params[9]);
    const maxColorStep = Math.abs(global.params[10]);
    const lightOff = global.params[11] > 0;
    const offStrobe = global.params[12] > 0;
    const invert = global.params[13] > 0;
    const idStart = Math.abs(global.params[14]);
    const idEnd = Math.abs(global.params[15]);
    const idLightCount = Math.abs(global.params[16]);
    const idOffset = Math.floor(global.params[17]);
    const idIgnore = global.params[18].toString();
    const eventType = Math.abs(global.params[19]);
    const eventColor = global.params[20] === 0 ? 5 : 1;
    const maxRepeat = Math.abs(global.params[21]);
    const repeatOffset = global.params[22];
    const fillStart = global.params[23] > 0;
    const deleteLast = global.params[24] > 0;

    const lightID = [];
    const lightIDAll = [];
    for (let i = 1; i <= idLightCount; i++) {
        if (!idIgnore.includes(i.toString())) {
            lightID.push(i + idOffset);
        }
    }
    for (let i = idStart - 1; i < idEnd; i++) {
        for (let j = 1; j <= idLightCount; j++) {
            if (!idIgnore.includes(j.toString())) {
                lightIDAll.push(i * idLightCount + j + idOffset);
            }
        }
    }
    lightIDAll.sort((a, b) => a - b);

    const maxIdStep = idEnd - idStart;
    for (let itRepeat = 0; itRepeat <= maxRepeat; itRepeat++) {
        const repeatTime = (duration + length + repeatOffset) * itRepeat;
        for (let itIdStep = 0; itIdStep <= maxIdStep; itIdStep++) {
            const currentLightID = lightID.map(
                (id) =>
                    id +
                    (invert ? idEnd - itIdStep - 1 : itIdStep + idStart - 1) *
                        idLightCount
            );
            const idStepTime = lerp(
                0,
                duration,
                durationStepEasing(normalize(itIdStep, 0, maxIdStep))
            );
            for (let itColorStep = 0; itColorStep <= maxColorStep; itColorStep++) {
                if (offStrobe && lightOff && itColorStep === maxColorStep) {
                    break;
                }
                if (
                    deleteLast &&
                    itIdStep === maxIdStep &&
                    itColorStep === maxColorStep
                ) {
                    continue;
                }
                if (fillStart && itIdStep > idStart && itColorStep === 0) {
                    continue;
                }
                const colorStepTime = lerp(
                    0,
                    length,
                    colorStepEasing(normalize(itColorStep, 0, maxColorStep))
                );
                const currentTime =
                    cursorTime +
                    repeatTime +
                    (fillStart && itColorStep === 0 ? 0 : colorStepTime + idStepTime);
                if (itColorStep === maxColorStep && lightOff) {
                    events.push({
                        _time: currentTime,
                        _type: eventType,
                        _value: 0,
                        _customData: {
                            _lightID:
                                fillStart && itColorStep === 0
                                    ? lightIDAll
                                    : currentLightID,
                        },
                    });
                    break;
                }
                const currentHSVA = interpolateColor(
                    startHSVA,
                    endHSVA,
                    colorEasing(
                        normalize(
                            lerp(
                                0,
                                length,
                                colorStepEasing(normalize(itColorStep, 0, maxColorStep))
                            ),
                            0,
                            length
                        )
                    )
                );
                events.push({
                    _time: currentTime,
                    _type: eventType,
                    _value: eventColor,
                    _customData: {
                        _color: currentHSVA,
                        _lightID:
                            fillStart && itColorStep === 0
                                ? lightIDAll
                                : currentLightID,
                    },
                });
                if (offStrobe && itColorStep !== maxColorStep) {
                    events.push({
                        _time:
                            currentTime -
                            colorStepTime +
                            lerp(
                                0,
                                length,
                                colorStepEasing(
                                    normalize(itColorStep * 2 + 1, 0, maxColorStep * 2)
                                )
                            ),
                        _type: eventType,
                        _value: 0,
                        _customData: {
                            _lightID: currentLightID,
                        },
                    });
                }
            }
        }
    }
}

module.exports = {
    name: 'Light Gradient HSVA',
    params: {
        'start H': 360,
        'start S': 1,
        'start V': 1,
        'start A': 1,
        'end H': 240,
        'end S': 1,
        'end V': 1,
        'end A': 1,
        duration: 1,
        length: 1,
        step: 8,
        'light off': 0,
        'off strobe': 0,
        invert: 0,
        idStart: 1,
        idEnd: 15,
        idLightCount: 4,
        idOffset: 0,
        idIgnore: 0,
        eventType: 1,
        eventColor: 0,
        repeat: 0,
        repeatOffset: 0,
        fillStart: 0,
        deleteLast: 0,
    },
    run: light,
};

// hue: [0-inf] => set color hue (0 -> red, 120 -> green, 240 -> blue, 360 -> red, ...)
// saturation: [0-1] => color saturation
// value: [any range] => color value (higher is brighter)
// alpha: [any range] => color alpha
// duration: [0-inf] => duration from startID to endID
// length: [0-inf] => duration for color gradient
// precision: [0-inf] => how far apart from each lightID
// step: [0-inf] => how many step should color gradient take
// light off: [>0 to enable] => replace to off event at the end of step
// off strobe: [>0 to enable] => place off event in between color step
// idStart: [1-inf] => set startID (see prop event)
// idEnd: [1-inf] => set endID
// idIgnore: [01234...] => ignore specific lightID in prop; '0' is disabled (if lightCount is 4, set 24 to ignore 2 and 4)
// idMultiple: [1-inf] => how many lightID at a time
// eventType: [valid type] => set event type (0 -> backtop, 1 -> ring, ...)
// eventColor: [0,1] => set event value (0 -> red, 1 -> blue)

// you can change easings here
// visit https://easings.net/ for more info
// you may need to understand built in Math function
const colorStepEasing = (x) => x;
const colorEasing = (x) => x;

function normalize(x, min, max) {
    return (x - min) / (max - min);
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
// Fisher–Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    const precision = Math.abs(global.params[10]);
    const maxColorStep = Math.abs(global.params[11]);
    const lightOff = global.params[12] > 0;
    const offStrobe = global.params[13] > 0;
    const idStart = Math.abs(global.params[14]);
    const idEnd = Math.abs(global.params[15]);
    const idIgnore = global.params[16].toString();
    const eventType = Math.abs(global.params[18]);
    const eventValue = global.params[19] === 0 ? 5 : 1;

    const arrayLightID = [];
    for (let i = idStart; i <= idEnd; i++) {
        if (!idIgnore.includes(i.toString())) {
            arrayLightID.push(i);
        }
    }
    const itMultiple = Math.min(Math.abs(global.params[17], arrayLightID.length));
    shuffle(arrayLightID);
    const lightIDLength = arrayLightID.length;
    const maxLightCount = Math.floor(duration * precision);

    for (
        let itLightCount = 0, itLightID = 0;
        itLightCount < maxLightCount;
        itLightCount++
    ) {
        const currentLightID = [];
        for (let itIdCount = 0; itIdCount < itMultiple; itIdCount++, itLightID++) {
            if (itLightID === lightIDLength && lightIDLength > 1) {
                const prevLightID = arrayLightID[itLightID - 1];
                shuffle(arrayLightID);
                while (arrayLightID[0] === prevLightID) {
                    shuffle(arrayLightID);
                }
                itLightID = 0;
            }
            currentLightID.push(arrayLightID[itLightID]);
        }
        const idCountStepTime = (1 / precision) * itLightCount;
        for (let itColorStep = 0; itColorStep <= maxColorStep; itColorStep++) {
            if (offStrobe && lightOff && itColorStep === maxColorStep) {
                break;
            }
            const colorStepTime = lerp(
                0,
                length,
                normalize(itColorStep, 0, maxColorStep)
            );
            const currentTime = cursorTime + idCountStepTime + colorStepTime;
            if (lightOff && itColorStep === maxColorStep) {
                events.push({
                    _time: currentTime,
                    _type: eventType,
                    _value: 0,
                    _customData: {
                        _lightID: currentLightID,
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
                _value: eventValue,
                _customData: {
                    _color: currentHSVA,
                    _lightID: currentLightID,
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

module.exports = {
    name: 'Pseudorandom LightID HSVA',
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
        precision: 4,
        step: 8,
        'light off': 0,
        'off strobe': 0,
        idStart: 1,
        idEnd: 5,
        idIgnore: 0,
        idMultiple: 1,
        eventType: 3,
        eventColor: 0,
    },
    run: light,
};

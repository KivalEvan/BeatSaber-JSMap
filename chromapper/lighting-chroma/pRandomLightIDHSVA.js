// require _easings.js

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

const Easings = require('./_easings.js');

const stepEasing = (x) => x;
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
    const length = Math.abs(global.params[5]);
    const precision = Math.abs(global.params[6]);

    // color
    const maxColorStep = Math.abs(global.params[7]);
    const lightOff = global.params[8];
    const offStrobe = global.params[9];

    // lightID
    const idStart = parseInt(global.params[10].split('-')[0]);
    const idEnd = parseInt(global.params[10].split('-')[1]);
    const idIgnore = global.params[11].split(',').map((el) => parseInt(el));

    // easing
    const colorEasing = Easings.func[global.params[13]];
    const stepEasing = Easings.func[global.params[14]];

    const arrayLightID = [];
    for (let i = idStart; i <= idEnd; i++) {
        if (!idIgnore.includes(i)) {
            arrayLightID.push(i);
        }
    }
    const itMultiple = Math.min(Math.abs(global.params[12], arrayLightID.length));
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
                            stepEasing(normalize(itColorStep, 0, maxColorStep))
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
                            stepEasing(
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
        'Event Type': Object.keys(eventTypeEnum),
        'Event Color': Object.keys(eventColorEnum),
        'HSVA Start': '360,1,1,1',
        'HSVA End': '240,1,1,1',
        Duration: 2,
        Length: 1,
        Precision: 4,
        Step: 8,
        'Light Off': false,
        'Off-strobe': false,
        'ID Start-End': '1-15',
        'ID Ignore': '0',
        'ID Multiple': 1,
        'Easing Color': Easings.list,
        'Easing Step': Easings.list,
    },
    run: light,
    errorCheck: false,
};

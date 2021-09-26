// script params is chonky, use this on windowed 4:3 reso or start mapping in portrait mode
// if u still want to use this script but dont want to scale reso, remove the last 8 params in module.exports

// require _easings.js

// Event Type => self-explanatory
// Event Color => default fallback color if Chroma not exist
// HSVA Start => [hue,saturation,value,alpha?]
// HSVA End => see how HSV work
// Duration => duration from startID to endID
// Length => duration for color gradient
// Step => how many step should color gradient take
// Light Off => replace to off event at the end of step
// Off-strobe => place off event in between color step
// Invert => start from endID to startID
// Fill Start => fill the light from startID to endID
// Delete Last => delete the very last event (useful if you don't want overlap side effect)
// ID Start-End => set startID (see prop event)
// ID Light Count => how many lightID in single prop
// ID Offset => offset by lightID (useful for case like Skrillex)
// ID Ignore => ignore specific lightID (only '0' is disable, use ',' to separate (if light count is 4, set 2,4 to ignore 2 and 4))
// Easing Duration => self-explanatory
// Easing Color => see easings.net
// Easing Step => for more detail
// Repeat => repeat placement for every length + duration
// Repeat Offset => offset repeat placement time
// Repeat Shift Hue => shift hue for each repeated
// Flicker Slide => make off-strobe to do flickery/butterfly effect towards end
// Flicker Invert => start from start
// Flicker Strength => determine how often should off-strobe
// Flicker Coverage => how much to cover
// Noise => enable noise (random color)
// Noise Intensity => how intense is the color change (value)
// Noise Saturation => how much should saturation get affected
// Noise Coverage => how much does it cover

const Easings = require('./_easings.js');

const normalize = (x, min, max) => {
    return max - min > 0 ? (x - min) / (max - min) : 0;
};
const lerp = (x, y, a) => {
    return x + (y - x) * a;
};
const HSVAtoRGBA = (hue, saturation, value, alpha) => {
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
};
const interpolateColor = (hsvaStart, hsvaEnd, norm) => {
    return hsvaStart.map((hsva, i) => lerp(hsva, hsvaEnd[i], norm));
};

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

    // light settings
    const maxColorStep = Math.abs(global.params[6]);
    const lightOff = global.params[7];
    const offStrobe = global.params[8];
    const invert = global.params[9];
    const fillStart = global.params[10];
    const deleteLast = global.params[11];

    // light id
    const idStart = parseInt(global.params[12].split('-')[0]);
    const idEnd = parseInt(global.params[12].split('-')[1]);
    const idLightCount = Math.abs(global.params[13]);
    const idOffset = Math.floor(global.params[14]);
    const idIgnore = global.params[15].split(',').map((el) => parseInt(el));

    // easing
    const durationEasing = Easings.func[global.params[16]];
    const colorEasing = Easings.func[global.params[17]];
    const stepEasing = Easings.func[global.params[18]];

    // repeat
    const maxRepeat = Math.abs(global.params[19]);
    const repeatOffset = global.params[20];
    const repeatShiftHue =
        global.params[21] >= 0
            ? (global.params[21] / 360) % 1
            : (((global.params[21] % 360) + 360) / 360) % 1;

    // flicker
    const flickerMode =
        typeof global.params[22] === 'boolean' ? global.params[22] : false;
    const flickerInvert =
        typeof global.params[23] === 'boolean' ? global.params[23] : false;
    const flickerStrength =
        typeof global.params[24] === 'number' ? Math.abs(global.params[24]) : 1;
    const flickerCoverage =
        typeof global.params[25] === 'number' ? Math.abs(global.params[25] / 100) : 1;

    // noise
    const noiseMode =
        typeof global.params[26] === 'boolean' ? global.params[26] : false;
    const noiseIntensity =
        typeof global.params[27] === 'number'
            ? Math.abs(global.params[27] / 100)
            : 64 / 100;
    const noiseSaturation =
        typeof global.params[28] === 'number' ? Math.abs(global.params[28] / 100) : 1;
    const noiseCoverage =
        typeof global.params[29] === 'number' ? Math.abs(global.params[29] / 100) : 1;

    // generate lightID
    const lightID = [];
    const lightIDAll = [];
    for (let i = 1; i <= idLightCount; i++) {
        if (!idIgnore.includes(i)) {
            lightID.push(i + idOffset);
        }
    }
    for (let i = idStart - 1; i < idEnd; i++) {
        for (let j = 1; j <= idLightCount; j++) {
            if (!idIgnore.includes(j)) {
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
                durationEasing(normalize(itIdStep, 0, maxIdStep))
            );
            for (let itColorStep = 0; itColorStep <= maxColorStep; itColorStep++) {
                if (
                    !flickerMode &&
                    offStrobe &&
                    lightOff &&
                    itColorStep === maxColorStep
                ) {
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
                    stepEasing(normalize(itColorStep, 0, maxColorStep))
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
                                stepEasing(normalize(itColorStep, 0, maxColorStep))
                            ),
                            0,
                            length
                        )
                    )
                );
                if (noiseMode && Math.random() < noiseCoverage) {
                    currentHSVA[0] += Math.random() * noiseSaturation;
                    currentHSVA[1] = Math.max(
                        Math.min(
                            currentHSVA[1] + (-0.5 + Math.random()) * noiseSaturation,
                            1
                        ),
                        0
                    );
                    currentHSVA[2] = Math.max(
                        currentHSVA[2] + (-0.5 + Math.random()) * noiseIntensity,
                        0
                    );
                }
                events.push({
                    _time: currentTime,
                    _type: eventType,
                    _value: eventColor,
                    _customData: {
                        _color: HSVAtoRGBA(...currentHSVA),
                        _lightID:
                            fillStart && itColorStep === 0
                                ? lightIDAll
                                : currentLightID,
                    },
                });
                if (!flickerMode && offStrobe && itColorStep !== maxColorStep) {
                    const isFlicker = Math.random() < flickerStrength;
                    if (isFlicker && flickerCoverage > itColorStep / maxColorStep) {
                        events.push({
                            _time:
                                currentTime -
                                colorStepTime +
                                lerp(
                                    0,
                                    length,
                                    stepEasing(
                                        normalize(
                                            itColorStep * 2 + 1,
                                            0,
                                            maxColorStep * 2
                                        )
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
                if (flickerMode && offStrobe && itColorStep !== maxColorStep) {
                    const isFlicker = flickerInvert
                        ? Math.random() * flickerStrength > itColorStep / maxColorStep
                        : Math.random() * flickerStrength < itColorStep / maxColorStep;
                    if (isFlicker && flickerCoverage > itColorStep / maxColorStep) {
                        events.push({
                            _time:
                                currentTime -
                                colorStepTime +
                                lerp(
                                    0,
                                    length,
                                    stepEasing(
                                        normalize(
                                            itColorStep * 2 + 1,
                                            0,
                                            maxColorStep * 2
                                        )
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
        startHSVA[0] += repeatShiftHue;
        endHSVA[0] += repeatShiftHue;
    }
}

module.exports = {
    name: 'Light Gradient HSVA',
    params: {
        'Event Type': Object.keys(eventTypeEnum),
        'Event Color': Object.keys(eventColorEnum),
        'HSVA Start': '360,1,1,1',
        'HSVA End': '240,1,1,1',
        Duration: 1,
        Length: 1,
        Step: 8,
        'Light Off': false,
        'Off-strobe': false,
        Invert: false,
        'Fill Start': false,
        'Delete Last': false,
        'ID Start-End': '1-15',
        'ID Light Count': 4,
        'ID Offset': 0,
        'ID Ignore': '0',
        'Easing Duration': Easings.list,
        'Easing Color': Easings.list,
        'Easing Step': Easings.list,
        Repeat: 0,
        'Repeat Offset': 0,
        'Repeat Shift Hue': 0,
        'Flicker Slide': false,
        'Flicker Invert': false,
        'Flicker Strength': 1,
        'Flicker Coverage': 100,
        Noise: false,
        'Noise Intensity': 64,
        'Noise Saturation': 100,
        'Noise Coverage': 100,
    },
    run: light,
    errorCheck: false,
};

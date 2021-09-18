// script params is chonky, use this on windowed 4:3 reso or start mapping in portrait mode
// if u still want to use this script but dont want to scale reso, remove the last 8 params in module.exports

// require _easings.js

// rgba: [any range] => set color RGBA
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

    // flicker
    const flickerMode =
        typeof global.params[21] === 'boolean' ? global.params[21] : false;
    const flickerInvert =
        typeof global.params[22] === 'boolean' ? global.params[22] : false;
    const flickerStrength =
        typeof global.params[23] === 'number' ? Math.abs(global.params[23]) : 1;
    const flickerCoverage =
        typeof global.params[24] === 'number' ? Math.abs(global.params[24] / 100) : 1;

    // noise
    const noiseMode =
        typeof global.params[25] === 'boolean' ? global.params[25] : false;
    const noiseIntensity =
        typeof global.params[26] === 'number'
            ? Math.abs(global.params[26] / 100)
            : 64 / 100;
    const noiseSaturation =
        typeof global.params[27] === 'number' ? Math.abs(global.params[27] / 100) : 1;
    const noiseCoverage =
        typeof global.params[28] === 'number' ? Math.abs(global.params[28] / 100) : 1;

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
                durationEasing(normalize(itIdStep, 0, maxIdStep))
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
                    colorEasing(normalize(itColorStep, 0, maxColorStep))
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
                const currentRGBA = interpolateColor(
                    startRGBA,
                    endRGBA,
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
                    for (let c = 0; c < 3; c++) {
                        currentRGBA[c] = Math.max(
                            (currentRGBA[c] +
                                (-0.5 + Math.random()) *
                                    noiseSaturation *
                                    noiseIntensity) *
                                ((-0.5 + Math.random()) * noiseIntensity),
                            0
                        );
                    }
                }
                events.push({
                    _time: currentTime,
                    _type: eventType,
                    _value: eventColor,
                    _customData: {
                        _color: currentRGBA,
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
    }
}

module.exports = {
    name: 'Light Gradient RGBA',
    params: {
        'Event Type': Object.keys(eventTypeEnum),
        'Event Color': Object.keys(eventColorEnum),
        'RGBA Start': '1,0,0,1',
        'RGBA End': '0,0,1,1',
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
};

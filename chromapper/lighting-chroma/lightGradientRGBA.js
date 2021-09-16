// script params is chonky, use this on windowed 4:3 reso or start mapping in portrait mode

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
function interpolateColor(colorStart, colorEnd, norm) {
    return colorEnd.map((color, i) => {
        if (colorStart[i] != null) {
            return lerp(colorStart[i], color, norm);
        }
    });
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
    const startRGBA = [
        global.params[0],
        global.params[1],
        global.params[2],
        global.params[3],
    ];
    const endRGBA = [
        global.params[4],
        global.params[5],
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
    const flickerMode = global.params[25] > 0;
    const flickerStrength = Math.abs(global.params[26]);
    const flickerCoverage = Math.abs(global.params[27] / 100);
    const flickerInvert = global.params[28] > 0;
    const noiseMode = global.params[29] > 0;
    const noiseIntensity = Math.abs(global.params[30] / 100);
    const noiseSaturation = Math.abs(global.params[31] / 100);
    const noiseCoverage = Math.abs(global.params[32] / 100);

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
                const currentRGBA = interpolateColor(
                    startRGBA,
                    endRGBA,
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
                                    colorStepEasing(
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
                                    colorStepEasing(
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
        'start R': 1,
        'start G': 0,
        'start B': 0,
        'start A': 1,
        'end R': 0,
        'end G': 0,
        'end B': 1,
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
        flickerMode: 0,
        flickerStrength: 1,
        flickerCoverage: 100,
        flickerInvert: 0,
        noiseMode: 0,
        noiseIntensity: 64,
        noiseSaturation: 100,
        noiseCoverage: 100,
    },
    run: light,
};

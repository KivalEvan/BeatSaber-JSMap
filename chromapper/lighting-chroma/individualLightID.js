function normalize(x, min, max) {
    return (x - min) / (max - min);
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

function light(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const startRGBA = [global.params[0], global.params[1], global.params[2], global.params[3]];
    const endRGBA = [global.params[4], global.params[5], global.params[6], global.params[7]];
    const cursorTime = cursor;
    const duration = Math.abs(global.params[8]);
    const maxColorStep = Math.abs(global.params[9]);
    const lightOff = global.params[10] > 0;
    const offStrobe = global.params[11] > 0;
    const lightID = Math.abs(global.params[12]);
    const eventType = Math.abs(global.params[13]);
    const eventValue = global.params[14] === 0 ? 5 : 1;

    const timeColorStepIncrement = maxColorStep ? duration / maxColorStep : 1;
    for (let itColorStep = 0; itColorStep <= maxColorStep; itColorStep++) {
        const currentTime = cursorTime + timeColorStepIncrement * itColorStep;
        if (itColorStep === maxColorStep && lightOff) {
            events.push({
                _time: currentTime,
                _type: eventType,
                _value: 0,
                _customData: {
                    _lightID: [lightID],
                },
            });
            break;
        }
        const normColor = normalize(timeColorStepIncrement * itColorStep, 0, duration);
        const currentRGBA = interpolateColor(startRGBA, endRGBA, normColor);
        events.push({
            _time: currentTime,
            _type: eventType,
            _value: eventValue,
            _customData: {
                _color: currentRGBA,
                _lightID: [lightID],
            },
        });
    }
}

module.exports = {
    name: 'Individual LightID',
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
        step: 8,
        'light off': 0,
        'off strobe': 0,
        idStart: 1,
        eventType: 0,
        eventColor: 0,
    },
    run: light,
};

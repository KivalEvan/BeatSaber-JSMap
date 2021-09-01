// rgba: [any range] => set color RGBA
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
function durationStepEasing(x) {
    return x; // linear
    // return 1 - Math.pow(1 - x, 3); // easeOutCubic
    // return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; // easeInOutCubic
}
function colorEasing(x) {
    return x;
}

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

function light(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const startRGBA = [global.params[0], global.params[1], global.params[2], global.params[3]];
    const endRGBA = [global.params[4], global.params[5], global.params[6], global.params[7]];
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
            const currentRGBA = interpolateColor(
                startRGBA,
                endRGBA,
                colorEasing(normalize(colorStepTime, 0, length))
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
        'start R': 1,
        'start G': 0,
        'start B': 0,
        'start A': 1,
        'end R': 0,
        'end G': 0,
        'end B': 1,
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

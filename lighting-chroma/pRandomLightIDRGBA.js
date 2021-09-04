// rgba: [any range] => set color RGBA
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
// Fisher–Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function light(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
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
    const idMultiple = Math.min(Math.abs(global.params[17], arrayLightID.length));
    shuffle(arrayLightID);
    const lightIDLength = arrayLightID.length;
    const maxLightCount = Math.floor(duration * precision);

    for (
        let itLightCount = 0, itLightID = 0;
        itLightCount < maxLightCount;
        itLightCount++
    ) {
        const currentLightID = [];
        for (let itIdCount = 0; itIdCount < idMultiple; itIdCount++, itLightID++) {
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
            const normColor = normalize(colorStepTime, 0, length);
            const currentRGBA = interpolateColor(startRGBA, endRGBA, normColor);
            events.push({
                _time: currentTime,
                _type: eventType,
                _value: eventValue,
                _customData: {
                    _color: currentRGBA,
                    _lightID: currentLightID,
                },
            });
            if (offStrobe && itColorStep !== maxColorStep) {
                events.push({
                    _time:
                        currentTime +
                        lerp(
                            0,
                            length * 2,
                            normalize(itColorStep * 2 + 1, 0, maxColorStep * 2)
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
    name: 'Pseudorandom LightID RGBA',
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

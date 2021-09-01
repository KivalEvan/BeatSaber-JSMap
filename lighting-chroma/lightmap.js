// i ported lightmap so i can watch the world burn
// why would i do this? why shouldnt i do this?
// this was way simpler than i anticipated
// original by recrudesce & ndepoel
function heresy(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const bigLights = global.params[0] > 0;
    const ringSpins = global.params[1] > 0;
    const noteConvert = global.params[2] > 0;
    const bigLightFade = global.params[3] > 0;
    const spawnSpeed = global.params[4] > 0 ? global.params[4] : 4;
    const laserSpeed = Math.abs(global.params[5]);
    const beatOffset = global.params[6];

    // remove all existing events
    for (let i = events.length; i > 0; i--) {
        events.shift();
    }

    const songLength = notes[notes.length - 1]._time;

    if (bigLights) {
        let flipFlop = true;
        for (let time = beatOffset; time <= songLength; time += spawnSpeed) {
            if (songLength - time < spawnSpeed) {
                if (flipFlop) {
                    events.push({ _time: time, _type: 1, _value: 7 });
                } else {
                    events.push({ _time: time, _type: 1, _value: 3 });
                }
            } else {
                if (flipFlop) {
                    events.push({ _time: time, _type: 1, _value: 5 });
                    if (bigLightFade && time >= 1) {
                        events.push({ _time: time - 2, _type: 1, _value: 3 });
                    }
                } else {
                    events.push({ _time: time, _type: 1, _value: 1 });
                    if (bigLightFade && time >= 1) {
                        events.push({ _time: time - 2, _type: 1, _value: 7 });
                    }
                }
            }
            flipFlop = !flipFlop;
        }
    }

    if (ringSpins) {
        for (let time = beatOffset; time <= songLength; time += spawnSpeed) {
            events.push({ _time: time, _type: 8, _value: 0 });
        }
    }

    if (noteConvert) {
        notes.forEach((n) => {
            events.push({
                _time: n._time,
                _type: getType(n._lineIndex),
                _value: getValue(n._cutDirection),
            });
        });
    }

    events.push({ _time: 0, _type: 12, _value: laserSpeed });
    events.push({ _time: 0, _type: 13, _value: laserSpeed });
}

function getValue(cutDirection) {
    switch (cutDirection) {
        case 0:
        case 2:
        case 4:
        case 6:
            return 7;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
            return 3;
        default:
            return 0;
    }
}
function getType(lineIndex) {
    switch (lineIndex) {
        case 0:
            return 2;
        case 2:
            return 3;
        case 3:
            return 4;
        default:
            return 0;
    }
}

module.exports = {
    name: 'Lightmap',
    params: {
        bigLights: 1,
        ringSpins: 1,
        noteConvert: 1,
        bigLightFade: 0,
        spawnSpeed: 8,
        'Laser Speed': 4,
        'Offset (beat)': 0,
    },
    run: heresy,
};

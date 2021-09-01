// not particularly efficient but it gets the job done
// this looks overly complicated than it should be but i dont care enough
function modify(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    let normalMin, normalMax;

    // default color
    notes.forEach((n) => {
        n['_customData'] = { _color: [0.5, 0.5, 0.5] };
    });

    // intro section
    for (let i = 0; i < 8; i++) {
        for (const n of notes) {
            if (n._time < 12 + 4 * i) {
                continue;
            }
            if (n._time > 156 + 4 * (i + 1)) {
                break;
            }
            if (
                (n._time >= 12 + 4 * i && n._time < 12 + 4 * (i + 1)) ||
                (n._time >= 156 + 4 * i && n._time < 156 + 4 * (i + 1))
            ) {
                n._customData._color = [0.125, 0.5, 1];
            }
            if (n._time === 15 + 4 * i || n._time === 159 + 4 * i) {
                n._customData._color = [0.25, 0.25, 0.25];
            }
            if (n._time === 15.5 + 4 * i || n._time === 159.5 + 4 * i) {
                n._customData._color = [0.625, 0.625, 0.625];
            }
            if ((i === 3 || i === 7) && (n._time === 15 + 4 * i || n._time === 15.5 + 4 * i)) {
                n._customData._color = [0.75, 0.75, 0.75];
            }
            if ((i === 3 || i === 7) && n._time === 159.5 + 4 * i) {
                n._customData._color = [0.25, 0.25, 0.25];
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        for (const n of notes) {
            if (n._time < 44 + 4 * i) {
                continue;
            }
            if (n._time >= 200) {
                break;
            }
            if (n._time === 44 + 4 * i || n._time === 188 + 4 * i) {
                normalMin = n._time;
                normalMax = n._time + 4;
            }
            if (
                (n._time >= 44 + 4 * i && n._time < 44 + 4 * (i + 1)) ||
                (n._time >= 188 + 4 * i && n._time < 188 + 4 * (i + 1))
            ) {
                n._customData._color = [
                    0.5 + (n._time - normalMin) / (normalMax - normalMin) / 4,
                    0.125,
                    1 - (n._time - normalMin) / (normalMax - normalMin) / 4,
                ];
            }
            if (n._time === 59 || n._time === 59.5) {
                n._customData._color = [0.75, 0.75, 0.75];
            }
            if (n._time >= 196 && n._time >= 188 + 4 * i && n._time < 188 + 4 * (i + 1)) {
                n._customData._color = [
                    1 - (n._time - normalMin) / (normalMax - normalMin) / 4,
                    0.125,
                    0.5 + (n._time - normalMin) / (normalMax - normalMin) / 4,
                ];
            }
            if (n._time === 199) {
                n._customData._color = [0.25, 0.25, 0.25];
            }
            if (n._time === 199.5) {
                n._customData._color = [0.625, 0.625, 0.625];
            }
        }
    }
    normalMin = 200;
    normalMax = 202;
    for (const n of notes) {
        if (n._time < 200) {
            continue;
        }
        if (n._time >= 204) {
            break;
        }
        if (n._time >= 200 && n._time < 202) {
            n._customData._color = [
                0.125 + (((n._time - normalMin) / (normalMax - normalMin)) * 7) / 8,
                0.375 + (((n._time - normalMin) / (normalMax - normalMin)) * 4) / 6,
                0.625 + (((n._time - normalMin) / (normalMax - normalMin)) * 2) / 5,
            ];
        }
        if (n._time === 202) {
            normalMin = n._time;
            normalMax = n._time + 1;
        }
        if (n._time >= 202 && n._time < 203) {
            n._customData._color = [
                1 + (n._time - normalMin) / (normalMax - normalMin) / 2,
                1 + (n._time - normalMin) / (normalMax - normalMin) / 2,
                1 + (n._time - normalMin) / (normalMax - normalMin) / 2,
            ];
        }
        if (n._time === 203) {
            n._customData._color = [0.25, 0.25, 0.25];
        }
        if (n._time === 203.5) {
            n._customData._color = [0.625, 0.625, 0.625];
        }
    }

    // build section
    normalMin = 60;
    normalMax = 72;
    for (const n of notes) {
        if (n._time < 60) {
            continue;
        }
        if (n._time === 75.5) {
            n._customData._color = [0.625, 0.625, 0.625];
        }
        if (n._time > 75.5) {
            break;
        }
        if (n._time >= 60 && n._time <= 75) {
            n._customData._color = [
                0.375 + (((n._time - normalMin) / (normalMax - normalMin)) * 2) / 4,
                0.25,
                0.5 - (((n._time - normalMin) / (normalMax - normalMin)) * 2) / 9,
            ];
        }
    }

    // drop section
    for (let i = 0; i < 15; i++) {
        if (i === 7) {
            continue;
        }
        for (const n of notes) {
            if (n._time < 76 + 4 * i) {
                continue;
            }
            if (n._time > 268 + 4 * (i + 1)) {
                break;
            }
            if (n._time === 76 + 4 * i || n._time === 268 + 4 * i) {
                normalMin = n._time;
                normalMax = n._time + 4;
            }
            if (
                (n._time >= 76 + 4 * i && n._time < 77 + 4 * i) ||
                (n._time >= 268 + 4 * i && n._time < 269 + 4 * i)
            ) {
                n._customData._color = [0.875, 0.125, 0.125];
            }
            if (
                (n._time > 76 + 4 * i && n._time < 76 + 4 * (i + 1)) ||
                (n._time > 268 + 4 * i && n._time < 268 + 4 * (i + 1))
            ) {
                n._customData._color = [
                    0.125,
                    0.375 + (n._time - normalMin) / (normalMax - normalMin) / 4,
                    0.875 - (n._time - normalMin) / (normalMax - normalMin) / 6,
                ];
            }
        }
    }
    for (let i = 0; i < 2; i++) {
        for (const n of notes) {
            if (n._time < 104 + 32 * i) {
                continue;
            }
            if (n._time > 300 + 32 * i) {
                break;
            }
            if (n._time === 104 + 32 * i || n._time === 296 + 32 * i) {
                normalMin = n._time;
                normalMax = n._time + 4;
            }
            if (
                (n._time >= 104 + 32 * i && n._time < 106 + 32 * i) ||
                (n._time >= 296 + 32 * i && n._time < 298 + 32 * i)
            ) {
                n._customData._color = [
                    0.25 + (n._time - normalMin) / (normalMax - normalMin) / 4,
                    0.75 - (n._time - normalMin) / (normalMax - normalMin) / 6,
                    0.125,
                ];
            }
            if (
                (n._time >= 106 + 32 * i && n._time < 108 + 32 * i) ||
                (n._time >= 298 + 32 * i && n._time < 300 + 32 * i)
            ) {
                n._customData._color = [
                    1 - (((n._time - normalMin) / (normalMax - normalMin)) * 3) / 4,
                    1 - (((n._time - normalMin) / (normalMax - normalMin)) * 3) / 4,
                    1 - (((n._time - normalMin) / (normalMax - normalMin)) * 3) / 4,
                ];
            }
        }
    }
    for (let i = 0; i < 15; i++) {
        for (const n of notes) {
            if (n._time < 204 + 4 * i) {
                continue;
            }
            if (n._time > 204 + 4 * (i + 1)) {
                break;
            }
            if (n._time >= 204 + 4 * i && n._time < 204 + 4 * (i + 1)) {
                n._customData._color = [0.25, 0.5, 0.875];
            }
            if (n._time === 207 + 4 * i) {
                normalMin = n._time;
                normalMax = n._time + 1;
            }
            if (n._time >= 207 + 4 * i && n._time < 208 + 4 * i) {
                n._customData._color = [
                    0.75 - (((n._time - normalMin) / (normalMax - normalMin)) * 3) / 5,
                    0.25 + (n._time - normalMin) / (normalMax - normalMin) / 16,
                    0.25 + (n._time - normalMin) / (normalMax - normalMin) / 16,
                ];
            }
        }
    }
    for (const n of notes) {
        if (n._time > 267) {
            break;
        }
        if (n._time >= 235 && n._time < 236) {
            n._customData._color = [0.75, 0.75, 0.75];
        }
        if (n._time === 220) {
            n._customData._color = [0.25, 0.25, 0.25];
        }
        if (n._time >= 260 && n._time <= 262) {
            n._customData._color = [0.375, 0.375, 0.375];
        }
        if (n._time === 267) {
            n._customData._color = [0.25, 0.25, 0.25];
        }
        if (n._time >= 264 && n._time <= 266) {
            n._customData._color = [0.75, 0.75, 0.75];
        }
    }

    // ending section
    for (const n of notes) {
        if (n._time === 140 || n._time === 332) {
            n._customData = { _color: [0.25, 0.25, 0.25] };
        }
    }
}

module.exports = {
    name: 'Error Code',
    params: {},
    run: modify,
};

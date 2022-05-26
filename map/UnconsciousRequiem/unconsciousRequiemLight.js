'use strict';

const fs = require('fs');

const INPUT_FILE = 'ExpertPlusStandardOriginal.dat';
const OUTPUT_FILE = 'ExpertPlusStandard.dat';

let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
let _events = difficulty._events;

_events.forEach((e) => {
    e._floatValue = 1;
});

function normalize(x, min, max) {
    return (x - min) / (max - min);
}

function lerp(x, y, a) {
    return x + (y - x) * a;
}

function setFloat(t1, t2, n, type) {
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (_events[i]._time < t1 || (type != null && _events[i]._type !== type)) {
            continue;
        }
        _events[i]._floatValue = n;
    }
}

function gradientFloat(t1, t2, n1, n2, type) {
    let norm = 0;
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (_events[i]._time < t1 || (type != null && _events[i]._type !== type)) {
            continue;
        }
        norm = normalize(_events[i]._time, t1, t2);
        _events[i]._floatValue = lerp(n1, n2, norm);
    }
}

function randomizeFloat(t1, t2, min, max, type) {
    max = Math.max(min, max);
    for (let i = 0; i < _events.length; i++) {
        if (_events[i]._time > t2) {
            break;
        }
        if (_events[i]._time < t1 || (type != null && _events[i]._type !== type)) {
            continue;
        }
        _events[i]._floatValue = min + Math.random() * (max - min);
    }
}

randomizeFloat(0, 32, 0.25, 0.5, 4);
randomizeFloat(65.5, 69.9, 1.5, 2);
for (let i = 0; i < 15; i++) {
    gradientFloat(304 + i * 3, 305 + i * 3, 0.625, 1, 0);
}
gradientFloat(345, 348, 0.75, 1.375, 0);
gradientFloat(347, 349, 1, 1.5, 1);
randomizeFloat(349, 354, 1.5, 2, 1);
gradientFloat(354, 356, 1.5, 1, 1);
gradientFloat(419, 426.9, 1, 1.5);
randomizeFloat(469, 472.99, 1.5, 2);
gradientFloat(501, 505.5, 1.25, 0.25, 4);
gradientFloat(517, 523.5, 1, 0.125, 4);
gradientFloat(537, 544.9, 1, 1.5);
gradientFloat(594.66, 601.67, 1, 1.5, 0);
gradientFloat(614.42, 615.3, 1.25, 0.75, 1);
gradientFloat(616.04, 617.6, 1.125, 0.375, 1);
gradientFloat(705.37, 706.32, 0.375, 1.25, 0);
gradientFloat(705.37, 706.32, 0.375, 1.25, 1);
randomizeFloat(834.37, 836.32, 1.5, 2);
gradientFloat(874.37, 882.32, 2, 0.75, 1);
randomizeFloat(882.32, 900.32, 0.5, 0.75, 1);

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP,
                );
            }
        }
    }
}
deeperDaddy(difficulty);
difficulty._notes.sort(
    (a, b) =>
        parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
        parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) -
            parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP),
);
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null, 2));

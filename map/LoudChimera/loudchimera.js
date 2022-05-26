'use strict';
// this is the first time i started messing with modchart and this script was heavily modified from the example given in Noodle Extensions git.
// it is not pretty and should not be used for any other project. i do not recommend using most of the implementation i did here as it is difficult to go through.
// however, i still release it just to show my development and progress when dealing with script.

const fs = require('fs');

const INPUT = 'ExpertStandard.dat';
const OUTPUT = 'HardStandard.dat';
const BPM = 256;
const NJS = 19.5;
const NJSOFFSET = 0.25;

//#region this just counts how many time you ran it for fun, feel free to remove.
if (!fs.existsSync('count.txt')) {
    fs.writeFileSync('count.txt', parseInt('0').toString());
}
let count = parseInt(fs.readFileSync('count.txt'));
count++;
fs.writeFileSync('count.txt', count.toString());
console.log('GIVE IT UP FOR RUN ' + count);
//#endregion

let difficulty = JSON.parse(fs.readFileSync(INPUT));
difficulty._customData = { _pointDefinitions: [], _customEvents: [] };
const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;

_obstacles.forEach((wall) => {
    if (!wall._customData) {
        wall._customData = {
            _noteJumpMovementSpeed: NJS,
            _noteJumpStartBeatOffset: NJSOFFSET,
            _interactable: false,
        };
    }
    if (wall._type === 0) {
        wall._customData._color = [0.875, 0.875, 0.875];
    }
    if (wall._type === 1) {
        wall._customData._color = [0.125, 0.125, 0.125];
    }
});
_notes.forEach((note) => {
    if (!note._customData) {
        note._customData = {
            _noteJumpMovementSpeed: NJS,
            _noteJumpStartBeatOffset: NJSOFFSET,
        };
    }
    if (note._type === 3) {
        note._customData._color = [0.3125, 0.3125, 0.3125];
    }
});

//#region helper functions
function round(num, d = 0) {
    const place = Math.pow(10, d);
    return Math.round(num * place) / place;
}
function getHJD(njs = NJS) {
    const maxHalfJump = 18;
    const noteJumpMovementSpeed = (njs * BPM) / BPM;
    const num = 60 / BPM;
    let hjd = 4;
    while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
        hjd /= 2;
    }
    hjd += NJSOFFSET;
    if (hjd < 1) {
        hjd = 1;
    }
    return hjd;
}
function getJumpDistance(njs = NJS) {
    return njs * (60 / BPM) * getHJD(njs) * 2;
}
function getHJDfromJD(njs, jd) {
    return (jd * BPM) / (120 * njs);
}
function getRepeatArray(t, g, r) {
    let arr = new Array(r).fill(t);
    for (let i = 0; i < r; i++) {
        arr[i] = arr[i] + g * i;
    }
    return arr;
}
function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
}
function noteSetNonInteractible(t1, t2, type = 2) {
    let filterednotes = _notes.filter(
        (n) =>
            n._time >= t1 &&
            n._time <= t2 &&
            ((type === 2 && (n._type === 0 || n._type === 1)) || n._type === type),
    );
    filterednotes.forEach((note) => {
        note._customData._interactable = false;
    });
    return filterednotes;
}
function noteReplaceType(t1, t2, type = 2, type2) {
    let filterednotes = _notes.filter(
        (n) =>
            n._time >= t1 &&
            n._time <= t2 &&
            ((type === 2 && (n._type === 0 || n._type === 1)) || n._type === type),
    );
    filterednotes.forEach((note) => {
        note._type = type2;
    });
    return filterednotes;
}
function noteReplaceCutDirection(t1, t2, cd, type = 2) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    filterednotes.forEach((note) => {
        note._cutDirection = cd;
    });
    return filterednotes;
}
function trackOnNotesBetween(t1, t2, track, potentialOffset) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    filterednotes.forEach((note) => {
        note._customData._track = track;
        if (typeof potentialOffset !== 'undefined') {
            note._customData._noteJumpStartBeatOffset = potentialOffset;
        }
    });
    return filterednotes;
}
function trackDuplicateNotes(t1, t2, toffset, cd, track, potentialOffset, interactable, rotation) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    filterednotes.forEach((note) => {
        let n = JSON.parse(JSON.stringify(note));
        n._time += toffset;
        if (cd !== null) {
            n._cutDirection = cd;
        }
        n._customData._track = track;
        n._customData._fake = true;
        n._customData._disableSpawnEffect = true;
        if (typeof potentialOffset !== 'undefined') {
            n._customData._noteJumpStartBeatOffset = potentialOffset;
        }
        if (typeof interactable !== 'undefined') {
            n._customData._interactable = interactable;
        }
        if (typeof rotation === 'number') {
            n._customData._rotation = rotation;
        }
        _notes.push(n);
    });
    return filterednotes;
}
function trackOnNotesBetweenRBSep(t1, t2, trackR, trackB, potentialOffset) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    filterednotes.forEach((note) => {
        if (typeof potentialOffset !== 'undefined') {
            note._customData._noteJumpStartBeatOffset = potentialOffset;
        }
        if (note._type === 0) {
            note._customData._track = trackR;
        }
        if (note._type === 1) {
            note._customData._track = trackB;
        }
    });
    return filterednotes;
}
function trackOnNotesBetweenPrec(t1, t2, track1, track2, prec, potentialOffset) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    filterednotes.forEach((note) => {
        if (typeof potentialOffset !== 'undefined') {
            note._customData._noteJumpStartBeatOffset = potentialOffset;
        }
        if (note._time % prec === 0) {
            note._customData._track = track2;
        } else {
            note._customData._track = track1;
        }
    });
    return filterednotes;
}
//#endregion

//#region stuff
function flickerPoint(dur, prec, odd, val, easeZero, easeOne) {
    const array = [];
    for (let i = 0, len = dur * prec; i < len; i++) {
        if (i % 2 === 0) {
            array.push([1, i / dur / prec + (odd ? 0 : 1 / dur / prec), easeOne]);
        } else {
            array.push([val, (i - 1) / dur / prec + (odd ? 0 : 1 / dur / prec) + 0.001, easeZero]);
        }
    }
    array.push([1, 1, easeOne]);
    return array;
}
function disableNoteGravity(t1, t2) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    return filterednotes.forEach((note) => {
        note._customData._disableNoteGravity = true;
    });
}
function setNoteNJS(t1, t2, speed, jd) {
    if (speed === 0) {
        speed = NJS;
    }
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    return filterednotes.forEach((n) => {
        n._customData._noteJumpMovementSpeed = speed;
        if (typeof jd !== 'undefined') {
            n._customData._noteJumpStartBeatOffset = getHJDfromJD(n._customData._noteJumpMovementSpeed, jd) -
                getHJD(n._customData._noteJumpMovementSpeed) +
                NJSOFFSET;
        }
    });
}
function setWallNJS(t1, t2, speed, jd) {
    if (speed === 0) {
        speed = NJS;
    }
    let filteredwalls = _obstacles.filter((w) => w._time >= t1 && w._time <= t2);
    return filteredwalls.forEach((w) => {
        w._customData._noteJumpMovementSpeed = speed;
        if (typeof jd !== 'undefined') {
            w._customData._noteJumpStartBeatOffset = getHJDfromJD(w._customData._noteJumpMovementSpeed, jd) -
                getHJD(w._customData._noteJumpMovementSpeed) +
                NJSOFFSET;
        }
    });
}
function simultaneousNoteSpawn(t1, t2, speed, njsoff = NJSOFFSET) {
    if (speed === 0) {
        speed = 1;
    }
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2);
    let time = filterednotes[0]._time;
    return filterednotes.forEach((note) => {
        note._customData._noteJumpStartBeatOffset = njsoff + note._time - time - (note._time - time) / speed;
    });
}
function simultaneousWallSpawn(t1, t2, speed, njsoff = NJSOFFSET) {
    if (speed === 0) {
        speed = 1;
    }
    let filteredwalls = _obstacles.filter((w) => w._time >= t1 && w._time <= t2);
    let time = filteredwalls[0]?._time;
    return filteredwalls.forEach((wall) => {
        wall._customData._noteJumpStartBeatOffset = njsoff + wall._time - time - (wall._time - time) / speed;
    });
}
function rampNoteNJS(t1, t2, njsStart, njsEnd, jd, type = 2) {
    let filterednotes = _notes.filter(
        (n) => n._time >= t1 && n._time <= t2 && (type === 2 || n._type === type),
    );
    const factor = (njsEnd - njsStart) /
            (filterednotes[filterednotes.length - 1]?._time - filterednotes[0]?._time) || 1;
    return filterednotes.forEach((n) => {
        n._customData._noteJumpMovementSpeed = njsStart + (n._time - filterednotes[0]?._time) * factor || njsEnd;
        if (typeof jd !== 'undefined') {
            n._customData._noteJumpStartBeatOffset = getHJDfromJD(n._customData._noteJumpMovementSpeed, jd) -
                getHJD(n._customData._noteJumpMovementSpeed) +
                NJSOFFSET;
        }
    });
}
function rampWallNJS(t1, t2, njsStart, njsEnd, jd) {
    let filteredwalls = _obstacles.filter((n) => n._time >= t1 && n._time <= t2);
    const factor = (njsEnd - njsStart) /
            (filteredwalls[filteredwalls.length - 1]?._time - filteredwalls[0]?._time) || 1;
    return filteredwalls.forEach((n) => {
        n._customData._noteJumpMovementSpeed = njsStart + (n._time - filteredwalls[0]?._time) * factor || njsEnd;
        if (typeof jd !== 'undefined') {
            n._customData._noteJumpStartBeatOffset = getHJDfromJD(n._customData._noteJumpMovementSpeed, jd) -
                getHJD(n._customData._noteJumpMovementSpeed) +
                NJSOFFSET;
        }
    });
}

function dissolviBoi(t) {
    trackOnNotesBetweenPrec(t, t + 5.5, 'dissolveTrackL', 'dissolveTrackR', 1);
    _customEvents.push(
        {
            _time: t,
            _type: 'AnimateTrack',
            _data: {
                _track: 'dissolveTrackL',
                _dissolve: 'dissolveEven',
                _duration: 6,
            },
        },
        {
            _time: t,
            _type: 'AnimateTrack',
            _data: {
                _track: 'dissolveTrackR',
                _dissolve: 'dissolveOdd',
                _duration: 6,
            },
        },
    );
}
function fastPewPewSection(timeArr) {
    _pointDefinitions.push(
        {
            _name: 'dissolveOdd',
            _points: flickerPoint(6, 2, true, 0, 'easeStep', 'easeOutQuad'),
        },
        {
            _name: 'dissolveEven',
            _points: flickerPoint(6, 2, false, 0, 'easeStep', 'easeOutQuad'),
        },
    );
    timeArr.forEach((t) => {
        setNoteNJS(t, t + 6, 17);
        simultaneousNoteSpawn(t, t + 6, 4, -1.75);
        disableNoteGravity(t, t + 6);
        dissolviBoi(t);
        rampNoteNJS(t + 6.01, t + 10, 17.5, NJS, getJumpDistance() + 0.5);
    });
}
let fastPewPew = [].concat(getRepeatArray(394, 16, 8), getRepeatArray(906, 16, 8));
fastPewPewSection(fastPewPew);

function glitchyDotArrow(t, ease) {
    trackOnNotesBetween(t, t, 'solveArrowTrack');
    trackDuplicateNotes(t, t, -0.01, 8, 'dissolveArrowTrack');
    _customEvents.push(
        {
            _time: t - 3,
            _type: 'AnimateTrack',
            _data: {
                _track: 'solveArrowTrack',
                _dissolve: 'solveArrow',
                _dissolveArrow: 'solveArrow',
                _duration: 3,
            },
        },
        {
            _time: t - 3,
            _type: 'AnimateTrack',
            _data: {
                _track: 'dissolveArrowTrack',
                _dissolveArrow: 'dissolveArrow',
                _dissolve: 'invisibleBlock',
                _duration: 3,
            },
        },
    );
}
function glitchyBeforeFastPewPewSection(timeArr) {
    _pointDefinitions.push(
        {
            _name: 'solveArrow',
            _points: [
                [1 / 3, 0],
                [1, 1, 'easeInOutBounce'],
            ],
        },
        {
            _name: 'dissolveArrow',
            _points: [
                [1, 0],
                [0, 1, 'easeInBounce'],
            ],
        },
        {
            _name: 'invisibleBlock',
            _points: [
                [0, 0],
                [0, 1],
            ],
        },
    );
    timeArr.forEach((t) => {
        glitchyDotArrow(t, 'easeOutBounce');
    });
}
let glitchyBeforeFastPewPew = [].concat(getRepeatArray(408, 32, 4), getRepeatArray(920, 32, 4));
glitchyBeforeFastPewPewSection(glitchyBeforeFastPewPew);

function slapBeforeFastPewPewSection(timeArr) {
    _pointDefinitions.push({
        _name: 'bigBoi',
        _points: [
            [16, 0.5, 1, 0, 'easeOutElastic'],
            [1, 1, 1, 0.8, 'easeOutElastic'],
        ],
    });
    let flip = false;
    let flip2 = false;
    timeArr.forEach((t) => {
        trackOnNotesBetween(t, t, 'bigBoiTrack');
        _customEvents.push({
            _time: t - getHJD(),
            _type: 'AnimateTrack',
            _data: {
                _track: 'bigBoiTrack',
                _scale: 'bigBoi',
                _duration: 2,
            },
        });
        if (t !== 584 && t !== 1096 && t !== 1224 && t !== 1288) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 3; j++) {
                    _notes.push(
                        {
                            _time: t - 3 + i / 8 - j / 16,
                            _lineIndex: 0,
                            _lineLayer: 0,
                            _type: 3,
                            _cutDirection: 8,
                            _customData: {
                                _noteJumpMovementSpeed: NJS,
                                _noteJumpStartBeatOffset: 1 - i / 6,
                                _interactable: false,
                                _rotation: 180,
                                _position: [-3 - j - i / 32, -1 - i / 64],
                                _color: [0.875 - i / 32, 0.875 - i / 32, 0.875 - i / 32],
                            },
                        },
                        {
                            _time: t - 3 + i / 8 - j / 16,
                            _lineIndex: 3,
                            _lineLayer: 0,
                            _type: 3,
                            _cutDirection: 8,
                            _customData: {
                                _noteJumpMovementSpeed: NJS,
                                _noteJumpStartBeatOffset: 1 - i / 6,
                                _interactable: false,
                                _rotation: 180,
                                _position: [2 + j + i / 32, -1 - i / 64],
                                _color: [0.875 - i / 32, 0.875 - i / 32, 0.875 - i / 32],
                            },
                        },
                    );
                }
            }
            for (let k = 0; k < 4; k++) {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 3; j++) {
                        _notes.push(
                            {
                                _time: t + 0.75 + k * 16 + i / 8 - j / 16,
                                _lineIndex: 0,
                                _lineLayer: 0,
                                _type: 3,
                                _cutDirection: 8,
                                _customData: {
                                    _noteJumpMovementSpeed: NJS,
                                    _noteJumpStartBeatOffset: -1,
                                    _interactable: false,
                                    _rotation: 0 - i / 2 - j * 2,
                                    _position: [-3 - j * 1.5 - i / 32, -2 + j * 2 - i / 64],
                                    _color: [0.75 - i / 16, 0.125 + i / 96, 0.375 - i / 48],
                                },
                            },
                            {
                                _time: t + 0.75 + k * 16 + i / 8 - j / 16,
                                _lineIndex: 3,
                                _lineLayer: 0,
                                _type: 3,
                                _cutDirection: 8,
                                _customData: {
                                    _noteJumpMovementSpeed: NJS,
                                    _noteJumpStartBeatOffset: -1,
                                    _interactable: false,
                                    _rotation: 0 + i / 2 + j * 2,
                                    _position: [2 + j * 1.5 + i / 32, -2 + j * 2 - i / 64],
                                    _color: [0.75 - i / 16, 0.125 + i / 96, 0.375 - i / 48],
                                },
                            },
                        );
                    }
                }
            }
            for (let i = 0; i < 16; i++) {
                _notes.push(
                    {
                        _time: t + 8 - 1 + i / 8,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1 - i / 6,
                            _interactable: false,
                            _rotation: -180 + i,
                            _position: [-3 - i / 32, -1 - i / 64],
                            _color: [0.25 + i / 96, 0.25 + i / 96, 0.25 + i / 96],
                        },
                    },
                    {
                        _time: t + 8 - 1 + i / 8,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1 - i / 6,
                            _interactable: false,
                            _rotation: 180 - i,
                            _position: [2 + i / 32, -1 - i / 64],
                            _color: [0.25 + i / 96, 0.25 + i / 96, 0.25 + i / 96],
                        },
                    },
                );
            }
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    _notes.push(
                        {
                            _time: t + 11 + i / 2 + j / 8,
                            _lineIndex: 0,
                            _lineLayer: 0,
                            _type: 3,
                            _cutDirection: 8,
                            _customData: {
                                _noteJumpMovementSpeed: NJS,
                                _noteJumpStartBeatOffset: 0,
                                _interactable: false,
                                _rotation: -12 * i,
                                _position: [-3.25 - i, -1 + i + j / 8],
                                _color: [0, 0, 0.625],
                            },
                        },
                        {
                            _time: t + 11 + i / 2 + j / 8,
                            _lineIndex: 3,
                            _lineLayer: 0,
                            _type: 3,
                            _cutDirection: 8,
                            _customData: {
                                _noteJumpMovementSpeed: NJS,
                                _noteJumpStartBeatOffset: 0,
                                _interactable: false,
                                _rotation: 12 * i,
                                _position: [2.25 + i, -1 + i + j / 8],
                                _color: [0.625, 0, 0],
                            },
                        },
                    );
                }
            }
            for (let i = 0; i < 8; i++) {
                _notes.push(
                    {
                        _time: t + 12 - 1 + i / 32,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1 - i / 12,
                            _interactable: false,
                            _rotation: -(180 - i),
                            _position: [-1.5 - i, -0.5],
                            _color: [0.1875, 0.1875 - i / 64, 0.1875],
                        },
                    },
                    {
                        _time: t + 12 - 1 + i / 32,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1 - i / 12,
                            _interactable: false,
                            _rotation: 180 - i,
                            _position: [0.5 + i, -0.5],
                            _color: [0.1875, 0.1875 - i / 64, 0.1875],
                        },
                    },
                );
            }
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    _notes.push({
                        _time: t + 12 + i / 4 + j / 8,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: 21 - i * 0.75,
                            _noteJumpStartBeatOffset: -1,
                            _interactable: false,
                            _position: [flip ? 3 - i * 3 : -3 + i * 3, -1],
                            _rotation: flip ? (1 - i) * 15 : (-1 + i) * 15,
                            _color: [0.375, 0.375, 0.375],
                        },
                    });
                }
            }
            for (let i = 0; i < 12; i++) {
                _notes.push(
                    {
                        _time: t + 12.5 + i / 8,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: -0.5,
                            _interactable: false,
                            _rotation: 0 + i * 1.5,
                            _position: [-3 - i, -1],
                            _color: [0.25 + i / 96, 0.25 + i / 96, 0.25 + i / 96],
                        },
                    },
                    {
                        _time: t + 12.5 + i / 8,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: -0.5,
                            _interactable: false,
                            _rotation: 0 - i * 1.5,
                            _position: [2 + i, -1],
                            _color: [0.25 + i / 96, 0.25 + i / 96, 0.25 + i / 96],
                        },
                    },
                );
            }
            flip2 = !flip2 && flip;
            flip = !flip || flip2;
        }
    });
}
let slapBeforeFastPewPew = [].concat(
    getRepeatArray(392, 64, 2),
    [584, 1096, 1224, 1288],
    getRepeatArray(904, 64, 2),
);
slapBeforeFastPewPewSection(slapBeforeFastPewPew);

function bombContractExpandThingy(t1, t2) {
    let filterednotes = _notes.filter((n) => n._time >= t1 && n._time <= t2 && n._type === 3);
    return filterednotes.forEach((n) => {
        n._customData._position = [
            (n._lineIndex - 1.5) * (1 + (n._time % (t2 - t1)) / 2) - 0.5,
            n._lineLayer - 2 ** (n._time % (t2 - t1)) / 4,
        ];
    });
}
function slowPartSection(timeArr) {
    timeArr.forEach((t) => {
        rampNoteNJS(t + 0.01, t + 16, NJS - 0.5, 12, getJumpDistance(), 2);
        rampWallNJS(t + 0.01, t + 16, NJS - 0.5, 12, getJumpDistance());
        setNoteNJS(t + 16.01, t + 64 - 0.01, 12);
        setWallNJS(t + 16.01, t + 64 - 0.01, 12);
        simultaneousNoteSpawn(t + 16.01, t + 64 - 0.01, 1.015625, 0);
        simultaneousWallSpawn(t + 16.01, t + 64 - 0.01, 1.015625, 0);
        bombContractExpandThingy(t + 61.5, t + 63.5, 12);
        rampNoteNJS(t + 61.5, t + 63.5, 12, 18, undefined, 3);
    });
}
slowPartSection([136, 648]);

function kickSoundEffect(t) {
    trackOnNotesBetween(t, t + 112, 'kickSoundThingyTrack');
    _customEvents.push({
        _time: t - 1,
        _type: 'AnimateTrack',
        _data: {
            _track: 'kickSoundThingyTrack',
            _scale: 'kickSoundThingy',
            _dissolve: 'kickSoundDissolve',
            _duration: 112,
        },
    });
}
function scaleThingy(array, zero, one) {
    array.forEach((elem, i) => {
        array[i] = [elem[0] === 0 ? zero : one, elem[1], elem[2]].flat(1);
    });
    return array;
}
function slowBuildSection(timeArr) {
    _pointDefinitions.push(
        {
            _name: 'kickSoundThingy',
            _points: scaleThingy(
                flickerPoint(112, 1, false, 0, 'easeStep', 'easeOutExpo'),
                [1.375, 1.125, 1],
                [1, 1, 1],
            ),
        },
        {
            _name: 'kickSoundDissolve',
            _points: flickerPoint(112, 1, false, 1 / 3, 'easeStep', 'easeOutQuint'),
        },
    );
    let flip = false;
    timeArr.forEach((t) => {
        kickSoundEffect(t);
        setNoteNJS(t - 64, t + 64, 18, getJumpDistance());
        setNoteNJS(t + 112, t + 126, 20, getJumpDistance());
        setNoteNJS(t + 72, t + 96, 18, getJumpDistance());
        rampNoteNJS(t + 64, t + 72, 18, 17, getJumpDistance());
        rampNoteNJS(t + 96, t + 112, 17, 20, getJumpDistance());
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 16; i++) {
                _notes.push(
                    {
                        _time: t - 67 + i / 4 + j * 64 - 0.01,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1,
                            _interactable: false,
                            _rotation: j % 2 === 0 ? -12 + i * 1.8 : 12 - i * 1.75,
                            _position: [
                                j % 2 === 0 ? 5 - i ** 1.36 : -31 + i ** 1.56,
                                -1 - (1 / (i + 1)) ** 2,
                            ],
                            _color: [0.25, 0.25, 0.25],
                        },
                    },
                    {
                        _time: t - 67 + i / 4 + j * 64 - 0.01,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 1,
                            _interactable: false,
                            _rotation: j % 2 === 0 ? 12 - i * 1.8 : -12 + i * 1.75,
                            _position: [
                                j % 2 === 0 ? -6 + i ** 1.36 : 32 - i ** 1.56,
                                -1 - (1 / (i + 1)) ** 2,
                            ],
                            _color: [0.25, 0.25, 0.25],
                        },
                    },
                );
            }
        }
        for (let i = 0; i < 8; i++) {
            _notes.push(
                {
                    _time: t + 64 - 1 + i / 32,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: -(180 - i),
                        _position: [-1.5 - i, -1],
                        _color: [0.1875, 0.1875 - i / 64, 0.1875],
                    },
                },
                {
                    _time: t + 64 - 1 + i / 32,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180 - i,
                        _position: [0.5 + i, -1],
                        _color: [0.1875, 0.1875 - i / 64, 0.1875],
                    },
                },
            );
        }
        for (let i = 0; i < 8; i++) {
            let a = 16;
            if (i > 0 && i < 4) {
                continue;
            }
            _notes.push(
                {
                    _time: t + 96 - a - 1 + i * 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [3, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [2, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4 + 0.25,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [3, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4 + 0.25,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [2, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [-4, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [-3, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4 + 0.25,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [-4, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
                {
                    _time: t + 96 - a - 1 + i * 4 + 0.25,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _rotation: 180,
                        _position: [-3, -1],
                        _color: [0.375, 0.375, 0.375],
                    },
                },
            );
        }
        for (let i = 0; i < 32; i++) {
            if (i === 0) {
                continue;
            }
            if (i % 2 !== 0) {
                continue;
            }
            _notes.push(
                {
                    _time: t + 112 - 48 + i,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [-3, -1],
                        _color: [0.125, 0.125, 0.125],
                    },
                },
                {
                    _time: t + 112 - 48 + i,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [2, -1],
                        _color: [0.125, 0.125, 0.125],
                    },
                },
            );
        }
        for (let i = 0; i < 16; i++) {
            _notes.push(
                {
                    _time: t + 112 - 16 + i,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [-3 - i / 12, -1 + i / 24],
                        _color: [0.125 + i / 128, 0.125 + i / 128, 0.125 + i / 128],
                    },
                },
                {
                    _time: t + 112 - 16 + i,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [2 + i / 12, -1 + i / 24],
                        _color: [0.125 + i / 128, 0.125 + i / 128, 0.125 + i / 128],
                    },
                },
            );
        }
        for (let i = 0; i < 16; i++) {
            _notes.push(
                {
                    _time: t + 112 + i / 2,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: NJSOFFSET,
                        _interactable: false,
                        _rotation: -(i / 6),
                        _position: [-3 - i / 4, i % 2 === 0 ? -1 + i / 6 : -2 + i / 12],
                        _color: [0.25 + i / 128, 0.25 + i / 128, 0.25 + i / 128],
                    },
                },
                {
                    _time: t + 112 + i / 2,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: NJSOFFSET,
                        _interactable: false,
                        _rotation: i / 6,
                        _position: [2 + i / 4, i % 2 === 0 ? -1 + i / 6 : -2 + i / 12],
                        _color: [0.25 + i / 128, 0.25 + i / 128, 0.25 + i / 128],
                    },
                },
            );
            if (i < 9 && (i % 2 === 0 || i >= 4)) {
                _notes.push(
                    {
                        _time: t + 112 - 1 + i,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [2.5 + 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [1.5 + 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i + 0.25,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [2.5 + 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i + 0.25,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [1.5 + 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [-3.5 - 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [-2.5 - 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i + 0.25,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [-3.5 - 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                    {
                        _time: t + 112 - 1 + i + 0.25,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: NJS,
                            _noteJumpStartBeatOffset: 0,
                            _interactable: false,
                            _rotation: 180,
                            _position: [-2.5 - 1.5 ** i / 8, -1 - i / 16],
                            _color: [0.375, 0.375, 0.375],
                        },
                    },
                );
            }
        }
        for (let i = 0; i < 24; i++) {
            _notes.push(
                {
                    _time: t + 120 + i / 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [-5 - i / 24, i % 2 === 0 ? 2 + i / 12 : 3.5 + i / 4],
                        _rotation: i % 2 !== 0 ? -i - i / 4 : -i,
                        _color: flip ? [0.5 + i / 128, 0, 0] : [0, 0, 0.5 + i / 128],
                    },
                },
                {
                    _time: t + 120 + i / 4,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [-3 - i / 6, 0.5 - i / 16],
                        _rotation: -(i / 2),
                        _color: flip ? [0.5 + i / 128, 0, 0] : [0, 0, 0.5 + i / 128],
                    },
                },
                {
                    _time: t + 120 + i / 4,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [4 + i / 24, i % 2 === 0 ? 2 + i / 12 : 3.5 + i / 4],
                        _rotation: i % 2 !== 0 ? i + i / 4 : i,
                        _color: flip ? [0, 0, 0.5 + i / 128] : [0.5 + i / 128, 0, 0],
                    },
                },
                {
                    _time: t + 120 + i / 4,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: 0,
                        _interactable: false,
                        _position: [2 + i / 6, 0.5 - i / 16],
                        _rotation: i / 2,
                        _color: flip ? [0, 0, 0.5 + i / 128] : [0.5 + i / 128, 0, 0],
                    },
                },
            );
        }
        flip = !flip;
    });
}
slowBuildSection([264, 776]);

function fourWideBigSlapSection(timeArr) {
    _pointDefinitions.push(
        {
            _name: 'invisiblePointStuff',
            _points: [
                [0, 0],
                [0, 0.5],
            ],
        },
        {
            _name: 'goInvisPointStuff',
            _points: [
                [1, 0, 'easeStep'],
                [1, 0.45, 'easeStep'],
                [0, 0.5, 'easeOutQuint'],
            ],
        },
    );
    timeArr.forEach((t) => {
        disableNoteGravity(t, t);
        noteReplaceCutDirection(t, t, 8);
        _customEvents.push({
            _time: t - 8,
            _type: 'AssignPathAnimation',
            _data: {
                _track: 'invisibleBlockOnlyTrack' + t,
                _dissolve: 'invisiblePointStuff',
                _dissolveArrow: 'goInvisPointStuff',
            },
        });
        trackDuplicateNotes(t, t, -0.01, 3, 'invisibleBlockOnlyTrack' + t);
        trackDuplicateNotes(t, t, -0.01, 2, 'invisibleBlockOnlyTrack' + t);
    });
}
let fourWideBigSlap = [640, 1152];
fourWideBigSlapSection(fourWideBigSlap);
noteSetNonInteractible(0, 9999, 3);

function glitchyBurstSection(timeArr) {
    let flip = false;
    timeArr.forEach((t) => {
        _notes.push(
            {
                _time: t - 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 2.5,
                    _interactable: false,
                    _rotation: 182.5,
                    _position: [-3, -0.25],
                    _color: flip ? [0.75, 0, 0] : [0, 0, 0.75],
                },
            },
            {
                _time: t - 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 2.5,
                    _interactable: false,
                    _rotation: 181.75,
                    _position: [-2, -0.375],
                    _color: flip ? [0.5, 0, 0] : [0, 0, 0.5],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 182.5,
                    _position: [-3.5, 1.5],
                    _color: flip ? [0.75, 0, 0] : [0, 0, 0.75],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 183.75,
                    _position: [-2.5, 2.75],
                    _color: flip ? [0.625, 0, 0] : [0, 0, 0.625],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 181.25,
                    _position: [-4.375, 3.375],
                    _color: flip ? [0.5, 0, 0] : [0, 0, 0.5],
                },
            },
            {
                _time: t - 1 + 1.5,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0,
                    _interactable: false,
                    _rotation: 182.5,
                    _position: [-3.75, 0.25],
                    _color: flip ? [0.625, 0, 0] : [0, 0, 0.625],
                },
            },
            {
                _time: t - 1 + 1.5,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0,
                    _interactable: false,
                    _rotation: 182.5,
                    _position: [-3.75, 1.5],
                    _color: flip ? [0.75, 0, 0] : [0, 0, 0.75],
                },
            },
            {
                _time: t - 1,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 2.5,
                    _interactable: false,
                    _rotation: 177.5,
                    _position: [2, -0.25],
                    _color: flip ? [0, 0, 0.75] : [0.75, 0, 0],
                },
            },
            {
                _time: t - 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 2.5,
                    _interactable: false,
                    _rotation: 178.25,
                    _position: [1, -0.375],
                    _color: flip ? [0, 0, 0.5] : [0.5, 0, 0],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 177.5,
                    _position: [2.5, 1.5],
                    _color: flip ? [0, 0, 0.75] : [0.75, 0, 0],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 176.25,
                    _position: [1.5, 2.75],
                    _color: flip ? [0, 0, 0.625] : [0.625, 0, 0],
                },
            },
            {
                _time: t - 1 + 1,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0.75,
                    _interactable: false,
                    _rotation: 178.75,
                    _position: [3.375, 3.375],
                    _color: flip ? [0, 0, 0.5] : [0.5, 0, 0],
                },
            },
            {
                _time: t - 1 + 1.5,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0,
                    _interactable: false,
                    _rotation: 177.5,
                    _position: [2.75, 0.25],
                    _color: flip ? [0, 0, 0.625] : [0.625, 0, 0],
                },
            },
            {
                _time: t - 1 + 1.5,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: 0,
                    _interactable: false,
                    _rotation: 177.5,
                    _position: [2.75, 1.5],
                    _color: flip ? [0, 0, 0.75] : [0.75, 0, 0],
                },
            },
        );
        flip = !flip;
        _notes.push(
            {
                _time: t - getHJD() / 2 + 8.5,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: 7.5,
                    _position: [-4, -1.5],
                    _color: flip ? [0.5, 0, 0.25] : [0.25, 0, 0.5],
                },
            },
            {
                _time: t - getHJD() / 2 + 8.75,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: 7.5,
                    _position: [-4.5, -1.375],
                    _color: flip ? [0.625, 0, 0.125] : [0.125, 0, 0.625],
                },
            },
            {
                _time: t - getHJD() / 2 + 9,
                _lineIndex: 0,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: 7.5,
                    _position: [-5.25, -1.25],
                    _color: flip ? [0.75, 0, 0] : [0, 0, 0.75],
                },
            },
            {
                _time: t - getHJD() / 2 + 8.5,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: -7.5,
                    _position: [3, -1.5],
                    _color: flip ? [0.25, 0, 0.5] : [0.5, 0, 0.25],
                },
            },
            {
                _time: t - getHJD() / 2 + 8.75,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: -7.5,
                    _position: [3.5, -1.375],
                    _color: flip ? [0.125, 0, 0.625] : [0.625, 0, 0.125],
                },
            },
            {
                _time: t - getHJD() / 2 + 9,
                _lineIndex: 3,
                _lineLayer: 0,
                _type: 3,
                _cutDirection: 8,
                _customData: {
                    _noteJumpMovementSpeed: NJS,
                    _noteJumpStartBeatOffset: NJSOFFSET,
                    _interactable: false,
                    _rotation: -7.5,
                    _position: [4.25, -1.25],
                    _color: flip ? [0, 0, 0.75] : [0.75, 0, 0],
                },
            },
        );
        flip = !flip;
        for (let i = 0; i < 12; i++) {
            _notes.push(
                {
                    _time: t - getHJD() / 2 + 9 + i / 8,
                    _lineIndex: 0,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: NJSOFFSET,
                        _interactable: false,
                        _rotation: 2,
                        _position: [-2 - i / 4, -6 + 2 ** i / 128],
                        _color: flip ? [0.5 + i / 32, 0, 0.25 - i / 64] : [0.25 - i / 64, 0, 0.5 + i / 32],
                    },
                },
                {
                    _time: t - getHJD() / 2 + 9 + i / 8,
                    _lineIndex: 3,
                    _lineLayer: 0,
                    _type: 3,
                    _cutDirection: 8,
                    _customData: {
                        _noteJumpMovementSpeed: NJS,
                        _noteJumpStartBeatOffset: NJSOFFSET,
                        _interactable: false,
                        _rotation: -2,
                        _position: [1 + i / 4, -6 + 2 ** i / 128],
                        _color: flip ? [0.25 - i / 64, 0, 0.5 + i / 32] : [0.5 + i / 32, 0, 0.25 - i / 64],
                    },
                },
            );
        }
        flip = !flip;
    });
}
let glitchyBurst = [].concat(getRepeatArray(526, 32, 4), getRepeatArray(1038, 32, 4));
glitchyBurstSection(glitchyBurst);

function nyyoooombeforeglitchyburst(timeArr) {
    _pointDefinitions.push(
        {
            _name: 'slowNyooooomInvisiblePoint',
            _points: [
                [1, 0],
                [0, 7 / 16],
            ],
        },
        {
            _name: 'nyyyoooomPositionPoint',
            _points: [
                [0, 0, -4, 0],
                [0, 0, -25, 1.0, 'easeInCirc'],
            ],
        },
        {
            _name: 'nyyyoooomStationaryPoint',
            _points: [
                [0, 0, -4, 0],
                [0, 0, -4.5, 1.0],
            ],
        },
        {
            _name: 'nyyyoooomStretchPoint',
            _points: [
                [1, 1, 1, 0],
                [25, 0, 0.125, 0.875],
            ],
        },
        {
            _name: 'nyyyoooomStretchFastPoint',
            _points: [
                [1, 0.75, 0.75, 0],
                [36, 0, 0, 0.875, 'easeInOutQuad'],
            ],
        },
    );
    timeArr.forEach((t) => {
        _customEvents.push({
            _time: t - 8,
            _type: 'AssignPathAnimation',
            _data: {
                _track: 'nyooooomTrack' + t,
                _dissolve: 'slowNyooooomInvisiblePoint',
                _dissolveArrow: 'invisiblePointStuff',
                _definitePosition: 'nyyyoooomPositionPoint',
                _scale: 'nyyyoooomStretchPoint',
            },
        });
        trackDuplicateNotes(t, t, 1.5, 8, 'nyooooomTrack' + t, -0.5, false, 180);
    });
    for (let i = 0; i < 2; i++) {
        timeArr.forEach((t) => {
            _customEvents.push(
                {
                    _time: t - 8,
                    _type: 'AssignPathAnimation',
                    _data: {
                        _track: 'pewpewtrack' + t,
                        _dissolve: 'slowNyooooomInvisiblePoint',
                        _dissolveArrow: 'invisiblePointStuff',
                        _definitePosition: 'nyyyoooomStationaryPoint',
                        _scale: 'nyyyoooomStretchFastPoint',
                    },
                },
                {
                    _time: t - 8,
                    _type: 'AssignPathAnimation',
                    _data: {
                        _track: 'invisibleBlockOnlyTrack' + t,
                        _dissolve: 'invisiblePointStuff',
                        _dissolveArrow: 'goInvisPointStuff',
                    },
                },
            );
            trackDuplicateNotes(
                t + 2 + i * 64,
                t + 5 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 8 + i * 64,
                t + 11 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 16 + i * 64,
                t + 16 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 18 + i * 64,
                t + 21 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 24 + i * 64,
                t + 26 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 32 + i * 64,
                t + 32 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 34 + i * 64,
                t + 37 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 40 + i * 64,
                t + 43 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 48 + i * 64,
                t + 48 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            trackDuplicateNotes(
                t + 50 + i * 64,
                t + 53 + i * 64,
                0.99,
                8,
                'pewpewtrack' + t,
                -1,
                false,
                180,
            );
            if (i === 1) {
                trackDuplicateNotes(t + i * 64, t + i * 64, 0.99, 8, 'pewpewtrack' + t, -1, false, 180);
                trackDuplicateNotes(
                    t + i * 64,
                    t + i * 64,
                    -0.01,
                    8,
                    'invisibleBlockOnlyTrack' + t,
                );
            }
            trackDuplicateNotes(
                t + 16 + i * 64,
                t + 16 + i * 64,
                -0.01,
                8,
                'invisibleBlockOnlyTrack' + t,
            );
            trackDuplicateNotes(
                t + 32 + i * 64,
                t + 32 + i * 64,
                -0.01,
                8,
                'invisibleBlockOnlyTrack' + t,
            );
            trackDuplicateNotes(
                t + 48 + i * 64,
                t + 48 + i * 64,
                -0.01,
                8,
                'invisibleBlockOnlyTrack' + t,
            );
        });
    }
    timeArr.forEach((t) => {
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 12; i++) {
                _notes.push(
                    {
                        _time: t - 2.25 + i / 16,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: 16,
                            _noteJumpStartBeatOffset: -0.75 + i / 24,
                            _interactable: false,
                            _rotation: 180,
                            _position: [-3 - j * 2, -2 + j],
                            _color: [0.5 - i / 32, 0.5 - i / 32, 0.5 - i / 32],
                        },
                    },
                    {
                        _time: t - 2.25 + i / 16,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: 16,
                            _noteJumpStartBeatOffset: -0.75 + i / 24,
                            _interactable: false,
                            _rotation: 180,
                            _position: [2 + j * 2, -2 + j],
                            _color: [0.5 - i / 32, 0.5 - i / 32, 0.5 - i / 32],
                        },
                    },
                );
            }
        }
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 12; i++) {
                _notes.push(
                    {
                        _time: t + 1 + i / 16,
                        _lineIndex: 0,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: 16,
                            _noteJumpStartBeatOffset: -2 + i / 24,
                            _interactable: false,
                            _position: [-4 - j * 2, -2 + j],
                            _color: [0.5 - i / 32, 0.5 - i / 32, 0.5 - i / 32],
                        },
                    },
                    {
                        _time: t + 1 + i / 16,
                        _lineIndex: 3,
                        _lineLayer: 0,
                        _type: 3,
                        _cutDirection: 8,
                        _customData: {
                            _noteJumpMovementSpeed: 16,
                            _noteJumpStartBeatOffset: -2 + i / 24,
                            _interactable: false,
                            _position: [3 + j * 2, -2 + j],
                            _color: [0.5 - i / 32, 0.5 - i / 32, 0.5 - i / 32],
                        },
                    },
                );
            }
        }
    });
}
let nyyyooooom = [520, 1032];
nyyoooombeforeglitchyburst(nyyyooooom);

setNoteNJS(8, 70, 18, getJumpDistance());
rampNoteNJS(72, 120, 18, 19.5, getJumpDistance());
setNoteNJS(1160, 1288, 18, getJumpDistance());
rampNoteNJS(1160, 1176, 19.5, 18, getJumpDistance());
rampNoteNJS(1224, 1256, 18, 19.5, getJumpDistance());
setNoteNJS(1256, 1288, 19.5, getJumpDistance());
//#endregion

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
// recursion to deal with number formatting and delete null object but imma keep this name
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP);
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
fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 4));
console.log('completed');

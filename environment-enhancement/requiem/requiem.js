'use strict';
// NOTE: set environment to PanicEnvironment

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

// regex for environment enhancement
const ENVIRONMENT_PREFIX = 'PanicEnvironment'; // shouldnt be touched, also set env to PanicEnvironment if not
const regexSpectrogram = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
const regexRing = `^GameCore\\.\\[\\d+\\]Panels4TrackLaneRing\\(Clone\\)$`;
const regexWindow = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Window$`;
const regexTopCone = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]TopCones$`;
const regexBottomCone = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]BottomCones$`;
const regexConstGlowLineRing = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]ConstructionGlowLine.?\\(5\\)$`;
const regexConstGlowLineBacktop = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]ConstructionGlowLine.?\\(7\\)$`;

// beyond you're on your own
let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._customData = difficulty._customData || {};
difficulty._customData._environment = [];
const _environment = difficulty._customData._environment;

//#region helper
const posAddZ = (posArr, z) => {
    let arr = [...posArr];
    arr[2] += z;
    return arr;
};
const posMirrorX = (posArr) => {
    let arr = [...posArr];
    arr[0] = -arr[0];
    return arr;
};
const posMirrorY = (posArr) => {
    let arr = [...posArr];
    arr[1] = -arr[1];
    return arr;
};
const translatePos = (posArr, translate = [0, 0, 0]) => {
    let arr = [...posArr];
    arr[0] += translate[0];
    arr[1] += translate[1];
    arr[2] += translate[2];
    return arr;
};
const scaleArray = (posArr, mult = 1) => {
    return posArr.map((elem) => elem * mult);
};
//#endregion

//#region yeet
// linux user be like
_environment.push({
    _id: regexWindow,
    _lookupMethod: 'Regex',
    _active: false,
});
// remove this if u want window, this is done for cinema-compatibility
//#endregion
//#region kone
_environment.push(
    {
        _id: regexTopCone,
        _lookupMethod: 'Regex',
        _rotation: [0, 0, 90],
        _position: [-80, -63.671875, 12],
    },
    {
        _id: regexTopCone,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [0, 0, -90],
        _position: [80, 73, 12],
    }
);
//#endregion
//#region extra thicc ring
_environment.push({
    _id: regexRing,
    _lookupMethod: 'Regex',
    _scale: [4, 4, 1],
});
//#endregion
//#region test
const posGlowLine1 = [40, 14, 0];
const posGlowLine2 = [36, 18, 0];
_environment.push(
    {
        _id: regexConstGlowLineRing,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: posMirrorX(posGlowLine1),
    },
    {
        _id: regexConstGlowLineRing,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: posMirrorX(posGlowLine2),
    },
    {
        _id: regexConstGlowLineRing,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: posGlowLine2,
    },
    {
        _id: regexConstGlowLineRing,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: posGlowLine1,
    }
);
//#endregion
//#region test
const posGlowLine3 = [20, -8, 0];
_environment.push(
    {
        _id: regexConstGlowLineBacktop,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [90, 0, 0],
        _position: posMirrorX(posGlowLine3),
    },
    {
        _id: regexConstGlowLineBacktop,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [90, 0, 0],
        _position: posGlowLine3,
    }
);
//#endregion

// save file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('requiem environment enhancement added');

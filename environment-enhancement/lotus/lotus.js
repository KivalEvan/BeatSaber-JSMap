'use strict';

const fs = require('fs');

const INPUT_FILE = 'INPUT_FILE.dat';
const OUTPUT_FILE = 'OUTPUT_FILE.dat';

// environment related
// regex for environment enhancement
const regexRingRight = `\\[\\d+\\]PillarTrackLaneRingsR$`;
const regexRingLeft = `\\[\\d+\\]PillarTrackLaneRingsR.?\\(1\\)$`;
const regexSideLaser = `\\[42\\]SideLaser$`;
const regexGlowLine = `\\[\\d+\\]GlowLineL$`;
const regexPillarL = `\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarL$`;
const regexPillarR = `\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarR$`;
const regexDoor = `\\[\\d+\\]MagicDoorSprite$`;

// beyond you're on your own
let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._customData = difficulty._customData || {};
difficulty._customData._environment = [];
const _environment = difficulty._customData._environment;

//#region haha ring go brr; remove this if u dont want ring tower (this was made specifically for FELT - Journey)
// resize default column box
_environment.push(
    {
        _id: regexRingRight,
        _lookupMethod: 'Regex',
        _position: [64, 48, 128],
        _rotation: [90, 0, 45],
        _scale: [0.25, 0.25, 1],
    },
    {
        _id: regexRingLeft,
        _lookupMethod: 'Regex',
        _position: [-64, 48, 128],
        _rotation: [90, 0, 45],
        _scale: [0.25, 0.25, 1],
    }
);
// duplicate this shit everywhere
for (let i = 0; i < 15; i++) {
    let posXRight = (i + 1) * 12 + 36;
    let posZRight = 32 + Math.random() * 64;
    let posYRight = Math.max(
        -64 + Math.random() * 32 + posXRight / 8 + posZRight / 1.25,
        2
    );
    let posXLeft = (i + 1) * 12 + 36;
    let posZLeft = 32 + Math.random() * 64;
    let posYLeft = Math.max(
        -64 + Math.random() * 32 + posXLeft / 8 + posZLeft / 1.25,
        2
    );
    _environment.push(
        {
            _id: regexRingRight,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posXRight, posYRight, 64 + posZRight],
            _rotation: [90, 0, 45],
        },
        {
            _id: regexRingLeft,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [-posXLeft, posYLeft, 64 + posZLeft],
            _rotation: [90, 0, 45],
        }
    );
}
//#endregion
//#region side
for (let i = 0; i < 2; i++) {
    let posX = i * 1.5 + 4;
    let posY = i * 0.5 - 0.5;
    let posZ = -511;
    _environment.push(
        {
            _id: regexGlowLine,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [90, 0, 0],
            _scale: [1.5, 1.5, 1.5],
        },
        {
            _id: regexGlowLine,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [-posX, posY, posZ],
            _rotation: [90, 0, 0],
            _scale: [1.5, 1.5, 1.5],
        }
    );
}
//#endregion
//#region front
for (let i = 0; i < 5; i++) {
    let posX = 16 + i * 4;
    let posY = 0;
    let posZ = i * 8 + 24;
    _environment.push(
        {
            _id: regexSideLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [15 + i * 2.5, 0, -16 - i * 8],
        },
        {
            _id: regexSideLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [-posX, posY, posZ],
            _rotation: [15 + i * 2.5, 0, 16 + i * 8],
        }
    );
}
//#endregion
//#region backtop
for (let i = 0; i < 5; i++) {
    let posX = 54 + i * 4;
    let posY = i * 2;
    let posZ = i * 4 + 80;
    _environment.push(
        {
            _id: regexSideLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [-15, 0, 60 - i * 2.5],
        },
        {
            _id: regexSideLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [-posX, posY, posZ],
            _rotation: [-15, 0, -60 + i * 2.5],
        }
    );
}
//#endregion
//#region pillar
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: i
                ? regexPillarL.replace('PillarPair', `PillarPair \\(${i}\\)`)
                : regexPillarL,
            _lookupMethod: 'Regex',
            _rotation: [15, 45, 0 - i * 7.5],
            _position: [-32 + i * 4, 5 + i * 4 + Math.pow(i, i / 3), 64 + i * 12],
        },
        {
            _id: i
                ? regexPillarR.replace('PillarPair', `PillarPair \\(${i}\\)`)
                : regexPillarR,
            _lookupMethod: 'Regex',
            _rotation: [15, -45, 0 + i * 7.5],
            _position: [32 - i * 4, 5 + i * 4 + Math.pow(i, i / 3), 64 + i * 12],
        }
    );
}
//#endregion
//#region door
_environment.push(
    {
        _id: regexDoor,
        _lookupMethod: 'Regex',
        _rotation: [0, 0, 60],
        _position: [-4.625, 28, 192],
        _scale: [1, 1.5, 1],
    },
    {
        _id: regexDoor,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [0, 0, -60],
        _position: [4.625, 28, 192],
        _scale: [1, 1.5, 1],
    }
);
//#endregion

// save file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement added');

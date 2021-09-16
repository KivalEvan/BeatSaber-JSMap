'use strict';
// NOTE: set environment to BigMirrorEnvironment

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

// environment related
// road
const roadGap = 6; // how far between each gap of road
const roadCount = 5; // DO NOT CHANGE IF YOU'VE ALREADY SET LIGHTSHOW FOR THIS WITH PROPS
const roadRepeat = 4; // same as above
const roadOffset = 8;

// extra light
const extraMirrorLightOffset = roadOffset + roadGap * 2;
const extraMirrorLightGap = roadGap;
const extraMirrorLightMirrorOffsetX = 8.8;
const extraMirrorLightMirrorOffsetY = -4;

// regex for environment enhancement
const ENVIRONMENT_PREFIX = 'BigMirrorEnvironment'; // shouldnt be touched, also set env to bigmirror if not
const regexSpectrogram = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
const regexFloor = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`;
const regexConstruction = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Construction$`;
const regexNearBuilding = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NearBuilding(Left|Right)$`;
const regexBigRingLights = `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`;
const regexFrontLights = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`;
const regexDoubleColorLaser = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`;
const regexNeonTubeL = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`;
const regexNeonTubeR = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`;
const regexNeonTubeFL = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFL$`;
const regexNeonTubeFR = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFR$`;

// beyond you're on your own
let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._customData = { _environment: [] };
const _environment = difficulty._customData._environment;

const posAddY = (posArr, y) => {
    let arr = [...posArr];
    arr[1] += y;
    return arr;
};
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

//#region yeet
_environment.push(
    {
        _id: regexSpectrogram,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: regexFloor,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _position: [0, -1, -10],
    },
    {
        _id: regexNearBuilding,
        _lookupMethod: 'Regex',
        _active: false,
    }
);
//#endregion
//#region extra thicc ring
_environment.push({
    _id: regexBigRingLights,
    _lookupMethod: 'Regex',
    _scale: [1, 2, 1],
});
//#endregion
//#region road
const centerRoadPos = [1.1875, -2.75, roadOffset];
const centerRoadScale = [0.4375, 0.453125, 0.4375];
const farRoadPos = [3.5625, -2.15625, roadOffset];
const farRoadScale = [0.5, 0.265625, 0.5];
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: regexFrontLights,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posMirrorX(posAddZ(centerRoadPos, i * roadGap)),
            _rotation: [0, 0, -78],
        },
        {
            _id: regexFrontLights,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posAddZ(centerRoadPos, i * roadGap),
            _rotation: [0, 0, 78],
        }
    );
}
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: regexFrontLights,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posMirrorX(posAddZ(farRoadPos, i * roadGap)),
            _rotation: [0, 0, -114],
        },
        {
            _id: regexFrontLights,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posAddZ(farRoadPos, i * roadGap),
            _rotation: [0, 0, 114],
        }
    );
}
//#endregion
//#region road other lights
const farLaneLightPos = [4.4375, -1.625, 0];
const farLaneLightScale = [2, 1, 2];
const midLaneLightPos = [3.5, -2.140625, -255];
const midLaneLightScale = [2.5, 4, 2.5];
const botLaneLightPos = [3, -3.1015625, -255];
const botLaneLightScale = [2, 4, 2];
const centerLaneLightPos = [1.125, -2.75, -255];
const centerLaneLightScale = [2.5, 4, 2.5];
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: posMirrorX(botLaneLightPos),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: botLaneLightPos,
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: posMirrorX(centerLaneLightPos),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: centerLaneLightPos,
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: posMirrorX(midLaneLightPos),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: midLaneLightPos,
    },
    {
        _id: regexNeonTubeFL,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: posMirrorX(farLaneLightPos),
    },
    {
        _id: regexNeonTubeFR,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: farLaneLightPos,
    }
);
//#endregion
//#region yeet center light backtop thing
_environment.push({
    _id:
        regexDoubleColorLaser.replace(/\$$/, '') +
        `(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
    _lookupMethod: 'Regex',
    _active: false,
});
//#endregion
//#region replace with chad backtop thing
const backTopFarPos = [2.90625, -3.3125, 96];
const backTopFarScale = [1.5, 1, 1.5];
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: backTopFarScale,
            _position: posMirrorX(posAddZ(backTopFarPos, i * 16)),
            _rotation: [60 - i * 5, 0, 195 + i * 6],
        },
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: backTopFarScale,
            _position: posAddZ(backTopFarPos, i * 16),
            _rotation: [60 - i * 5, 0, 165 - i * 6],
        }
    );
}
//#endregion
//#region fabled extra light
const extraMirrorLightPos = [
    extraMirrorLightMirrorOffsetX,
    -1.625,
    extraMirrorLightOffset,
];
const extraMirrorLightScale = [0.5, 0.5, 0.5];
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap)
            ),
            _rotation: [0 + i * 2.5, 0, 320 + i * 11],
        },
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddY(
                    posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                    extraMirrorLightMirrorOffsetY
                )
            ),
            _rotation: [0 - i * 2.5, 0, 220 - i * 11],
        },
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddY(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                extraMirrorLightMirrorOffsetY
            ),
            _rotation: [0 - i * 2.5, 0, 140 + i * 11],
        },
        {
            _id: regexDoubleColorLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
            _rotation: [0 + i * 2.5, 0, 40 - i * 11],
        }
    );
}
//#endregion

// save file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement added');

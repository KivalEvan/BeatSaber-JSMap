'use strict';
// NOTE: set environment to BigMirrorEnvironment

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

// environment related
const roadGap = 4; // how far between each gap of road
const roadCount = 5; // DO NOT CHANGE IF YOU'VE ALREADY SET LIGHTSHOW FOR THIS WITH PROPS
const roadRepeat = 4; // same as above

// beyond you're on your own
const ENVIRONMENT_PREFIX = 'BigMirrorEnvironment'; // shouldnt be touched, also set env to bigmirror if not

let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._events.sort((a, b) => a._time - b._time);
difficulty._customData = { _environment: [] };
const _environment = difficulty._customData._environment;

const posAddX = (posArr, x) => {
    let arr = [...posArr];
    arr[0] += x;
    return arr;
};
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
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Construction$`,
        _lookupMethod: 'Regex',
        _position: [0, -1.25, -10],
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NearBuilding(Left|Right)$`,
        _lookupMethod: 'Regex',
        _active: false,
    }
);
//#endregion
//#region extra thicc ring
_environment.push({
    _id: `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`,
    _lookupMethod: 'Regex',
    _scale: [1, 2, 1],
});
//#endregion
//#region road
const centerRoadPos = [1.125, -2.890625, 8];
const centerRoadScale = [0.4375, 0.4375, 0.4375];
const farRoadPos = [3.5625, -2.25, 8];
const farRoadScale = [0.5, 0.265625, 0.5];
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posMirrorX(posAddZ(centerRoadPos, i * roadGap)),
            _rotation: [0, 0, -75],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerRoadScale,
            _position: posAddZ(centerRoadPos, i * roadGap),
            _rotation: [0, 0, 75],
        }
    );
}
for (let i = 0; i < roadCount * roadRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posMirrorX(posAddZ(farRoadPos, i * roadGap)),
            _rotation: [0, 0, -120],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: farRoadScale,
            _position: posAddZ(farRoadPos, i * roadGap),
            _rotation: [0, 0, 120],
        }
    );
}
//#endregion
//#region road other lights
const farLaneLightPos = [4.4375, -1.625, 0];
const farLaneLightScale = [2, 1, 2];
const midLaneLightPos = [3.5, -2.21875, -255];
const midLaneLightScale = [2.5, 4, 2.5];
const botLaneLightPos = [2.875, -3.29375, -255];
const botLaneLightScale = [2, 4, 2];
const centerLaneLightPos = [1.125, -2.84375, -255];
const centerLaneLightScale = [2.5, 4, 2.5];
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: posMirrorX(botLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: botLaneLightScale,
        _position: botLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: posMirrorX(centerLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLaneLightScale,
        _position: centerLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: posMirrorX(midLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _scale: midLaneLightScale,
        _position: midLaneLightPos,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFL$`,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: posMirrorX(farLaneLightPos),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalFR$`,
        _lookupMethod: 'Regex',
        _scale: farLaneLightScale,
        _position: farLaneLightPos,
    }
);
//#endregion
//#region yeet center light backtop thing
_environment.push({
    _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
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
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: backTopFarScale,
            _position: posMirrorX(posAddZ(backTopFarPos, i * 16)),
            _rotation: [60 - i * 5, 0, 195 + i * 6],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
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
const extraMirrorLightPos = [6.625, -1.625, 16];
const extraMirrorLightScale = [0.5, 0.5, 0.5];
const extraMirrorLightGap = 4;
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap)
            ),
            _rotation: [5 + i * 1, 0, 330 + i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posMirrorX(
                posAddY(posAddZ(extraMirrorLightPos, i * extraMirrorLightGap), -2)
            ),
            _rotation: [-5 - i * 1, 0, 210 - i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddY(
                posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                -2
            ),
            _rotation: [-5 - i * 1, 0, 150 + i * 10],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: extraMirrorLightScale,
            _position: posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
            _rotation: [5 + i * 1, 0, 30 - i * 10],
        }
    );
}
//#endregion

// save file
const precision = 4;
const jsonP = Math.pow(10, precision);
// recursion to deal with number formatting and delete null object but imma keep this name
function deeperDaddy(obj) {
    if (obj) {
        for (const key in obj) {
            if (obj[key] == null || JSON.stringify(obj[key]) === '{}') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === 'number') {
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
                );
            }
        }
    }
}
deeperDaddy(difficulty);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement added');

'use strict';
// WARNING: this script is meant to convert OG BMv2 lightshow to Chroma 2 Environment Enhancement
// if you want to only get environment use bmv2.js OR copy directly from bmv2.dat into difficult _customData
// alternatively, use lightConvert.js to convert your current lightshow to default preset of environment enhancement here
// you may still use this to convert your current lightshow but to your own risk

const fs = require('fs');

const INPUT_FILE = 'Expert.dat';
const OUTPUT_FILE = 'Hard.dat';

// lighting related
const BPM = 128; // set accordingly for proper fade timing
const fadeTimeSecond = 3; // how long it takes till fade out completely
const fadePrecision = 16; // use lower precision for less bloat; higher for better smoothing and response
const flashBrightness = 1.12; // this is alpha value; set at least 1 value
const fadeEasing = (x) => 1 - Math.pow(1 - x, 4); // easeOutCubic

// default color (for no chroma)
const defaultLeftLight = [0.85, 0.08499997, 0.08499997];
const defaultRightLight = [0.1882353, 0.675294, 1];
const defaultLeftLightBoost = [0.85, 0.08499997, 0.08499997];
const defaultRightLightBoost = [0.1882353, 0.675294, 1];

// environment related
const ringGap = 8; // how far between each gap of road
const ringCount = 5; // DO NOT CHANGE IF YOU'VE ALREADY SET LIGHTSHOW FOR THIS WITH PROPS
const ringRepeat = 2; // same as above

const scaleSizeMult = 0.875;
const posOffset = [0, 2, 12];

// beyond you're on your own
const ENVIRONMENT_PREFIX = 'BigMirrorEnvironment'; // shouldnt be touched, also set env to bigmirror if not

let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._events.sort((a, b) => a._time - b._time);
difficulty._customData = { _environment: [] };
let _events = difficulty._events;
const newEvents = [];
const _environment = difficulty._customData._environment;

if (defaultLeftLight.length < 4) {
    defaultLeftLight.push(1);
}
if (defaultRightLight.length < 4) {
    defaultRightLight.push(1);
}
if (defaultLeftLightBoost.length < 4) {
    defaultLeftLightBoost.push(1);
}
if (defaultRightLightBoost.length < 4) {
    defaultRightLightBoost.push(1);
}

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
        _active: false,
        // _position: [0, -1.25, -8],
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NearBuilding(Left|Right)$`,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalF(L|R)$`,
        _lookupMethod: 'Regex',
        _active: false,
    }
);
//#region yeet smol ring
_environment.push({
    _id: `^GameCore\\.\\[\\d+\\]SmallTrackLaneRing\\(Clone\\)$`,
    _lookupMethod: 'Regex',
    _active: false,
});
//#endregion
//#endregion
//#region extra thicc ring
_environment.push({
    _id: `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`,
    _lookupMethod: 'Regex',
    _scale: [1, 2, 1],
});
//#endregion
//#region center light thingy
const centerLightScale = [2, 4, 2];
const rightCenterLightPos = scaleArray([11.5, 2, -255], scaleSizeMult);
const topCenterLightPos = scaleArray([2, 11.5, -255], scaleSizeMult);
const bigStuffScale = [4, 4, 4];
const rightBigStuffPos = scaleArray([11.375, 0, -255], scaleSizeMult);
const topBigStuffPos = scaleArray([0, 11.375, -255], scaleSizeMult);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(rightCenterLightPos), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(posMirrorY(rightCenterLightPos)), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(rightCenterLightPos, posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorY(rightCenterLightPos), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(topCenterLightPos), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(topCenterLightPos, posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(posMirrorY(topCenterLightPos)), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorY(topCenterLightPos), posOffset),
    }
);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights$`,
        _lookupMethod: 'Regex',
        _position: translatePos([0, 0, 0 - posOffset[2]], posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [180, 180, 0],
        _position: translatePos([0, 0, 0 - posOffset[2]], posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: translatePos([0, 0, 64 - posOffset[2]], posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [180, 180, 0],
        _position: translatePos([0, 0, 64 - posOffset[2]], posOffset),
    }
);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorX(rightBigStuffPos), [0, 2.25 * scaleSizeMult, 0]),
            posOffset
        ),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(posMirrorX(rightBigStuffPos), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorX(rightBigStuffPos), [0, -2.25 * scaleSizeMult, 0]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(rightBigStuffPos, [0, 2.25 * scaleSizeMult, 0]),
            posOffset
        ),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(rightBigStuffPos, posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(rightBigStuffPos, [0, -2.25 * scaleSizeMult, 0]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(topBigStuffPos, [2.25 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(topBigStuffPos, posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(topBigStuffPos, [-2.25 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorY(topBigStuffPos), [2.25 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(posMirrorY(topBigStuffPos), posOffset),
    },
    {
        _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorY(topBigStuffPos), [-2.25 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    }
);
//#endregion
//#region static ring
const ringPos = scaleArray([4.125, 7, -0.125], scaleSizeMult);
const ringScale = scaleArray([1, 1, 1], scaleSizeMult);
const outerRingPos = scaleArray([-0.109375, 11.6875, 0], scaleSizeMult);
const outerRingScale = scaleArray([1, 4, 1], scaleSizeMult);
ringScale[0] = 1;
ringScale[2] = 1;
outerRingScale[0] = 1;
outerRingScale[2] = 1;
for (let i = 0; i < ringCount * ringRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: ringScale,
            _position: translatePos(
                posAddZ(posMirrorX(ringPos), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, -45],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: ringScale,
            _position: translatePos(
                posAddZ(posMirrorY(posMirrorX(ringPos)), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, -135],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: ringScale,
            _position: translatePos(posAddZ(ringPos, i * ringGap), posOffset),
            _rotation: [0, 0, 45],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: ringScale,
            _position: translatePos(
                posAddZ(posMirrorY(ringPos), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, 135],
        }
    );
}
for (let i = 0; i < ringCount * ringRepeat; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: outerRingScale,
            _position: translatePos(
                posAddZ(posMirrorX(outerRingPos), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, -45],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: outerRingScale,
            _position: translatePos(
                posAddZ(posMirrorY(posMirrorX(outerRingPos)), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, -135],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: outerRingScale,
            _position: translatePos(posAddZ(outerRingPos, i * ringGap), posOffset),
            _rotation: [0, 0, 45],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: outerRingScale,
            _position: translatePos(
                posAddZ(posMirrorY(outerRingPos), i * ringGap),
                posOffset
            ),
            _rotation: [0, 0, 135],
        }
    );
}
//#endregion
//#region yeet center light backtop thing
_environment.push({
    _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser(R|L)(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
    _lookupMethod: 'Regex',
    _active: false,
});
//#endregion
//#region replace with chad backtop thing
const backTopFarPos = [3.5, 8.25, ringCount * ringGap + ringGap / 1.35];
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: i
                ? `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser.?\\(${i}\\)$`
                : `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _position: translatePos(
                scaleArray(
                    translatePos(posMirrorX(backTopFarPos), [
                        -i * 1.625,
                        -i * 1.625,
                        0,
                    ]),
                    scaleSizeMult
                ),
                translatePos(posOffset, [0, 0, i * ringGap])
            ),
            _rotation: [12 - i * 8, 180, 348 - i * 8],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser.?\\(${
                i + 5
            }\\)$`,
            _lookupMethod: 'Regex',
            _position: translatePos(
                scaleArray(
                    translatePos(backTopFarPos, [i * 1.625, -i * 1.625, 0]),
                    scaleSizeMult
                ),
                translatePos(posOffset, [0, 0, i * ringGap])
            ),
            _rotation: [12 - i * 8, 180, 12 + i * 8],
        }
    );
}
for (let i = 0; i < 5; i++) {
    _environment.push(
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: translatePos(
                scaleArray(
                    translatePos(posMirrorX(posMirrorY(backTopFarPos)), [
                        -i * 1.625,
                        i * 1.625,
                        0,
                    ]),
                    scaleSizeMult
                ),
                translatePos(posOffset, [0, 0, i * ringGap])
            ),
            _rotation: [12 - i * 8, 0, 168 - i * 8],
        },
        {
            _id: `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: translatePos(
                scaleArray(
                    translatePos(posMirrorY(backTopFarPos), [i * 1.625, i * 1.625, 0]),
                    scaleSizeMult
                ),
                translatePos(posOffset, [0, 0, i * ringGap])
            ),
            _rotation: [12 - i * 8, 0, 192 + i * 8],
        }
    );
}
//#endregion

//#region lighting
// convert chroma 1 to chroma 2
function ColorFromInt(rgb) {
    rgb = rgb - 2000000000;
    let red = (rgb >> 16) & 0x0ff;
    let green = (rgb >> 8) & 0x0ff;
    let blue = rgb & 0x0ff;
    return [red / 255, green / 255, blue / 255, 1];
}
let currentColor = {};
for (const ev of _events) {
    let noChromaColor = false;
    if (ev._value >= 2000000000) {
        currentColor[ev._type] = ColorFromInt(ev._value);
    }
    if (!currentColor[ev._type]) {
        noChromaColor = true;
        currentColor[ev._type] =
            ev._value >= 1 && ev._value <= 3 ? defaultRightLight : defaultLeftLight;
    }
    if (ev._value === 4) {
        ev.value = 0;
    }
    if (ev._value !== 0 && !(ev._value >= 2000000000)) {
        if (ev._customData && !ev._customData._color) {
            ev._customData = { _color: currentColor[ev._type] };
        }
        if (!ev._customData) {
            ev._customData = { _color: currentColor[ev._type] };
        }
    }
    if (!(ev._value >= 2000000000)) {
        newEvents.push(ev);
        if (noChromaColor) {
            currentColor[ev._type] = null;
        }
    }
}
difficulty._events = newEvents;

let tempID = [];
for (let i = 0; i < ringRepeat; i++) {
    for (let j = 0; j < 4; j++) {
        tempID.push(41 + j + i * ringCount * 4);
    }
}

const switchType = {
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    10: 4,
    11: 4,
};
// 0 doesnt need conversion as there's no extra light
const typeLightIDMap = {
    4: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    5: tempID,
    6: tempID.map((val) => val + 4),
    7: tempID.map((val) => val + 8),
    10: tempID.map((val) => val + 12),
    11: tempID.map((val) => val + 16),
};

function normalize(x, min, max) {
    return max - min > 0 ? (x - min) / (max - min) : 0;
}
function lerp(x, y, a) {
    return x + (y - x) * a;
}
const timeFromFade = (BPM * fadeTimeSecond) / 60;
const maxStep = Math.floor(timeFromFade * fadePrecision);
const isOn = [1, 5];
const isFlash = [2, 6];
const isFade = [3, 7];
const ignoreConversion = [0, 1, 2, 3, 8, 9, 12, 13];
const skipEvent = [14, 15];
const newerEvents = [];

for (let type = 0; type < 16; type++) {
    if (skipEvent.includes(type)) {
        continue;
    }
    for (let i = 0, len = newEvents.length; i < len; i++) {
        const currentEvent = newEvents[i];
        if (currentEvent._type !== type) {
            continue;
        }
        if (ignoreConversion.includes(type)) {
            newerEvents.push(currentEvent);
            continue;
        }
        currentEvent._type = switchType[type];
        if (currentEvent._customData) {
            currentEvent._customData._lightID = typeLightIDMap[type];
        } else {
            currentEvent._customData = { _lightID: typeLightIDMap[type] };
        }
        if (currentEvent._value === 0 || isOn.includes(currentEvent._value)) {
            newerEvents.push(currentEvent);
            continue;
        }
        let wasFlash;
        if (isFlash.includes(currentEvent._value)) {
            wasFlash = true;
            currentEvent._value = currentEvent._value === 2 ? 1 : 5;
        }
        if (isFade.includes(currentEvent._value)) {
            currentEvent._value = currentEvent._value === 3 ? 1 : 5;
        }
        let finalTime;
        for (let j = i + 1; j < len; j++) {
            if (newEvents[j]._type !== type) {
                continue;
            }
            finalTime = Math.min(currentEvent._time + timeFromFade, newEvents[j]._time);
            break;
        }
        const maxCount = Math.floor((finalTime - currentEvent._time) * fadePrecision);
        for (let j = 0; j <= maxCount; j++) {
            let currentColor = [...currentEvent._customData?._color];
            if (!currentColor) {
                newerEvents.push(currentEvent);
                break;
            }
            currentColor[3] = Math.max(
                lerp(flashBrightness, 0, fadeEasing(normalize(j, 0, maxStep))),
                0
            );
            currentEvent._customData._color = currentColor;
            if (j === 0) {
                newerEvents.push(currentEvent);
                continue;
            }
            let stoprightthere;
            if (currentColor[3] < 1 && wasFlash) {
                currentColor[3] = 1;
                stoprightthere = true;
            }
            if (currentColor[3] === 0) {
                currentColor[3] = 0;
                stoprightthere = true;
            }
            const temp = JSON.parse(JSON.stringify(currentEvent));
            temp._time += j / fadePrecision;
            newerEvents.push(temp);
            if (stoprightthere) {
                break;
            }
        }
    }
}

difficulty._events = newerEvents;
console.log('event count:', newerEvents.length);
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
                obj[key] = parseFloat(
                    Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP
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
            parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
);
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement + OG platform lightshow conversion completed');

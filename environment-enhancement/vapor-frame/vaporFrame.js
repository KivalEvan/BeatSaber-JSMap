'use strict';
// WARNING: this script is meant to convert OG Vapor Frame lightshow to Chroma 2 Environment Enhancement
// if you want to only get environment use vaporFrame.js OR copy directly from vaporFrame.dat into difficult _customData
// alternatively, use lightConvert.js to convert your current lightshow to default preset of environment enhancement here
// you may still use this to convert your current lightshow but to your own risk

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

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

// save file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(difficulty, null));
console.log('environment enhancement added');

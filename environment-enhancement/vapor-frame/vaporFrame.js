'use strict';
// NOTE: set environment to BigMirrorEnvironment

const fs = require('fs');

const INPUT_FILE = 'DIFFICULTY_FILE_INPUT.dat';
const OUTPUT_FILE = 'DIFFICULTY_FILE_OUTPUT.dat';

// environment related
const ringGap = 8; // how far between each gap of road
const ringCount = 5; // DO NOT CHANGE IF YOU'VE ALREADY SET LIGHTSHOW FOR THIS WITH PROPS
const ringRepeat = 2; // same as above

const scaleSizeMult = 0.875;
const posOffset = [0, 2, 12];

// regex for environment enhancement
const ENVIRONMENT_PREFIX = 'BigMirrorEnvironment'; // shouldnt be touched, also set env to bigmirror if not
const regexSpectrogram = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
const regexFloor = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`;
const regexConstruction = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]Construction$`;
const regexNearBuilding = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NearBuilding(Left|Right)$`;
const regexNeonTubeDirectional = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalF(L|R)$`;
const regexBigRingLight = `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`;
const regexNeonTubeL = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalL$`;
const regexNeonTubeR = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]NeonTubeDirectionalR$`;
const regexFrontLights = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights$`;
const regexFrontLightsTube = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`;
const regexDoubleColorLaser = `^${ENVIRONMENT_PREFIX}\\.\\[\\d+\\]Environment\\.\\[\\d+\\]DoubleColorLaser$`;

// beyond you're on your own
let difficulty = JSON.parse(fs.readFileSync(INPUT_FILE));
difficulty._customData = { _environment: [] };
const _environment = difficulty._customData._environment;

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
        _active: false,
        // _position: [0, -1.25, -8],
    },
    {
        _id: regexNearBuilding,
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: regexNeonTubeDirectional,
        _lookupMethod: 'Regex',
        _active: false,
    }
);
//#endregion
//#region extra thicc ring
_environment.push({
    _id: regexBigRingLight,
    _lookupMethod: 'Regex',
    _scale: [1, 2, 1],
});
//#endregion
//#region center light thingy
const centerLightScale = [2, 4, 2];
const rightCenterLightPos = scaleArray([11.5, 2, -255], scaleSizeMult);
const topCenterLightPos = scaleArray([2, 11.5, -255], scaleSizeMult);
const bigStuffScale = [4, 4, 4];
const rightBigStuffPos = scaleArray([11.5, 0, -255], scaleSizeMult);
const topBigStuffPos = scaleArray([0, 11.5, -255], scaleSizeMult);
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(rightCenterLightPos), posOffset),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(posMirrorY(rightCenterLightPos)), posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(rightCenterLightPos, posOffset),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorY(rightCenterLightPos), posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(topCenterLightPos), posOffset),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(topCenterLightPos, posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorX(posMirrorY(topCenterLightPos)), posOffset),
    },
    {
        _id: regexNeonTubeR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: centerLightScale,
        _position: translatePos(posMirrorY(topCenterLightPos), posOffset),
    }
);
_environment.push(
    {
        _id: regexFrontLights,
        _lookupMethod: 'Regex',
        _position: translatePos([0, 0, 0 - posOffset[2]], posOffset),
    },
    {
        _id: regexFrontLights,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [180, 180, 0],
        _position: translatePos([0, 0, 0 - posOffset[2]], posOffset),
    },
    {
        _id: regexFrontLights,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: translatePos([0, 0, 64 - posOffset[2]], posOffset),
    },
    {
        _id: regexFrontLights,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _rotation: [180, 180, 0],
        _position: translatePos([0, 0, 64 - posOffset[2]], posOffset),
    }
);
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorX(rightBigStuffPos), [0, 2.21875 * scaleSizeMult, 0]),
            posOffset
        ),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(posMirrorX(rightBigStuffPos), posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorX(rightBigStuffPos), [
                0,
                -2.21875 * scaleSizeMult,
                0,
            ]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(rightBigStuffPos, [0, 2.21875 * scaleSizeMult, 0]),
            posOffset
        ),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(rightBigStuffPos, posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(rightBigStuffPos, [0, -2.21875 * scaleSizeMult, 0]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(topBigStuffPos, [2.21875 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(topBigStuffPos, posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(topBigStuffPos, [-2.21875 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    }
);
_environment.push(
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorY(topBigStuffPos), [2.21875 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: scaleArray(bigStuffScale, 2),
        _position: translatePos(posMirrorY(topBigStuffPos), posOffset),
    },
    {
        _id: regexNeonTubeL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: bigStuffScale,
        _position: translatePos(
            translatePos(posMirrorY(topBigStuffPos), [-2.21875 * scaleSizeMult, 0, 0]),
            posOffset
        ),
    }
);
//#endregion
//#region static ring
const ringPos = scaleArray([4.1875, 7, -0.125], scaleSizeMult);
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
            _id: regexFrontLightsTube,
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
            _id: regexFrontLightsTube,
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
            _id: regexFrontLightsTube,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: ringScale,
            _position: translatePos(posAddZ(ringPos, i * ringGap), posOffset),
            _rotation: [0, 0, 45],
        },
        {
            _id: regexFrontLightsTube,
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
            _id: regexFrontLightsTube,
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
            _id: regexFrontLightsTube,
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
            _id: regexFrontLightsTube,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: outerRingScale,
            _position: translatePos(posAddZ(outerRingPos, i * ringGap), posOffset),
            _rotation: [0, 0, 45],
        },
        {
            _id: regexFrontLightsTube,
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
    _id:
        regexDoubleColorLaser.replace(/\$$/, '') +
        `(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
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
                ? regexDoubleColorLaser.replace(/\$$/, '') + `.?\\(${i}\\)$`
                : regexDoubleColorLaser,
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
            _id: regexDoubleColorLaser.replace(/\$$/, '') + `.?\\(${i + 5}\\)$`,
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
            _id: regexDoubleColorLaser,
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
            _id: regexDoubleColorLaser,
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

import * as bsmap from '../../deno/mod.ts';

export const ringCount = 5;
export const ringRepeat = 2;
export const idOffsetType4 = 100;

export const generateEnvironment = (): bsmap.types.v2.IChromaEnvironment[] => {
    const environment: bsmap.types.v2.IChromaEnvironment[] = [];

    let internalIdOffsetType4 = idOffsetType4;
    const ringGap = 8; // how far between each gap of road

    const scaleSizeMult = 0.875;
    const posOffset: bsmap.types.Vector3 = [0, 2, 12];

    // regex for environment enhancement
    const regexSpectrogram = `(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
    const regexFloor = `\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`;
    const regexConstruction = `\\[\\d+\\]Construction$`;
    const regexNearBuilding = `\\[\\d+\\]NearBuilding(Left|Right)$`;
    const regexNeonTubeDirectional = `\\[\\d+\\]NeonTubeDirectionalF(L|R)$`;
    const regexBigRingLight =
        `^GameCore\\.\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`;
    const regexNeonTubeL = `\\[\\d+\\]NeonTubeDirectionalL$`;
    const regexNeonTubeR = `\\[\\d+\\]NeonTubeDirectionalR$`;
    const regexFrontLights = `\\[\\d+\\]FrontLights$`;
    const regexFrontLightsTube = `\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`;
    const regexDoubleColorLaser = `\\[\\d+\\]DoubleColorLaser$`;

    // beyond you're on your own
    const posAddZ = (posArr: bsmap.types.Vector3, z: number): bsmap.types.Vector3 => {
        let arr: bsmap.types.Vector3 = [...posArr];
        arr[2] += z;
        return arr;
    };
    const posMirrorX = (posArr: bsmap.types.Vector3): bsmap.types.Vector3 => {
        let arr: bsmap.types.Vector3 = [...posArr];
        arr[0] = -arr[0];
        return arr;
    };
    const posMirrorY = (posArr: bsmap.types.Vector3): bsmap.types.Vector3 => {
        let arr: bsmap.types.Vector3 = [...posArr];
        arr[1] = -arr[1];
        return arr;
    };
    const translatePos = (
        posArr: bsmap.types.Vector3,
        translate = [0, 0, 0],
    ): bsmap.types.Vector3 => {
        let arr: bsmap.types.Vector3 = [...posArr];
        arr[0] += translate[0];
        arr[1] += translate[1];
        arr[2] += translate[2];
        return arr;
    };
    const scaleArray = (posArr: bsmap.types.Vector3, mult = 1): bsmap.types.Vector3 => {
        return posArr.map((elem) => elem * mult) as bsmap.types.Vector3;
    };

    //#region yeet
    environment.push(
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
        },
    );
    //#endregion
    //#region extra thicc ring
    environment.push({
        _id: regexBigRingLight,
        _lookupMethod: 'Regex',
        _scale: [1, 2, 1],
    });
    //#endregion
    //#region center light thingy
    const centerLightScale: bsmap.types.Vector3 = [2, 4, 2];
    const rightCenterLightPos: bsmap.types.Vector3 = scaleArray(
        [11.5, 2, -255],
        scaleSizeMult,
    );
    const topCenterLightPos: bsmap.types.Vector3 = scaleArray(
        [2, 11.5, -255],
        scaleSizeMult,
    );
    const bigStuffScale: bsmap.types.Vector3 = [4, 4, 4];
    const rightBigStuffPos: bsmap.types.Vector3 = scaleArray(
        [11.5, 0, -255],
        scaleSizeMult,
    );
    const topBigStuffPos: bsmap.types.Vector3 = scaleArray(
        [0, 11.5, -255],
        scaleSizeMult,
    );
    environment.push(
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
            _position: translatePos(
                posMirrorX(posMirrorY(rightCenterLightPos)),
                posOffset,
            ),
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
            _position: translatePos(
                posMirrorX(posMirrorY(topCenterLightPos)),
                posOffset,
            ),
        },
        {
            _id: regexNeonTubeR,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: centerLightScale,
            _position: translatePos(posMirrorY(topCenterLightPos), posOffset),
        },
    );
    environment.push(
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
        },
    );
    environment.push(
        {
            _id: regexNeonTubeL,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: bigStuffScale,
            _position: translatePos(
                translatePos(posMirrorX(rightBigStuffPos), [
                    0,
                    2.21875 * scaleSizeMult,
                    0,
                ]),
                posOffset,
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
                posOffset,
            ),
        },
    );
    environment.push(
        {
            _id: regexNeonTubeL,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: bigStuffScale,
            _position: translatePos(
                translatePos(rightBigStuffPos, [0, 2.21875 * scaleSizeMult, 0]),
                posOffset,
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
                posOffset,
            ),
        },
    );
    environment.push(
        {
            _id: regexNeonTubeL,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: bigStuffScale,
            _position: translatePos(
                translatePos(topBigStuffPos, [2.21875 * scaleSizeMult, 0, 0]),
                posOffset,
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
                posOffset,
            ),
        },
    );
    environment.push(
        {
            _id: regexNeonTubeL,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _scale: bigStuffScale,
            _position: translatePos(
                translatePos(posMirrorY(topBigStuffPos), [
                    2.21875 * scaleSizeMult,
                    0,
                    0,
                ]),
                posOffset,
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
                translatePos(posMirrorY(topBigStuffPos), [
                    -2.21875 * scaleSizeMult,
                    0,
                    0,
                ]),
                posOffset,
            ),
        },
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
        environment.push(
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: ringScale,
                _position: translatePos(
                    posAddZ(posMirrorX(ringPos), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, -45],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: ringScale,
                _position: translatePos(
                    posAddZ(posMirrorY(posMirrorX(ringPos)), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, -135],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: ringScale,
                _position: translatePos(posAddZ(ringPos, i * ringGap), posOffset),
                _rotation: [0, 0, 45],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: ringScale,
                _position: translatePos(
                    posAddZ(posMirrorY(ringPos), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, 135],
                _lightID: internalIdOffsetType4++,
            },
        );
    }
    for (let i = 0; i < ringCount * ringRepeat; i++) {
        environment.push(
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: outerRingScale,
                _position: translatePos(
                    posAddZ(posMirrorX(outerRingPos), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, -45],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: outerRingScale,
                _position: translatePos(
                    posAddZ(posMirrorY(posMirrorX(outerRingPos)), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, -135],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: outerRingScale,
                _position: translatePos(posAddZ(outerRingPos, i * ringGap), posOffset),
                _rotation: [0, 0, 45],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLightsTube,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: outerRingScale,
                _position: translatePos(
                    posAddZ(posMirrorY(outerRingPos), i * ringGap),
                    posOffset,
                ),
                _rotation: [0, 0, 135],
                _lightID: internalIdOffsetType4++,
            },
        );
    }
    //#endregion
    //#region yeet center light backtop thing
    environment.push({
        _id: regexDoubleColorLaser.replace(/\$$/, '') +
            `(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
        _lookupMethod: 'Regex',
        _active: false,
    });
    //#endregion
    //#region replace with chad backtop thing
    const backTopFarPos: bsmap.types.Vector3 = [
        3.5,
        8.25,
        ringCount * ringGap + ringGap / 1.35,
    ];
    for (let i = 0; i < 5; i++) {
        environment.push(
            {
                _id: i ? regexDoubleColorLaser.replace(/\$$/, '') + `.?\\(${i}\\)$` : regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _position: translatePos(
                    scaleArray(
                        translatePos(posMirrorX(backTopFarPos), [
                            -i * 1.625,
                            -i * 1.625,
                            0,
                        ]),
                        scaleSizeMult,
                    ),
                    translatePos(posOffset, [0, 0, i * ringGap]),
                ),
                _rotation: [12 - i * 8, 180, 348 - i * 8],
            },
            {
                _id: regexDoubleColorLaser.replace(/\$$/, '') + `.?\\(${i + 5}\\)$`,
                _lookupMethod: 'Regex',
                _position: translatePos(
                    scaleArray(
                        translatePos(backTopFarPos, [i * 1.625, -i * 1.625, 0]),
                        scaleSizeMult,
                    ),
                    translatePos(posOffset, [0, 0, i * ringGap]),
                ),
                _rotation: [12 - i * 8, 180, 12 + i * 8],
            },
        );
    }
    for (let i = 0; i < 5; i++) {
        environment.push(
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
                        scaleSizeMult,
                    ),
                    translatePos(posOffset, [0, 0, i * ringGap]),
                ),
                _rotation: [12 - i * 8, 0, 168 - i * 8],
            },
            {
                _id: regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _position: translatePos(
                    scaleArray(
                        translatePos(posMirrorY(backTopFarPos), [
                            i * 1.625,
                            i * 1.625,
                            0,
                        ]),
                        scaleSizeMult,
                    ),
                    translatePos(posOffset, [0, 0, i * ringGap]),
                ),
                _rotation: [12 - i * 8, 0, 192 + i * 8],
            },
        );
    }
    //#endregion
    return environment;
};

export const insertEnvironment = (d: bsmap.v2.DifficultyData) => {
    if (d.customData._environment?.length) {
        bsmap.logger.warn('Environment enhancement previously existed, replacing');
    }
    d.customData._environment = generateEnvironment();
};

import * as bsmap from '../../deno/mod.ts';

export const roadCount = 5;
export const roadRepeat = 4;
export const idOffsetType0 = 101;
export const idOffsetType4 = 101;

export const generateEnvironment = (): bsmap.types.v2.IChromaEnvironment[] => {
    const environment: bsmap.types.v2.IChromaEnvironment[] = [];

    let internalIdOffsetType0 = idOffsetType0;
    let internalIdOffsetType4 = idOffsetType4;
    // road
    const roadGap = 6; // how far between each gap of road
    const roadOffset = 8;

    // extra light
    const extraMirrorLightOffset = roadOffset + roadGap * 2;
    const extraMirrorLightGap = roadGap;
    const extraMirrorLightMirrorOffsetX = 8.8;
    const extraMirrorLightMirrorOffsetY = -4;

    // regex for environment enhancement
    const regexSpectrogram = `(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
    const regexFloor = `\\[\\d+\\]Floor(\\.\\[\\d+\\]FloorSetDepth)?$`;
    const regexConstruction = `\\[\\d+\\]Construction$`;
    const regexNearBuilding = `\\[\\d+\\]NearBuilding(Left|Right)$`;
    const regexBigRingLights =
        `\\[\\d+\\]BigTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]NeonTubeBothSidesDirectional(.?\\(\\d+\\))?$`;
    const regexFrontLights = `\\[\\d+\\]FrontLights.\\[0\\]NeonTube$`;
    const regexDoubleColorLaser = `\\[\\d+\\]DoubleColorLaser$`;
    const regexNeonTubeL = `\\[\\d+\\]NeonTubeDirectionalL$`;
    const regexNeonTubeR = `\\[\\d+\\]NeonTubeDirectionalR$`;
    const regexNeonTubeFL = `\\[\\d+\\]NeonTubeDirectionalFL$`;
    const regexNeonTubeFR = `\\[\\d+\\]NeonTubeDirectionalFR$`;

    // beyond you're on your own
    const posAddY = (posArr: bsmap.types.Vector3, y: number): bsmap.types.Vector3 => {
        const arr: bsmap.types.Vector3 = [...posArr];
        arr[1] += y;
        return arr;
    };
    const posAddZ = (posArr: bsmap.types.Vector3, z: number): bsmap.types.Vector3 => {
        const arr: bsmap.types.Vector3 = [...posArr];
        arr[2] += z;
        return arr;
    };
    const posMirrorX = (posArr: bsmap.types.Vector3): bsmap.types.Vector3 => {
        const arr: bsmap.types.Vector3 = [...posArr];
        arr[0] = -arr[0];
        return arr;
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
            _position: [0, -1, -10],
        },
        {
            _id: regexNearBuilding,
            _lookupMethod: 'Regex',
            _active: false,
        },
    );
    //#endregion
    //#region extra thicc ring
    environment.push({
        _id: regexBigRingLights,
        _lookupMethod: 'Regex',
        _scale: [1, 2, 1],
    });
    //#endregion
    //#region road
    const centerRoadPos: bsmap.types.Vector3 = [1.1875, -2.75, roadOffset];
    const centerRoadScale: bsmap.types.Vector3 = [0.4375, 0.453125, 0.4375];
    const farRoadPos: bsmap.types.Vector3 = [3.5625, -2.15625, roadOffset];
    const farRoadScale: bsmap.types.Vector3 = [0.5, 0.265625, 0.5];
    for (let i = 0; i < roadCount * roadRepeat; i++) {
        environment.push(
            {
                _id: regexFrontLights,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: centerRoadScale,
                _position: posMirrorX(posAddZ(centerRoadPos, i * roadGap)),
                _rotation: [0, 0, -78],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLights,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: centerRoadScale,
                _position: posAddZ(centerRoadPos, i * roadGap),
                _rotation: [0, 0, 78],
                _lightID: internalIdOffsetType4++,
            },
        );
    }
    for (let i = 0; i < roadCount * roadRepeat; i++) {
        environment.push(
            {
                _id: regexFrontLights,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: farRoadScale,
                _position: posMirrorX(posAddZ(farRoadPos, i * roadGap)),
                _rotation: [0, 0, -114],
                _lightID: internalIdOffsetType4++,
            },
            {
                _id: regexFrontLights,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: farRoadScale,
                _position: posAddZ(farRoadPos, i * roadGap),
                _rotation: [0, 0, 114],
                _lightID: internalIdOffsetType4++,
            },
        );
    }
    //#endregion
    //#region road other lights
    const farLaneLightPos: bsmap.types.Vector3 = [4.4375, -1.625, 0];
    const farLaneLightScale: bsmap.types.Vector3 = [2, 1, 2];
    const midLaneLightPos: bsmap.types.Vector3 = [3.5, -2.140625, -255];
    const midLaneLightScale: bsmap.types.Vector3 = [2.5, 4, 2.5];
    const botLaneLightPos: bsmap.types.Vector3 = [3, -3.1015625, -255];
    const botLaneLightScale: bsmap.types.Vector3 = [2, 4, 2];
    const centerLaneLightPos: bsmap.types.Vector3 = [1.125, -2.75, -255];
    const centerLaneLightScale: bsmap.types.Vector3 = [2.5, 4, 2.5];
    environment.push(
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
        },
    );
    //#endregion
    //#region yeet center light backtop thing
    environment.push({
        _id: regexDoubleColorLaser.replace(/\$$/, '') + `(.?\\(\\d+\\))?.\\[\\d+\\](BottomBoxLight|BottomBakedBloom)$`,
        _lookupMethod: 'Regex',
        _active: false,
    });
    //#endregion
    //#region replace with chad backtop thing
    const backTopFarPos: bsmap.types.Vector3 = [2.90625, -3.3125, 96];
    const backTopFarScale: bsmap.types.Vector3 = [1.5, 1, 1.5];
    for (let i = 0; i < 5; i++) {
        environment.push(
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
            },
        );
    }
    //#endregion
    //#region fabled extra light
    const extraMirrorLightPos: bsmap.types.Vector3 = [extraMirrorLightMirrorOffsetX, -1.625, extraMirrorLightOffset];
    const extraMirrorLightScale: bsmap.types.Vector3 = [0.5, 0.5, 0.5];
    for (let i = 0; i < 5; i++) {
        environment.push(
            {
                _id: regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: extraMirrorLightScale,
                _position: posMirrorX(posAddZ(extraMirrorLightPos, i * extraMirrorLightGap)),
                _rotation: [0 + i * 2.5, 0, 320 + i * 11],
                _lightID: internalIdOffsetType0++,
            },
            {
                _id: regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: extraMirrorLightScale,
                _position: posMirrorX(
                    posAddY(posAddZ(extraMirrorLightPos, i * extraMirrorLightGap), extraMirrorLightMirrorOffsetY),
                ),
                _rotation: [0 - i * 2.5, 0, 220 - i * 11],
                _lightID: internalIdOffsetType0++,
            },
            {
                _id: regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: extraMirrorLightScale,
                _position: posAddY(
                    posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                    extraMirrorLightMirrorOffsetY,
                ),
                _rotation: [0 - i * 2.5, 0, 140 + i * 11],
                _lightID: internalIdOffsetType0++,
            },
            {
                _id: regexDoubleColorLaser,
                _lookupMethod: 'Regex',
                _duplicate: 1,
                _scale: extraMirrorLightScale,
                _position: posAddZ(extraMirrorLightPos, i * extraMirrorLightGap),
                _rotation: [0 + i * 2.5, 0, 40 - i * 11],
                _lightID: internalIdOffsetType0++,
            },
        );
    }
    //#endregion
    return environment;
};

export const insertEnvironment = (d: bsmap.v2.DifficultyData) => {
    if (d.customData.environment?.length) {
        bsmap.logger.warn('Environment enhancement previously existed, replacing');
    }
    d.customData._environment = generateEnvironment();
};

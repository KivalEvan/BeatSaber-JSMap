import * as bsmap from '../../deno/mod.ts';

export const generateEnvironment = (): bsmap.types.v2.IChromaEnvironment[] => {
    const environment: bsmap.types.v2.IChromaEnvironment[] = [];

    // regex for environment enhancement
    const regexSpectrogram = `(\\[\\d+\\]Spectrogram(s|\\.|\\d)?)+$`;
    const regexRing = `\\[\\d+\\]Panels4TrackLaneRing\\(Clone\\)$`;
    const regexWindow = `\\[\\d+\\]Window$`;
    const regexTopCone = `\\[\\d+\\]TopCones$`;
    const regexBottomCone = `\\[\\d+\\]BottomCones$`;
    const regexConstGlowLineRing = `\\[\\d+\\]ConstructionGlowLine.?\\(5\\)$`;
    const regexConstGlowLineBacktop = `\\[\\d+\\]ConstructionGlowLine.?\\(7\\)$`;

    //#region helper
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
    const posMirrorY = (posArr: bsmap.types.Vector3): bsmap.types.Vector3 => {
        const arr: bsmap.types.Vector3 = [...posArr];
        arr[1] = -arr[1];
        return arr;
    };
    const translatePos = (posArr: bsmap.types.Vector3, translate = [0, 0, 0]): bsmap.types.Vector3 => {
        const arr: bsmap.types.Vector3 = [...posArr];
        arr[0] += translate[0];
        arr[1] += translate[1];
        arr[2] += translate[2];
        return arr;
    };
    const scaleArray = (posArr: bsmap.types.Vector3, mult = 1): bsmap.types.Vector3 => {
        return posArr.map((elem) => elem * mult) as bsmap.types.Vector3;
    };
    //#endregion

    //#region yeet
    // linux user be like
    environment.push({
        _id: regexWindow,
        _lookupMethod: 'Regex',
        _active: false,
    });
    // remove this if u want window, this is done for cinema-compatibility
    //#endregion
    //#region kone
    environment.push(
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
        },
    );
    //#endregion
    //#region extra thicc ring
    environment.push({
        _id: regexRing,
        _lookupMethod: 'Regex',
        _scale: [4, 4, 1],
    });
    //#endregion
    //#region test
    const posGlowLine1: bsmap.types.Vector3 = [40, 14, 0];
    const posGlowLine2: bsmap.types.Vector3 = [36, 18, 0];
    environment.push(
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
        },
    );
    //#endregion
    //#region test
    const posGlowLine3: bsmap.types.Vector3 = [20, -8, 0];
    environment.push(
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
        },
    );
    //#endregion
    return environment;
};

export const insertEnvironment = (d: bsmap.v2.DifficultyData) => {
    if (d.customData._environment?.length) {
        bsmap.logger.warn('Environment enhancement previously existed, replacing');
    }
    d.customData._environment = generateEnvironment();
};

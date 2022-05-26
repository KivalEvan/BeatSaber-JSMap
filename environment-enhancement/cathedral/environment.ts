import * as bsmap from '../../deno/mod.ts';

export const generateEnvironment = (): bsmap.types.v3.IChromaEnvironment[] => {
    const environment: bsmap.types.v3.IChromaEnvironment[] = [];

    //#region environment declaration stuff
    // regex for environment enhancement
    const regexCube = '\\[\\d+\\]PillarPair.\\[\\d+\\]PillarL.\\[\\d+\\]Pillar$';
    const regexDoor = '\\[\\d+\\]MagicDoorSprite$';
    const regexRingRight = '\\[\\d+\\]PillarTrackLaneRingsR$';
    const regexRingLeft = '\\[\\d+\\]PillarTrackLaneRingsR.?\\(1\\)$';
    const regexSideLaser = '\\[42\\]SideLaser$';
    const regexGlowLine = '\\[\\d+\\]GlowLineL$';
    const regexPillarL = '\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarL$';
    const regexPillarR = '\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarR$';
    const regexSmallPillarL = '\\[\\d+\\]SmallPillarPair\\.\\[\\d+\\]PillarL$';
    const regexSmallPillarR = '\\[\\d+\\]SmallPillarPair\\.\\[\\d+\\]PillarR$';
    const regexCloudGeometry = '\\[\\d+\\]HighCloudsGenerator.\\[\\d+\\]OpaqueGeometry$';

    for (let i = 0; i < 12; i++) {
        environment.push({
            id: regexCloudGeometry,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, 16, -112 + i * 24],
            rotation: [i % 2 ? 270 : 90, 0, 0],
            scale: [
                0.125 + 0.375 * Math.cos(bsmap.utils.degToRad(i * 8)),
                0.25 + Math.random() * 0.375,
                0.125 + 0.375 * Math.cos(bsmap.utils.degToRad(i * 8)),
            ],
        });
    }

    environment.push(
        {
            id: regexCloudGeometry,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, -8, 0],
            rotation: [0, 0, 0],
            scale: [0.75, 0.75, 0.75],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            position: [-96, 0, 128],
            scale: [1, 1, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            position: [96, 0, 128],
            scale: [1, 1, 1],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-128, 0, 64],
            scale: [1, 1, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [128, 0, 64],
            scale: [1, 1, 1],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-48, 0, 192],
            scale: [1, 1, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [48, 0, 192],
            scale: [1, 1, 1],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [10, -6, 128],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-10, -6, 128],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [48, 6, 144],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-48, 6, 144],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
        {
            id: regexRingRight,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [64, 20, 160],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
        {
            id: regexRingLeft,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-64, 20, 160],
            rotation: [0, 180, 45],
            scale: [0.25, 0.25, 1],
        },
    );

    //#region cringe pillar
    for (let i = 0; i < 5; i++) {
        environment.push(
            {
                id: i ? regexPillarL.replace('PillarPair', `PillarPair \\(${i}\\)`) : regexPillarL,
                lookupMethod: 'Regex',
                rotation: [45, 315, 210 - i * 7.5],
                position: [-30, 12, 76 + i * 8],
            },
            {
                id: i ? regexPillarR.replace('PillarPair', `PillarPair \\(${i}\\)`) : regexPillarR,
                lookupMethod: 'Regex',
                rotation: [45, 45, 150 + i * 7.5],
                position: [30, 12, 76 + i * 8],
            },
            {
                id: i ? regexSmallPillarL.replace('PillarPair', `PillarPair \\(${i}\\)`) : regexSmallPillarL,
                lookupMethod: 'Regex',
                rotation: [135, 165, -7.5],
                position: [-24, 28 - i * 2, 74 + i * 8],
            },
            {
                id: i ? regexSmallPillarR.replace('PillarPair', `PillarPair \\(${i}\\)`) : regexSmallPillarR,
                lookupMethod: 'Regex',
                rotation: [135, 195, 7.5],
                position: [24, 28 - i * 2, 74 + i * 8],
            },
        );
    }
    //#endregion

    for (let i = 0; i < 9; i++) {
        const posX = 12;
        const posY = 0;
        const posZ = i * 8 + 16;
        environment.push(
            {
                id: regexSideLaser,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [posX, posY, posZ],
                rotation: [4 + i * 2, 0, 7.5],
            },
            {
                id: regexSideLaser,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-posX, posY, posZ],
                rotation: [4 + i * 2, 0, -7.5],
            },
        );
    }

    //#region everything else
    environment.push(
        {
            id: regexDoor,
            lookupMethod: 'Regex',
            position: [-26.5, 20, 112],
            scale: [0.1875, 0.5, 1],
            rotation: [0, 0, 0],
        },
        {
            id: regexDoor,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-21.5, 20, 112],
            scale: [0.1875, 0.5, 1],
            rotation: [0, 0, 0],
        },
        {
            id: regexDoor,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [21.5, 20, 112],
            scale: [0.1875, 0.5, 1],
            rotation: [0, 0, 0],
        },
        {
            id: regexDoor,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [26.5, 20, 112],
            scale: [0.1875, 0.5, 1],
            rotation: [0, 0, 0],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-4.28125, -0.0625, -512],
            rotation: [90, 0, 0],
            scale: [1.5, 1.5, 1.5],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [4.28125, -0.0625, -512],
            rotation: [90, 0, 0],
            scale: [1.5, 1.5, 1.5],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-5.375, 30.5, 112],
            scale: [0.25, 0.02075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [5.375, 30.5, 112],
            scale: [0.25, 0.02075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-1.375, 30.5, 112],
            scale: [0.25, 0.0175, 0.25],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [1.375, 30.5, 112],
            scale: [0.25, 0.0175, 0.25],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-2.675, 30.5, 112],
            scale: [0.6875, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [2.675, 30.5, 112],
            scale: [0.6875, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-2.675, 28, 112],
            scale: [0.6875, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [2.675, 28, 112],
            scale: [0.6875, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-1.375, 27, 112],
            scale: [0.25, 0.0625, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [1.375, 27, 112],
            scale: [0.25, 0.0625, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, 34.5, 112],
            scale: [0.725, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, 16, 112],
            scale: [0.725, 0.0075, 0.25],
            rotation: [0, 0, 0],
        },
        {
            id: regexSideLaser,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-10, 40, 0],
            scale: [1, 1, 1],
            rotation: [90, 0, 0],
        },
        {
            id: regexSideLaser,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-4, 48, 0],
            scale: [1, 1, 1],
            rotation: [90, 0, 0],
        },
        {
            id: regexSideLaser,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [4, 48, 0],
            scale: [1, 1, 1],
            rotation: [90, 0, 0],
        },
        {
            id: regexSideLaser,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [10, 40, 0],
            scale: [1, 1, 1],
            rotation: [90, 0, 0],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-26, 10, -512],
            scale: [1.5, 1.5, 1.5],
            rotation: [90, 0, 0],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-27.5, 8, -512],
            scale: [1.5, 1.5, 1.5],
            rotation: [90, 0, 0],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [26, 10, -512],
            scale: [1.5, 1.5, 1.5],
            rotation: [90, 0, 0],
        },
        {
            id: regexGlowLine,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [27.5, 8, -512],
            scale: [1.5, 1.5, 1.5],
            rotation: [90, 0, 0],
        },
    );
    //#endregion

    //#region za base
    environment.push(
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-18.2, 0, 48],
            scale: [4.75, 0.00075, 22],
            rotation: [0, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [18.2, 0, 48],
            scale: [4.75, 0.00075, 22],
            rotation: [0, 0, 0],
        },
    );
    //#endregion

    //#region za wall
    environment.push(
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 16 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 16 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 16 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 16 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 48 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 48 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 48 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 48 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 80 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 80 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 80 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 80 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 112 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 112 - (1 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 4, 112 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 4, 112 - (2 / 3) * 32],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [16 - (3 / 4) * 32, 4, -16],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [16 - (1 / 4) * 32, 4, -16],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 0, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 0, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 3.625, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 3.625, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 27.375, 48],
            scale: [0.125, 0.0025, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 27.375, 48],
            scale: [0.125, 0.0025, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-32, 31.5, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [32, 31.5, 48],
            scale: [0.125, 0.005, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, 27.375, -16],
            scale: [11, 0.0025, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [0, 31.5, -16],
            scale: [11, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-16, 0, 48],
            scale: [0.125, 0.001, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [16, 0, 48],
            scale: [0.125, 0.001, 22],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-17.8125, 3.625, -16],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [17.8125, 3.625, -16],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-17.8125, 0, -16],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [17.8125, 0, -16],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-4.7, 0, -16],
            scale: [0.125, 0.075, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [4.7, 0, -16],
            scale: [0.125, 0.075, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-4.7, 13.9375, -16],
            scale: [0.125, 0.02, 0.125],
            rotation: [180, 0, 30],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [4.7, 13.9375, -16],
            scale: [0.125, 0.02, 0.125],
            rotation: [180, 0, 330],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-3, 17, -16],
            scale: [0.125, 0.01975, 0.125],
            rotation: [180, 0, 60],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [3, 17, -16],
            scale: [0.125, 0.01975, 0.125],
            rotation: [180, 0, 300],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-17.8125, 3.625, 112],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [17.8125, 3.625, 112],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-17.8125, 0, 112],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [17.8125, 0, 112],
            scale: [4.375, 0.005, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-4.7, 0, 112],
            scale: [0.125, 0.0375, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [4.7, 0, 112],
            scale: [0.125, 0.0375, 0.125],
            rotation: [180, 0, 0],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-3, 6, 112],
            scale: [0.125, 0.075, 0.125],
            rotation: [180, 0, 300],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [3, 6, 112],
            scale: [0.125, 0.075, 0.125],
            rotation: [180, 0, 60],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [-3, 5.875, 112],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 330],
        },
        {
            id: regexCube,
            lookupMethod: 'Regex',
            duplicate: 1,
            position: [3, 5.875, 112],
            scale: [0.125, 0.125, 0.125],
            rotation: [180, 0, 30],
        },
    );
    //#endregion

    const createPillar = (x: number, z: number) => {
        for (let i = 0; i < 4; i++) {
            const rotationAmount = 180 / 4;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 0.75, z],
                scale: [0.75, 0.0175, 0.3105],
                rotation: [180, i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 4; i++) {
            const rotationAmount = 180 / 4;
            environment.push(
                {
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [x, 0, z],
                    scale: [0.84375, 0.005, 0.3493125],
                    rotation: [180, rotationAmount / 2 + i * rotationAmount, 0],
                },
                {
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [x, 3.625, z],
                    scale: [0.84375, 0.005, 0.3493125],
                    rotation: [180, rotationAmount / 2 + i * rotationAmount, 0],
                },
                {
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [x, 3, z],
                    scale: [0.75, 0.005, 0.3105],
                    rotation: [180, rotationAmount / 2 + i * rotationAmount, 0],
                },
            );
        }
        for (let i = 0; i < 8; i++) {
            const rotationAmount = 180 / 8;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 4, z],
                scale: [0.6, 0.125, 0.4],
                rotation: [180, i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 4; i++) {
            const rotationAmount = 180 / 4;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 27.375, z],
                scale: [0.75, 0.0025, 0.3105],
                rotation: [180, rotationAmount / 2 + i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 8; i++) {
            const rotationAmount = 180 / 4;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 27.8125, z],
                scale: [0.25, 0.015, 0.625],
                rotation: [165, i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 4; i++) {
            const rotationAmount = 180 / 4;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 30, z],
                scale: [0.75, 0.01, 0.3105],
                rotation: [180, i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 4; i++) {
            const rotationAmount = 180 / 4;
            environment.push({
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [x, 31.5, z],
                scale: [0.84375, 0.005, 0.3493125],
                rotation: [180, i * rotationAmount, 0],
            });
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let xShift!: number;
                let zShift!: number;
                if (i === 0) {
                    xShift = 0;
                    zShift = -1;
                }
                if (i === 1) {
                    xShift = -1;
                    zShift = 0;
                }
                if (i === 2) {
                    xShift = 0;
                    zShift = 1;
                }
                if (i === 3) {
                    xShift = 1;
                    zShift = 0;
                }
                const rotationAmount = 360 / 4;
                environment.push({
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [
                        x +
                        Math.sin(bsmap.utils.degToRad(90 + 160 - j * 12)) *
                            37.5 *
                            xShift +
                        xShift * 36.125,
                        15 + Math.sin(bsmap.utils.degToRad(160 - j * 12)) * 50,
                        z +
                        Math.sin(bsmap.utils.degToRad(90 + 160 - j * 12)) *
                            37.5 *
                            zShift +
                        zShift * 36.125,
                    ],
                    scale: [0.3125, 0.0575, 0.3125],
                    rotation: [160 - j * 12, i * rotationAmount, 0],
                });
            }
        }
    };
    const createChair = (x: number, z: number) => {
        environment.push(
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [0 + x, 0.75, 0 + z],
                scale: [0.75, 0.0005, 0.15625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [0 + x, 1, -0.4375 + z],
                scale: [0.75, 0.00375, 0.015625],
                rotation: [165, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-2.125 + x, 0, -0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-2.125 + x, 0, 0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [0 + x, 0, -0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [0 + x, 0, 0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [2.125 + x, 0, -0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [2.125 + x, 0, 0.375 + z],
                scale: [0.015625, 0.004, 0.015625],
                rotation: [180, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-2.125 + x, 0.75, -0.4375 + z],
                scale: [0.015625, 0.006, 0.015625],
                rotation: [168, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [0 + x, 0.75, -0.4375 + z],
                scale: [0.015625, 0.0055, 0.015625],
                rotation: [168, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [2.125 + x, 0.75, -0.4375 + z],
                scale: [0.015625, 0.006, 0.015625],
                rotation: [168, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-2.125 + x, 0.75, 0.25 + z],
                scale: [0.015625, 0.003, 0.015625],
                rotation: [168, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [2.125 + x, 0.75, 0.25 + z],
                scale: [0.015625, 0.003, 0.015625],
                rotation: [168, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [-2.125 + x, 1.28125, 0.1875 + z],
                scale: [0.015625, 0.00375, 0.015625],
                rotation: [90, 0, 0],
            },
            {
                id: regexCube,
                lookupMethod: 'Regex',
                duplicate: 1,
                position: [2.125 + x, 1.28125, 0.1875 + z],
                scale: [0.015625, 0.00375, 0.015625],
                rotation: [90, 0, 0],
            },
        );
    };

    createPillar(16, -16);
    createPillar(-16, -16);
    createPillar(16, 16);
    createPillar(-16, 16);
    createPillar(16, 48);
    createPillar(-16, 48);
    createPillar(16, 80);
    createPillar(-16, 80);
    createPillar(16, 112);
    createPillar(-16, 112);
    createPillar(32, -16);
    createPillar(-32, -16);
    createPillar(32, 16);
    createPillar(-32, 16);
    createPillar(32, 48);
    createPillar(-32, 48);
    createPillar(32, 80);
    createPillar(-32, 80);
    createPillar(32, 112);
    createPillar(-32, 112);

    for (let z = 0; z < 15; z++) {
        createChair(-11, -2 + z * 5);
        createChair(-6.5, -2 + z * 5);
        createChair(6.5, -2 + z * 5);
        createChair(11, -2 + z * 5);
    }

    //floor
    for (let x = 0; x < 18; x++) {
        for (let z = 0; z < 10; z++) {
            environment.push(
                {
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [
                        -4.875 - x * 0.625,
                        -0.1 + bsmap.utils.random(0, 0.1),
                        (x % 2 ? -8 : 0) + 6 * z,
                    ],
                    scale: [0.125, 0.0005, 22 / 8 + bsmap.utils.random(0, 0.25)],
                    rotation: [180, 0, 0],
                },
                {
                    id: regexCube,
                    lookupMethod: 'Regex',
                    duplicate: 1,
                    position: [
                        4.875 + x * 0.625,
                        -0.1 + bsmap.utils.random(0, 0.1),
                        (x % 2 ? -8 : 0) + 6 * z,
                    ],
                    scale: [0.125, 0.0005, 22 / 8 + bsmap.utils.random(0, 0.25)],
                    rotation: [180, 0, 0],
                },
            );
        }
    }
    //#endregion

    return environment.map((e) => {
        if (e.position) {
            e.position = e.position.map((n) => n * 0.6) as typeof e.position;
        }
        if (e.localPosition) {
            e.localPosition = e.localPosition.map(
                (n) => n * 0.6,
            ) as typeof e.localPosition;
        }
        return e;
    });
};

export const insertEnvironment = (d: bsmap.v3.DifficultyData) => {
    if (d.customData.environment?.length) {
        bsmap.logger.warn('Environment enhancement previously existed, replacing');
    }
    d.customData.environment = generateEnvironment();
};

// holy shit image are so tedious to work with and optimise
// i forgor to do helper function, oh well
import * as bsmap from '../../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@1.2.9/mod.ts';
import { dirname } from 'https://deno.land/std@0.122.0/path/mod.ts';

const WORKING_DIRECTORY = dirname(Deno.mainModule).replace('file:///', '') + '/'; // for some reason deno doesnt like to deal with file:///
const MAP_DIRECTORY =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/';
const INPUT_FILE = MAP_DIRECTORY + 'EasyLightshow.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.readMapSync(INPUT_FILE);
// const info = bsmap.readInfoSync(FOLDER_PATH + 'Info.dat');
// const BPM = bsmap.bpm.create(info._beatsPerMinute);

difficulty._version = '2.5.0';
difficulty._customData = difficulty._customData ?? {};
difficulty._customData._environment = [];
difficulty._events = [];
const _environment = difficulty._customData._environment;
const _events = difficulty._events;

//#region environment and events order declaration stuff
let itFrame = 0;
const backtopOrder = [1, 3, 5, 6, 4, 2];
const roadOrder: number[] = [
    24, 21, 39, 44, 65, 48, 76, 42, 30, 28, 36, 53, 60, 45, 17, 34, 43, 41, 23, 15, 49,
    37, 26, 47, 68, 66, 40, 77, 19, 62, 50, 67, 64, 46, 74, 71, 78, 69, 57, 72, 29, 54,
    56, 75, 33, 63, 70, 55, 73, 79, 51, 38, 59, 16, 31, 32, 52, 61, 58, 80, 35, 27, 7,
    6, 22, 14, 12, 9, 8, 5, 25, 18, 11, 10, 13, 20,
];
const roadShuffle = [...roadOrder];

// regex for environment enhancement
const regexConstruction = `Environment\.\\[\\d+\\]Construction$`;
const regexTentacleLeft = `\\[\\d+\\]TentacleLeft$`;
const regexTentacleRight = `\\[\\d+\\]TentacleRight$`;
const regexGlowTopLine = `\\[\\d+\\]GlowTopLine$`;
const regexGlowLine = `\\[\\d+\\]GlowLine$`;
const regexGlowLineL = `\\[\\d+\\]GlowLineLVisible$`;
const regexGlowLineR = `\\[\\d+\\]GlowLineRVisible$`;
const regexLaser = `Environment.\\[\\d+\\]Laser$`;
const regexRotatingLasersPair = `\\[\\d+\\]RotatingLasersPair$`;
_environment.push({
    _id: '\\[\\d+\\]FloorMirror$',
    _lookupMethod: 'Regex',
    _active: false,
});
_environment.push({
    _id: regexTentacleLeft,
    _lookupMethod: 'Regex',
    _position: [-10, 7, 48],
});
_environment.push({
    _id: regexTentacleRight,
    _lookupMethod: 'Regex',
    _position: [10, 7, 48],
});

let offsetLightID = 100;
const screenLight: { [key: number]: number } = {};
const screenX = 32;
const screenY = 18;
const screenXOffset = 0;
const screenYOffset = 18;
const screenSize = 0.4;
const screenGap = 0;
const screenStartID = offsetLightID + 1;
const screenEndID = offsetLightID + screenX * screenY;
for (let y = 0; y < screenY; y++) {
    for (let x = 0; x < screenX; x++) {
        const posX =
            screenXOffset +
            -(((screenX - 1) / 2) * screenSize) +
            x * (screenSize + screenGap);
        const posY =
            screenYOffset +
            -((screenY / 2) * screenSize) -
            y * (screenSize + screenGap);
        const posZ = 32 - Math.tan(345 * (Math.PI / 180)) * screenSize * y;
        _environment.push({
            _id: regexGlowLine,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [345, 0, 0],
            _scale: [48 / 8, 2 / 8, 1],
            _lightID: ++offsetLightID,
        });
        screenLight[offsetLightID] = 0;
    }
}
const screenClear = (time: number, fade = 0) => {
    const lightID: number[] = [];
    const colorID: { [key: string]: number[] } = {};
    for (const i in screenLight) {
        if (screenLight[i]) {
            lightID.push(parseInt(i));
            if (!colorID[screenLight[i]]) {
                colorID[screenLight[i]] = [parseInt(i)];
            } else {
                colorID[screenLight[i]].push(parseInt(i));
            }
            screenLight[i] = 0;
        }
    }
    if (fade) {
        for (const color in colorID) {
            _events.push({
                _time: time,
                _type: 4,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    }
    _events.push({
        _time: time + fade,
        _type: 4,
        _value: fade ? 4 : 0,
        _floatValue: 0,
        _customData: { _lightID: lightID },
    });
};
const centerOrder = [
    screenEndID + 1,
    screenEndID + 2,
    1,
    2,
    screenEndID + 3,
    screenEndID + 4,
];

for (let i = 0, offset = 0; i < 77; i++) {
    if (i === 26) {
        offset++;
        continue;
    }
    const posZ = 1.75 + (i - offset) * 1.25 + Math.random() * 0.5;
    _environment.push({
        _id: i ? regexGlowLine.replace('$', ` \\(${i}\\)$`) : regexGlowLine,
        _lookupMethod: 'Regex',
        _position: [
            (i - offset) % 2
                ? 0.5 + Math.random() * 0.5 + (i - offset) / 48
                : -(0.5 + Math.random() * 0.5 + (i - offset) / 48),
            -0.25,
            posZ,
        ],
        _scale: i - offset ? [1, 1.25 + Math.random() * 0.75, 1] : [1, 1, 1],
        _rotation: [0, 0, (i - offset) % 2 ? 90 : -90],
    });
}
for (let i = 0; i < 5; i++) {
    _environment.push({
        _id: i ? regexGlowTopLine.replace('$', ` \\(${i}\\)$`) : regexGlowTopLine,
        _lookupMethod: 'Regex',
        _position: [-20 + i * 10, i % 2 ? 16 : 20, 7.5],
    });
}
for (let i = 0; i < 7; i++) {
    const id = i
        ? regexRotatingLasersPair.replace('$', ` \\(${i}\\)$`)
        : regexRotatingLasersPair;
    _environment.push(
        {
            _id: id.replace('$', '\\.\\[\\d+\\]BaseL$'),
            _lookupMethod: 'Regex',
            _position: [-8 - i * 4, -2.5, 64 + i * 4],
        },
        {
            _id: id.replace('$', '\\.\\[\\d+\\]BaseR$'),
            _lookupMethod: 'Regex',
            _position: [8 + i * 4, -2.5, 64 + i * 4],
        },
        {
            _id: id.replace('$', '\\.\\[\\d+\\]BaseL\\.\\[\\d+\\]Laser$'),
            _lookupMethod: 'Regex',
            _rotation: [60 + i * 4, -135 - i * 5, 0],
        },
        {
            _id: id.replace('$', '\\.\\[\\d+\\]BaseR\\.\\[\\d+\\]Laser$'),
            _lookupMethod: 'Regex',
            _rotation: [60 + i * 4, 135 + i * 5, 0],
        }
    );
}
for (let i = 0; i < 6; i++) {
    const fixed = i <= 2 ? i + 2 : i + 4;
    _environment.push({
        _id: fixed ? regexLaser.replace('$', ` \\(${fixed}\\)$`) : regexLaser,
        _lookupMethod: 'Regex',
        _position: [
            (i > 2 ? -1 : 1) * (8 + (i > 2 ? i - 3 : i) * 3),
            -3,
            48 - (i > 2 ? i - 3 : i) * 3,
        ],
        _rotation: [0, 0, 0],
    });
}
_environment.push(
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _position: [0, 6.5, 22.5],
    },
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [-18, -4, 18],
        _rotation: [0, 315, 180],
    },
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [18, -4, 18],
        _rotation: [0, 45, 180],
    },
    {
        _id: regexGlowLineL,
        _lookupMethod: 'Regex',
        _position: [-3.3125, 6.5, 35],
        _rotation: [180, 0, 0],
    },
    {
        _id: regexGlowLineR,
        _lookupMethod: 'Regex',
        _position: [3.3125, 6.5, 35],
        _rotation: [180, 0, 0],
    },
    {
        _id: regexGlowLineL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [-29.1875, -3.875, 24.46875],
        _rotation: [0, 45, 0],
        _lightID: ++offsetLightID,
    },
    {
        _id: regexGlowLineR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [-24.421875, -3.875, 29.171875],
        _rotation: [0, 45, 0],
        _lightID: ++offsetLightID,
    },
    {
        _id: regexGlowLineL,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [24.421875, -3.875, 29.171875],
        _rotation: [0, 45, 0],
        _lightID: ++offsetLightID,
    },
    {
        _id: regexGlowLineR,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _position: [29.1875, -3.875, 24.46875],
        _rotation: [0, 45, 0],
        _lightID: ++offsetLightID,
    },
    // {
    //     _id: regexGlowLineBoxLight,
    //     _lookupMethod: 'Regex',
    //     _scale: [4.125, 2.5, 0.03125],
    //     _position: [
    //         0,
    //         screenYOffset +
    //             1 +
    //             -(((screenY + 1) / 2) * screenSize) -
    //             (screenY / 2 + 1) * (screenSize + screenGap),
    //         32 - Math.tan(345 * (Math.PI / 180)) * screenSize * (screenY / 2),
    //     ],
    //     _rotation: [345, 0, 0],
    // },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [-3, -10, 22.5],
        _rotation: [285, 0, 180],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [3, -10, 22.5],
        _rotation: [285, 0, 180],
    },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [-25, -12.5, 44],
        _rotation: [285, 180, 180],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [25, -12.5, 44],
        _rotation: [285, 180, 180],
    },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [-17.5, -17.5, 42],
        _rotation: [292.5, 180, 180],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [17.5, -17.5, 42],
        _rotation: [292.5, 180, 180],
    },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [-19, -1, 45],
        _rotation: [0, 180, 180],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [19, -1, 45],
        _rotation: [0, 180, 180],
    },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [-24, 2, 50],
        _rotation: [0, 150, 315],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _active: true,
        _position: [24, 2, 50],
        _rotation: [0, 210, 45],
    }
);
//#endregion

//#region piano intro
_events.push(
    {
        _type: 12,
        _time: 4,
        _value: 0,
        _floatValue: 1,
    },
    {
        _type: 13,
        _time: 4,
        _value: 0,
        _floatValue: 1,
    }
);
const introPianoOrder = [3, 6, 5, 3, 5, 7, 6, 3, 1, 2, 3, 6, 4, 6, 4, 6];
for (let i = 0, paino = 0, painoFlip = false; i < 2; i++) {
    for (const ipo of introPianoOrder) {
        if (ipo < 4) {
            _events.push({
                _time: 4 + paino * 0.5 + i * 8,
                _type: painoFlip ? 2 : 3,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: [(4 - ipo) * 2, (4 - ipo) * 2 + 1] },
            });
        } else if (ipo === 4) {
            _events.push(
                {
                    _time: 4 + paino * 0.5 + i * 8,
                    _type: painoFlip ? 2 : 3,
                    _value: 7,
                    _floatValue: 1,
                    _customData: { _lightID: 1 },
                },
                {
                    _time: 4 + paino * 0.5 + i * 8,
                    _type: painoFlip ? 3 : 2,
                    _value: 7,
                    _floatValue: 1,
                    _customData: { _lightID: 1 },
                }
            );
        } else {
            _events.push({
                _time: 4 + paino * 0.5 + i * 8,
                _type: painoFlip ? 3 : 2,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: [(ipo - 4) * 2, (ipo - 4) * 2 + 1] },
            });
        }
        paino++;
    }
    paino = 0;
    painoFlip = !painoFlip;
}
_events.push(
    {
        _type: 12,
        _time: 19,
        _value: 1,
        _floatValue: 1,
    },
    {
        _type: 13,
        _time: 19,
        _value: 1,
        _floatValue: 1,
    },
    {
        _type: 12,
        _time: 20,
        _value: 0,
        _floatValue: 1,
    },
    {
        _type: 13,
        _time: 20,
        _value: 0,
        _floatValue: 1,
    }
);
for (let i = 1; i <= 7; i++) {
    _events.push(
        {
            _type: 2,
            _time: 19 + i / 10,
            _value: 3,
            _floatValue: 1,
            _customData: { _lightID: i },
        },
        {
            _type: 3,
            _time: 19 + i / 10,
            _value: 3,
            _floatValue: 1,
            _customData: { _lightID: i },
        }
    );
}
//#endregion

const piano2Notething = [5, 21, 37, 53, 69, 325, 341, 357, 373, 517];
for (const pnt of piano2Notething) {
    for (let i = 0; i < (pnt === 517 ? 4 : pnt === 373 ? 6 : 7); i++) {
        for (let j = 0; j < 3; j++) {
            _events.push(
                {
                    _time: pnt + j * 0.125 + i * 2,
                    _type: 0,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: [backtopOrder[j], backtopOrder[5 - j]] },
                },
                {
                    _time: pnt + 0.5 + j * 0.125 + i * 2,
                    _type: 0,
                    _value: 3,
                    _floatValue: 1,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                }
            );
        }
        if (pnt >= 325) {
            _events.push(
                {
                    _time: pnt - 1 + i * 2,
                    _type: 2,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: i < 6 ? [1, 2] : [2, 3] },
                },
                {
                    _time: pnt - 1 + i * 2,
                    _type: 3,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: i < 6 ? [1, 2] : [2, 3] },
                },
                {
                    _time: pnt - 0.5 + i * 2,
                    _type: 2,
                    _value: 3,
                    _floatValue: 1,
                    _customData: {
                        _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                    },
                },
                {
                    _time: pnt - 0.5 + i * 2,
                    _type: 3,
                    _value: 3,
                    _floatValue: 1,
                    _customData: {
                        _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                    },
                }
            );
            if (i >= 6) {
                for (let j = 0; j < 2; j++) {
                    _events.push(
                        {
                            _time: pnt + 1 + i * 2 + j,
                            _type: 2,
                            _value: 3,
                            _floatValue: 1,
                            _customData: { _lightID: [3 - j, 4 - j] },
                        },
                        {
                            _time: pnt + 1 + i * 2 + j,
                            _type: 3,
                            _value: 3,
                            _floatValue: 1,
                            _customData: { _lightID: [3 - j, 4 - j] },
                        },
                        {
                            _time: pnt + 1.5 + i * 2 + j,
                            _type: 2,
                            _value: 3,
                            _floatValue: 1,
                            _customData: {
                                _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                            },
                        },
                        {
                            _time: pnt + 1.5 + i * 2 + j,
                            _type: 3,
                            _value: 3,
                            _floatValue: 1,
                            _customData: {
                                _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                            },
                        }
                    );
                }
            }
        }
    }
}

const introSynthOrder = [
    [3, 4],
    [2, 3],
    [1, 2],
    [1, 2],
    [4, 5],
    [3, 4],
    [1, 2],
    [1, 2],
    [5, 6],
    [4, 5],
    [2, 3],
    [2, 3],
    [6, 7],
    [5, 6],
    [3, 4],
    [3, 4],
    [3, 4],
    [2, 3],
    [1, 2],
    [1, 2],
    [4, 5],
    [3, 4],
    [1, 2],
    [1, 2],
    [5, 6],
    [4, 5],
    [2, 3],
    [2, 3],
    [6, 7],
    [6, 7],
    [4, 5],
    [5, 6],
];
for (let i = 0; i < 4; i++) {
    let t = 0;
    for (const iso of introSynthOrder) {
        _events.push(
            {
                _type: 2,
                _time: 20 + t * 0.5 + i * 16,
                _value: 7,
                _floatValue: 1,
                _customData: {
                    _lightID: iso,
                },
            },
            {
                _type: 3,
                _time: 20 + t * 0.5 + i * 16,
                _value: 7,
                _floatValue: 1,
                _customData: {
                    _lightID: iso,
                },
            }
        );
        t++;
        if (i === 3 && t === 28) {
            break;
        }
    }
}
const introVocalTiming: [number, number?][] = [
    [0],
    [0.5],
    [1],
    [2],
    [3],
    [3.5],
    [4.5],
    [5],
    [5.5],
    [6],
    [6.5],
    [8.5],
    [9],
    [9.5],
    [10],
    [10.5],
    [11],
    [13],
    [13.5, 0.625],
    [14.5, 0.75],
    [16],
    [17],
    [18],
    [18.5],
    [19],
    [20],
    [20.5],
    [21],
    [21.5, 0.625],
    [22.5, 0.75],
    [24.5],
    [25],
    [25.5],
    [26],
    [26.5],
    [27, 0.625],
    [28],
    [28.5],
    [29],
    [29.5, 0.75],
    [30.5, 1],
];
for (const ivt of introVocalTiming) {
    const t = ivt[0];
    if (!ivt[1]) {
        _events.push(
            {
                _type: 4,
                _time: 19 + t,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: [1, 2] },
            },
            {
                _type: 4,
                _time: 19.25 + t,
                _value: 0,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            }
        );
    } else {
        for (let i = 0; i < ivt[1]; i += 0.125)
            _events.push(
                {
                    _type: 4,
                    _time: 19 + t + i,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 19.0625 + t + i,
                    _value: 0,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
    }
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'smile.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 11;
    const yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push(
                {
                    _type: 4,
                    _time: 2,
                    _value: 0,
                    _floatValue: 0,
                    _customData: {
                        _lightID: colorID[color],
                    },
                },
                {
                    _type: 4,
                    _time: 4,
                    _value: 4,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                }
            );
        }
    });
    screenClear(19);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'smileglitch.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 19.0625,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(19.125);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'smile.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 11;
    const yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 19.1875,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(19.25);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'clock.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 20,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    for (let i = 0; i < 2; i++) {
        screenClear(22 + i * 0.5);
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: 22.125 + i * 0.5,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    screenClear(23, 0.5);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'forever.gif');
    const img = await imagescript.GIF.decode(image);
    const xOffset = 0;
    const yOffset = 0;
    itFrame = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push(
                {
                    _type: 4,
                    _time: 23.5 + (itFrame / (img.length - 1)) * 1.5,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                },
                {
                    _type: 4,
                    _time: 25.25,
                    _value: 8,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                },
                {
                    _type: 4,
                    _time: 26.5,
                    _value: 8,
                    _floatValue: 0,
                    _customData: {
                        _lightID: colorID[color],
                    },
                }
            );
        }
        itFrame++;
    });
    screenClear(26.75);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'hourglass.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        for (let y = -3; y < Math.min(img.height, screenY); y++) {
            const colorID: { [key: string]: number[] } = {};
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const fixedY = x % 2 ? y + 3 : y;
                if (fixedY < 0 || fixedY >= Math.min(img.height, screenY)) {
                    continue;
                }
                const pos = screenStartID + screenX * (fixedY + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, fixedY + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: 29 - (y + 3) / screenY,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        }
    });
    for (let i = 0; i < 4; i++) {
        _events.push({
            _type: 4,
            _time: 29.25 + i * 0.375,
            _value: 3,
            _floatValue: 1,
            _customData: {
                _lightID: screenStartID + screenX * 7 + 4 + i * 4 + (i > 1 ? 11 : 0),
            },
        });
    }
    screenClear(31, 0.5);
}
{
    let image = Deno.readFileSync(WORKING_DIRECTORY + 'frown.gif');
    let img = await imagescript.GIF.decode(image, true);
    let xOffset = 11;
    let yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push(
                {
                    _type: 4,
                    _time: 31.9375,
                    _value: 0,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                },
                {
                    _type: 4,
                    _time: 32,
                    _value: 4,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                }
            );
        }
    });
    screenClear(34.25);
    image = Deno.readFileSync(WORKING_DIRECTORY + 'frownglitch.gif');
    img = await imagescript.GIF.decode(image, true);
    xOffset = 0;
    yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 34.3125,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(34.375);
    image = Deno.readFileSync(WORKING_DIRECTORY + 'frown.gif');
    img = await imagescript.GIF.decode(image, true);
    xOffset = 11;
    yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 34.4375,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(34.5, 0.5);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'i.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 35,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(35.75);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'iglitch.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 35.8125,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(35.875);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'noentry.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 36,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(36.75);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'noentryglitch.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 36.8125,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(36.875);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'grip.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 37.5,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(37.5625);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'grip.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 37.625,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(38.5);
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'but.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 39,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(39.375);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'i.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 39.5,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(39.875);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'noentry.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 40,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(40.375);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'let.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 40.5,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(41.375);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'go.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 41.5,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(42, 0.5);
}

for (let i = 0; i < 7; i++) {
    if (i === 3) {
        _events.push(
            {
                _time: 52 + i * 4,
                _type: 4,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 53 + i * 4,
                _type: 4,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: [1, 2] },
            }
        );
        for (let j = 0; j < 5; j++) {
            _events.push(
                {
                    _time: 54 + i * 4 + j * 0.125,
                    _type: 4,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _time: 54.0625 + i * 4 + j * 0.125,
                    _type: 4,
                    _value: 0,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        }
        continue;
    }
    _events.push(
        {
            _time: 53 + i * 4,
            _type: 4,
            _value: 3,
            _floatValue: 1,
            _customData: { _lightID: [1, 2] },
        },
        {
            _time: 53.375 + i * 4,
            _type: 4,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1, 2] },
        }
    );
    for (let j = 0; j < 5; j++) {
        _events.push(
            {
                _time: 53.5 + i * 4 + j * 0.125,
                _type: 4,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 53.5625 + i * 4 + j * 0.125,
                _type: 4,
                _value: 0,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 54.5 + i * 4 + j * 0.125,
                _type: 4,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 54.5625 + i * 4 + j * 0.125,
                _type: 4,
                _value: 0,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            }
        );
    }
    if (i === 6) {
        for (let j = 0; j < 16; j++) {
            _events.push(
                {
                    _time: 56 + i * 4 + j * 0.125,
                    _type: 4,
                    _value: 3,
                    _floatValue: 1.25 - i / 24,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _time: 56.0625 + i * 4 + j * 0.125,
                    _type: 4,
                    _value: 0,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        }
    }
    if (i === 0 || i === 1 || i === 4 || i === 5) {
        for (const x in roadOrder) {
            _events.push({
                _time: 52 + (parseInt(x) / roadOrder.length) * 0.75 + i * 4,
                _type: 4,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: roadOrder[x] },
            });
        }
    }
    if (i === 0 || i === 1) {
        let image = Deno.readFileSync(WORKING_DIRECTORY + 'why.gif');
        let img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: 52 + i * 4,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
        screenClear(52.75 + i * 4);
        image = Deno.readFileSync(WORKING_DIRECTORY + 'whyglitch.gif');
        img = await imagescript.GIF.decode(image, true);
        for (let j = 0; j < 2; j++) {
            img.forEach((frame) => {
                if (j) {
                    frame.invert();
                    frame.rotate(180);
                }
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: 52.8125 + i * 4 + j / 8,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(52.875 + i * 4 + j / 8);
        }
    }

    if (i === 4 || i === 5) {
        let image = Deno.readFileSync(WORKING_DIRECTORY + 'please.gif');
        let img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: 52 + i * 4,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
        screenClear(52.75 + i * 4);
        image = Deno.readFileSync(WORKING_DIRECTORY + 'pleaseglitch.gif');
        img = await imagescript.GIF.decode(image, true);
        for (let j = 0; j < 2; j++) {
            img.forEach((frame) => {
                if (j) {
                    frame.invert();
                    frame.rotate(180);
                }
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: 52.8125 + i * 4 + j / 8,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(52.875 + i * 4 + j / 8);
        }
    }
    if (i === 2 || i === 6) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            _events.push({
                _time: 52 + (parseInt(x) / roadShuffle.length) * 1.5 + i * 4,
                _type: 4,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: roadShuffle[x] },
            });
        }
    }
    for (let j = 0; j < 3; j++) {
        _events.push({
            _time: 52 + i * 4 + j * 0.25,
            _type: 4,
            _value: 7,
            _floatValue: 1,
            _customData: { _lightID: [centerOrder[2 - j], centerOrder[j + 3]] },
        });
    }
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'qma.gif');
    const img = await imagescript.GIF.decode(image);
    const xOffset = 0;
    const yOffset = 0;
    itFrame = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 54.5 + (itFrame / (img.length - 1)) * 1,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
        screenClear(54.6875 + (itFrame / (img.length - 1)) * 1);
        itFrame++;
    });
}
for (let i = 0; i < 2; i++) {
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'view.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 59 + i * 0.25,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(59.125 + i * 0.25);
}
{
    const prevColor: { [key: string]: number[] } = {};
    for (let y = 0; y < screenY; y++) {
        for (let x = 0; x < screenX; x++) {
            const pos = screenStartID + screenX * y + x;
            if (!prevColor[screenLight[pos]]) {
                prevColor[screenLight[pos]] = [pos];
            } else {
                prevColor[screenLight[pos]].push(pos);
            }
        }
    }
    for (const color in prevColor) {
        _events.push({
            _type: 4,
            _time: 60,
            _value: 1,
            _floatValue: parseInt(color) / 255,
            _customData: {
                _lightID: prevColor[color],
            },
        });
    }
}
itFrame = 0;
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + `/gradienth.gif`);
    const img = await imagescript.GIF.decode(image);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 60.25 + itFrame * 0.25,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
        itFrame++;
    });
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'see.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 65,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(66.5, 0.5);
}

{
    const prevColor: { [key: string]: number[] } = {};
    for (let y = 0; y < screenY; y++) {
        for (let x = 0; x < screenX; x++) {
            const pos = screenStartID + screenX * y + x;
            if (!prevColor[screenLight[pos]]) {
                prevColor[screenLight[pos]] = [pos];
            } else {
                prevColor[screenLight[pos]].push(pos);
            }
        }
    }
    for (const color in prevColor) {
        _events.push({
            _type: 4,
            _time: 69,
            _value: 1,
            _floatValue: parseInt(color) / 255,
            _customData: {
                _lightID: prevColor[color],
            },
        });
    }
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'cube.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 69.5,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(71, 0.5);
}
{
    const prevColor: { [key: string]: number[] } = {};
    for (let y = 0; y < screenY; y++) {
        for (let x = 0; x < screenX; x++) {
            const pos = screenStartID + screenX * y + x;
            if (!prevColor[screenLight[pos]]) {
                prevColor[screenLight[pos]] = [pos];
            } else {
                prevColor[screenLight[pos]].push(pos);
            }
        }
    }
    for (const color in prevColor) {
        _events.push({
            _type: 4,
            _time: 73,
            _value: 1,
            _floatValue: parseInt(color) / 255,
            _customData: {
                _lightID: prevColor[color],
            },
        });
    }
    let image = Deno.readFileSync(WORKING_DIRECTORY + 'cube.gif');
    let img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 73.4375,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    image = Deno.readFileSync(WORKING_DIRECTORY + 'cubeglitch.gif');
    img = await imagescript.GIF.decode(image, true);
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 73.5,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(73.5625);
    image = Deno.readFileSync(WORKING_DIRECTORY + 'cube.gif');
    img = await imagescript.GIF.decode(image, true);
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 73.625,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(74.6875);
    for (let i = 0; i < 3; i++) {
        img.forEach((frame) => {
            if (i) frame.invert();
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: 74.75 + i * 0.125,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
        screenClear(74.8125 + i * 0.125);
    }
}

{
    const prevColor: { [key: string]: number[] } = {};
    for (let y = 0; y < screenY; y++) {
        for (let x = 0; x < screenX; x++) {
            const pos = screenStartID + screenX * y + x;
            if (!prevColor[screenLight[pos]]) {
                prevColor[screenLight[pos]] = [pos];
            } else {
                prevColor[screenLight[pos]].push(pos);
            }
        }
    }
    for (const color in prevColor) {
        _events.push({
            _type: 4,
            _time: 76,
            _value: 1,
            _floatValue: parseInt(color) / 255,
            _customData: {
                _lightID: prevColor[color],
            },
        });
    }
}
itFrame = 0;
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'gradientcone.gif');
    const img = await imagescript.GIF.decode(image);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 76.25 + itFrame * 0.25,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
        itFrame++;
    });
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'free.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 81.5,
                _value: 4,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'freeglitch.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 81.5625,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(81.625);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'free.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 81.6875,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(82.3125);
}
for (let i = 0; i < 2; i++) {
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'free.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 82.375 + i * 0.125,
                _value: 1,
                _floatValue: parseInt(color) / 255 - i / 3,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(82.375 + i * 0.125);
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'and.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 384,
                _value: 6,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}
screenClear(384.375);
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'never.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 384.5,
                _value: 6,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(384.875);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'never.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 385,
                _value: 6,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(385.375);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'look.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 385.5,
                _value: 6,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(385.875);
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'back.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 386,
                _value: 6,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(386.375);
}

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++)
        _events.push(
            {
                _type: 0,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 5,
            },
            {
                _type: 4,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 5,
                _customData: {
                    _lightID: [
                        1,
                        2,
                        screenEndID + 1,
                        screenEndID + 2,
                        screenEndID + 3,
                        screenEndID + 4,
                    ],
                },
            },
            {
                _type: 0,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _value: 0,
                _floatValue: 0,
            },
            {
                _type: 4,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _value: 0,
                _floatValue: 0,
                _customData: {
                    _lightID: [
                        1,
                        2,
                        screenEndID + 1,
                        screenEndID + 2,
                        screenEndID + 3,
                        screenEndID + 4,
                    ],
                },
            }
        );
}

//#region crystal light
const crystalTimingPeriod = [
    [52, 82],
    [116, 147],
    [244, 275],
    [292, 383],
    [404, 479],
];
const crystalShuffleLeft = [8, 10, 14, 18, 22, 26];
const crystalShuffleRight = [9, 12, 16, 20, 24, 28];
bsmap.utils.shuffle(crystalShuffleLeft);
bsmap.utils.shuffle(crystalShuffleRight);
let crystalShuffle = bsmap.utils.interleave(crystalShuffleLeft, crystalShuffleRight);
let r = 0;
for (const ctp of crystalTimingPeriod) {
    const [start, end] = ctp;
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < (i === 147 || i === 275 || i === 479 ? 3 : 4); j++) {
            _events.push({
                _type: 3,
                _time: i + j / 4,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: crystalShuffle[r] },
            });
            r++;
            if (r === crystalShuffle.length) {
                let old = crystalShuffleLeft[crystalShuffleLeft.length - 1];
                bsmap.utils.shuffle(crystalShuffleLeft);
                while (crystalShuffleLeft[0] === old || crystalShuffleLeft[1] === old) {
                    bsmap.utils.shuffle(crystalShuffleLeft);
                }
                old = crystalShuffleRight[crystalShuffleRight.length - 1];
                bsmap.utils.shuffle(crystalShuffleRight);
                while (
                    crystalShuffleRight[0] === old ||
                    crystalShuffleRight[1] === old
                ) {
                    bsmap.utils.shuffle(crystalShuffleRight);
                }
                crystalShuffle = bsmap.utils.interleave(
                    crystalShuffleLeft,
                    crystalShuffleRight
                );
                r = 0;
            }
        }
    }
}
//#endregion
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'smile.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 11;
    const yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === 0 && colorAry[0] === 0) {
                    continue;
                }
                screenLight[pos] = colorAry[0];
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 212,
                _value: 5,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'frown.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 11;
    const yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === 0 && colorAry[0] === 0) {
                    continue;
                }
                screenLight[pos] = colorAry[0];
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 240,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'smile.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 11;
    const yOffset = 5;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === 0 && colorAry[0] === 0) {
                    continue;
                }
                screenLight[pos] = colorAry[0];
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 244,
                _value: 5,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}
screenClear(276);

_events.push(
    {
        _type: 4,
        _time: 83,
        _value: 1,
        _floatValue: 1,
        _customData: { _lightID: [1, 2] },
    },
    {
        _type: 4,
        _time: 83.375,
        _value: 0,
        _floatValue: 1,
        _customData: { _lightID: [1, 2] },
    },
    {
        _type: 4,
        _time: 83.5,
        _value: 1,
        _floatValue: 1,
        _customData: {
            _lightID: [
                screenEndID + 1,
                screenEndID + 2,
                screenEndID + 3,
                screenEndID + 4,
            ],
        },
    },
    {
        _type: 4,
        _time: 83.875,
        _value: 0,
        _floatValue: 1,
        _customData: {
            _lightID: [
                screenEndID + 1,
                screenEndID + 2,
                screenEndID + 3,
                screenEndID + 4,
            ],
        },
    }
);

const synthRhythmTiming = [116, 132, 212, 228, 244, 260, 292, 436, 452, 468, 484, 500];

const backtopBassFlashPeriod = [
    [84, 196],
    [212, 240],
    [244, 276],
    [292, 308],
    [404, 480],
    [484, 516],
];
for (const bbfp of backtopBassFlashPeriod) {
    const [t, m] = bbfp;
    let b = 0;
    for (let i = t; i < m; i++) {
        const ringID =
            b < 4 ? [3, 5] : b < 8 ? [1, 2] : b < 12 ? [3, 4, 5] : [1, 2, 3, 4, 5];
        const add = b < 4 ? 0 : b < 8 ? 0.0625 : b < 12 ? 0.125 : 0.25;
        _events.push(
            {
                _type: 4,
                _time: i,
                _value: 1,
                _floatValue: 1,
                _customData: { _lightID: [3, 4] },
            },
            {
                _type: 4,
                _time: i + 0.625,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: [3, 4] },
            }
        );
        for (let j = 0; j < 3; j++) {
            _events.push(
                {
                    _time: i + 0.0625 + j * 0.0625,
                    _type: 0,
                    _value: 7,
                    _floatValue: 1,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                },
                {
                    _time: i + 0.3125 + j * 0.0625,
                    _type: 0,
                    _value: 0,
                    _floatValue: 0,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                }
            );
        }
        for (let j = 0; j < 4; j++) {
            _events.push({
                _type: 1,
                _time: i + 0.5 + j / 8,
                _value: 7,
                _floatValue: 0.125 + j / 8 + add,
                _customData: { _lightID: ringID },
            });
            _events.push({
                _type: 1,
                _time: i + 0.5 + j / 8 + 1 / 16,
                _value: 0,
                _floatValue: 0,
                _customData: { _lightID: ringID },
            });
        }
        b++;
        if (b === 16) {
            b = 0;
        }
    }
}

const ringKickFlashPeriod = [
    [293, 8],
    [341, 22],
    [405, 38],
];
for (const rkfp of ringKickFlashPeriod) {
    const [t, p] = rkfp;
    for (let i = 0; i < p; i++) {
        for (let j = 0; j < 3; j++) {
            _events.push({
                _type: 1,
                _time: t + i * 2 + j / 6,
                _value: 3,
                _floatValue: 1.5 - j / 3,
            });
            _events.push({
                _type: 1,
                _time: t + i * 2 + j / 6 + 1 / 12,
                _value: 0,
                _floatValue: 0,
            });
        }
    }
}

// for (let x = 1; x < screenX - 1; x++) {
//     const lightArray: number[] = [];
//     for (let y = screenY - 5; y < screenY - 1; y++) {
//         if (x !== 1 && x !== screenX - 2) {
//             lightArray.push(101 + screenX * (screenY - 2) + x);
//             lightArray.push(101 + screenX * (screenY - 5) + x);
//             break;
//         }
//         lightArray.push(101 + screenX * y + x);
//     }
//     _events.push({
//         _type: 4,
//         _time: 4 + x / 32,
//         _value: 1,
//         _floatValue: 1,
//         _customData: { _lightID: lightArray },
//     });
// }

const chorus1Timing = [84, 388, 420];
const chorus2Timing = [116, 452, 468];
for (const t of chorus1Timing) {
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'what.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t - 1,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'the.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t - 0.5,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'hell.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'hellglitch.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t + 0.9375,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'going.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t + 1,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'on.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t + 2,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'tv.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                const colorID: { [key: string]: number[] } = {};
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 13.5 + y / screenY / 6,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'tvqm.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (colorAry[0] === 0) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                }
            }
            for (const color in colorID) {
                _events.push(
                    {
                        _type: 4,
                        _time: t + 14.0625,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 14.25,
                        _value: 0,
                        _floatValue: 0,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 14.4375,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: [
                                ...colorID[color].map((n) => n + 1),
                                screenStartID + screenX * 13 + 12,
                            ],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 14.625,
                        _value: 0,
                        _floatValue: 0,
                        _customData: {
                            _lightID: [
                                ...colorID[color].map((n) => n + 1),
                                screenStartID + screenX * 13 + 12,
                            ],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 14.8125,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: [
                                ...colorID[color].map((n) => n + 2),
                                screenStartID + screenX * 13 + 11,
                                screenStartID + screenX * 13 + 13,
                            ],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 15,
                        _value: 0,
                        _floatValue: 0,
                        _customData: {
                            _lightID: [
                                ...colorID[color].map((n) => n + 2),
                                screenStartID + screenX * 13 + 11,
                                screenStartID + screenX * 13 + 13,
                            ],
                        },
                    }
                );
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'black.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            for (let x = -4; x < Math.min(img.width, screenX); x++) {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    const fixedX = y % 2 ? x + 4 : x;
                    if (fixedX < 0 || fixedX >= Math.min(img.width, screenX)) {
                        continue;
                    }
                    const pos =
                        screenStartID + screenX * (y + yOffset) + fixedX + xOffset;
                    const colorAry = frame.getRGBAAt(fixedX + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 15.5 + (x + 4) / screenX / 6,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'white.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            for (let x = -4; x < Math.min(img.width, screenX); x++) {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    const fixedX = y % 2 ? x + 4 : x;
                    if (fixedX < 0 || fixedX >= Math.min(img.width, screenX)) {
                        continue;
                    }
                    const pos =
                        screenStartID + screenX * (y + yOffset) + fixedX + xOffset;
                    const colorAry = frame.getRGBAAt(fixedX + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 17.5 + (screenX - x + 4) / screenX / 6,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            }
        });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'no.gif');
        const img = await imagescript.GIF.decode(image, true);
        const xOffset = 0;
        const yOffset = 0;
        img.forEach((frame) => {
            const colorID: { [key: string]: number[] } = {};
            for (let y = 0; y < Math.min(img.height, screenY); y++) {
                for (let x = 0; x < Math.min(img.width, screenX); x++) {
                    const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                    const colorAry = frame.getRGBAAt(x + 1, y + 1);
                    if (screenLight[pos] === colorAry[0]) {
                        continue;
                    }
                    if (!colorID[colorAry[0]]) {
                        colorID[colorAry[0]] = [pos];
                    } else {
                        colorID[colorAry[0]].push(pos);
                    }
                    screenLight[pos] = colorAry[0];
                }
            }
            for (const color in colorID) {
                _events.push({
                    _type: 4,
                    _time: t + 19,
                    _value: 1,
                    _floatValue: parseInt(color) / 255,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        });
        screenClear(t + 19.4375);
        for (let j = 0; j < 2; j++) {
            img.forEach((frame) => {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 19.5 + j / 8,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(t + 19.5625 + j / 8);
        }
        {
            const image = Deno.readFileSync(WORKING_DIRECTORY + 'wrong2.gif');
            const img = await imagescript.GIF.decode(image, true);
            const xOffset = 0;
            const yOffset = 0;
            img.forEach((frame) => {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 19.875,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(t + 20);
        }
        {
            const image = Deno.readFileSync(WORKING_DIRECTORY + 'wrong2glitch.gif');
            const img = await imagescript.GIF.decode(image, true);
            const xOffset = 0;
            const yOffset = 0;
            img.forEach((frame) => {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 20.125,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(t + 20.1875);
        }
        {
            const image = Deno.readFileSync(WORKING_DIRECTORY + 'wrong.gif');
            const img = await imagescript.GIF.decode(image, true);
            const xOffset = 0;
            const yOffset = 0;
            img.forEach((frame) => {
                const colorID: { [key: string]: number[] } = {};
                for (let y = 0; y < Math.min(img.height, screenY); y++) {
                    for (let x = 0; x < Math.min(img.width, screenX); x++) {
                        const pos =
                            screenStartID + screenX * (y + yOffset) + x + xOffset;
                        const colorAry = frame.getRGBAAt(x + 1, y + 1);
                        if (screenLight[pos] === colorAry[0]) {
                            continue;
                        }
                        if (!colorID[colorAry[0]]) {
                            colorID[colorAry[0]] = [pos];
                        } else {
                            colorID[colorAry[0]].push(pos);
                        }
                        screenLight[pos] = colorAry[0];
                    }
                }
                for (const color in colorID) {
                    _events.push({
                        _type: 4,
                        _time: t + 20.25,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            });
            screenClear(t + 22);
        }
    }
}
for (const t of chorus2Timing) {
    for (let i = 0; i < 2; i++) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            _events.push({
                _type: 4,
                _time: t + i * 4 + (parseInt(x) / roadShuffle.length) * 1.5,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: roadShuffle[x] },
            });
        }
    }
}

const echoTiming = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.75, 7.5, 8.25, 9, 9.5, 10, 10.5, 11,
    11.5, 12, 12.5, 13, 13.5,
];
{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'echo.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 132,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
}
_events.push(
    {
        _type: 4,
        _time: 132,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [screenEndID + 1, screenEndID + 4],
        },
    },
    {
        _type: 4,
        _time: 132.25,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [screenEndID + 2, screenEndID + 3],
        },
    },
    {
        _type: 4,
        _time: 132.5,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 132.625,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [screenEndID + 1, screenEndID + 4],
        },
    },
    {
        _type: 4,
        _time: 132.75,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [screenEndID + 2, screenEndID + 3],
        },
    },
    {
        _type: 4,
        _time: 132.875,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133.25,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [screenEndID + 2, screenEndID + 3],
        },
    },
    {
        _type: 4,
        _time: 133.5,
        _value: 3,
        _floatValue: 1,
        _customData: {
            _lightID: [screenEndID + 1, screenEndID + 4],
        },
    },
    {
        _type: 4,
        _time: 133.625,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133.75,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [screenEndID + 2, screenEndID + 3],
        },
    },
    {
        _type: 4,
        _time: 133.875,
        _value: 0,
        _floatValue: 0,
        _customData: {
            _lightID: [screenEndID + 1, screenEndID + 4],
        },
    }
);
for (const x in roadOrder) {
    _events.push(
        {
            _type: 4,
            _time: 132 + (parseInt(x) / roadOrder.length) * 0.875,
            _value: 3,
            _floatValue: 1,
            _customData: { _lightID: roadOrder[x] },
        },
        {
            _type: 4,
            _time: 133.75 - (parseInt(x) / roadOrder.length) * 0.75,
            _value: 3,
            _floatValue: 1,
            _customData: { _lightID: roadOrder[x] },
        }
    );
}
screenClear(133.75);
for (const e of echoTiming) {
    for (const x in roadOrder) {
        _events.push(
            {
                _type: 4,
                _time: e + 134.5 - (parseInt(x) / roadOrder.length) * 0.5,
                _value: 3,
                _floatValue: 1,
                _customData: { _lightID: roadOrder[x] },
            },
            {
                _type: 4,
                _time: e + 134.625 - (parseInt(x) / roadOrder.length) * 0.5,
                _value: 0,
                _floatValue: 0,
                _customData: { _lightID: roadOrder[x] },
            }
        );
    }
    _events.push(
        {
            _type: 4,
            _time: 133.875 + e,
            _value: 0,
            _floatValue: 0,
            _customData: {
                _lightID: [1, 2],
            },
        },
        {
            _type: 4,
            _time: 134 + e,
            _value: 0,
            _floatValue: 0,
            _customData: {
                _lightID: [screenEndID + 2, screenEndID + 3],
            },
        },
        {
            _type: 4,
            _time: 134.125 + e,
            _value: 0,
            _floatValue: 0,
            _customData: {
                _lightID: [screenEndID + 1, screenEndID + 4],
            },
        },
        {
            _type: 4,
            _time: 134 + e,
            _value: 3,
            _floatValue: 1,
            _customData: {
                _lightID: [1, 2],
            },
        },
        {
            _type: 4,
            _time: 134.125 + e,
            _value: 3,
            _floatValue: 1,
            _customData: {
                _lightID: [screenEndID + 2, screenEndID + 3],
            },
        },
        {
            _type: 4,
            _time: 134.25 + e,
            _value: 3,
            _floatValue: 1,
            _customData: {
                _lightID: [screenEndID + 1, screenEndID + 4],
            },
        }
    );
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'echo.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 134 + e,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(134.25 + e);
}

for (let i = 0; i < 11; i++) {
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'questionmark.gif');
    const img = await imagescript.GIF.decode(image, true);
    const xOffset = 0;
    const yOffset = 0;
    img.forEach((frame) => {
        const colorID: { [key: string]: number[] } = {};
        for (let y = 0; y < Math.min(img.height, screenY); y++) {
            for (let x = 0; x < Math.min(img.width, screenX); x++) {
                const pos = screenStartID + screenX * (y + yOffset) + x + xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        for (const color in colorID) {
            _events.push({
                _type: 4,
                _time: 284 + i * 0.75,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
    });
    screenClear(284.25 + i * 0.75);
}

console.log(_events.length, 'events');
bsmap.saveMapSync(OUTPUT_FILE, difficulty);
console.log('map saved');

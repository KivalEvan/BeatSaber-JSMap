// holy shit image are so tedious to work with and optimise
import * as bsmap from '../../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@1.2.9/mod.ts';
import { dirname } from 'https://deno.land/std@0.122.0/path/mod.ts';

console.log('Running script...');
console.time('Runtime');
const WORKING_DIRECTORY = dirname(Deno.mainModule.replace('file:///', '')) + '/'; // for some reason deno doesnt like to deal with file:///
bsmap.settings.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/';
const INPUT_FILE = 'EasyLightshow.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = await bsmap.load.difficulty(INPUT_FILE);

difficulty._version = '2.5.0';
difficulty._customData = difficulty._customData ?? {};
difficulty._customData._environment = [];
difficulty._customData._time = difficulty._customData._time ?? 0;
difficulty._customData._time++;
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
const regexLaser = `Environment\.\\[\\d+\\]Laser$`;
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

//#region helper
interface ImageGIFOption {
    time: number;
    endTime?: number;
    eventValue?: number;
    floatValue?: number;
    fadeInDuration?: number;
    fadePrevious?: boolean;
    animated?: boolean;
    xOffset?: number;
    yOffset?: number;
    invert?: boolean;
    rotate?: number;
    saturation?: number;
    ignoreBlack?: boolean;
    save?: boolean;
    override?: boolean;
    easings?: (x: number) => number;
}

const screenDraw = async (imagePath: string, options: ImageGIFOption) => {
    const opt: Required<ImageGIFOption> = {
        time: options.time,
        endTime: options.endTime ?? options.time,
        eventValue: options.eventValue ?? 1,
        floatValue: options.floatValue ?? 1,
        fadeInDuration: options.fadeInDuration ?? 0,
        fadePrevious: options.fadePrevious ?? false,
        animated: options.animated ?? false,
        xOffset: options.xOffset ?? 0,
        yOffset: options.yOffset ?? 0,
        invert: options.invert ?? false,
        rotate: options.rotate ?? 0,
        saturation: options.saturation ?? 0,
        ignoreBlack: options.ignoreBlack ?? false,
        save: options.save ?? true,
        override: options.override ?? false,
        easings: options.easings ?? bsmap.easings.method.easeLinear,
    };
    const gifFile = Deno.readFileSync(WORKING_DIRECTORY + imagePath);
    const gif = await imagescript.GIF.decode(gifFile, !opt.animated);
    let itFrame = 0;
    gif.forEach((frame) => {
        frame.rotate(opt.rotate);
        frame.saturation(opt.saturation);
        if (opt.invert) {
            frame.invert();
        }
        const colorID: { [key: string]: number[] } = {};
        const prevColor: { [key: string]: number[] } = {};
        for (let y = 0; y < screenY; y++) {
            for (let x = 0; x < screenX; x++) {
                const pos = screenStartID + screenX * y + x;
                if (screenLight[pos] === 0) {
                    continue;
                }
                if (!prevColor[screenLight[pos]]) {
                    prevColor[screenLight[pos]] = [pos];
                } else {
                    prevColor[screenLight[pos]].push(pos);
                }
            }
        }
        for (let y = 0; y < Math.min(gif.height, screenY); y++) {
            for (let x = 0; x < Math.min(gif.width, screenX); x++) {
                const pos =
                    screenStartID + screenX * (y + opt.yOffset) + x + opt.xOffset;
                const colorAry = frame.getRGBAAt(x + 1, y + 1);
                if (opt.ignoreBlack && colorAry[0] === 0) {
                    continue;
                }
                if (!opt.override && screenLight[pos] === colorAry[0]) {
                    continue;
                }
                if (!colorID[colorAry[0]]) {
                    colorID[colorAry[0]] = [pos];
                } else {
                    colorID[colorAry[0]].push(pos);
                }
                if (opt.save) {
                    screenLight[pos] = colorAry[0];
                }
            }
        }
        if (!itFrame && opt.fadeInDuration && opt.eventValue) {
            for (const color in prevColor) {
                _events.push({
                    _time: opt.time,
                    _type: 4,
                    _value: opt.eventValue > 4 ? 5 : 1,
                    _floatValue: (parseInt(color) / 255) * opt.floatValue,
                    _customData: {
                        _lightID: colorID[color],
                    },
                });
            }
        }
        for (const color in colorID) {
            _events.push({
                _time:
                    (opt.animated
                        ? bsmap.utils.lerp(
                              opt.easings(
                                  bsmap.utils.normalize(itFrame, 0, gif.length)
                              ),
                              opt.time,
                              opt.endTime
                          )
                        : opt.time) + opt.fadeInDuration,
                _type: 4,
                _value: opt.fadeInDuration
                    ? opt.eventValue > 4
                        ? 8
                        : 4
                    : opt.eventValue,
                _floatValue: (parseInt(color) / 255) * opt.floatValue,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
        itFrame++;
    });
};
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
        for (let i = 0; i < ivt[1]; i += 0.125) {
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
}

await screenDraw('smile.gif', {
    time: 2,
    eventValue: 0,
    floatValue: 0,
    xOffset: 11,
    yOffset: 5,
});
await screenDraw('smile.gif', {
    time: 4,
    eventValue: 4,
    xOffset: 11,
    yOffset: 5,
    override: true,
});
screenClear(19);
await screenDraw('smileglitch.gif', { time: 19.0625 });
await screenDraw('smileglitch.gif', { time: 19.125, invert: true, rotate: 180 });
screenClear(19.1875);
await screenDraw('smile.gif', {
    time: 19.25,
    xOffset: 11,
    yOffset: 5,
});
screenClear(19.375);

for (const x in roadOrder) {
    _events.push({
        _time: 19.75 - (parseInt(x) / roadOrder.length) * 1,
        _type: 4,
        _value: 3,
        _floatValue: 1,
        _customData: { _lightID: roadOrder[x] },
    });
}

{
    const image = Deno.readFileSync(WORKING_DIRECTORY + 'clock.gif');
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
                    _time: 20 + (y + 3) / screenY,
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
for (let i = 0; i < 2; i++) {
    screenClear(22 + i * 0.5);
    await screenDraw('clock.gif', { time: 22.125 + i * 0.5 });
}
screenClear(23, 0.5);
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
    screenClear(31.25, 0.375);
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
                    _time: 31.875,
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
    await screenDraw('frownglitch.gif', { time: 32.5 });
    screenClear(32.5625);
    await screenDraw('frown.gif', {
        time: 32.625,
        xOffset: 11,
        yOffset: 5,
    });
    screenClear(33.25, 0.25);
    await screenDraw('frownglitch.gif', {
        time: 33.5625,
        invert: true,
        rotate: 180,
    });
    screenClear(33.625);
    await screenDraw('frown.gif', {
        time: 33.6875,
        xOffset: 11,
        yOffset: 5,
    });
    screenClear(34, 0.5);
}

await screenDraw('i.gif', { time: 35 });
screenClear(35.75);
await screenDraw('iglitch.gif', { time: 35.8125 });
screenClear(35.875);

await screenDraw('noentry.gif', { time: 36 });
screenClear(36.75);
await screenDraw('noentryglitch.gif', { time: 36.8125 });
screenClear(36.875);

await screenDraw('get.gif', { time: 37 });
screenClear(37.375);

await screenDraw('a.gif', { time: 37.5 });
screenClear(37.875);

await screenDraw('grip.gif', { time: 38 });
screenClear(38.0625);
await screenDraw('grip.gif', { time: 38.125 });
await screenDraw('grip.gif', { time: 38.6875, invert: true });
screenClear(38.75);

await screenDraw('butglitch.gif', { time: 39 });
await screenDraw('but.gif', { time: 39.0625 });
screenClear(39.375);

await screenDraw('i.gif', { time: 39.5 });
screenClear(39.875);

await screenDraw('noentry.gif', { time: 40 });
screenClear(40.375);

await screenDraw('let.gif', { time: 40.5, invert: true });
await screenDraw('let.gif', { time: 40.5625 });
screenClear(41, 0.25);

await screenDraw('goglitch.gif', { time: 41.5 });
await screenDraw('go.gif', { time: 41.5625 });
screenClear(42, 0.5);

await screenDraw('there.gif', { time: 43.5 });
screenClear(43.875);

await screenDraw('wasnt.gif', { time: 44 });
screenClear(44.4375);
await screenDraw('wasnt.gif', { time: 44.5 });
await screenDraw('wasntglitch.gif', { time: 44.8125 });
screenClear(44.875);

await screenDraw('any.gif', { time: 45 });
screenClear(45.4375);
await screenDraw('any.gif', { time: 45.5 });
await screenDraw('anyglitch.gif', { time: 45.8125, invert: true });
screenClear(45.875);

await screenDraw('thingglitch.gif', { time: 46, invert: true });
await screenDraw('thing.gif', { time: 46.0625 });
screenClear(46.5, 0.375);

await screenDraw('toglitch.gif', { time: 47 });
await screenDraw('to.gif', { time: 47.0625 });
screenClear(47.375);

await screenDraw('hold.gif', { time: 47.5 });
screenClear(47.875);

await screenDraw('ons.gif', { time: 48 });
screenClear(48.375);

await screenDraw('to.gif', { time: 48.5 });
screenClear(48.875, 0.5);

await screenDraw('thoglitch.gif', { time: 49.5 });
await screenDraw('tho.gif', { time: 49.5625 });
screenClear(49.875, 0.5);

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
        await screenDraw('why.gif', { time: 52 + i * 4 });
        screenClear(52.75 + i * 4);
        for (let j = 0; j < 2; j++) {
            if (j) {
                await screenDraw('whyglitch.gif', {
                    time: 52.8125 + i * 4 + j / 8,
                    invert: true,
                    rotate: 180,
                });
            } else {
                await screenDraw('whyglitch.gif', {
                    time: 52.8125 + i * 4 + j / 8,
                });
            }
            screenClear(52.875 + i * 4 + j / 8);
        }
    }

    if (i === 4 || i === 5) {
        await screenDraw('please.gif', { time: 52 + i * 4 });
        screenClear(52.75 + i * 4);
        for (let j = 0; j < 2; j++) {
            if (j) {
                await screenDraw('pleaseglitch.gif', {
                    time: 52.8125 + i * 4 + j / 8,
                    invert: true,
                    rotate: 180,
                });
            } else {
                await screenDraw('pleaseglitch.gif', {
                    time: 52.8125 + i * 4 + j / 8,
                });
            }
            screenClear(52.875 + i * 4 + j / 8);
        }
    }
    if (i === 2 || i === 6) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            _events.push({
                _time: 52 + (parseInt(x) / roadShuffle.length) * 1 + i * 4,
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
                _time: 54.5 + (itFrame / (img.length - 1)) * 0.75,
                _value: 1,
                _floatValue: parseInt(color) / 255,
                _customData: {
                    _lightID: colorID[color],
                },
            });
        }
        screenClear(54.71875 + (itFrame / (img.length - 1)) * 0.75);
        itFrame++;
    });
}
for (let i = 0; i < 2; i++) {
    await screenDraw('view.gif', { time: 59 + i * 0.25 });
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
{
    itFrame = 0;
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

await screenDraw('see.gif', { time: 64.9375, eventValue: 4 });
await screenDraw('seeglitch.gif', { time: 65 });
await screenDraw('see.gif', { time: 65.0625 });
await screenDraw('seeglitch.gif', { time: 65.1875, rotate: 180 });
await screenDraw('see.gif', { time: 65.25 });
screenClear(65.4375);
await screenDraw('see.gif', { time: 65.5 });
screenClear(65.9375);
await screenDraw('seeglitch.gif', { time: 66, invert: true });
await screenDraw('seeglitch.gif', { time: 66.0625, rotate: 180 });
await screenDraw('see.gif', { time: 66.125 });
screenClear(66.75, 0.5);

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
    await screenDraw('cube.gif', { time: 69.5, eventValue: 4 });
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
    await screenDraw('cube.gif', { time: 73.4375, eventValue: 4 });
    await screenDraw('cubeglitch.gif', { time: 73.5 });
    screenClear(73.5625);
    await screenDraw('cube.gif', { time: 73.625 });
    screenClear(74.6875);
    for (let i = 0; i < 3; i++) {
        await screenDraw('cube.gif', {
            time: 74.75 + i * 0.125,
            invert: i ? true : false,
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

await screenDraw('free.gif', { time: 81.5, eventValue: 4 });
await screenDraw('freeglitch.gif', { time: 81.5625 });
screenClear(81.625);
await screenDraw('free.gif', { time: 81.6875 });
screenClear(82.3125);
for (let i = 0; i < 2; i++) {
    await screenDraw(i ? 'freeglitch.gif' : 'free.gif', {
        time: 82.375 + i * 0.125,
        floatValue: 1 - i / 3,
        invert: i ? false : true,
    });
    screenClear(82.4375 + i * 0.125);
}

const soloVocalTiming: [number, number?][] = [
    [-1, 0.625], // im
    [0], // gon
    [0.5], // na
    [1], // burn
    [1.5], // my
    [2, 0.75], // house~
    [3], // down
    [3.5], // in
    [4], // to
    [4.5], // an
    [5], // ug
    [5.5], // ly
    [6, 0.5], //black
    [7, 0.625], // im
    [8], // gon
    [8.5], // na
    [9], // run
    [9.5], // a
    [10, 0.75], // way~
    [11, 0.75], // now~
    [12], // and
    [12.5], // ne
    [13], // ver
    [13.5], // look
    [14, 0.5], // back
];
for (let i = 0; i < 4; i++) {
    for (const ivt of soloVocalTiming) {
        const t = ivt[0];
        if (!ivt[1]) {
            _events.push(
                {
                    _type: 4,
                    _time: 308 + i * 16 + t,
                    _value: 3,
                    _floatValue: 1,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 308 + i * 16 + 0.25 + t,
                    _value: 0,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        } else {
            for (let j = 0; j < ivt[1]; j += 0.125) {
                _events.push(
                    {
                        _type: 4,
                        _time: 308 + i * 16 + t + j,
                        _value: 3,
                        _floatValue: 1,
                        _customData: { _lightID: [1, 2] },
                    },
                    {
                        _type: 4,
                        _time: 308 + i * 16 + 0.0625 + t + j,
                        _value: 0,
                        _floatValue: 0,
                        _customData: { _lightID: [1, 2] },
                    }
                );
            }
        }
    }
}

await screenDraw('and.gif', { time: 384 });
screenClear(384.375);

await screenDraw('never.gif', { time: 384.5 });
screenClear(384.875);

await screenDraw('never.gif', { time: 385 });
screenClear(385.375);

await screenDraw('look.gif', { time: 385.5 });
screenClear(385.875);

await screenDraw('back.gif', { time: 386 });
screenClear(386.375);

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
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

await screenDraw('smile.gif', {
    time: 212,
    eventValue: 5,
    xOffset: 11,
    yOffset: 5,
});
await screenDraw('frown.gif', { time: 240, xOffset: 11, yOffset: 5 });
await screenDraw('smile.gif', {
    time: 244,
    eventValue: 5,
    xOffset: 11,
    yOffset: 5,
});
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
    await screenDraw('what.gif', { time: t - 1 });
    screenClear(t - 0.625);

    await screenDraw('the.gif', { time: t - 0.5 });
    await screenDraw('the.gif', { time: t - 0.1875, invert: true });
    screenClear(t - 0.125);

    await screenDraw('hellglitch.gif', { time: t, rotate: 180 });
    await screenDraw('hell.gif', { time: t + 0.0625 });
    screenClear(t + 0.5);

    await screenDraw('hellglitch.gif', { time: t + 0.5625 });
    screenClear(t + 0.625);

    await screenDraw('goingglitch.gif', { time: t + 1, invert: true });
    await screenDraw('going.gif', { time: t + 1.0625 });
    screenClear(t + 1.4375);
    await screenDraw('going.gif', { time: t + 1.5 });
    await screenDraw('goingglitch.gif', { time: t + 1.875, rotate: 180 });
    screenClear(t + 1.9375);

    await screenDraw('on.gif', { time: t + 2 });
    screenClear(t + 2.5, 0.375);

    await screenDraw('can.gif', { time: t + 3, invert: true });
    await screenDraw('can.gif', { time: t + 3.0625 });
    screenClear(t + 3.5, 0.375);

    await screenDraw('someoneglitch.gif', { time: t + 4, rotate: 180 });
    await screenDraw('someoneglitch.gif', { time: t + 4.0625, invert: true });
    await screenDraw('someone.gif', { time: t + 4.125 });
    screenClear(t + 4.5);
    await screenDraw('someone.gif', { time: t + 4.5625 });
    screenClear(t + 4.875);

    await screenDraw('tell.gif', { time: t + 5 });
    await screenDraw('tellglitch.gif', { time: t + 5.375 });
    screenClear(t + 5.4375);

    await screenDraw('me.gif', { time: t + 5.5 });
    screenClear(t + 5.875);

    await screenDraw('please.gif', { time: t + 6, invert: true });
    await screenDraw('please.gif', { time: t + 6.0625 });
    screenClear(t + 6.5, 0.375);

    await screenDraw('why.gif', { time: t + 8 });
    screenClear(t + 8.375);

    await screenDraw('imglitch.gif', { time: t + 8.5, invert: true });
    await screenDraw('im.gif', { time: t + 8.5625 });
    screenClear(t + 8.875);

    await screenDraw('switchingglitch.gif', {
        time: t + 9,
    });
    await screenDraw('switching.gif', {
        time: t + 9.0625,
    });
    screenClear(t + 9.4375);
    await screenDraw('switching.gif', {
        time: t + 9.5,
    });
    await screenDraw('switchingglitch.gif', {
        time: t + 9.8175,
        invert: true,
    });
    screenClear(t + 9.875);

    await screenDraw('faster.gif', {
        time: t + 10,
    });
    await screenDraw('fasterglitch.gif', {
        time: t + 10.125,
        invert: true,
    });
    await screenDraw('faster.gif', {
        time: t + 10.1875,
    });
    screenClear(t + 10.25);
    await screenDraw('faster.gif', {
        time: t + 10.3125,
        endTime: t + 10.75,
        animated: true,
        easings: bsmap.easings.method.easeOutQuad,
    });
    screenClear(t + 10.875);

    await screenDraw('than.gif', { time: t + 11 });
    screenClear(t + 11.375);

    await screenDraw('the.gif', { time: t + 11.5 });
    await screenDraw('the.gif', { time: t + 11.5 });
    screenClear(t + 11.875);

    await screenDraw('testcard2.gif', { time: t + 12 });
    await screenDraw('testcard2.gif', { time: t + 12.0625, invert: true });
    screenClear(t + 12.125);
    await screenDraw('testcard.gif', { time: t + 12.1875 });
    screenClear(t + 12.4375);
    await screenDraw('testcard.gif', { time: t + 12.5 });
    screenClear(t + 12.6125);
    await screenDraw('testcard.gif', { time: t + 12.6875, invert: true });
    screenClear(t + 12.75);
    await screenDraw('testcard.gif', { time: t + 12.8125 });
    screenClear(t + 12.875);

    await screenDraw('on.gif', { time: t + 13 });
    screenClear(t + 13.375);

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
        screenClear(t + 15.9375);
        await screenDraw('blackglitch.gif', { time: t + 16 });
        screenClear(t + 16.0625);
        await screenDraw('black.gif', { time: t + 16.125 });
        await screenDraw('blackglitch.gif', {
            time: t + 17,
            invert: true,
            rotate: 180,
        });
        screenClear(t + 17.0625);
        await screenDraw('black.gif', { time: t + 17.125 });
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
        await screenDraw('whiteglitch.gif', {
            time: t + 18.875,
            invert: true,
        });
        await screenDraw('whiteglitch.gif', {
            time: t + 18.9375,
            rotate: 180,
        });
    }

    await screenDraw('no.gif', { time: t + 19 });
    screenClear(t + 19.4375);
    for (let j = 0; j < 2; j++) {
        await screenDraw('no.gif', { time: t + 19.5 + j / 8 });
        screenClear(t + 19.5625 + j / 8);
    }

    await screenDraw('wrong2.gif', { time: t + 19.875 });
    screenClear(t + 20);
    await screenDraw('wrong2glitch.gif', { time: t + 20.125 });
    screenClear(t + 20.1875);
    await screenDraw('wrong.gif', { time: t + 20.25 });
    screenClear(t + 20.875);
    await screenDraw('wrong.gif', { time: t + 21 });
    screenClear(t + 21.0625);
    await screenDraw('wrong.gif', { time: t + 21.125 });
    await screenDraw('warningglitch.gif', { time: t + 21.9375 });
    screenClear(t + 22);
    await screenDraw('warning.gif', { time: t + 22.0625 });
    screenClear(t + 22.25);
    await screenDraw('warning.gif', { time: t + 22.3125 });
    screenClear(t + 22.5);
    for (let i = 0; i < 4; i++) {
        await screenDraw('my.gif', { time: t + 23.0625 + i * 0.125 });
        screenClear(t + 23.125 + i * 0.125);
    }
    {
        await screenDraw('myglitch.gif', { time: t + 23.875 });
        screenClear(t + 23.9375);
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'enemy.gif');
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
                    const pos =
                        screenStartID + screenX * (fixedY + yOffset) + x + xOffset;
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
                        _time: t + 24.125 + ((y + 3) / screenY) * 0.75,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            }
        });
        await screenDraw('enemyglitch.gif', { time: t + 25.25 });
        screenClear(t + 25.3125);
        await screenDraw('enemy.gif', { time: t + 25.375, invert: true });
        screenClear(t + 25.4375);
        await screenDraw('enemy.gif', { time: t + 25.5 });
    }
    {
        const image = Deno.readFileSync(WORKING_DIRECTORY + 'enemyinvisible.gif');
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
                    const pos =
                        screenStartID + screenX * (fixedY + yOffset) + x + xOffset;
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
                        _time: t + 26 + ((y + 3) / screenY) * 0.5,
                        _value: 1,
                        _floatValue: parseInt(color) / 255,
                        _customData: {
                            _lightID: colorID[color],
                        },
                    });
                }
            }
        });
        await screenDraw('enemyinvisibleglitch.gif', {
            time: t + 26.5,
            invert: true,
        });
        screenClear(t + 26.5625);
        await screenDraw('enemy.gif', { time: t + 26.625 });
        screenClear(t + 26.6875);
        await screenDraw('enemyinvisible.gif', { time: t + 26.75 });
    }
    screenClear(t + 27);
    await screenDraw('qma.gif', {
        time: t + 27.75,
        endTime: t + 28.5,
        animated: true,
    });
    screenClear(t + 28.75);
    await screenDraw('howglitch.gif', { time: t + 28.8125 });
    await screenDraw('how.gif', { time: t + 28.875, invert: true });
    screenClear(t + 28.9375);
    await screenDraw('how.gif', { time: t + 29 });
    screenClear(t + 29.4375);
    await screenDraw('to.gif', { time: t + 29.5 });
    screenClear(t + 29.9375);
    await screenDraw('swordglitch.gif', { time: t + 30 });
    await screenDraw('sword.gif', { time: t + 30.0625 });
    screenClear(t + 30.375);
}
for (const t of chorus2Timing) {
    for (let i = 0; i < 2; i++) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            _events.push({
                _type: 4,
                _time: t + i * 4 + (parseInt(x) / roadShuffle.length) * 1.25,
                _value: 7,
                _floatValue: 1,
                _customData: { _lightID: roadShuffle[x] },
            });
        }
    }
    await screenDraw('the.gif', { time: t - 0.5 });
    screenClear(t - 0.125);
    await screenDraw('theglitch.gif', { time: t, invert: true });
    screenClear(t + 0.125);
    await screenDraw('fearglitch.gif', { time: t + 0.1875 });
    await screenDraw('fear.gif', { time: t + 0.3125 });
    screenClear(t + 0.375);
    await screenDraw('fearglitch.gif', {
        time: t + 0.5,
        invert: true,
        rotate: 180,
    });
    await screenDraw('fear.gif', { time: t + 0.625 });
    screenClear(t + 1.375);
    await screenDraw('fear.gif', { time: t + 1.5 });
    await screenDraw('fearglitch.gif', { time: t + 1.5625, rotate: 180 });
    await screenDraw('fear.gif', { time: t + 1.625 });
    screenClear(t + 2.375);
    await screenDraw('fearglitch.gif', { time: t + 2.5, rotate: 180, invert: true });
    await screenDraw('fearglitch.gif', { time: t + 2.5625 });
    await screenDraw('fear.gif', { time: t + 2.625 });
    screenClear(t + 3.25);

    await screenDraw('isglitch.gif', { time: t + 3.5 });
    await screenDraw('is.gif', { time: t + 3.5625 });
    screenClear(t + 3.875);

    await screenDraw('more.gif', { time: t + 4, invert: true });
    await screenDraw('more.gif', { time: t + 4.0625 });
    screenClear(t + 4.375);

    await screenDraw('than.gif', { time: t + 4.5 });
    screenClear(t + 4.875);

    await screenDraw('i.gif', { time: t + 5 });
    screenClear(t + 5.375);

    await screenDraw('can.gif', { time: t + 5.5 });
    screenClear(t + 6.375);

    await screenDraw('take.gif', { time: t + 6.5 });
    screenClear(t + 7.375);

    await screenDraw('when.gif', { time: t + 8 });
    screenClear(t + 8.375);

    await screenDraw('ims.gif', { time: t + 8.5 });
    screenClear(t + 8.875);

    await screenDraw('up.gif', { time: t + 9 });
    screenClear(t + 9.375);

    await screenDraw('against.gif', { time: t + 9.5 });
    screenClear(t + 9.875);
    await screenDraw('against.gif', { time: t + 10 });
    screenClear(t + 10.375);

    await screenDraw('echoglitch.gif', { time: t + 11.5 });
    await screenDraw('echo.gif', { time: t + 11.625 });
    screenClear(t + 12.25);
    await screenDraw('echoglitch.gif', { time: t + 12.5, rotate: 180 });
    await screenDraw('echo.gif', { time: t + 12.5625, invert: true });
    await screenDraw('echo.gif', { time: t + 12.625 });
    screenClear(t + 12.875);

    await screenDraw('in.gif', { time: t + 13 });
    screenClear(t + 13.375);

    await screenDraw('the.gif', { time: t + 13.5 });
    screenClear(t + 13.875);

    await screenDraw('mirror.gif', { time: t + 14 });
    screenClear(t + 14.375);
    await screenDraw('mirror.gif', { time: t + 14.5 });
    screenClear(t + 14.875);
}

const echoTiming = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.75, 7.5, 8.25, 9, 9.5, 10, 10.5, 11,
    11.5, 12, 12.5, 13, 13.5,
];
await screenDraw('echoglitch.gif', { time: 132, invert: true });
await screenDraw('echoglitch.gif', { time: 132.0625, rotate: 180 });
await screenDraw('echo.gif', { time: 132.125 });
screenClear(132.875);
await screenDraw('echoglitch.gif', { time: 133 });
await screenDraw('echo.gif', { time: 133.0625 });
await screenDraw('echo.gif', { time: 133.6875, invert: true });
screenClear(133.75);
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
    await screenDraw('echo.gif', { time: 134 + e });
    screenClear(134.25 + e);
}

for (let i = 0; i < 11; i++) {
    await screenDraw('questionmark.gif', { time: 284 + i * 0.75 });
    screenClear(284.25 + i * 0.75);
}

await bsmap.save.difficulty(difficulty, {
    filePath: OUTPUT_FILE,
});
console.timeEnd('Runtime');
console.log(_events.length, 'events');
// const info = bsmap.load.infoSync();
// const BPM = bsmap.bpm.create(info._beatsPerMinute);
console.log('Map saved');

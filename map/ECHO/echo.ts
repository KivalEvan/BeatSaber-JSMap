// holy shit image are so tedious to work with and optimise
import * as bsmap from '../../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@v1.2.12/mod.ts';

console.log('Running script...');
console.time('Runtime');
const WORKING_DIRECTORY = './map/ECHO/';
bsmap.globals.path = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/';
const OUTPUT_FILE = 'EasyLightshow.dat';

const difficulty = bsmap.v2.DifficultyData.create();

difficulty.customData._environment = [];
difficulty.customData._time = difficulty.customData._time ?? 0;
difficulty.customData._time++;
difficulty.events = [];
const envEnh = difficulty.customData._environment;
const { addEvents } = difficulty;

//#region environment and events order declaration stuff
let itFrame = 0;
const backtopOrder = [1, 3, 5, 6, 4, 2];
const crystalShuffleLeft = [8, 10, 12, 14, 16, 18];
const crystalShuffleRight = [9, 11, 13, 15, 17, 19];
const roadOrder: number[] = [
    24, 21, 39, 44, 65, 48, 76, 42, 30, 28, 36, 53, 60, 45, 17, 34, 43, 41, 23, 15, 49, 37, 26, 47, 68, 66, 40, 77, 19,
    62, 50, 67, 64, 46, 74, 71, 78, 69, 57, 72, 29, 54, 56, 75, 33, 63, 70, 55, 73, 79, 51, 38, 59, 16, 31, 32, 52, 61,
    58, 80, 35, 27, 7, 6, 22, 14, 12, 9, 8, 5, 25, 18, 11, 10, 13, 20,
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
envEnh.push({
    _id: '\\[\\d+\\]FloorMirror$',
    _lookupMethod: 'Regex',
    _active: false,
});
envEnh.push({
    _id: regexTentacleLeft,
    _lookupMethod: 'Regex',
    _position: [-10, 7, 48],
});
envEnh.push({
    _id: regexTentacleRight,
    _lookupMethod: 'Regex',
    _position: [10, 7, 48],
});

let offsetLightID = 200;
const screenLight: { [key: number]: number } = {};
const screenX = 32;
const screenY = 18;
const screenXOffset = 0;
const screenYOffset = 18;
const screenSize = 0.4;
const screenGap = 0;
const screenStartID = offsetLightID + 1;
const screenEndID = offsetLightID + screenX * screenY;
const screenArray = [];
for (let y = 0; y < screenY; y++) {
    for (let x = 0; x < screenX; x++) {
        const posX = screenXOffset + -(((screenX - 1) / 2) * screenSize) + x * (screenSize + screenGap);
        const posY = screenYOffset + -((screenY / 2) * screenSize) - y * (screenSize + screenGap);
        const posZ = 32 - Math.tan(345 * (Math.PI / 180)) * screenSize * y;
        envEnh.push({
            _id: regexGlowLine,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [345, 0, 0],
            _scale: [48 / 8, 2 / 8, 1],
            _lightID: ++offsetLightID,
        });
        screenLight[offsetLightID] = 0;
        screenArray.push(offsetLightID);
    }
}

const chevronID = [3, 4];
const centerOrder = [screenEndID + 1, screenEndID + 2, 1, 2, screenEndID + 3, screenEndID + 4];

for (let i = 0, offset = 0; i < 77; i++) {
    if (i === 26) {
        offset++;
        continue;
    }
    const posZ = 1.75 + (i - offset) * 1.25 + Math.random() * 0.5;
    envEnh.push({
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
    envEnh.push({
        _id: i ? regexGlowTopLine.replace('$', ` \\(${i}\\)$`) : regexGlowTopLine,
        _lookupMethod: 'Regex',
        _position: [-20 + i * 10, i % 2 ? 16 : 20, 7.5],
    });
}
for (let i = 0; i < 7; i++) {
    const id = i ? regexRotatingLasersPair.replace('$', ` \\(${i}\\)$`) : regexRotatingLasersPair;
    envEnh.push(
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
    envEnh.push({
        _id: fixed ? regexLaser.replace('$', ` \\(${fixed}\\)$`) : regexLaser,
        _lookupMethod: 'Regex',
        _position: [(i > 2 ? -1 : 1) * (8 + (i > 2 ? i - 3 : i) * 3), -3, 48 - (i > 2 ? i - 3 : i) * 3],
        _rotation: [0, 0, 0],
    });
}
envEnh.push(
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _position: [0, 6.5, 22.5],
    },
    {
        _id: regexConstruction,
        _lookupMethod: 'Regex',
        _duplicate: 1,
        _scale: [1.25, 1.25, 1.25],
        _position: [0, 12, 24],
        _rotation: [0, 0, 180],
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
    let gifFile = Deno.readFileSync(WORKING_DIRECTORY + imagePath);
    let gif = await imagescript.GIF.decode(gifFile, !opt.animated);
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
                const pos = screenStartID + screenX * (y + opt.yOffset) + x + opt.xOffset;
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
                addEvents({
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
            addEvents({
                _time:
                    (opt.animated
                        ? bsmap.utils.lerp(
                              opt.easings(bsmap.utils.normalize(itFrame, 0, gif.length)),
                              opt.time,
                              opt.endTime
                          )
                        : opt.time) + opt.fadeInDuration,
                _type: 4,
                _value: opt.fadeInDuration ? (opt.eventValue > 4 ? 8 : 4) : opt.eventValue,
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
            addEvents({
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
    addEvents({
        _time: time + fade,
        _type: 4,
        _value: fade ? 4 : 0,
        _floatValue: 0,
        _customData: { _lightID: lightID },
    });
};
//#endregion

//#region piano intro
addEvents(
    {
        _type: 12,
        _time: 4,
    },
    {
        _type: 13,
        _time: 4,
    }
);
const introPianoOrder = [3, 6, 5, 3, 5, 7, 6, 3, 1, 2, 3, 6, 4, 6, 4, 6];
for (let i = 0, paino = 0, painoFlip = false; i < 2; i++) {
    for (const ipo of introPianoOrder) {
        if (ipo < 4) {
            addEvents({
                _time: 4 + paino * 0.5 + i * 8,
                _type: painoFlip ? 2 : 3,
                _value: 7,
                _customData: { _lightID: [(4 - ipo) * 2, (4 - ipo) * 2 + 1] },
            });
        } else if (ipo === 4) {
            addEvents(
                {
                    _time: 4 + paino * 0.5 + i * 8,
                    _type: painoFlip ? 2 : 3,
                    _value: 7,
                    _customData: { _lightID: 1 },
                },
                {
                    _time: 4 + paino * 0.5 + i * 8,
                    _type: painoFlip ? 3 : 2,
                    _value: 7,
                    _customData: { _lightID: 1 },
                }
            );
        } else {
            addEvents({
                _time: 4 + paino * 0.5 + i * 8,
                _type: painoFlip ? 3 : 2,
                _value: 7,
                _customData: { _lightID: [(ipo - 4) * 2, (ipo - 4) * 2 + 1] },
            });
        }
        paino++;
    }
    paino = 0;
    painoFlip = !painoFlip;
}
addEvents(
    {
        _type: 12,
        _time: 19,
        _value: 1,
    },
    {
        _type: 13,
        _time: 19,
        _value: 1,
    },
    {
        _type: 12,
        _time: 20,
    },
    {
        _type: 13,
        _time: 20,
    }
);
for (let i = 1; i <= 7; i++) {
    addEvents(
        {
            _type: 2,
            _time: 19 + i / 10,
            _value: 3,
            _customData: { _lightID: i },
        },
        {
            _type: 3,
            _time: 19 + i / 10,
            _value: 3,
            _customData: { _lightID: i },
        }
    );
}
//#endregion

const piano2Notething = [5, 21, 37, 53, 69, 325, 341, 357, 373, 517];
for (const pnt of piano2Notething) {
    for (let i = 0; i < (pnt === 517 ? 4 : pnt === 373 ? 6 : 7); i++) {
        for (let j = 0; j < 3; j++) {
            addEvents(
                {
                    _time: pnt + j * 0.125 + i * 2,
                    _type: 0,
                    _value: 3,
                    _customData: { _lightID: [backtopOrder[j], backtopOrder[5 - j]] },
                },
                {
                    _time: pnt + 0.5 + j * 0.125 + i * 2,
                    _type: 0,
                    _value: 3,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                }
            );
        }
        if (pnt >= 325) {
            addEvents(
                {
                    _time: pnt - 1 + i * 2,
                    _type: 2,
                    _value: 3,
                    _customData: { _lightID: i < 6 ? [1, 2] : [2, 3] },
                },
                {
                    _time: pnt - 1 + i * 2,
                    _type: 3,
                    _value: 3,
                    _customData: { _lightID: i < 6 ? [1, 2] : [2, 3] },
                },
                {
                    _time: pnt - 0.5 + i * 2,
                    _type: 2,
                    _value: 3,
                    _customData: {
                        _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                    },
                },
                {
                    _time: pnt - 0.5 + i * 2,
                    _type: 3,
                    _value: 3,
                    _customData: {
                        _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                    },
                }
            );
            if (i >= 6) {
                for (let j = 0; j < 2; j++) {
                    addEvents(
                        {
                            _time: pnt + 1 + i * 2 + j,
                            _type: 2,
                            _value: 3,
                            _customData: { _lightID: [3 - j, 4 - j] },
                        },
                        {
                            _time: pnt + 1 + i * 2 + j,
                            _type: 3,
                            _value: 3,
                            _customData: { _lightID: [3 - j, 4 - j] },
                        },
                        {
                            _time: pnt + 1.5 + i * 2 + j,
                            _type: 2,
                            _value: 3,
                            _customData: {
                                _lightID: i < 4 ? [3, 4] : i < 6 ? [4, 5] : [6, 7],
                            },
                        },
                        {
                            _time: pnt + 1.5 + i * 2 + j,
                            _type: 3,
                            _value: 3,
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
        addEvents(
            {
                _type: 2,
                _time: 20 + t * 0.5 + i * 16,
                _value: 7,
                _customData: {
                    _lightID: iso,
                },
            },
            {
                _type: 3,
                _time: 20 + t * 0.5 + i * 16,
                _value: 7,
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
        addEvents(
            {
                _type: 4,
                _time: 19 + t,
                _value: 3,
                _customData: { _lightID: [1, 2] },
            },
            {
                _type: 4,
                _time: 19.25 + t,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            }
        );
    } else {
        for (let i = 0; i < ivt[1]; i += 0.125) {
            addEvents(
                {
                    _type: 4,
                    _time: 19 + t + i,
                    _value: 3,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 19.0625 + t + i,
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
    addEvents({
        _time: 19.75 - (parseInt(x) / roadOrder.length) * 1,
        _type: 4,
        _value: 3,
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
                addEvents({
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
            addEvents(
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
                addEvents({
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
        addEvents({
            _type: 4,
            _time: 29.25 + i * 0.375,
            _value: 3,
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
            addEvents(
                {
                    _type: 4,
                    _time: 31.875,
                    _floatValue: 0,
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
        addEvents(
            {
                _time: 52 + i * 4,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 53 + i * 4,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [1, 2] },
            }
        );
        for (let j = 0; j < 5; j++) {
            addEvents(
                {
                    _time: 54 + i * 4 + j * 0.125,
                    _type: 4,
                    _value: 3,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _time: 54.0625 + i * 4 + j * 0.125,
                    _type: 4,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        }
        continue;
    }
    addEvents(
        {
            _time: 53 + i * 4,
            _type: 4,
            _value: 3,
            _customData: { _lightID: [1, 2] },
        },
        {
            _time: 53.375 + i * 4,
            _type: 4,
            _floatValue: 0,
            _customData: { _lightID: [1, 2] },
        }
    );
    for (let j = 0; j < 5; j++) {
        addEvents(
            {
                _time: 53.5 + i * 4 + j * 0.125,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 53.5625 + i * 4 + j * 0.125,
                _type: 4,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 54.5 + i * 4 + j * 0.125,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [1, 2] },
            },
            {
                _time: 54.5625 + i * 4 + j * 0.125,
                _type: 4,
                _floatValue: 0,
                _customData: { _lightID: [1, 2] },
            }
        );
    }
    if (i === 6) {
        for (let j = 0; j < 16; j++) {
            addEvents(
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
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        }
    }
    if (i === 0 || i === 1 || i === 4 || i === 5) {
        for (const x in roadOrder) {
            addEvents(
                {
                    _time: 52 + (parseInt(x) / roadOrder.length) * 0.75 + i * 4,
                    _type: 4,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: roadOrder[x] },
                },
                {
                    _time: 52.0625 + (parseInt(x) / roadOrder.length) * 0.75 + i * 4,
                    _type: 4,
                    _value: 7,
                    _customData: { _lightID: roadOrder[x] },
                }
            );
        }

        addEvents(
            {
                _time: 52 + i * 4,
                _type: 4,
                _value: 5,
                _floatValue: 0,
                _customData: { _lightID: chevronID },
            },
            {
                _time: 52.75 + i * 4,
                _type: 4,
                _value: 4,
                _customData: { _lightID: chevronID },
            },
            {
                _time: 53 + i * 4,
                _type: 4,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: chevronID, _easing: 'easeInQuad' },
            }
        );
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
            addEvents(
                {
                    _time: 52 + (parseInt(x) / roadShuffle.length) * 1 + i * 4,
                    _type: 4,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: roadShuffle[x] },
                },
                {
                    _time: 54.75 + (parseInt(x) / roadShuffle.length) * 1 + i * 4,
                    _type: 4,
                    _value: 4,
                    _customData: { _lightID: roadShuffle[x] },
                }
            );
        }
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            addEvents(
                {
                    _time: 56 + (parseInt(x) / roadShuffle.length) * 1 + i * 4,
                    _type: 4,
                    _value: 4,
                    _customData: { _lightID: roadShuffle[x] },
                },
                {
                    _time: 57 + (parseInt(x) / roadShuffle.length) * 1 + i * 4,
                    _type: 4,
                    _value: 4,
                    _floatValue: 0,
                    _customData: { _lightID: roadShuffle[x] },
                }
            );
        }
        addEvents(
            {
                _time: 52 + i * 4,
                _type: 4,
                _value: 5,
                _floatValue: 0,
                _customData: { _lightID: chevronID },
            },
            {
                _time: 56 + i * 4,
                _type: 4,
                _value: 4,
                _customData: { _lightID: chevronID, _easing: 'easeOutQuad' },
            },
            {
                _time: 58 + i * 4,
                _type: 4,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: chevronID, _easing: 'easeInQuad' },
            }
        );
    }
    for (let j = 0; j < 3; j++) {
        addEvents({
            _time: 52 + i * 4 + j * 0.25,
            _type: 4,
            _value: 7,
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
            addEvents({
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
        addEvents({
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
            addEvents({
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
        addEvents({
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
        addEvents({
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
        addEvents({
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
            addEvents({
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
for (let i = 0; i < 5; i++) {
    for (const svt of soloVocalTiming) {
        const t = svt[0];
        if (308 + i * 16 + t >= 376) {
            break;
        }
        if (!svt[1]) {
            addEvents(
                {
                    _type: 4,
                    _time: 308 + i * 16 + t,
                    _value: 3,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 308 + i * 16 + 0.25 + t,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        } else {
            for (let j = 0; j < svt[1]; j += 0.125) {
                addEvents(
                    {
                        _type: 4,
                        _time: 308 + i * 16 + t + j,
                        _value: 3,
                        _customData: { _lightID: [1, 2] },
                    },
                    {
                        _type: 4,
                        _time: 308 + i * 16 + 0.0625 + t + j,
                        _floatValue: 0,
                        _customData: { _lightID: [1, 2] },
                    }
                );
            }
        }
        if (i === 2 || i == 3) {
            if (312 + i * 16 + t < 374) {
                if (!svt[1]) {
                    addEvents(
                        {
                            _type: 4,
                            _time: 312 + i * 16 + t,
                            _value: 3,
                            _customData: {
                                _lightID: [centerOrder[0], centerOrder[1]],
                            },
                        },
                        {
                            _type: 4,
                            _time: 312 + i * 16 + 0.25 + t,
                            _floatValue: 0,
                            _customData: {
                                _lightID: [centerOrder[0], centerOrder[1]],
                            },
                        }
                    );
                } else {
                    for (let j = 0; j < svt[1]; j += 0.125) {
                        addEvents(
                            {
                                _type: 4,
                                _time: 312 + i * 16 + t + j,
                                _value: 3,

                                _customData: {
                                    _lightID: [centerOrder[0], centerOrder[1]],
                                },
                            },
                            {
                                _type: 4,
                                _time: 312 + i * 16 + 0.0625 + t + j,
                                _floatValue: 0,
                                _customData: {
                                    _lightID: [centerOrder[0], centerOrder[1]],
                                },
                            }
                        );
                    }
                }
            }
            if (314 + i * 16 + t < 374) {
                if (!svt[1]) {
                    addEvents(
                        {
                            _type: 4,
                            _time: 314 + i * 16 + t,
                            _value: 3,
                            _customData: {
                                _lightID: [centerOrder[4], centerOrder[5]],
                            },
                        },
                        {
                            _type: 4,
                            _time: 314 + i * 16 + 0.25 + t,
                            _floatValue: 0,
                            _customData: {
                                _lightID: [centerOrder[4], centerOrder[5]],
                            },
                        }
                    );
                } else {
                    for (let j = 0; j < svt[1]; j += 0.125) {
                        addEvents(
                            {
                                _type: 4,
                                _time: 314 + i * 16 + t + j,
                                _value: 3,

                                _customData: {
                                    _lightID: [centerOrder[4], centerOrder[5]],
                                },
                            },
                            {
                                _type: 4,
                                _time: 314 + i * 16 + 0.0625 + t + j,
                                _floatValue: 0,
                                _customData: {
                                    _lightID: [centerOrder[4], centerOrder[5]],
                                },
                            }
                        );
                    }
                }
            }
        }
    }
}
const andNeverLookBack: [number, number?][] = [
    [0], // and
    [0.5], // ne
    [1], // ver
    [1.5], // look
    [2, 0.5], // back
];
for (let i = 0; i < 4; i++) {
    for (const anlb of andNeverLookBack) {
        const t = anlb[0];
        if (376 + i * 2 + t >= 384) {
            break;
        }
        if (!anlb[1]) {
            addEvents(
                {
                    _type: 4,
                    _time: 376 + i * 2 + t,
                    _value: 3,
                    _customData: {
                        _lightID:
                            i === 1
                                ? [centerOrder[0], centerOrder[1]]
                                : i === 3
                                ? [centerOrder[4], centerOrder[5]]
                                : [centerOrder[2], centerOrder[3]],
                    },
                },
                {
                    _type: 4,
                    _time: 376 + i * 2 + 0.25 + t,
                    _floatValue: 0,
                    _customData: {
                        _lightID:
                            i === 1
                                ? [centerOrder[0], centerOrder[1]]
                                : i === 3
                                ? [centerOrder[4], centerOrder[5]]
                                : [centerOrder[2], centerOrder[3]],
                    },
                }
            );
        } else {
            for (let j = 0; j < anlb[1]; j += 0.125) {
                addEvents(
                    {
                        _type: 4,
                        _time: 376 + i * 2 + t + j,
                        _value: 3,
                        _customData: {
                            _lightID:
                                i === 1
                                    ? [centerOrder[0], centerOrder[1]]
                                    : i === 3
                                    ? [centerOrder[4], centerOrder[5]]
                                    : [centerOrder[2], centerOrder[3]],
                        },
                    },
                    {
                        _type: 4,
                        _time: 376 + i * 2 + 0.0625 + t + j,
                        _floatValue: 0,
                        _customData: {
                            _lightID:
                                i === 1
                                    ? [centerOrder[0], centerOrder[1]]
                                    : i === 3
                                    ? [centerOrder[4], centerOrder[5]]
                                    : [centerOrder[2], centerOrder[3]],
                        },
                    }
                );
            }
        }
    }
}

await screenDraw('and.gif', { time: 384, eventValue: 5, floatValue: 1.5 });
screenClear(384.375);

await screenDraw('never.gif', { time: 384.5, eventValue: 5, floatValue: 1.5 });
screenClear(384.875);

await screenDraw('never.gif', { time: 385, eventValue: 5, floatValue: 1.5 });
screenClear(385.375);

await screenDraw('look.gif', { time: 385.5, eventValue: 5, floatValue: 1.5 });
screenClear(385.875);

await screenDraw('back.gif', { time: 386, eventValue: 5, floatValue: 1.5 });
screenClear(386.375);

for (let i = 0; i < 5; i++) {
    addEvents(
        {
            _type: 12,
            _time: 384 + i * 0.5 - 0.001,
            _value: 1,
        },
        {
            _type: 13,
            _time: 384 + i * 0.5 - 0.001,
            _value: 1,
        },
        {
            _type: 12,
            _time: 384 + i * 0.5,
            _value: 1,
            _customData: { _lockPosition: true },
        },
        {
            _type: 13,
            _time: 384 + i * 0.5,
            _value: 1,
            _customData: { _lockPosition: true },
        }
    );
    for (let j = 0; j < 2; j++) {
        addEvents(
            {
                _type: 0,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 4,
            },
            {
                _type: 4,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 4,
                _customData: {
                    _lightID: [
                        centerOrder[2],
                        centerOrder[3],
                        centerOrder[0],
                        centerOrder[1],
                        centerOrder[4],
                        centerOrder[5],
                    ],
                },
            },
            {
                _type: 2,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 4,
            },
            {
                _type: 3,
                _time: 384 + i * 0.5 + j / 6,
                _value: 6,
                _floatValue: 4,
            },
            {
                _type: 0,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _floatValue: 0,
            },
            {
                _type: 4,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _floatValue: 0,
                _customData: {
                    _lightID: [
                        centerOrder[2],
                        centerOrder[3],
                        centerOrder[0],
                        centerOrder[1],
                        centerOrder[4],
                        centerOrder[5],
                    ],
                },
            },
            {
                _type: 2,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _floatValue: 0,
            },
            {
                _type: 3,
                _time: 384 + 1 / 12 + i * 0.5 + j / 6,
                _floatValue: 0,
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
bsmap.utils.shuffle(crystalShuffleLeft);
bsmap.utils.shuffle(crystalShuffleRight);
let crystalShuffle = bsmap.utils.interleave(crystalShuffleLeft, crystalShuffleRight);
let r = 0;
for (const ctp of crystalTimingPeriod) {
    const [start, end] = ctp;
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < (i === 147 || i === 275 || i === 479 ? 3 : 4); j++) {
            addEvents({
                _type: 3,
                _time: i + j / 4,
                _value: 7,
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
                while (crystalShuffleRight[0] === old || crystalShuffleRight[1] === old) {
                    bsmap.utils.shuffle(crystalShuffleRight);
                }
                crystalShuffle = bsmap.utils.interleave(crystalShuffleLeft, crystalShuffleRight);
                r = 0;
            }
        }
    }
}
//#endregion

for (let t = 212; t < 240; t++) {
    let randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t,
        eventValue: 5,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125);
    randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t + 0.0625,
        eventValue: 5,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125 + 0.0625);
    await screenDraw('smile.gif', {
        time: t + 0.125,
        eventValue: 5,
        xOffset: 11,
        yOffset: 5,
    });
}
await screenDraw('frown.gif', { time: 240, xOffset: 11, yOffset: 5, override: true });
screenClear(243.875);
for (let t = 244; t < 276; t++) {
    let randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t,
        eventValue: 5,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125);
    randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t + 0.0625,
        eventValue: 5,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125 + 0.0625);
    await screenDraw('smile.gif', {
        time: t + 0.125,
        eventValue: 5,
        xOffset: 11,
        yOffset: 5,
    });
}
screenClear(276);

addEvents(
    {
        _type: 4,
        _time: 83,
        _value: 1,
        _customData: { _lightID: [1, 2] },
    },
    {
        _type: 4,
        _time: 83.375,
        _customData: { _lightID: [1, 2] },
    },
    {
        _type: 4,
        _time: 83.5,
        _value: 1,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[1], centerOrder[4], centerOrder[5]],
        },
    },
    {
        _type: 4,
        _time: 83.875,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[1], centerOrder[4], centerOrder[5]],
        },
    }
);

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
        const ringID = b < 4 ? [3, 5] : b < 8 ? [1, 2] : b < 12 ? [3, 4, 5] : [1, 2, 3, 4, 5];
        const add = b < 4 ? 0 : b < 8 ? 0.0625 : b < 12 ? 0.125 : 0.25;
        addEvents(
            {
                _type: 4,
                _time: i,
                _value: 1,
                _customData: { _lightID: chevronID },
            },
            {
                _type: 4,
                _time: i + 0.625,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: chevronID },
            }
        );
        for (let j = 0; j < 3; j++) {
            addEvents(
                {
                    _time: i + 0.0625 + j * 0.0625,
                    _type: 0,
                    _value: 1,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                },
                {
                    _time: i + 0.25 + j * 0.0625,
                    _type: 0,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                },
                {
                    _time: i + 0.625 + j * 0.0625,
                    _type: 0,
                    _value: 8,
                    _floatValue: 0,
                    _customData: {
                        _lightID: [backtopOrder[2 - j], backtopOrder[j + 3]],
                    },
                }
            );
        }
        for (let j = 0; j < 4; j++) {
            addEvents({
                _type: 1,
                _time: i + 0.5 + j / 8,
                _value: 7,
                _floatValue: 0.125 + j / 8 + add,
                _customData: { _lightID: ringID },
            });
            addEvents({
                _type: 1,
                _time: i + 0.5 + j / 8 + 1 / 16,
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
            addEvents({
                _type: 1,
                _time: t + i * 2 + j / 6,
                _value: 3,
                _floatValue: 1.5 - j / 3,
            });
            addEvents({
                _type: 1,
                _time: t + i * 2 + j / 6 + 1 / 12,
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
//     _addEvents({
//         _type: 4,
//         _time: 4 + x / 32,
//         _value: 1,
//
//         _customData: { _lightID: lightArray },
//     });
// }

const chorus1Timing = [84, 388, 420];
const chorus1Vocal: [number, number?][] = [
    [-1],
    [-0.5],
    [0, 0.5],
    [1],
    [1.5],
    [2],
    [3, 0.5],
    [4],
    [4.5],
    [5],
    [5.5],
    [6, 0.75],
    [8],
    [8.5],
    [9],
    [9.5],
    [10],
    [10.5],
    [11],
    [11.5],
    [12],
    [12.5],
    [13],
    [13.5],
    [14],
    [15, 0.5],
    [16],
    [17],
    [17.5],
    [18],
    [19, 0.75],
    [20],
    [20.5],
    [21],
    [21.5],
    [22],
    [23, 0.75],
    [24],
    [24.5],
    [25],
    [25.5],
    [26],
    [26.5],
    [27],
    [27.5],
    [28],
    [28.5],
    [29],
    [29.5],
    [30],
];
const chorus2Timing = [116, 452, 468];
const chorus2Vocal: [number, number?][] = [
    [-0.5],
    [0, 0.25],
    [0.5, 0.75],
    [1.5, 0.5],
    [2.5, 0.75],
    [3.5],
    [4, 0.25],
    [4.5],
    [5],
    [5.5, 0.75],
    [6.5, 1],
    [8],
    [8.5],
    [9],
    [9.5],
    [10, 0.5],
    [11.5, 0.25],
    [12.5],
    [13],
    [13.5],
    [14, 0.25],
    [14.5, 0.25],
];

let chorus1flipFlop = false;
for (const t of chorus1Timing) {
    for (const ivt of chorus1Vocal) {
        const e = ivt[0];
        if (!ivt[1]) {
            addEvents(
                {
                    _type: 4,
                    _time: t + e,
                    _value: 3,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 0.25 + t + e,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        } else {
            for (let i = 0; i < ivt[1]; i += 0.125) {
                addEvents(
                    {
                        _type: 4,
                        _time: t + i + e,
                        _value: 3,
                        _customData: { _lightID: [1, 2] },
                    },
                    {
                        _type: 4,
                        _time: 0.0625 + t + i + e,
                        _floatValue: 0,
                        _customData: { _lightID: [1, 2] },
                    }
                );
            }
        }
    }
    for (let i = 0; i < 2; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length - 1) {
            _lightID.push(roadOrder[0 + j], roadOrder[1 + j]);
            j += bsmap.utils.random(4, 10, true);
        }
        addEvents(
            {
                _time: t - 1 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t - 0.75 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    addEvents(
        {
            _time: t - 0.1875,
            _type: 4,
            _value: 0,
            _customData: { _lightID: roadOrder },
        },
        {
            _time: t - 0.001,
            _type: 4,
            _value: 4,
            _customData: { _lightID: roadOrder },
        }
    );
    for (const x in roadOrder) {
        addEvents(
            {
                _time: t + (parseInt(x) / roadOrder.length) * 0.4375,
                _type: 4,
                _value: 0,
                _customData: { _lightID: roadOrder[x] },
            },
            {
                _time: t + 0.03125 + (parseInt(x) / roadOrder.length) * 0.4375,
                _type: 4,
                _value: 2,
                _floatValue: 1.25,
                _customData: { _lightID: roadOrder[x] },
            },
            {
                _time: t + 0.0625 + 0.03125 + (parseInt(x) / roadOrder.length) * 0.4375,
                _type: 4,
                _value: 0,
                _customData: { _lightID: roadOrder[x] },
            }
        );
    }

    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 3 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 3.25 + t + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
    }

    addEvents(
        {
            _time: t - 1,
            _type: 12,
        },
        {
            _time: t - 1,
            _type: 13,
        },
        {
            _time: t - 1,
            _type: 2,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t - 0.75,
            _type: 2,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t - 1,
            _type: 3,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t - 0.75,
            _type: 3,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        }
    );
    await screenDraw('what.gif', { time: t - 1 });
    screenClear(t - 0.625);

    addEvents(
        {
            _time: t - 0.5,
            _type: 2,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t - 0.25,
            _type: 2,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t - 0.5,
            _type: 3,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t - 0.25,
            _type: 3,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        }
    );
    await screenDraw('the.gif', { time: t - 0.5 });
    await screenDraw('the.gif', { time: t - 0.1875, invert: true });
    screenClear(t - 0.125);

    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 3,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 3,
                _customData: { _lightID: i },
            },
            {
                _time: t + 0.375 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 0.375 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _floatValue: 0,
                _customData: { _lightID: i },
            }
        );
    }
    addEvents(
        {
            _time: t - 0.001,
            _type: 12,
            _value: 3,
        },
        {
            _time: t,
            _type: 13,
            _value: 3,
        }
    );
    for (let i = 0; i < 2; i++) {
        addEvents(
            {
                _time: t + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 3 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 6 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 16 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 19 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 23 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            }
        );
    }
    await screenDraw('hellglitch.gif', { time: t, rotate: 180 });
    await screenDraw('hell.gif', { time: t + 0.0625 });
    screenClear(t + 0.5);

    await screenDraw('hellglitch.gif', { time: t + 0.5625 });
    screenClear(t + 0.625);

    addEvents(
        {
            _time: t + 1,
            _type: 12,
        },
        {
            _time: t + 1,
            _type: 13,
        }
    );
    for (let i = 0; i < 2; i++) {
        addEvents(
            {
                _time: t + 1,
                _type: 2 + i,
                _value: 2,
                _customData: { _lightID: [3, 4] },
            },
            {
                _time: t + 1.25,
                _type: 2 + i,
                _customData: { _lightID: [3, 4] },
            },
            {
                _time: t + 1.5,
                _type: 2 + i,
                _value: 2,
                _customData: { _lightID: [6, 7] },
            },
            {
                _time: t + 1.75,
                _type: 2 + i,
                _customData: { _lightID: [6, 7] },
            },
            {
                _time: t + 2,
                _type: 2 + i,
                _value: 2,
                _customData: { _lightID: [2, 3, 4] },
            },
            {
                _time: t + 2.25,
                _type: 2 + i,
                _customData: { _lightID: [2, 3, 4] },
            }
        );
    }
    for (let i = 0; i < 3; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length) {
            _lightID.push(roadOrder[0 + j]);
            j += bsmap.utils.random(4, 8, true);
        }
        addEvents(
            {
                _time: t + 1 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 1.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    await screenDraw('goingglitch.gif', { time: t + 1, invert: true });
    await screenDraw('going.gif', { time: t + 1.0625 });
    screenClear(t + 1.4375);
    await screenDraw('going.gif', { time: t + 1.5 });
    await screenDraw('goingglitch.gif', { time: t + 1.875, rotate: 180 });
    screenClear(t + 1.9375);

    await screenDraw('on.gif', { time: t + 2 });
    screenClear(t + 2.5, 0.375);

    addEvents(
        {
            _time: t + 2.999,
            _type: 12,
            _value: 2,
        },
        {
            _time: t + 3,
            _type: 13,
            _value: 2,
        }
    );
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + 3 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 3 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 3.125 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 3.125 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 3.375 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 3.375 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            }
        );
    }
    await screenDraw('can.gif', { time: t + 3, invert: true });
    await screenDraw('can.gif', { time: t + 3.0625 });
    screenClear(t + 3.5, 0.375);

    addEvents(
        {
            _time: t + 4,
            _type: 12,
        },
        {
            _time: t + 4,
            _type: 13,
        },
        {
            _time: t + 4,
            _type: chorus1flipFlop ? 3 : 2,
            _value: 3,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 4.25,
            _type: chorus1flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 4.5,
            _type: chorus1flipFlop ? 3 : 2,
            _value: 3,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 4.75,
            _type: chorus1flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 5,
            _type: chorus1flipFlop ? 2 : 3,
            _value: 3,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 5.25,
            _type: chorus1flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 5.5,
            _type: chorus1flipFlop ? 2 : 3,
            _value: 3,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 5.75,
            _type: chorus1flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        }
    );
    for (let i = 0; i < 4; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length) {
            _lightID.push(roadOrder[0 + j]);
            j += bsmap.utils.random(4, 8, true);
        }
        addEvents(
            {
                _time: t + 4 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 4.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
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

    addEvents(
        {
            _time: t + 5.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 6,
            _type: 13,
            _value: 1,
        }
    );
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.25 + 6,
                _type: chorus1flipFlop ? 3 : 2,
                _value: 2,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 6.25,
                _type: chorus1flipFlop ? 2 : 3,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 6.375,
                _type: chorus1flipFlop ? 3 : 2,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 6.625,
                _type: chorus1flipFlop ? 2 : 3,
                _customData: { _lightID: i },
            }
        );
    }
    for (const x in roadOrder) {
        addEvents(
            {
                _time: t + 6 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _floatValue: 1.25,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t + 6.0625 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 3,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            }
        );
    }
    await screenDraw('please.gif', { time: t + 6, invert: true });
    await screenDraw('please.gif', { time: t + 6.0625 });
    screenClear(t + 6.5, 0.375);

    addEvents(
        {
            _time: t + 8,
            _type: 12,
        },
        {
            _time: t + 8,
            _type: 13,
        }
    );
    for (let i = 0; i < 12; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length - 1) {
            _lightID.push(roadOrder[0 + j], roadOrder[1 + j]);
            j += bsmap.utils.random(4, 10, true);
        }
        addEvents(
            {
                _time: t + 8 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 8.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
        const random = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand = [random];
        const random2 = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand2 = [random2];
        if (random < 7) {
            lightIDrand.push(random + 1);
        }
        if (random2 < 7) {
            lightIDrand2.push(random2 + 1);
        }
        addEvents(
            {
                _time: t + 8 + i / 2,
                _type: 2,
                _value: 2,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 8.25 + i / 2,
                _type: 2,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 8 + i / 2,
                _type: 3,
                _value: 2,
                _customData: { _lightID: lightIDrand2 },
            },
            {
                _time: t + 8.25 + i / 2,
                _type: 3,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand2 },
            }
        );
    }
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

    await screenDraw('fire.gif', {
        time: t + 10,
    });
    await screenDraw('fireflip.gif', {
        time: t + 10.0625,
        invert: true,
    });
    await screenDraw('fasterglitch.gif', {
        time: t + 10.125,
        invert: true,
    });
    await screenDraw('fire.gif', {
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

    addEvents(
        {
            _time: t + 13.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 14,
            _type: 13,
            _value: 1,
        }
    );
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + 14 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 14 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 14.125 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 14.125 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 14.375 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 14.375 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            }
        );
    }

    addEvents({
        _type: 4,
        _time: t + 13.999,
        _value: 5,
        _customData: { _lightID: roadOrder },
    });
    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 14 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 14.25 + t + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
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
                    addEvents({
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
                addEvents(
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
                            _lightID: [...colorID[color].map((n) => n + 1), screenStartID + screenX * 13 + 12],
                        },
                    },
                    {
                        _type: 4,
                        _time: t + 14.625,
                        _floatValue: 0,
                        _customData: {
                            _lightID: [...colorID[color].map((n) => n + 1), screenStartID + screenX * 13 + 12],
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

    addEvents(
        {
            _time: t + 15,
            _type: 12,
        },
        {
            _time: t + 15,
            _type: 13,
        }
    );
    for (let i = 0; i < 4; i++) {
        addEvents(
            {
                _time: t + 15 + i / 6,
                _type: 2,
                _value: 2,
                _customData: { _lightID: [1, 3, 4] },
            },
            {
                _time: t + 15 + i / 6,
                _type: 3,
                _value: 2,
                _customData: { _lightID: [1, 3, 4] },
            },
            {
                _time: t + 15 + 1 / 12 + i / 6,
                _type: 2,
                _customData: { _lightID: [1, 3, 4] },
            },
            {
                _time: t + 15 + 1 / 12 + i / 6,
                _type: 3,
                _customData: { _lightID: [1, 3, 4] },
            }
        );
    }
    for (let i = 0; i < 3; i++) {
        addEvents(
            {
                _time: t + 16 + (i / 3) * 0.375,
                _type: 2,
                _value: 2,
                _customData: { _lightID: 7 - i },
            },
            {
                _time: t + 16 + (i / 3) * 0.375,
                _type: 3,
                _value: 2,
                _customData: { _lightID: 7 - i },
            },
            {
                _time: t + 16.5 + (i / 3) * 0.375,
                _type: 2,
                _value: 0,
                _customData: { _lightID: 7 - i },
            },
            {
                _time: t + 16.5 + (i / 3) * 0.375,
                _type: 3,
                _value: 0,
                _customData: { _lightID: 7 - i },
            }
        );
    }
    for (let i = 0; i < 2; i++) {
        addEvents(
            {
                _time: t + 17 + i * 0.5,
                _type: 2,
                _value: 2,
                _customData: { _lightID: [5, 6].map((n) => n - i * 3) },
            },
            {
                _time: t + 17 + i * 0.5,
                _type: 3,
                _value: 2,
                _customData: { _lightID: [5, 6].map((n) => n - i * 3) },
            },
            {
                _time: t + 17.25 + i * 0.5,
                _type: 2,
                _value: 0,
                _customData: { _lightID: [5, 6].map((n) => n - i * 3) },
            },
            {
                _time: t + 17.25 + i * 0.5,
                _type: 3,
                _value: 0,
                _customData: { _lightID: [5, 6].map((n) => n - i * 3) },
            }
        );
    }
    for (let j = 0; j < 3; j++) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            addEvents(
                {
                    _type: 4,
                    _time: 15 + t + (parseInt(x) / roadShuffle.length) * 0.25 + j * 0.25,
                    _value: 7,
                    _customData: { _lightID: roadShuffle[x] },
                },
                {
                    _type: 4,
                    _time: 15.1875 + t + (parseInt(x) / roadShuffle.length) * 0.25 + j * 0.25,
                    _floatValue: 0,
                    _customData: { _lightID: roadShuffle[x] },
                }
            );
        }
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
                    const pos = screenStartID + screenX * (y + yOffset) + fixedX + xOffset;
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
                    addEvents({
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

    for (let i = 0; i < 3; i++) {
        addEvents(
            {
                _time: t + 18 + (i / 3) * 0.375,
                _type: 2,
                _value: 2,
                _customData: { _lightID: 1 + i },
            },
            {
                _time: t + 18 + (i / 3) * 0.375,
                _type: 3,
                _value: 2,
                _customData: { _lightID: 1 + i },
            },
            {
                _time: t + 18.5 + (i / 3) * 0.375,
                _type: 2,
                _value: 0,
                _customData: { _lightID: 1 + i },
            },
            {
                _time: t + 18.5 + (i / 3) * 0.375,
                _type: 3,
                _value: 0,
                _customData: { _lightID: 1 + i },
            }
        );
    }
    for (const x in roadOrder) {
        addEvents(
            {
                _time: t + 16 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _floatValue: 1.25,
                _customData: {
                    _lightID: roadOrder[parseInt(x)],
                },
            },
            {
                _time: t + 16.03125 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _customData: {
                    _lightID: roadOrder[parseInt(x)],
                },
            }
        );
    }
    for (let i = 0; i < 3; i++) {
        for (const x in roadOrder) {
            addEvents(
                {
                    _time: t + 16.9375 + (parseInt(x) / roadOrder.length) * 0.5 + i / 2,
                    _type: 4,
                    _customData: {
                        _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                    },
                },
                {
                    _time: t + 17 + (parseInt(x) / roadOrder.length) * 0.5 + i / 2,
                    _type: 4,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: {
                        _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                    },
                }
            );
        }
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
                    const pos = screenStartID + screenX * (y + yOffset) + fixedX + xOffset;
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
                    addEvents({
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

    addEvents(
        {
            _time: t + 18.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 19,
            _type: 13,
            _value: 1,
        }
    );
    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 7; i++) {
            addEvents(
                {
                    _time: t + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 2,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 3,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 2,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 3,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 2,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25 + 19,
                    _type: 3,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                }
            );
        }
    }

    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 19 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 19.25 + t + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
    }
    await screenDraw('no.gif', { time: t + 19 });
    screenClear(t + 19.4375);
    for (let j = 0; j < 2; j++) {
        await screenDraw('no.gif', { time: t + 19.5 + j / 8 });
        screenClear(t + 19.5625 + j / 8);
    }

    addEvents(
        {
            _time: t + 20,
            _type: 12,
            _value: 0,
        },
        {
            _time: t + 20,
            _type: 13,
            _value: 0,
        }
    );
    for (let i = 0; i < 5; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length - 1) {
            _lightID.push(roadOrder[0 + j], roadOrder[1 + j]);
            j += bsmap.utils.random(4, 10, true);
        }
        addEvents(
            {
                _time: t + 20 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 20.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    for (let i = 0; i < 4; i++) {
        const random = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand = [random];
        const random2 = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand2 = [random2];
        if (random < 7) {
            lightIDrand.push(random + 1);
        }
        if (random2 < 7) {
            lightIDrand2.push(random2 + 1);
        }
        addEvents(
            {
                _time: t + 20 + i / 2,
                _type: 2,
                _value: 2,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 20.25 + i / 2,
                _type: 2,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 20 + i / 2,
                _type: 3,
                _value: 2,
                _customData: { _lightID: lightIDrand2 },
            },
            {
                _time: t + 20.25 + i / 2,
                _type: 3,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand2 },
            }
        );
    }
    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 22 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 0.25 + t + 22 + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
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

    addEvents(
        {
            _time: t + 21.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 22,
            _type: 13,
            _value: 1,
        }
    );
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.25 + 22,
                _type: chorus1flipFlop ? 3 : 2,
                _value: 2,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 22.25,
                _type: chorus1flipFlop ? 2 : 3,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 22.375,
                _type: chorus1flipFlop ? 3 : 2,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 22.625,
                _type: chorus1flipFlop ? 2 : 3,
                _customData: { _lightID: i },
            }
        );
    }
    await screenDraw('warningglitch.gif', { time: t + 21.9375 });
    screenClear(t + 22);
    await screenDraw('warning.gif', { time: t + 22.0625 });
    screenClear(t + 22.25);
    await screenDraw('warning.gif', { time: t + 22.3125 });
    screenClear(t + 22.5);

    addEvents(
        {
            _time: t + 23,
            _type: 12,
        },
        {
            _time: t + 23,
            _type: 13,
        }
    );
    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 7; i++) {
            addEvents(
                {
                    _time: t + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 2,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 3,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 2,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 3,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 2,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25 + 23,
                    _type: 3,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                }
            );
        }
    }
    for (let j = 0; j < 3; j++) {
        bsmap.utils.shuffle(roadShuffle);
        for (const x in roadShuffle) {
            addEvents(
                {
                    _type: 4,
                    _time: 23 + t + (parseInt(x) / roadShuffle.length) * 0.25 + j * 0.25,
                    _value: 7,
                    _customData: { _lightID: roadShuffle[x] },
                },
                {
                    _type: 4,
                    _time: 23.1875 + t + (parseInt(x) / roadShuffle.length) * 0.25 + j * 0.25,
                    _floatValue: 0,
                    _customData: { _lightID: roadShuffle[x] },
                }
            );
        }
    }
    for (let i = 0; i < 4; i++) {
        await screenDraw('my.gif', { time: t + 23.0625 + i * 0.125, invert: i === 3 });
        screenClear(t + 23.125 + i * 0.125);
    }
    await screenDraw('myglitch.gif', { time: t + 23.875, invert: true });
    screenClear(t + 23.9375);

    for (let i = 0; i < 12; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length) {
            _lightID.push(roadOrder[0 + j]);
            j += bsmap.utils.random(4, 8, true);
        }
        addEvents(
            {
                _time: t + 24 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 24.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
        const random = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand = [random];
        const random2 = Math.floor(bsmap.utils.random(1, 7));
        const lightIDrand2 = [random2];
        if (random < 7) {
            lightIDrand.push(random + 1);
        }
        if (random2 < 7) {
            lightIDrand2.push(random2 + 1);
        }
        addEvents(
            {
                _time: t + 24 + i / 2,
                _type: 12,
                _value: bsmap.utils.random(1, 5, true),
            },
            {
                _time: t + 24 + i / 2,
                _type: 13,
                _value: bsmap.utils.random(1, 5, true),
            },
            {
                _time: t + 24 + i / 2,
                _type: 2,
                _value: 2,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 24.25 + i / 2,
                _type: 2,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand },
            },
            {
                _time: t + 24 + i / 2,
                _type: 3,
                _value: 2,
                _customData: { _lightID: lightIDrand2 },
            },
            {
                _time: t + 24.25 + i / 2,
                _type: 3,
                _floatValue: 0,
                _customData: { _lightID: lightIDrand2 },
            }
        );
    }
    {
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
                    addEvents({
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
        await screenDraw('enemy.gif', { time: t + 25.375 });
        screenClear(t + 25.4375);
        await screenDraw('enemy.gif', { time: t + 25.5, invert: true });
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
                    addEvents({
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

    addEvents(
        {
            _time: t + 30,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 30,
            _type: 13,
            _value: 1,
        }
    );
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + 30 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 30 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 2,
                _customData: { _lightID: i },
            },
            {
                _time: t + 30.125 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 30.125 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 5,
                _floatValue: 0.5,
                _customData: { _lightID: i },
            },
            {
                _time: t + 30.375 + ((i - 1) / 7) * 0.5,
                _type: 2,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 30.375 + ((i - 1) / 7) * 0.5,
                _type: 3,
                _value: 8,
                _floatValue: 0,
                _customData: { _lightID: i },
            }
        );
    }
    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 30 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 0.25 + t + 30 + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
    }
    await screenDraw('swordglitch.gif', { time: t + 30 });
    await screenDraw('sword.gif', { time: t + 30.0625 });
    screenClear(t + 30.375);
    chorus1flipFlop = !chorus1flipFlop;
}
let chorus2flipFlop = false;
for (const t of chorus2Timing) {
    for (const x in roadOrder) {
        addEvents(
            {
                _time: t - 0.5 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t - 0.4375 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 0,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t - 0.375 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t + 3.5 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t + 3.5625 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 0,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            },
            {
                _time: t + 3.625 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _customData: {
                    _lightID: roadOrder[roadOrder.length - 1 - parseInt(x)],
                },
            }
        );
    }
    for (let i = 0; i < 2; i++) {
        addEvents(
            {
                _time: t + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 4 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            },
            {
                _time: t + 10 + 0.1875 * i,
                _type: 4,
                _value: 3,
                _customData: { _lightID: [centerOrder[4 + i], centerOrder[1 - i]] },
            }
        );
    }
    for (const ivt of chorus2Vocal) {
        const e = ivt[0];
        if (!ivt[1]) {
            addEvents(
                {
                    _type: 4,
                    _time: t + e,
                    _value: 3,
                    _customData: { _lightID: [1, 2] },
                },
                {
                    _type: 4,
                    _time: 0.25 + t + e,
                    _floatValue: 0,
                    _customData: { _lightID: [1, 2] },
                }
            );
        } else {
            for (let i = 0; i < ivt[1]; i += 0.125) {
                addEvents(
                    {
                        _type: 4,
                        _time: t + i + e,
                        _value: 3,
                        _customData: { _lightID: [1, 2] },
                    },
                    {
                        _type: 4,
                        _time: 0.0625 + t + i + e,
                        _floatValue: 0,
                        _customData: { _lightID: [1, 2] },
                    }
                );
            }
        }
    }
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.375 - 0.5,
                _type: 2,
                _value: 3,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.375 - 0.5,
                _type: 3,
                _value: 3,
                _customData: { _lightID: 8 - i },
            }
        );
    }

    addEvents(
        {
            _time: t - 0.5,
            _type: 12,
        },
        {
            _time: t - 0.5,
            _type: 13,
        }
    );
    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 7; i++) {
            addEvents(
                {
                    _time: t + (i - 1) / 7 + j * 0.25,
                    _type: 2,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + (i - 1) / 7 + j * 0.25,
                    _type: 3,
                    _value: 2,
                    _floatValue: 1.25,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25,
                    _type: 2,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.125 + (i - 1) / 7 + j * 0.25,
                    _type: 3,
                    _value: 1,
                    _floatValue: 0.5,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25,
                    _type: 2,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 0.375 + (i - 1) / 7 + j * 0.25,
                    _type: 3,
                    _value: 8,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                }
            );
        }
    }
    addEvents(
        {
            _time: t,
            _type: 12,
            _value: 1,
        },
        {
            _time: t - 0.001,
            _type: 13,
            _value: 1,
        }
    );
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            bsmap.utils.shuffle(roadShuffle);
            for (const x in roadShuffle) {
                addEvents(
                    {
                        _type: 4,
                        _time: t + i * 4 + (parseInt(x) / roadShuffle.length) * 1.25 + j * 0.25,
                        _value: 7,
                        _customData: { _lightID: roadShuffle[x] },
                    },
                    {
                        _type: 4,
                        _time: 0.25 + t + i * 4 + (parseInt(x) / roadShuffle.length) * 1.25 + j * 0.25,
                        _floatValue: 0,
                        _customData: { _lightID: roadShuffle[x] },
                    }
                );
            }
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

    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + 2.25 + ((i - 1) / 7) * 0.75,
                _type: 2,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 2.25 + ((i - 1) / 7) * 0.75,
                _type: 3,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 2.5 + ((i - 1) / 7) * 0.75,
                _type: 2,
                _value: 4,
                _customData: { _lightID: i, _easing: 'easeInQuad' },
            },
            {
                _time: t + 2.5 + ((i - 1) / 7) * 0.75,
                _type: 3,
                _value: 4,
                _customData: { _lightID: i, _easing: 'easeInQuad' },
            },
            {
                _time: t + 2.75 + ((i - 1) / 7) * 0.75,
                _type: 2,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: i, _easing: 'easeOutQuad' },
            },
            {
                _time: t + 2.75 + ((i - 1) / 7) * 0.75,
                _type: 3,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: i, _easing: 'easeOutQuad' },
            }
        );
    }
    addEvents(
        {
            _time: t + 2.25,
            _type: 12,
        },
        {
            _time: t + 2.25,
            _type: 13,
        }
    );
    await screenDraw('fearglitch.gif', { time: t + 2.5, rotate: 180, invert: true });
    await screenDraw('fearglitch.gif', { time: t + 2.5625 });
    await screenDraw('fear.gif', { time: t + 2.625 });
    screenClear(t + 3.25);

    addEvents(
        {
            _time: t + 3.5,
            _type: chorus2flipFlop ? 3 : 2,
            _value: 2,
            _customData: { _lightID: [3, 4, 5] },
        },
        {
            _time: t + 3.75,
            _type: chorus2flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [3, 4, 5] },
        }
    );
    await screenDraw('isglitch.gif', { time: t + 3.5 });
    await screenDraw('is.gif', { time: t + 3.5625 });
    screenClear(t + 3.875);

    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 7; i++) {
            addEvents(
                {
                    _time: t + 4 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 3 : 2,
                    _floatValue: 0,
                    _customData: { _lightID: 8 - i },
                },
                {
                    _time: t + 4.5 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 2 : 3,
                    _floatValue: 0,
                    _customData: { _lightID: i },
                },
                {
                    _time: t + 4.25 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 3 : 2,
                    _value: 4,
                    _floatValue: 1.25,
                    _customData: { _lightID: 8 - i, _easing: 'easeInQuad' },
                },
                {
                    _time: t + 4.75 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 2 : 3,
                    _value: 4,
                    _floatValue: 1.25,
                    _customData: { _lightID: i, _easing: 'easeInQuad' },
                },
                {
                    _time: t + 4.5 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 3 : 2,
                    _value: 4,
                    _floatValue: 0,
                    _customData: { _lightID: 8 - i, _easing: 'easeOutQuad' },
                },
                {
                    _time: t + 5 + ((i - 1) / 7) * 0.75 + j * 0.25,
                    _type: chorus2flipFlop ? 2 : 3,
                    _value: 4,
                    _floatValue: 0,
                    _customData: { _lightID: i, _easing: 'easeOutQuad' },
                }
            );
        }
    }
    addEvents(
        {
            _time: t + 3.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: t + 4,
            _type: 13,
            _value: 1,
        }
    );
    await screenDraw('more.gif', { time: t + 4, invert: true });
    await screenDraw('more.gif', { time: t + 4.0625 });
    screenClear(t + 4.375);

    await screenDraw('than.gif', { time: t + 4.5 });
    screenClear(t + 4.875);

    await screenDraw('i.gif', { time: t + 5 });
    screenClear(t + 5.375);

    await screenDraw('canglitch.gif', { time: t + 5.5, invert: true });
    await screenDraw('canglitch.gif', { time: t + 5.5625, rotate: 180 });
    screenClear(t + 5.625);
    await screenDraw('can.gif', { time: t + 5.6875 });
    screenClear(t + 6, 0.375);

    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + 6.25 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 3 : 2,
                _floatValue: 0,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + 6.75 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 2 : 3,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + 6.5 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 3 : 2,
                _value: 4,
                _floatValue: 1.25,
                _customData: { _lightID: 8 - i, _easing: 'easeInQuad' },
            },
            {
                _time: t + 7 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 2 : 3,
                _value: 4,
                _floatValue: 1.25,
                _customData: { _lightID: i, _easing: 'easeInQuad' },
            },
            {
                _time: t + 6.75 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 3 : 2,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: 8 - i, _easing: 'easeOutQuad' },
            },
            {
                _time: t + 7.25 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 2 : 3,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: i, _easing: 'easeOutQuad' },
            },
            {
                _time: t + 6.875 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 3 : 2,
                _floatValue: 0,
                _customData: { _lightID: 8 - i, _easing: 'easeOutQuad' },
            },
            {
                _time: t + 7.375 + ((i - 1) / 7) * 0.5,
                _type: chorus2flipFlop ? 2 : 3,
                _floatValue: 0,
                _customData: { _lightID: i, _easing: 'easeOutQuad' },
            }
        );
    }
    addEvents(
        {
            _time: t + 6.25,
            _type: 12,
        },
        {
            _time: t + 6.25,
            _type: 13,
        }
    );
    await screenDraw('takeglitch.gif', { time: t + 6.5 });
    await screenDraw('take.gif', { time: t + 6.5625 });
    screenClear(t + 7, 0.5);

    addEvents(
        {
            _time: t + 8,
            _type: chorus2flipFlop ? 2 : 3,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 8.25,
            _type: chorus2flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 8.5,
            _type: chorus2flipFlop ? 2 : 3,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 8.75,
            _type: chorus2flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 9,
            _type: chorus2flipFlop ? 3 : 2,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 9.25,
            _type: chorus2flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 9.5,
            _type: chorus2flipFlop ? 3 : 2,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 9.75,
            _type: chorus2flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        }
    );

    for (let i = 0; i < 4; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length) {
            _lightID.push(roadOrder[0 + j]);
            j += bsmap.utils.random(4, 8, true);
        }
        addEvents(
            {
                _time: t + 8 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 8.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    await screenDraw('when.gif', { time: t + 8 });
    screenClear(t + 8.375);

    await screenDraw('ims.gif', { time: t + 8.5 });
    screenClear(t + 8.875);

    await screenDraw('up.gif', { time: t + 9 });
    screenClear(t + 9.375);

    await screenDraw('against.gif', { time: t + 9.5 });
    await screenDraw('againstglitch.gif', { time: t + 9.875 });
    screenClear(t + 9.9375);
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.375 + 10,
                _type: 2,
                _value: 3,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.375 + 10,
                _type: 3,
                _value: 3,
                _customData: { _lightID: i },
            }
        );
    }
    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 10 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 7,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: 10.25 + t + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
    }
    await screenDraw('against.gif', { time: t + 10, invert: true });
    screenClear(t + 10.375, 0.5);

    for (let i = 3; i <= 5; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.25 + 11.5,
                _type: 2,
                _value: 1,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 11.5,
                _type: 3,
                _value: 1,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 12,
                _type: 2,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 12,
                _type: 3,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: i },
            }
        );
    }
    await screenDraw('echoglitch.gif', { time: t + 11.5 });
    await screenDraw('echo.gif', { time: t + 11.625 });
    screenClear(t + 12.25);
    for (let i = 1; i <= 3; i++) {
        addEvents(
            {
                _time: t + ((i - 1) / 7) * 0.25 + 12.5,
                _type: 2,
                _value: 1,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 12.5,
                _type: 3,
                _value: 1,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 13,
                _type: 2,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: 8 - i },
            },
            {
                _time: t + ((i - 1) / 7) * 0.25 + 13,
                _type: 3,
                _value: 4,
                _floatValue: 0,
                _customData: { _lightID: 8 - i },
            }
        );
    }
    for (const x in roadOrder) {
        addEvents(
            {
                _time: t + 11.5 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 2,
                _customData: {
                    _lightID: roadOrder[parseInt(x)],
                },
            },
            {
                _time: t + 11.625 + (parseInt(x) / roadOrder.length) * 0.5,
                _type: 4,
                _value: 0,
                _customData: {
                    _lightID: roadOrder[parseInt(x)],
                },
            }
        );
    }
    bsmap.utils.shuffle(roadShuffle);
    for (const x in roadShuffle) {
        addEvents(
            {
                _type: 4,
                _time: t + 12.25 + (parseInt(x) / roadShuffle.length) * 0.5,
                _value: 3,
                _customData: { _lightID: roadShuffle[x] },
            },
            {
                _type: 4,
                _time: t + 12.5 + (parseInt(x) / roadShuffle.length) * 0.5,
                _floatValue: 0,
                _customData: { _lightID: roadShuffle[x] },
            }
        );
    }
    for (let i = 0; i < 4; i++) {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length) {
            _lightID.push(roadOrder[0 + j]);
            j += bsmap.utils.random(4, 8, true);
        }
        addEvents(
            {
                _time: t + 13 + i / 2,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: t + 13.25 + i / 2,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    await screenDraw('echoglitch.gif', { time: t + 12.5, rotate: 180 });
    await screenDraw('echo.gif', { time: t + 12.5625, invert: true });
    await screenDraw('echo.gif', { time: t + 12.625 });
    screenClear(t + 12.875);

    addEvents(
        {
            _time: t + 13,
            _type: chorus2flipFlop ? 2 : 3,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 13.25,
            _type: chorus2flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 13.5,
            _type: chorus2flipFlop ? 3 : 2,
            _value: 2,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 13.75,
            _type: chorus2flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [2, 3] },
        },
        {
            _time: t + 14,
            _type: chorus2flipFlop ? 2 : 3,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 14.25,
            _type: chorus2flipFlop ? 2 : 3,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 14.5,
            _type: chorus2flipFlop ? 3 : 2,
            _value: 2,
            _customData: { _lightID: [5, 6] },
        },
        {
            _time: t + 14.75,
            _type: chorus2flipFlop ? 3 : 2,
            _floatValue: 0,
            _customData: { _lightID: [5, 6] },
        }
    );
    await screenDraw('in.gif', { time: t + 13 });
    screenClear(t + 13.375);

    await screenDraw('the.gif', { time: t + 13.5 });
    screenClear(t + 13.875);

    await screenDraw('mirrorglitch.gif', { time: t + 14, rotate: 180 });
    await screenDraw('mirror.gif', { time: t + 14.125 });
    await screenDraw('mirrorglitchflip.gif', { time: t + 14.375 });
    await screenDraw('mirrorflip.gif', { time: t + 14.5 });
    screenClear(t + 14.875);
    chorus2flipFlop = !chorus2flipFlop;
}

const echoTiming = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.75, 7.5, 8.25, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5,
];
await screenDraw('echoglitch.gif', { time: 132, invert: true });
await screenDraw('echoglitch.gif', { time: 132.0625, rotate: 180 });
await screenDraw('echo.gif', { time: 132.125 });
screenClear(132.875);
await screenDraw('echoglitch.gif', { time: 133 });
await screenDraw('echo.gif', { time: 133.0625 });
await screenDraw('echo.gif', { time: 133.6875, invert: true });
screenClear(133.75);
for (let i = 1; i <= 7; i++) {
    addEvents(
        {
            _time: 132 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 2,
            _floatValue: 1.25,
            _customData: { _lightID: i },
        },
        {
            _time: 132 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 2,
            _floatValue: 1.25,
            _customData: { _lightID: i },
        },
        {
            _time: 132.125 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 1,
            _floatValue: 0.5,
            _customData: { _lightID: i },
        },
        {
            _time: 132.125 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 1,
            _floatValue: 0.5,
            _customData: { _lightID: i },
        },
        {
            _time: 132.375 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 8,
            _floatValue: 0,
            _customData: { _lightID: i },
        },
        {
            _time: 132.375 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 8,
            _floatValue: 0,
            _customData: { _lightID: i },
        },
        {
            _time: 133 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 2,
            _floatValue: 1.25,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 133 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 2,
            _floatValue: 1.25,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 133.125 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 1,
            _floatValue: 0.5,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 133.125 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 1,
            _floatValue: 0.5,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 133.375 + ((i - 1) / 7) * 0.5,
            _type: 2,
            _value: 8,
            _floatValue: 0,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 133.375 + ((i - 1) / 7) * 0.5,
            _type: 3,
            _value: 8,
            _floatValue: 0,
            _customData: { _lightID: 8 - i },
        },
        {
            _time: 132 + ((i - 1) / 7) * 0.5,
            _type: 12,
            _value: 1,
            _customData: {
                _lockPosition: true,
                _preciseSpeed: (i / 7) * 4,
                _direction: 0,
            },
        },
        {
            _time: 132 + ((i - 1) / 7) * 0.5,
            _type: 13,
            _value: 1,
            _customData: {
                _lockPosition: true,
                _preciseSpeed: (i / 7) * 4,
                _direction: 0,
            },
        }
    );
}
addEvents(
    {
        _time: 131.999,
        _type: 12,
    },
    {
        _time: 131.999,
        _type: 13,
    },
    {
        _time: 133,
        _type: 12,
        _value: 1,
    },
    {
        _time: 133,
        _type: 13,
        _value: 1,
    },
    {
        _type: 4,
        _time: 132,
        _value: 3,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[5]],
        },
    },
    {
        _type: 4,
        _time: 132.25,
        _value: 3,
        _customData: {
            _lightID: [centerOrder[1], centerOrder[4]],
        },
    },
    {
        _type: 4,
        _time: 132.5,
        _value: 3,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 132.625,
        _floatValue: 0,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[5]],
        },
    },
    {
        _type: 4,
        _time: 132.75,
        _floatValue: 0,
        _customData: {
            _lightID: [centerOrder[1], centerOrder[4]],
        },
    },
    {
        _type: 4,
        _time: 132.875,
        _floatValue: 0,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133,
        _value: 3,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133.25,
        _value: 3,
        _customData: {
            _lightID: [centerOrder[1], centerOrder[4]],
        },
    },
    {
        _type: 4,
        _time: 133.5,
        _value: 3,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[5]],
        },
    },
    {
        _type: 4,
        _time: 133.625,
        _floatValue: 0,
        _customData: {
            _lightID: [1, 2],
        },
    },
    {
        _type: 4,
        _time: 133.75,
        _floatValue: 0,
        _customData: {
            _lightID: [centerOrder[1], centerOrder[4]],
        },
    },
    {
        _type: 4,
        _time: 133.875,
        _floatValue: 0,
        _customData: {
            _lightID: [centerOrder[0], centerOrder[5]],
        },
    }
);
for (const x in roadOrder) {
    addEvents(
        {
            _type: 4,
            _time: 132 + (parseInt(x) / roadOrder.length) * 0.875,
            _value: 3,
            _customData: { _lightID: roadOrder[x] },
        },
        {
            _type: 4,
            _time: 133.75 - (parseInt(x) / roadOrder.length) * 0.75,
            _value: 3,
            _floatValue: 0.75,
            _customData: { _lightID: roadOrder[x] },
        }
    );
}
for (const e of echoTiming) {
    if (e === 2 || e === 6 || e === 11) {
        await screenDraw('echoglitch.gif', { time: 134 + e });
        await screenDraw('echo.gif', { time: 134.125 + e });
        screenClear(134.25 + e);
    } else if (e === 2.5 || e === 5 || e === 10) {
        await screenDraw('echo.gif', { time: 134 + e, invert: true });
        await screenDraw('echoglitch.gif', {
            time: 134.0625 + e,
            invert: true,
            rotate: 180,
        });
        await screenDraw('echo.gif', { time: 134.125 + e });
        screenClear(134.25 + e);
    } else if (e === 3 || e === 6.75 || e === 7.5 || e === 8.25) {
        await screenDraw('echo.gif', { time: 134 + e });
        screenClear(134.125 + e, 0.25);
    } else if (e === 4 || e === 12) {
        await screenDraw('echo.gif', { time: 134 + e, invert: true });
        await screenDraw('echoglitch.gif', { time: 134.125 + e });
        screenClear(134.25 + e);
    } else if (e === 9 || e == 13) {
        await screenDraw('echo.gif', { time: 134 + e });
        await screenDraw('echoglitch.gif', { time: 134.125 + e });
        screenClear(134.25 + e);
    } else {
        await screenDraw('echo.gif', { time: 134 + e });
        screenClear(134.25 + e);
    }
    {
        let j = bsmap.utils.random(1, 5, true);
        const _lightID: number[] = [];
        while (j < roadOrder.length - 1) {
            _lightID.push(roadOrder[0 + j], roadOrder[1 + j]);
            j += bsmap.utils.random(4, 10, true);
        }
        addEvents(
            {
                _time: e + 134,
                _type: 4,
                _value: 2,
                _customData: { _lightID },
            },
            {
                _time: e + 134.25,
                _type: 4,
                _value: 0,
                _customData: { _lightID },
            }
        );
    }
    const random = Math.floor(bsmap.utils.random(1, 7));
    const lightIDrand = [random];
    const random2 = Math.floor(bsmap.utils.random(1, 7));
    const lightIDrand2 = [random2];
    if (random < 7) {
        lightIDrand.push(random + 1);
    }
    if (random2 < 7) {
        lightIDrand2.push(random2 + 1);
    }
    addEvents(
        {
            _time: 134 + e,
            _type: 12,
            _value: bsmap.utils.random(1, 5, true),
        },
        {
            _time: 134 + e,
            _type: 13,
            _value: bsmap.utils.random(1, 5, true),
        },
        {
            _time: 134 + e,
            _type: 2,
            _value: 2,
            _customData: { _lightID: lightIDrand },
        },
        {
            _time: 134.0625 + e,
            _type: 2,
            _floatValue: 0,
            _customData: { _lightID: lightIDrand },
        },
        {
            _time: 134.125 + e,
            _type: 2,
            _value: 2,
            _customData: { _lightID: lightIDrand },
        },
        {
            _time: 134.1875 + e,
            _type: 2,
            _floatValue: 0,
            _customData: { _lightID: lightIDrand },
        },
        {
            _time: 134 + e,
            _type: 3,
            _value: 2,
            _customData: { _lightID: lightIDrand2 },
        },
        {
            _time: 134.0625 + e,
            _type: 3,
            _value: 2,
            _customData: { _lightID: lightIDrand2 },
        },
        {
            _time: 134.125 + e,
            _type: 3,
            _floatValue: 0,
            _customData: { _lightID: lightIDrand2 },
        },
        {
            _time: 134.1875 + e,
            _type: 3,
            _floatValue: 0,
            _customData: { _lightID: lightIDrand2 },
        }
    );
    addEvents(
        {
            _type: 4,
            _time: 133.875 + e,
            _floatValue: 0,
            _customData: {
                _lightID: [1, 2],
            },
        },
        {
            _type: 4,
            _time: 134 + e,
            _floatValue: 0,
            _customData: {
                _lightID: [centerOrder[1], centerOrder[4]],
            },
        },
        {
            _type: 4,
            _time: 134.125 + e,
            _floatValue: 0,
            _customData: {
                _lightID: [centerOrder[0], centerOrder[5]],
            },
        },
        {
            _type: 4,
            _time: 134 + e,
            _value: 3,
            _customData: {
                _lightID: [1, 2],
            },
        },
        {
            _type: 4,
            _time: 134.125 + e,
            _value: 3,
            _customData: {
                _lightID: [centerOrder[1], centerOrder[4]],
            },
        },
        {
            _type: 4,
            _time: 134.25 + e,
            _value: 3,
            _customData: {
                _lightID: [centerOrder[0], centerOrder[5]],
            },
        }
    );
}

for (let i = 0; i < 11; i++) {
    await screenDraw('questionmark.gif', { time: 284 + i * 0.75 });
    screenClear(284.25 + i * 0.75);
}

for (let t = 164; t < 196; t += 4) {
    let randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125);
    randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t + 0.0625,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125 + 0.0625);
    await screenDraw('smile.gif', {
        time: t + 0.125,
        xOffset: 11,
        yOffset: 5,
    });
}
screenClear(195.875);
await screenDraw('eyeclose3.gif', { time: 196 });
await screenDraw('eyeclose2.gif', { time: 198.25 });
await screenDraw('eyeclose1.gif', { time: 198.625 });
await screenDraw('eyeclose0.gif', { time: 199 });
await screenDraw('eye.gif', { time: 199.375 });
await screenDraw('eyeclose0.gif', { time: 201 });
await screenDraw('eyeclose1.gif', { time: 201.375 });
await screenDraw('eyeclose2.gif', { time: 201.75 });
await screenDraw('eyeclose3.gif', { time: 202.125 });
await screenDraw('eyeclose2.gif', { time: 202.5 });
await screenDraw('eyeclose1.gif', { time: 202.875 });
await screenDraw('eyeclose0.gif', { time: 203.25 });
await screenDraw('eye.gif', { time: 203.625 });
await screenDraw('eyel.gif', { time: 205 });
await screenDraw('eyell.gif', { time: 205.375 });
await screenDraw('eyel.gif', { time: 206.125 });
await screenDraw('eye.gif', { time: 206.5 });
await screenDraw('eyer.gif', { time: 206.875 });
await screenDraw('eyerr.gif', { time: 207.25 });
await screenDraw('eyer.gif', { time: 208 });
await screenDraw('eye.gif', { time: 208.375 });
await screenDraw('eyeclose0.gif', { time: 210 });
await screenDraw('eyeclose1.gif', { time: 210.375 });
await screenDraw('eyeclose2.gif', { time: 210.75 });
await screenDraw('eyeclose3.gif', { time: 211.125 });
screenClear(211.75);
const eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeTiming = [
    [148, 8, 0],
    [156, 4, 1],
    [160, 0.5, 2],
    [160.75, 0.5, 2],
    [161.5, 0.25, 2],
    [162, 0.25, 2],
    [162.5, 0.5, 2],
    [163.25, 0.5, 2],
];
const eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeID = [
    [1, 3],
    [2, 4, 6],
    [1, 3, 5, 7],
];
await screenDraw('testcard2.gif', { time: 160, invert: true });
screenClear(160.0625);
await screenDraw('testcard2.gif', { time: 160.125 });
await screenDraw('testcard2.gif', { time: 160.1875, eventValue: 3, override: true });
screenClear(160.5);
await screenDraw('testcard2.gif', { time: 160.75, eventValue: 3 });
screenClear(161.25);
await screenDraw('testcard2.gif', { time: 161.5 });
screenClear(161.5625);
await screenDraw('testcard2.gif', { time: 161.625, invert: true });
screenClear(161.8125);
await screenDraw('testcard.gif', { time: 162, invert: true });
screenClear(162.25);
await screenDraw('testcard.gif', { time: 162.5 });
await screenDraw('testcard2.gif', { time: 162.5625, invert: true });
screenClear(162.625);
await screenDraw('testcard.gif', { time: 162.6875 });
screenClear(162.75);
await screenDraw('testcard.gif', { time: 163.25, eventValue: 3, invert: true });
screenClear(163.375);
addEvents(
    {
        _time: 148,
        _type: 12,
    },
    {
        _time: 148,
        _type: 13,
    }
);
for (const et of eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeTiming) {
    for (let t = et[0]; t < et[0] + et[1] - 0.0625; t += 0.0625) {
        if ((et[0] === 148 || et[0] === 156) && Math.random() > 0.125) {
            if (t === 156) {
                screenClear(t - 0.0625);
            }
            await screenDraw('testcard2.gif', {
                time: t,
                eventValue: 3,
                override: true,
            });
            await screenDraw('testcard2.gif', {
                time: t + 0.03125,
                eventValue: 1,
                override: true,
            });
        }
        const lid = eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeID[et[2]];
        for (let i = 0; i < lid.length; i++) {
            addEvents(
                {
                    _time: t + i * 0.03125,
                    _type: 2,
                    _value: 6,
                    _customData: { _lightID: lid[i] },
                },
                {
                    _time: t + i * 0.03125,
                    _type: 3,
                    _value: 6,
                    _customData: { _lightID: lid[i] },
                },
                {
                    _time: t + 0.03125 + i * 0.03125,
                    _type: 2,
                    _customData: { _lightID: lid[i] },
                },
                {
                    _time: t + 0.03125 + i * 0.03125,
                    _type: 3,
                    _customData: { _lightID: lid[i] },
                }
            );
        }
    }
}
const iHateThisSynthTiming = [
    [164.5, 1],
    [165, 0],
    [165.5, 3],
    [166, 0],
    [166.5, 2],
    [167, 5],
    [167.5, 4],
    [169, 2],
    [169.75, 2],
    [170.5, 2],
    [171, 3],
    [171.5, 4],
    [176, 4],
    [176.25, 2],
    [176.5, 1],
    [176.75, 4],
    [177, 2],
    [177.25, 1],
    [179, 1],
    [179.5, 0],
    [181, 4],
    [181.25, 3],
    [181.5, 2],
    [182, 4],
    [182.5, 3],
    [183, 2],
    [184.5, 3],
    [184.75, 2],
    [185, 1],
    [185.25, 0],
    [186, 3],
    [186.5, 1],
    [187, 2],
    [187.5, 3],
    [188, 4],
    [188.5, 4],
    [189.25, 4],
    [189.75, 2],
    [190, 3],
    [190.5, 4],
    [191, 5],
    [192, 3],
    [192.5, 1],
    [193, 4],
    [193.5, 2],
];
for (const ihtst of iHateThisSynthTiming) {
    addEvents(
        {
            _time: ihtst[0],
            _type: 2,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0],
            _type: 3,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.0625,
            _type: 2,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.0625,
            _type: 3,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.125,
            _type: 2,
            _value: 6,
            _floatValue: 1,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.125,
            _type: 3,
            _value: 6,
            _floatValue: 1,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.1875,
            _type: 2,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        },
        {
            _time: ihtst[0] + 0.1875,
            _type: 3,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + ihtst[1], 2 + ihtst[1]] },
        }
    );
}
const iHateThisSynthTiming2 = [
    [172, 1, 0],
    [173, 1, 1],
    [174, 1, 2],
    [175, 1, 3],
    [177.5, 0.5, 0],
    [178.25, 0.5, 3],
    [180, 1, 1],
    [183.5, 1, 2],
    [194, 0.5, 1],
    [195, 0.5, 3],
];
const iHateThisSynthLaser = [
    [164.5, 1],
    [165, 0],
    [167, 1],
    [169, 0],
    [171, 1],
    [171.5, 0],
    [176, 1],
    [176.25, 0],
    [176.75, 1],
    [177, 0],
    [181, 0],
    [182, 1],
    [183, 0],
    [184.5, 0],
    [184.75, 1],
    [185, 0],
    [185.25, 1],
    [186, 0],
    [188, 1],
    [188.5, 1],
    [189.25, 1],
    [189.75, 0],
    [190, 1],
    [190.5, 0],
    [191, 1],
    [192, 0],
    [192.5, 1],
    [193, 0],
    [193.5, 1],
];
const iHateThisSynthID = [
    [1, 2, 4, 6, 7],
    [2, 3, 5, 6],
    [1, 3, 5, 7],
    [1, 2, 6, 7],
];
for (const ihtsl of iHateThisSynthLaser) {
    addEvents(
        {
            _type: 12,
            _time: ihtsl[0],
            _value: ihtsl[1],
        },
        {
            _type: 13,
            _time: ihtsl[0],
            _value: ihtsl[1],
        }
    );
}
for (const ihtst of iHateThisSynthTiming2) {
    for (let t = ihtst[0]; t < ihtst[0] + ihtst[1] - 0.0625; t += 0.0625) {
        addEvents(
            {
                _type: 2,
                _time: t,
                _value: 7,
                _customData: {
                    _lightID: iHateThisSynthID[ihtst[2]],
                },
            },
            {
                _type: 2,
                _time: t + 0.03125,
                _customData: {
                    _lightID: iHateThisSynthID[ihtst[2]],
                },
            },
            {
                _type: 3,
                _time: t,
                _value: 7,
                _customData: {
                    _lightID: iHateThisSynthID[ihtst[2]],
                },
            },
            {
                _type: 3,
                _time: t + 0.03125,
                _customData: {
                    _lightID: iHateThisSynthID[ihtst[2]],
                },
            }
        );
    }
    addEvents(
        {
            _type: 12,
            _time: ihtst[0],
            _value: ihtst[2] % 2 ? 0 : 1,
        },
        {
            _type: 13,
            _time: ihtst[0],
            _value: ihtst[2] % 2 ? 0 : 1,
        }
    );
}

const synthTiming = [
    [213, 5],
    [213.5, 4],
    [214, 3],
    [214.5, 2],
    [215, 1],
    [215.5, 0],
    [216.5, 0],
    [217, 5],
    [217.5, 4],
    [218, 3],
    [218.5, 2],
    [219, 1],
    [219.5, 0],
    [221, 5],
    [221.5, 4],
    [222, 3],
    [222.5, 2],
    [223, 1],
    [223.5, 0],
    [224.5, 5],
    [225, 5],
    [225.5, 4],
    [226, 3],
    [226.5, 2],
    [227, 1],
    [227.5, 0],
    [229, 5],
    [229.5, 4],
    [230, 3],
    [230.5, 2],
    [231, 1],
    [231.5, 0],
    [232.5, 0],
    [233, 5],
    [233.5, 4],
    [234, 3],
    [234.5, 2],
    [235, 1],
    [235.5, 0],
    [237, 5],
    [237.5, 4],
    [238, 3],
    [238.5, 2],
    [239, 1],
    [239.5, 0],
    [245, 5],
    [245.5, 4],
    [246, 3],
    [246.5, 2],
    [247, 1],
    [247.5, 0],
    [248.5, 0],
    [249, 5],
    [249.5, 4],
    [250, 3],
    [250.5, 2],
    [251, 1],
    [251.5, 0],
    [253, 5],
    [253.5, 4],
    [254, 3],
    [254.5, 2],
    [255, 1],
    [255.5, 0],
    [256.5, 5],
    [257, 5],
    [257.5, 4],
    [258, 3],
    [258.5, 2],
    [259, 1],
    [259.5, 0],
    [261, 5],
    [261.5, 4],
    [262, 3],
    [262.5, 2],
    [263, 1],
    [263.5, 0],
    [264.5, 0],
    [265, 5],
    [265.5, 4],
    [266, 3],
    [266.5, 2],
    [267, 1],
    [267.5, 0],
    [269, 5],
    [269.5, 4],
    [270, 3],
    [270.5, 2],
    [271, 1],
    [271.5, 0],
    [272.5, 5],
    [273, 5],
    [273.5, 4],
    [274, 3],
    [274.5, 2],
    [275, 1],
    [275.5, 0],
    [293, 5],
    [293.5, 4],
    [294, 3],
    [294.5, 2],
    [295, 1],
    [295.5, 0],
    [296.5, 0],
    [297, 5],
    [297.5, 4],
    [298, 3],
    [298.5, 2],
    [299, 1],
    [299.5, 0],
    [301, 5],
    [301.5, 4],
    [302, 3],
    [302.5, 2],
    [303, 1],
    [303.5, 0],
    [304.5, 5],
    [305, 5],
    [305.5, 4],
    [306, 3],
    [306.5, 2],
    [307, 1],
    [307.5, 0],
    [485, 5],
    [485.5, 4],
    [486, 3],
    [486.5, 2],
    [487, 1],
    [487.5, 0],
    [488.5, 0],
    [489, 5],
    [489.5, 4],
    [490, 3],
    [490.5, 2],
    [491, 1],
    [491.5, 0],
    [493, 5],
    [493.5, 4],
    [494, 3],
    [494.5, 2],
    [495, 1],
    [495.5, 0],
    [496.5, 5],
    [497, 5],
    [497.5, 4],
    [498, 3],
    [498.5, 2],
    [499, 1],
    [499.5, 0],
    [501, 5],
    [501.5, 4],
    [502, 3],
    [502.5, 2],
    [503, 1],
    [503.5, 0],
    [504.5, 0],
    [505, 5],
    [505.5, 4],
    [506, 3],
    [506.5, 2],
    [507, 1],
    [507.5, 0],
    [509, 5],
    [509.5, 4],
    [510, 3],
    [510.5, 2],
    [511, 1],
    [511.5, 0],
    [512.5, 5],
    [513, 5],
    [513.5, 4],
    [514, 3],
    [514.5, 2],
    [515, 1],
    [515.5, 0],
];
const synthDownTiming = [212, 220, 228, 236, 244, 252, 260, 268, 292, 300, 484, 492, 500, 508];
for (const sdt of synthDownTiming) {
    for (let i = 1; i <= 7; i++) {
        addEvents(
            {
                _time: sdt + ((i - 1) / 7) * 0.375,
                _type: 2,
                _value: 2,
                _floatValue: 2,
                _customData: { _lightID: i },
            },
            {
                _time: sdt + ((i - 1) / 7) * 0.375,
                _type: 3,
                _value: 2,
                _floatValue: 2,
                _customData: { _lightID: i },
            },
            {
                _time: sdt + 0.03125 + ((i - 1) / 7) * 0.375,
                _type: 2,
                _value: 7,
                _customData: { _lightID: i },
            },
            {
                _time: sdt + 0.03125 + ((i - 1) / 7) * 0.375,
                _type: 3,
                _value: 7,
                _customData: { _lightID: i },
            }
        );
    }
    addEvents(
        {
            _time: sdt,
            _type: 12,
            _value: 0,
        },
        {
            _time: sdt,
            _type: 13,
            _value: 0,
        },
        {
            _time: sdt + 0.999,
            _type: 12,
            _value: 1,
        },
        {
            _time: sdt + 0.999,
            _type: 13,
            _value: 1,
        }
    );
}
let synthTimingFlipFlop = false;
for (const st of synthTiming) {
    addEvents(
        {
            _time: st[0],
            _type: 2,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0],
            _type: 3,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.0625,
            _type: 2,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.0625,
            _type: 3,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.125,
            _type: 2,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.125,
            _type: 2,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.1875,
            _type: 2,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.1875,
            _type: 3,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.25,
            _type: 3,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.25,
            _type: 3,
            _value: 2,
            _floatValue: 1,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.3125,
            _type: 2,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0] + 0.3125,
            _type: 3,
            _value: 0,
            _floatValue: 0,
            _customData: { _lightID: [1 + st[1], 2 + st[1]] },
        },
        {
            _time: st[0],
            _type: synthTimingFlipFlop ? 13 : 12,
            _value: 1,
        }
    );
    synthTimingFlipFlop = !synthTimingFlipFlop;
}

const endingHa = [
    [486.5, 2],
    [487, 0],
    [487.5, 1],
    [490.5, 2],
    [491, 0],
    [491.5, 1],
    [494.5, 2],
    [495, 0],
    [495.5, 1],
    [498.5, 0],
    [499, 2],
    [499.5, 1],
    [502.5, 2],
    [503, 0],
    [503.5, 1],
    [506.5, 2],
    [507, 0],
    [507.5, 1],
    [510.5, 2],
    [511, 0],
    [511.5, 1],
    [514.5, 0],
    [515, 2],
    [515.5, 1],
];
const endingID = [
    [centerOrder[3], centerOrder[2]],
    [centerOrder[1], centerOrder[4]],
    [centerOrder[5], centerOrder[0]],
];
for (const eh of endingHa) {
    addEvents(
        {
            _type: 4,
            _time: eh[0],
            _value: 3,
            _floatValue: 1.25,
            _customData: {
                _lightID: endingID[eh[1]],
            },
        },
        {
            _type: 4,
            _time: eh[0] + 0.0625,
            _value: 0,
            _floatValue: 1.25,
            _customData: {
                _lightID: endingID[eh[1]],
            },
        },
        {
            _type: 4,
            _time: eh[0] + 0.125,
            _value: 3,
            _floatValue: 1.25,
            _customData: {
                _lightID: endingID[eh[1]],
            },
        }
    );
}

const synthDrumTiming = [
    [212, 0],
    [216, 1],
    [220, 0],
    [224, 1],
    [228, 0],
    [232, 1],
    [236, 0],
    [244, 0],
    [248, 1],
    [252, 0],
    [256, 1],
    [260, 0],
    [264, 1],
    [268, 0],
    [272, 1],
    [292, 0],
    [296, 1],
    [300, 0],
    [304, 1],
];
for (const sdt of synthDrumTiming) {
    for (let i = 0; i < 3; i++) {
        addEvents({
            _time: sdt[0] + 0.1875 * i,
            _type: 4,
            _value: 3,
            _customData: {
                _lightID: sdt[1] ? [centerOrder[i], centerOrder[5 - i]] : [centerOrder[2 - i], centerOrder[3 + i]],
            },
        });
    }
}

const dootdootTiming = [
    [196, 2],
    [196.75, 0],
    [199, 1],
    [200, 2],
    [200.75, 0],
    [203, 1],
    [204, 2],
    [204.75, 0],
    [207, 1],
];
for (const ddt of dootdootTiming) {
    if (!(ddt[1] % 2)) {
        addEvents(
            {
                _type: 4,
                _time: ddt[0],
                _value: 7,
                _floatValue: 1,
                _customData: {
                    _lightID: endingID[ddt[1]],
                },
            },
            {
                _type: 4,
                _time: ddt[0] + 0.0625,
                _value: 0,
                _floatValue: 1,
                _customData: {
                    _lightID: endingID[ddt[1]],
                },
            },
            {
                _type: 4,
                _time: ddt[0] + 0.125,
                _value: 7,
                _floatValue: 1,
                _customData: {
                    _lightID: endingID[ddt[1]],
                },
            },
            {
                _type: 4,
                _time: ddt[0] + 0.1875,
                _value: 0,
                _floatValue: 1,
                _customData: {
                    _lightID: endingID[ddt[1]],
                },
            }
        );
    } else {
        for (let t = ddt[0]; t < ddt[0] + 0.875; t += 0.0625) {
            addEvents(
                {
                    _type: 4,
                    _time: t,
                    _value: 7,
                    _floatValue: 1,
                    _customData: {
                        _lightID: endingID[ddt[1]],
                    },
                },
                {
                    _type: 4,
                    _time: t + 0.03125,
                    _value: 0,
                    _customData: {
                        _lightID: endingID[ddt[1]],
                    },
                }
            );
        }
    }
}
const doondoondodoondoondoonTiming = [
    [208, 2],
    [208.75, 2],
    [209.5, 1],
    [210, 0],
    [210.75, 0],
    [211.5, 0],
    [240, 2],
    [240.75, 2],
    [241.5, 1],
    [242, 0],
    [242.75, 0],
    [243.5, 0],
    [288, 2],
    [288.75, 2],
    [289.5, 1],
    [290, 0],
    [290.75, 0],
    [291.5, 0],
];
const doondoondodoondoondoonID = [
    [1, 2],
    [3, 5],
    [6, 7],
];
for (const ddddt of doondoondodoondoondoonTiming) {
    addEvents(
        {
            _time: ddddt[0],
            _type: 2,
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: doondoondodoondoondoonID[ddddt[1]],
            },
        },
        {
            _time: ddddt[0],
            _type: 3,
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: doondoondodoondoondoonID[ddddt[1]],
            },
        },
        {
            _type: 4,
            _time: ddddt[0],
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: endingID[ddddt[1]],
            },
        },
        {
            _type: 4,
            _time: ddddt[0] + 0.0625,
            _customData: {
                _lightID: endingID[ddddt[1]],
            },
        },
        {
            _type: 4,
            _time: ddddt[0] + 0.125,
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: endingID[ddddt[1]],
            },
        },
        {
            _type: 4,
            _time: ddddt[0] + 0.375,
            _customData: {
                _lightID: endingID[ddddt[1]],
            },
        }
    );
    if (ddddt[0] >= 288) {
        addEvents(
            {
                _time: ddddt[0],
                _type: 0,
                _value: 1,
                _floatValue: 1.25,
                _customData: {
                    _lightID: [backtopOrder[ddddt[1]], backtopOrder[5 - ddddt[1]]],
                },
            },
            {
                _time: ddddt[0] + 0.25,
                _type: 0,
                _customData: {
                    _lightID: [backtopOrder[ddddt[1]], backtopOrder[5 - ddddt[1]]],
                },
            }
        );
    }
}
addEvents(
    {
        _time: 210,
        _type: 4,
        _value: 1,
        _floatValue: 0,
        _customData: { _lightID: chevronID },
    },
    {
        _time: 211.875,
        _type: 4,
        _value: 4,
        _floatValue: 1.25,
        _customData: { _lightID: chevronID },
    },
    {
        _time: 211.9375,
        _type: 4,
        _value: 4,
        _floatValue: 0,
        _customData: { _lightID: chevronID },
    },
    {
        _time: 290,
        _type: 4,
        _value: 1,
        _floatValue: 0,
        _customData: { _lightID: chevronID },
    },
    {
        _time: 291.75,
        _type: 4,
        _value: 4,
        _floatValue: 1.25,
        _customData: { _lightID: chevronID },
    },
    {
        _time: 291.8125,
        _type: 4,
        _value: 4,
        _floatValue: 0,
        _customData: { _lightID: chevronID },
    }
);
const painoTiming = [
    [196, 0],
    [196.75, 0],
    [197.5, 0],
    [198, 0],
    [198.75, 0],
    [199.5, 0],
    [200, 1],
    [200.75, 1],
    [201.5, 1],
    [202, 1],
    [202.5, 1],
    [203, 1],
    [203.5, 1],
    [204, 2],
    [204.75, 2],
    [205, 2],
    [205.5, 2],
    [206.25, 2],
    [207, 2],
];
for (const pt of painoTiming) {
    addEvents(
        {
            _time: pt[0],
            _type: 2,
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: doondoondodoondoondoonID[2 - pt[1]],
            },
        },
        {
            _time: pt[0] + 0.25,
            _type: 2,
            _customData: {
                _lightID: doondoondodoondoondoonID[2 - pt[1]],
            },
        },
        {
            _time: pt[0] + 80,
            _type: 0,
            _value: 5,
            _floatValue: 1.25,
            _customData: {
                _lightID: [backtopOrder[2 - pt[1]], backtopOrder[3 + pt[1]]],
            },
        },
        {
            _time: pt[0] + 80.25,
            _type: 0,
            _customData: {
                _lightID: [backtopOrder[2 - pt[1]], backtopOrder[3 + pt[1]]],
            },
        }
    );
}
const painoTiming2 = [
    [196, 6],
    [196.5, 5],
    [196.75, 4],
    [197.25, 3],
    [197.75, 4],
    [198, 3],
    [198.5, 1],
    [199, 1],
    [199.5, 3],
    [200, 4],
    [200, [4, 5]],
    [200.75, 4],
    [200.75, [4, 5]],
    [201.5, 4],
    [201.5, [4, 5]],
    [202, 5],
    [202, [5, 6]],
    [202.5, 5],
    [202.5, [5, 6]],
    [203, 5],
    [203, [5, 6]],
    [203.5, 5],
    [203.5, [5, 6]],
    [204, 0],
    [204, [0, 6]],
    [204.5, 5],
    [204.75, 0],
    [204.75, [0, 4]],
    [205, 0],
    [205.25, 3],
    [205.5, 0],
    [205.5, [0, 2]],
    [206, 0],
    [206, [0, 1]],
    [206.5, 0],
    [207, 0],
    [207, [0, 1]],
    [207.5, 1],
];
for (const pt of painoTiming2) {
    addEvents(
        {
            _time: pt[0] as number,
            _type: 3,
            _value: 7,
            _floatValue: 1.25,
            _customData: {
                _lightID: pt[1],
            },
        },
        {
            _time: (pt[0] as number) + 0.25,
            _type: 3,
            _customData: {
                _lightID: pt[1],
            },
        }
    );
}
const painoTiming3 = [
    [276, 6],
    [276.5, 5],
    [276.75, 4],
    [277.25, 3],
    [277.75, 4],
    [278, 3],
    [278.5, 1],
    [279, 1],
    [279.5, 3],
    [284, 0],
    [284, 6],
    [284.5, 5],
    [284.75, 0],
    [284.75, 4],
    [285, 0],
    [285.25, 3],
    [285.5, 0],
    [285.5, 2],
    [286, 0],
    [286, 1],
    [286.5, 0],
    [287, 0],
    [287, 1],
    [287.5, 2],
].map((n) => [n[0], n[1] + 1]);
for (const pt of painoTiming3) {
    if (pt[1] < 4) {
        addEvents(
            {
                _time: pt[0],
                _type: 2,
                _value: 7,
                _customData: { _lightID: [(4 - pt[1]) * 2, (4 - pt[1]) * 2 + 1] },
            },
            {
                _time: pt[0] - 0.25,
                _type: 2,
                _customData: { _lightID: [(4 - pt[1]) * 2, (4 - pt[1]) * 2 + 1] },
            }
        );
    } else if (pt[1] === 4) {
        addEvents(
            {
                _time: pt[0],
                _type: 2,
                _value: 7,
                _customData: { _lightID: 1 },
            },
            {
                _time: pt[0],
                _type: 3,
                _value: 7,
                _customData: { _lightID: 1 },
            },
            {
                _time: pt[0] - 0.25,
                _type: 2,
                _customData: { _lightID: 1 },
            },
            {
                _time: pt[0] - 0.25,
                _type: 3,
                _customData: { _lightID: 1 },
            }
        );
    } else {
        addEvents(
            {
                _time: pt[0],
                _type: 3,
                _value: 7,
                _customData: { _lightID: [(pt[1] - 4) * 2, (pt[1] - 4) * 2 + 1] },
            },
            {
                _time: pt[0] - 0.25,
                _type: 3,
                _customData: { _lightID: [(pt[1] - 4) * 2, (pt[1] - 4) * 2 + 1] },
            }
        );
    }
}
const paintTiming4 = [
    [280, 0.5, 1],
    [280.75, 0.5, 3],
    [281.5, 0.5, 1],
    [282, 0.5, 0],
    [282.5, 0.5, 2],
    [283, 0.5, 0],
    [283.5, 0.5, 2],
];
for (const pt of paintTiming4) {
    for (let t = pt[0]; t < pt[0] + pt[1] - 0.0625; t += 0.0625) {
        addEvents(
            {
                _type: 2,
                _time: t,
                _value: 7,
                _customData: {
                    _lightID: iHateThisSynthID[pt[2]],
                },
            },
            {
                _type: 2,
                _time: t + 0.03125,
                _customData: {
                    _lightID: iHateThisSynthID[pt[2]],
                },
            },
            {
                _type: 3,
                _time: t,
                _value: 7,
                _customData: {
                    _lightID: iHateThisSynthID[pt[2]],
                },
            },
            {
                _type: 3,
                _time: t + 0.03125,
                _customData: {
                    _lightID: iHateThisSynthID[pt[2]],
                },
            }
        );
    }
    addEvents(
        {
            _type: 12,
            _time: pt[0],
            _value: pt[2] % 2 ? 0 : 1,
        },
        {
            _type: 13,
            _time: pt[0],
            _value: pt[2] % 2 ? 0 : 1,
        }
    );
}

const finalKickSound = [293, 295, 297, 299, 301, 303, 305, 307];
for (const fks of finalKickSound) {
    addEvents(
        {
            _time: fks - 0.125,
            _type: 4,
            _value: 1,
            _floatValue: 0,
            _customData: { _lightID: screenArray },
        },
        {
            _time: fks - 0.001,
            _type: 4,
            _value: 4,
            _floatValue: 0.5,
            _customData: { _lightID: screenArray, _easing: 'easeInQuad' },
        },
        {
            _time: fks,
            _type: 4,
            _value: 1,
            _floatValue: 1.5,
            _customData: { _lightID: screenArray },
        },
        {
            _time: fks + 1,
            _type: 4,
            _value: 4,
            _floatValue: 0,
            _customData: { _lightID: screenArray, _easing: 'easeOutQuad' },
        }
    );
}
addEvents(
    {
        _time: 208,
        _type: 12,
    },
    {
        _time: 208,
        _type: 13,
    },
    {
        _time: 240,
        _type: 12,
    },
    {
        _time: 240,
        _type: 13,
    },
    {
        _time: 276,
        _type: 12,
    },
    {
        _time: 276,
        _type: 13,
    },
    {
        _time: 284,
        _type: 12,
    },
    {
        _time: 284,
        _type: 13,
    },
    {
        _time: 308,
        _type: 12,
    },
    {
        _time: 308,
        _type: 13,
    },
    {
        _time: 516,
        _type: 12,
    },
    {
        _time: 516,
        _type: 13,
    }
);
for (let t = 484; t < 516; t += 4) {
    let randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125);
    randomPos = bsmap.NoteCutDirectionSpace[bsmap.utils.random(0, 7, true)];
    await screenDraw('smile.gif', {
        time: t + 0.0625,
        xOffset: 11 + randomPos[0],
        yOffset: 5 + randomPos[1],
    });
    screenClear(t + 0.03125 + 0.0625);
    await screenDraw('smile.gif', {
        time: t + 0.125,
        xOffset: 11,
        yOffset: 5,
    });
}
screenClear(512.5, 2);

envEnh.push({
    _id: 'Environment$',
    _lookupMethod: 'Regex',
    _track: 'everythinglmao',
});
difficulty.customData._customEvents = [
    {
        _time: 384,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 2,
            _position: [
                [0, 0, 16, 0],
                [0, 0, 32, 0.25, 'easeStep'],
                [0, 0, 48, 0.5, 'easeStep'],
                [0, 0, 64, 0.75, 'easeStep'],
                [0, 0, 128, 1, 'easeStep'],
            ],
        },
    },
    {
        _time: 386.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 1,
            _position: [
                [0, 0, 128, 0],
                [0, 0, 1024, 0.499, 'easeInQuint'],
                [0, 0, -1024, 0.5, 'easeStep'],
                [0, 0, 0, 1, 'easeOutQuint'],
            ],
        },
    },
];

// for (const e of difficulty.events) {
//     if (e.value >= 1 && e.value <= 4) {
//         e.value += 8;
//         e.floatValue *= 0.75;
//     }
//     if (e.value >= 5 && e.value <= 8) {
//         e.value += 4;
//         e.floatValue *= 0.5;
//     }
// }

await bsmap.save.difficulty(difficulty, {
    filePath: OUTPUT_FILE,
});
console.timeEnd('Runtime');
console.log(difficulty.events.length, 'events');
console.log('Map saved');

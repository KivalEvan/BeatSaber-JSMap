// holy shit image are so tedious to work with and optimise
import * as bsmap from '../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@1.2.9/mod.ts';
import { dirname } from 'https://deno.land/std@0.122.0/path/mod.ts';

const WORKING_DIRECTORY = dirname(Deno.mainModule).replace('file:///', '') + '/'; // for some reason deno doesnt like to deal with file:///
const MAP_DIRECTORY =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/';
const INPUT_FILE = MAP_DIRECTORY + 'NormalLightshow.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = await bsmap.load.difficulty(INPUT_FILE);
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
    _active: false,
});
_environment.push({
    _id: regexTentacleRight,
    _lookupMethod: 'Regex',
    _active: false,
});

let offsetLightID = 100;
const screenLight: { [key: number]: string } = {};
const screenX = 73;
const screenY = 122;
const screenXOffset = 0;
const screenYOffset = 72;
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
        const posZ = 64 - Math.tan(345 * (Math.PI / 180)) * screenSize * y;
        _environment.push({
            _id: regexGlowLine,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [345, 0, 0],
            _scale: [48 / 8, 2 / 8, 1],
            _lightID: ++offsetLightID,
        });
        screenLight[offsetLightID] = '0,0,0,0';
    }
}

_environment.push({
    _id: regexConstruction,
    _lookupMethod: 'Regex',
    _active: false,
});
//#endregion

//#region helper
interface ImageGIFOption {
    startTime: number;
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
    override?: boolean;
    easings?: (x: number) => number;
}

const screenDraw = async (imagePath: string, options: ImageGIFOption) => {
    const opt: Required<ImageGIFOption> = {
        startTime: options.startTime,
        endTime: options.endTime ?? options.startTime,
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
        override: options.override ?? false,
        easings: options.easings ?? bsmap.easings.method.easeLinear,
    };
    const gifFile = Deno.readFileSync(WORKING_DIRECTORY + imagePath);
    const gif = await imagescript.GIF.decode(gifFile, !opt.animated);
    let itFrame = 0;
    gif.forEach((frame) => {
        frame.rotate(opt.rotate);
        if (opt.invert) {
            frame.invert();
        }
        const colorID: { [key: string]: number[] } = {};
        const prevColor: { [key: string]: number[] } = {};
        for (let y = 0; y < screenY; y++) {
            for (let x = 0; x < screenX; x++) {
                const pos = screenStartID + screenX * y + x;
                if (screenLight[pos] === '0,0,0,0') {
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
                const colorAry = frame.getRGBAAt(x + 1, y + 1).toString();
                if (!opt.override && screenLight[pos] === colorAry) {
                    continue;
                }
                if (!colorID[colorAry]) {
                    colorID[colorAry] = [pos];
                } else {
                    colorID[colorAry].push(pos);
                }
                screenLight[pos] = colorAry[0];
            }
        }
        if (!itFrame && opt.fadeInDuration && opt.eventValue) {
            for (const color in prevColor) {
                _events.push({
                    _time: opt.startTime,
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
                              opt.startTime,
                              opt.endTime
                          )
                        : opt.startTime) + opt.fadeInDuration,
                _type: 4,
                _value: opt.fadeInDuration
                    ? opt.eventValue > 4
                        ? 8
                        : 4
                    : opt.eventValue,
                _floatValue: 0.75,
                _customData: {
                    _color: color
                        .split(',')
                        .map((n) => parseInt(n) / 255) as bsmap.types.colors.ColorArray,
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
            screenLight[i] = '0,0,0,0';
        }
    }
    if (fade) {
        for (const color in colorID) {
            _events.push({
                _time: time,
                _type: 4,
                _value: 1,
                _floatValue: 1,
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

for (let i = 4; i < 16; i++) {
    await screenDraw('orindance.gif', {
        animated: true,
        startTime: i,
        endTime: i + 0.5,
    });
    await screenDraw('orindance.gif', {
        animated: true,
        startTime: i + 0.5,
        endTime: i + 1,
    });
}

console.log(_events.length, 'events');
await bsmap.save.difficulty(difficulty, { path: OUTPUT_FILE });
console.log('map saved');

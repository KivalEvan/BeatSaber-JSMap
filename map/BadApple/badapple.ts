import * as bsmap from '../../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@v1.2.12/mod.ts';
import { dirname } from 'https://deno.land/std@0.135.0/path/mod.ts';

const WORKING_DIRECTORY = dirname(Deno.mainModule).replace('file:///', '') + '/'; // for some reason deno doesnt like to deal with file:///
const MAP_DIRECTORY = 'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Bad Apple/';

const INPUT_FILE = MAP_DIRECTORY + 'EasyLawless.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.load.difficultySync(INPUT_FILE, 2);
const info = bsmap.load.infoSync({ filePath: MAP_DIRECTORY + 'Info.dat' });

const BPM = bsmap.BeatPerMinute.create(info._beatsPerMinute);

difficulty.customData._environment = [];
difficulty.events = [];
difficulty.notes = [];
const _environment = difficulty.customData._environment;
const _events = difficulty.events;

// regex for environment enhancement
const regexTrackTRLaser = `Environment\.\\[\\d+\\]NeonSide$`;

_environment.push({
    _id: 'Logo',
    _lookupMethod: 'Regex',
    _active: false,
});

let lightID = 100;
const screenLight: { [key: number]: number } = {};
const screenX = 48;
const screenY = 36;
const posZ = 32;
for (let y = 0; y < screenY; y++) {
    for (let x = 0; x < screenX; x++) {
        const posX = -11.5 + x * 0.5;
        const posY = 12 - y * 0.5;
        _environment.push({
            _id: regexTrackTRLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [0, 0, 0],
            _scale: [2, 0.075, 0.03125],
            _lightID: ++lightID,
        });
        screenLight[lightID] = 0;
    }
}

console.log('loading gif');
const image = Deno.readFileSync(WORKING_DIRECTORY + 'badapple.gif');
console.log('decoding gif');
const img = await imagescript.GIF.decode(image);
let i = 0;
const fps = 30;
img.forEach((frame) => {
    console.log('reading frame', i);
    frame.saturation(0, true);
    const colorID: { [key: number]: number[] } = {};
    for (let y = 0; y < Math.min(frame.height, screenY); y++) {
        for (let x = 0; x < Math.min(frame.width, screenX); x++) {
            const pos = 101 + screenX * (frame.yOffset + y) + x + frame.xOffset;
            const colorAry = frame.getRGBAAt(x + 1, y + 1);
            if (colorAry[3] === 0) {
                continue;
            }
            if (screenLight[pos] === colorAry[0]) {
                continue;
            }
            if (!colorID[Math.min(...colorAry)]) {
                colorID[Math.min(...colorAry)] = [pos];
            } else {
                colorID[Math.min(...colorAry)].push(pos);
            }
            screenLight[pos] = colorAry[0];
        }
    }
    for (const color in colorID) {
        difficulty.addEvents({
            _type: 2,
            _time: 22 + BPM.toBeatTime(i / fps),
            _value: 1,
            _floatValue: Math.round((parseInt(color) / 255) * 100) / 100,
            _customData: {
                _lightID: colorID[color],
            },
        });
    }
    i++;
});
console.log(_events.length, 'events');
bsmap.save.difficultySync(difficulty, { filePath: OUTPUT_FILE });
console.log('done');

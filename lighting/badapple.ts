import * as bsmap from '../deno/mod.ts';
import * as imagescript from 'https://deno.land/x/imagescript@1.2.9/mod.ts';

const INPUT_FILE =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Bad Apple/EasyLawless.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = bsmap.readMapSync(INPUT_FILE);
const info = bsmap.readInfoSync(
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Bad Apple/Info.dat'
);

const BPM = bsmap.bpm.create(info._beatsPerMinute);

difficulty._version = '2.5.0';
difficulty._customData = {};
difficulty._customData._environment = [];
difficulty._events = [];
difficulty._notes = [];
const _environment = difficulty._customData._environment;
const _events = difficulty._events;

// regex for environment enhancement
const regexTrackTRLaser = `Environment\.\\[\\d+\\]NeonSide$`;

_environment.push({
    _id: 'Logo',
    _lookupMethod: 'Regex',
    _active: false,
});

let lightID = 100;
const screenX = 48;
const screenY = 36;
const posZ = 48;
for (let y = 0; y < screenY; y++) {
    for (let x = 0; x < screenX; x++) {
        const posX = -11.5 + x * 0.5;
        const posY = 10 - y * 0.5;
        _environment.push({
            _id: regexTrackTRLaser,
            _lookupMethod: 'Regex',
            _duplicate: 1,
            _position: [posX, posY, posZ],
            _rotation: [0, 0, 0],
            _scale: [2, 0.075, 0.125],
            _lightID: ++lightID,
        });
    }
}

console.log('loading gif');
const image = Deno.readFileSync('E:/Downloads/ezgif-6-04f87566a9.gif');
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
            if (!colorID[Math.min(...colorAry)]) {
                colorID[Math.min(...colorAry)] = [pos];
            } else {
                colorID[Math.min(...colorAry)].push(pos);
            }
        }
    }
    for (const color in colorID) {
        _events.push({
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
console.log(_events.length);
bsmap.saveMapSync(OUTPUT_FILE, difficulty);
console.log('done');

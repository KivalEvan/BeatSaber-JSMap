// holy shit image are so tedious to work with and optimise
import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Black Mirror on the Wall/';
const INPUT_FILE = 'ExpertPlusStandard.dat';
const OUTPUT_FILE = INPUT_FILE;

const difficulty = await bsmap.load.difficulty(INPUT_FILE);
const info = await bsmap.load.info();
info._difficultyBeatmapSets.forEach((set) =>
    set._difficultyBeatmaps.forEach((d) => {
        if (d._customData?._requirements) delete d._customData?._requirements;
    })
);

difficulty._version = '2.5.0';
difficulty._customData = difficulty._customData ?? {};
difficulty._customData._environment = [];
difficulty._customData._time = difficulty._customData._time ?? 0;
difficulty._customData._time++;
const _environment = difficulty._customData._environment;
const _events = difficulty._events;

//#region environment and events order declaration stuff
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
_environment.push(
    {
        _id: '\\[\\d+\\]FloorMirror$',
        _lookupMethod: 'Regex',
        _active: false,
    },
    {
        _id: regexTentacleLeft,
        _lookupMethod: 'Regex',
        _position: [-10, 7, 48],
    },
    {
        _id: regexTentacleRight,
        _lookupMethod: 'Regex',
        _position: [10, 7, 48],
    }
);

let offsetLightID = 100;

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

_environment.push(
    {
        _id: 'Environment$',
        _lookupMethod: 'Regex',
        _track: 'everythinglmao',
    },
    {
        _id: 'Environment$',
        _lookupMethod: 'Regex',
        _track: 'mirrorstuff',
        _duplicate: 1,
        _position: [0, 0, -9999],
    }
);
difficulty._customData._customEvents = [
    {
        _time: 380,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 6,
            _position: [
                [0, 0, 0, 0],
                [0, 0, -1024, 0.7499, 'easeInQuint'],
                [0, 0, 1024, 0.75, 'easeStep'],
                [0, 0, 96, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 0, 0],
                [0, 180, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 384.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'mirrorstuff',
            _duration: 1.5,
            _position: [
                [0, 0, 1024, 0],
                [0, 0, 104, 1, 'easeInCubic'],
            ],
        },
    },
    {
        _time: 386,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 30,
            _position: [
                [0, 0, 96, 0],
                [0, 0, 8, 1],
            ],
        },
    },
    {
        _time: 386,
        _type: 'AnimateTrack',
        _data: {
            _track: 'mirrorstuff',
            _duration: 30,
            _position: [
                [0, 0, 104, 0],
                [0, 0, 16, 1],
            ],
        },
    },
    {
        _time: 416,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 2,
            _position: [
                [0, 0, 16, 0],
                [0, 0, 512, 0.7499, 'easeInQuint'],
                [0, 0, -512, 0.75, 'easeStep'],
                [0, 0, 0, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 180, 0, 0],
                [0, 0, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 416,
        _type: 'AnimateTrack',
        _data: {
            _track: 'mirrorstuff',
            _duration: 2,
            _position: [
                [0, 0, 24, 0],
                [0, 0, 520, 0.7499, 'easeInQuint'],
                [0, 8, -512, 0.75, 'easeStep'],
                [0, 8, 0, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 0, 0],
                [0, 0, 180, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 448,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 2,
            _position: [
                [0, 0, 0, 0],
                [0, 0, 512, 0.7499, 'easeInQuint'],
                [0, 48, 512, 0.75, 'easeStep'],
                [0, 48, 64, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 0, 0],
                [90, 0, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 448,
        _type: 'AnimateTrack',
        _data: {
            _track: 'mirrorstuff',
            _duration: 1.5,
            _position: [
                [0, 8, 0, 0],
                [0, 8, 512, 0.9999, 'easeInQuint'],
                [0, 0, -9999, 1, 'easeStep'],
            ],
        },
    },
    {
        _time: 453.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 48, 64, 0],
                [0, 48, 512, 0.7499, 'easeInQuint'],
                [0, 6, 512, 0.75, 'easeStep'],
                [0, 6, 0, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [90, 0, 0, 0],
                [0, 0, 180, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 457.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 6, 0, 0],
                [0, 6, 512, 0.7499, 'easeInQuint'],
                [0, 16, 512, 0.75, 'easeStep'],
                [0, 16, 48, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 180, 0],
                [45, 180, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 461.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 16, 48, 0],
                [0, 16, 512, 0.7499, 'easeInQuint'],
                [0, 6, -512, 0.75, 'easeStep'],
                [0, 6, 96, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [45, 180, 0, 0],
                [0, 180, 180, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 465.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 6, 96, 0],
                [0, 6, 512, 0.7499, 'easeInQuint'],
                [0, 0, -512, 0.75, 'easeStep'],
                [0, 0, 0, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 180, 180, 0],
                [0, 0, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 469.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 0, 0, 0],
                [0, 0, -512, 0.7499, 'easeInQuint'],
                [0, -24, 512, 0.75, 'easeStep'],
                [0, -24, 32, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 0, 0],
                [270, 180, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 473.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, -24, 32, 0],
                [0, -24, 512, 0.7499, 'easeInQuint'],
                [0, 6, -512, 0.75, 'easeStep'],
                [0, 6, 0, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [270, 180, 0, 0],
                [0, 0, 180, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 477.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, 6, 0, 0],
                [0, 6, 512, 0.7499, 'easeInQuint'],
                [0, -24, -512, 0.75, 'easeStep'],
                [0, -24, -8, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [0, 0, 180, 0],
                [315, 0, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 481.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 0.5,
            _position: [
                [0, -24, -8, 0],
                [0, -24, 512, 0.7499, 'easeInQuint'],
                [0, 0, -512, 0.75, 'easeStep'],
                [0, 0, -96, 1, 'easeOutQuint'],
            ],
            _rotation: [
                [315, 0, 0, 0],
                [0, 0, 0, 0.75, 'easeStep'],
            ],
        },
    },
    {
        _time: 482,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 31.5,
            _position: [
                [0, 0, -96, 0],
                [0, 0, 0, 1],
            ],
        },
    },
    {
        _time: 513.5,
        _type: 'AnimateTrack',
        _data: {
            _track: 'everythinglmao',
            _duration: 1,
            _position: [
                [0, 6, 64, 0, 'easeStep'],
                [0, 0, -9999, 0.125, 'easeStep'],
            ],
            _rotation: [[0, 0, 180, 0, 'easeStep']],
        },
    },
];

bsmap.save.difficultySync(difficulty, {
    filePath: OUTPUT_FILE,
});
bsmap.save.infoSync(info);
console.timeEnd('Runtime');
console.log(_events.length, 'events');
// const info = bsmap.load.infoSync();
// const BPM = bsmap.bpm.create(info._beatsPerMinute);
console.log('Map saved');

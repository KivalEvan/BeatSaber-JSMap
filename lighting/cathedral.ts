// holy shit image are so tedious to work with and optimise
import * as bsmap from '../deno/mod.ts';

console.log('Running script...');
console.time('Runtime');
bsmap.settings.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/Cathedral/';
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
// regex for environment enhancement
const regexRingRight = `\\[\\d+\\]PillarTrackLaneRingsR$`;
const regexRingLeft = `\\[\\d+\\]PillarTrackLaneRingsR.?\\(1\\)$`;
const regexSideLaser = `\\[42\\]SideLaser$`;
const regexGlowLine = `\\[\\d+\\]GlowLineL$`;
const regexPillarL = `\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarL$`;
const regexPillarR = `\\[\\d+\\]PillarPair\\.\\[\\d+\\]PillarR$`;
const regexDoor = `\\[\\d+\\]MagicDoorSprite$`;

_environment.push(
    {
        _id: regexRingRight,
        _lookupMethod: 'Regex',
        _position: [-10, 7, 48],
        _rotation: [0, 0, 0],
    },
    {
        _id: regexRingLeft,
        _lookupMethod: 'Regex',
        _position: [10, 7, 48],
        _rotation: [0, 0, 0],
    }
);

const createPillar = () => {
    for (let i = 0; i < 4; i++) {}
};

createPillar();
//#endregion

await bsmap.save.difficulty(difficulty, {
    filePath: OUTPUT_FILE,
});
console.timeEnd('Runtime');
console.log(_events.length, 'events');
// const info = bsmap.load.infoSync();
// const BPM = bsmap.bpm.create(info._beatsPerMinute);
console.log('Map saved');

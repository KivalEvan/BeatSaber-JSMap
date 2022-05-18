import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/deno/mod.ts';
import { dirname } from 'https://deno.land/std@0.122.0/path/mod.ts';

// working directory is not necessary unless you're working on importing anything from workspace root and in different folder path
const workingDirectory = dirname(Deno.mainModule).replace('file:///', '') + '/'; // for some reason deno doesnt like to deal with file:///
bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/testmap/';

const info = bsmap.load.infoSync();
const difficulty = bsmap.load.difficultyLegacySync('ExpertPlusStandard.dat');

// info._previewDuration = 14;
info._difficultyBeatmapSets.forEach((set) =>
    console.log(set._beatmapCharacteristicName, set._difficultyBeatmaps.length)
);

const BPM = bsmap.BeatPerMinute.create(
    info._beatsPerMinute,
    difficulty.customData?._BPMChanges ?? difficulty.customData?._bpmChanges
);
console.log('Beat in real-time second:', BPM.toRealTime(42));
console.log('Real-time second in beat:', BPM.toBeatTime(6.9));
console.log('Beat in JSON time:', BPM.toJSONTime(85));

const NJS = bsmap.NoteJumpSpeed.create(BPM, 16);
NJS.offset = 0;
console.log(NJS.calcHalfJumpDuration(), NJS.calcHalfJumpDuration(0.5));

difficulty.events.push(
    bsmap.v2.Event.create({
        _time: 1,
        _type: 1,
        _value: 1,
        _floatValue: 1,
    })
);

bsmap.save.infoSync(info);
await bsmap.save.difficulty(difficulty, {
    filePath: 'ExpertPlusStandard.dat',
});

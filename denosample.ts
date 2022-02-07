import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/main/deno/mod.ts';
import { dirname } from 'https://deno.land/std@0.122.0/path/mod.ts';

// working directory is not necessary unless you're working on importing anything from workspace and different workspace with different folder path
bsmap.settings.workingDirectory =
    dirname(Deno.mainModule).replace('file:///', '') + '/'; // for some reason deno doesnt like to deal with file:///
bsmap.settings.mapDirectory =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/testmap/';

const info = bsmap.load.infoSync('Info.dat');
const difficulty = bsmap.load.difficultySync('map.dat');

info._previewDuration = 14;
info._difficultyBeatmapSets.forEach((set) =>
    console.log(set._beatmapCharacteristicName, set._difficultyBeatmaps.length)
);

difficulty._events.push({
    _time: 1,
    _type: 1,
    _value: 1,
    _floatValue: 1,
});

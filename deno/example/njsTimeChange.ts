import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/main/deno/mod.ts';

bsmap.globals.path =
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/6a37 (Villain Virus - fraies & Oddloop)';
console.log(`Map directory: ${bsmap.globals.path}`);

let info: ReturnType<typeof bsmap.load.infoSync>;
try {
    info = bsmap.load.infoSync();
} catch {
    console.error('Could not load Info.dat from folder, retrying with info.dat...');
    try {
        info = bsmap.load.infoSync('info.data');
    } catch {
        throw Error('Info.dat is missing from folder.');
    }
}
for (const set of info._difficultyBeatmapSets) {
    for (const d of set._difficultyBeatmaps) {
        d._customData = d._customData ?? {};
        d._customData._requirements = ['Noodle Extensions'];
        d._customData._suggestions = ['Chroma'];
        console.log(
            `Converting NJS to ${set._beatmapCharacteristicName} ${d._difficulty}`
        );
        const difficulty = bsmap.load.difficultyLegacySync(d._beatmapFilename);
        const notes = JSON.parse(
            JSON.stringify(difficulty._notes)
        ) as typeof difficulty._notes;
        notes.forEach((n) => {
            n._customData = {};
            n._customData._disableNoteGravity = true;
            n._customData._disableSpawnEffect = true;
            n._customData._noteJumpMovementSpeed = 10;
            n._customData._animation = {};
            n._customData._animation._dissolve = [[0, 0]];
            n._customData._animation._dissolveArrow = [[0, 0]];
        });
        difficulty._notes.forEach((n) => {
            n._time += 0.01;
            n._customData = {};
            n._customData._fake = true;
        });
        notes.forEach((n) => difficulty._notes.push(n));
        bsmap.save.difficultySync(difficulty, {
            filePath: d._beatmapFilename,
        });
    }
}
bsmap.save.infoSync(info);

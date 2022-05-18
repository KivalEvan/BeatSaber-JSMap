import * as bsmap from 'https://raw.githubusercontent.com/KivalEvan/BeatSaber-MappingScript/deno/mod.ts';

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
            JSON.stringify(difficulty.notes)
        ) as typeof difficulty.notes;
        notes.forEach((n) => {
            n.customData = {};
            n.customData._disableNoteGravity = true;
            n.customData._disableSpawnEffect = true;
            n.customData._noteJumpMovementSpeed = 10;
            n.customData._animation = {};
            n.customData._animation._dissolve = [[0, 0]];
            n.customData._animation._dissolveArrow = [[0, 0]];
        });
        difficulty.notes.forEach((n) => {
            n.time += 0.01;
            n.customData = {};
            n.customData._fake = true;
        });
        notes.forEach((n) => difficulty.notes.push(n));
        bsmap.save.difficultySync(difficulty, {
            filePath: d._beatmapFilename,
        });
    }
}
bsmap.save.infoSync(info);

import * as bsmap from '../../deno/mod.ts';

const d = bsmap.load.difficultyLegacySync(
    'D:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomWIPLevels/ECHO/NormalLightshow.dat',
);

console.log(
    [
        ...d.notes.map((n) => [n.time - 116]),
        ...d.obstacles.map((o) => [o.time - 116, o.duration]),
    ].sort((a, b) => a[0] - b[0]),
);

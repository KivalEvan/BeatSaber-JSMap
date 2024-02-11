import { Difficulty as V1Difficulty } from './beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from './beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from './beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from './beatmap/v4/difficulty.ts';
import { Info as V1Info } from './beatmap/v1/info.ts';
import { Info as V2Info } from './beatmap/v2/info.ts';
import { Info as V4Info } from './beatmap/v4/info.ts';
import { Lightshow as V3Lightshow } from './beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from './beatmap/v4/lightshow.ts';
import { save } from './mod.ts';

save.infoSync(new V1Info().setFilename('Info.dat'), {
   directory: './tests/resources/empty_filled/v1/',
});
save.difficultySync(new V1Difficulty().setFilename('Difficulty.dat'), {
   directory: './tests/resources/empty_filled/v1/',
});

save.infoSync(new V2Info().setFilename('Info.dat'), {
   directory: './tests/resources/empty_filled/v2/',
});
save.difficultySync(new V2Difficulty().setFilename('Difficulty.dat'), {
   directory: './tests/resources/empty_filled/v2/',
});

save.difficultySync(new V3Difficulty().setFilename('Difficulty.dat'), {
   directory: './tests/resources/empty_filled/v3/',
   optimize: { enabled: false },
});
save.lightshowSync(
   new V3Lightshow({
      waypoints: [{}],
      basicEvents: [{}],
      colorBoostEvents: [{}],
      lightColorEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      lightRotationEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      lightTranslationEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      fxEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      eventTypesWithKeywords: { list: [{}] },
   }).setFilename('Lightshow.dat'),
   {
      directory: './tests/resources/empty_filled/v3/',
      optimize: { enabled: false },
   },
);

save.infoSync(new V4Info().setFilename('Info.dat'), {
   directory: './tests/resources/empty_filled/v4/',
   optimize: { enabled: false },
});
save.difficultySync(new V4Difficulty().setFilename('Difficulty.dat'), {
   directory: './tests/resources/empty_filled/v4/',
   optimize: { enabled: false },
});
save.lightshowSync(
   new V4Lightshow({
      waypoints: [{}],
      basicEvents: [{}],
      colorBoostEvents: [{}],
      lightColorEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      lightRotationEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      lightTranslationEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      fxEventBoxGroups: [{ boxes: [{ events: [{}] }] }],
      eventTypesWithKeywords: { list: [{}] },
   }).setFilename('Lightshow.dat'),
   {
      directory: './tests/resources/empty_filled/v4/',
      optimize: { enabled: false },
   },
);

import { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import { DifficultyName } from '../beatmap/shared/difficulty.ts';
import { IWrapInfoDifficulty } from '../beatmap/wrapper/info.ts';
import { Difficulty as V1Difficulty } from '../../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../../beatmap/v4/difficulty.ts';
import { Lightshow as V3Lightshow } from '../../beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from '../../beatmap/v4/lightshow.ts';
import { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';
import { IWrapLightshow } from '../beatmap/wrapper/lightshow.ts';

interface ILoadInfoBeatmapBase {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly settings: IWrapInfoDifficulty;
   version: number;
   data: IWrapDifficulty;
   lightshow: IWrapLightshow;
}

interface ILoadInfoBeatmapV1 extends ILoadInfoBeatmapBase {
   version: 1;
   data: V1Difficulty;
   lightshow: never;
}

interface ILoadInfoBeatmapV2 extends ILoadInfoBeatmapBase {
   version: 2;
   data: V2Difficulty;
   lightshow: never;
}

interface ILoadInfoBeatmapV3 extends ILoadInfoBeatmapBase {
   version: 3;
   data: V3Difficulty;
   lightshow: V3Lightshow;
}

interface ILoadInfoBeatmapV4 extends ILoadInfoBeatmapBase {
   version: 4;
   data: V4Difficulty;
   lightshow: V4Lightshow;
}

export type ILoadInfoData =
   | ILoadInfoBeatmapBase
   | ILoadInfoBeatmapV1
   | ILoadInfoBeatmapV2
   | ILoadInfoBeatmapV3
   | ILoadInfoBeatmapV4;

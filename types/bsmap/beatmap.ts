import { IWrapInfoDifficulty } from '../beatmap/wrapper/info.ts';
import { Difficulty as V1Difficulty } from '../../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../../beatmap/v4/difficulty.ts';
import { Lightshow as V3Lightshow } from '../../beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from '../../beatmap/v4/lightshow.ts';
import { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';
import { IWrapLightshow } from '../beatmap/wrapper/lightshow.ts';

interface ILoadBeatmapBase {
   readonly settings: IWrapInfoDifficulty;
}

interface ILoadDataBase extends ILoadBeatmapBase {
   readonly version: number;
   data: IWrapDifficulty;
}

interface ILoadLightshowBase extends ILoadBeatmapBase {
   readonly lightshowVersion: number;
   lightshow?: IWrapLightshow;
}

interface ILoadDataV1 extends ILoadDataBase {
   readonly version: 1;
   data: V1Difficulty;
}

interface ILoadDataV2 extends ILoadDataBase {
   readonly version: 2;
   data: V2Difficulty;
}

interface ILoadDataV3 extends ILoadDataBase {
   readonly version: 3;
   data: V3Difficulty;
}

interface ILoadDataV4 extends ILoadDataBase {
   readonly version: 4;
   data: V4Difficulty;
}

interface ILoadLightshowV3 extends ILoadLightshowBase {
   readonly lightshowVersion: 3;
   lightshow: V3Lightshow;
}

interface ILoadLightshowV4 extends ILoadLightshowBase {
   readonly lightshowVersion: 4;
   lightshow: V4Lightshow;
}

export type IBeatmapData = (
   | ILoadDataV1
   | ILoadDataV2
   | ILoadDataV3
   | ILoadDataV4
) &
   (ILoadLightshowV3 | ILoadLightshowV4);

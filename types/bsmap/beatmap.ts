import type { IWrapInfoBeatmap } from '../beatmap/wrapper/info.ts';
import type { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';

interface ILoadBeatmapBase {
   readonly settings: IWrapInfoBeatmap;
}

export interface ILoadBeatmap extends ILoadBeatmapBase {
   readonly version: number;
   data: IWrapDifficulty;
}

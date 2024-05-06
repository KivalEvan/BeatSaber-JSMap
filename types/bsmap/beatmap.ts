import type { IWrapInfoBeatmap } from '../beatmap/wrapper/info.ts';
import type { IWrapBeatmap } from '../beatmap/wrapper/beatmap.ts';

interface ILoadBeatmapBase {
   readonly settings: IWrapInfoBeatmap;
}

export interface ILoadBeatmap extends ILoadBeatmapBase {
   data: IWrapBeatmap;
}

import type { IWrapBeatmap } from '../beatmap/wrapper/beatmap.ts';
import type { IWrapInfoBeatmapAttribute } from '../beatmap/wrapper/info.ts';

export interface IBeatmapInfoData {
   info: IWrapInfoBeatmapAttribute;
   version: number;
   beatmap: IWrapBeatmap;
}

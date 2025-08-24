import type {
   ICustomDataInfo as ICustomDataInfoV2,
   ICustomDataInfoDifficulty as ICustomDataInfoBeatmapV2,
   ICustomDataInfoSet as ICustomDataInfoSetV2,
} from '../../../schema/v2/types/custom/info.ts';
import type {
   ICustomDataInfo as ICustomDataInfoV4,
   ICustomDataInfoBeatmap as ICustomDataInfoBeatmapV4,
} from '../../../schema/v4/types/custom/info.ts';

/**
 * Aggregated custom data for info.
 */
export type ICustomDataInfo = ICustomDataInfoV2 & ICustomDataInfoSetV2 & ICustomDataInfoV4;
export type ICustomDataBeatmap = ICustomDataInfoBeatmapV2 & ICustomDataInfoBeatmapV4;

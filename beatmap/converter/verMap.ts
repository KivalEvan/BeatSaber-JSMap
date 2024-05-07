import { toV1Info } from './toV1/info.ts';
import { toV1Beatmap } from './toV1/beatmap.ts';
import { toV2Info } from './toV2/info.ts';
import { toV2Audio } from './toV2/audioData.ts';
import { toV2Beatmap } from './toV2/beatmap.ts';
import { toV3Beatmap } from './toV3/beatmap.ts';
import { toV4Info } from './toV4/info.ts';
import { toV4Audio } from './toV4/audioData.ts';
import { toV4Beatmap } from './toV4/beatmap.ts';
import type { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import type { IWrapAudio } from '../../types/beatmap/wrapper/audioData.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';

export const infoConvertMap: Record<number, (data: IWrapInfo, sourceVer: number) => IWrapInfo> = {
   1: toV1Info,
   2: toV2Info,
   4: toV4Info,
};

export const audioDataConvertMap: Record<
   number,
   (data: IWrapAudio, sourceVer: number) => IWrapAudio
> = {
   2: toV2Audio,
   4: toV4Audio,
};

export const beatmapConvertMap: Record<
   number,
   (data: IWrapBeatmap, sourceVer: number) => IWrapBeatmap
> = {
   1: toV1Beatmap,
   2: toV2Beatmap,
   3: toV3Beatmap,
   4: toV4Beatmap,
};

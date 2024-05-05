import logger from '../../logger.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';

function tag(name: string): string[] {
   return ['convert', 'toV1Beatmap', name];
}

/**
 * Feeling nostalgic?
 * ```ts
 * const converted = convert.toV1Beatmap(data);
 * ```
 *
 * **WARNING:** Guess you should know this legacy version does not have modern features.
 */
export function toV1Beatmap(
   data: IWrapBeatmap,
   fromVersion: number,
): IWrapBeatmap {
   logger.tWarn(tag('main'), 'Converting beatmap to v1 may lose certain data!');

   switch (fromVersion) {
      case 1:
      case 2:
         break;
      case 3:
         fromV3(data);
         break;
      case 4:
         fromV4(data);
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning cloned original data.',
         );
   }

   return data;
}

function fromV3(data: IWrapBeatmap) {
   data.data.customData._time = data.data.customData.time;
   data.data.customData._BPMChanges = data.data.customData.BPMChanges?.map(
      (bpmc) => {
         return {
            _time: bpmc.b,
            _bpm: bpmc.m,
            _beatsPerBar: bpmc.p,
            _metronomeOffset: bpmc.o,
         };
      },
   );
   data.data.customData._bookmarks = data.data.customData.bookmarks?.map(
      (b) => {
         return { _time: b.b, _name: b.n };
      },
   );

   delete data.data.customData.time;
   delete data.data.customData.BPMChanges;
   delete data.data.customData.bookmarks;
}

function fromV4(data: IWrapBeatmap) {
   data.data.customData._time = data.data.customData.time ?? 0;
}

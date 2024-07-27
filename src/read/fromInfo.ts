import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import type { IWrapInfoAttribute } from '../types/beatmap/wrapper/info.ts';
import type { IBeatmapInfoData } from '../types/bsmap/fromInfo.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { readDifficultyFile, readDifficultyFileSync } from './difficulty.ts';
import { readLightshowFile, readLightshowFileSync } from './lightshow.ts';

export async function readFromInfo(
   info: IWrapInfoAttribute,
   options: IReadOptions<IWrapBeatmap> = {},
): Promise<IBeatmapInfoData[]> {
   const ary: IBeatmapInfoData[] = [];
   for (const d of info.difficulties) {
      const beatmap = await readDifficultyFile(d.filename, options);
      if (beatmap.version === 4) {
         const light = await readLightshowFile(d.lightshowFilename, options);
         beatmap.lightshow = light.lightshow;
         beatmap.lightshowFilename = light.lightshowFilename;
      }

      ary.push({
         info: d,
         beatmap,
      });
   }

   return ary;
}

export function readFromInfoSync(
   info: IWrapInfoAttribute,
   options: IReadOptions<IWrapBeatmap> = {},
): IBeatmapInfoData[] {
   const ary: IBeatmapInfoData[] = [];
   for (const d of info.difficulties) {
      const beatmap = readDifficultyFileSync(d.filename, options);
      if (beatmap.version === 4) {
         const light = readLightshowFileSync(d.lightshowFilename, options);
         beatmap.lightshow = light.lightshow;
         beatmap.lightshowFilename = light.lightshowFilename;
      }

      ary.push({
         info: d,
         beatmap,
      });
   }

   return ary;
}

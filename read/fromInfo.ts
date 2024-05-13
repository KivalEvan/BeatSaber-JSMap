import { loadDifficulty } from '../beatmap/loader/difficulty.ts';
import { implicitVersion, retrieveVersion } from '../beatmap/shared/version.ts';
import { resolve } from '../deps.ts';
import { readJSONFile, readJSONFileSync } from '../fs/_json.ts';
import globals from '../globals.ts';
import type { IWrapBeatmap } from '../types/beatmap/wrapper/beatmap.ts';
import type { IWrapInfoAttribute } from '../types/beatmap/wrapper/info.ts';
import type { IBeatmapInfoData } from '../types/bsmap/fromInfo.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { defaultOptions } from './_main.ts';
import { readLightshowFile, readLightshowFileSync } from './lightshow.ts';

export async function readFromInfo(
   info: IWrapInfoAttribute,
   options: IReadOptions<IWrapBeatmap> = {},
): Promise<IBeatmapInfoData[]> {
   const ary: IBeatmapInfoData[] = [];
   for (const d of info.difficulties) {
      const path = resolve(
         options.directory ?? (defaultOptions.directory || globals.directory),
         d.filename,
      );
      const json = await readJSONFile(path);
      const ver = +(retrieveVersion(json) || implicitVersion('difficulty')).at(
         0,
      )!;
      const beatmap = loadDifficulty(json, options.load);

      if (ver === 4) {
         const light = await readLightshowFile(d.lightshowFilename, options);
         beatmap.lightshow = light.lightshow;
         beatmap.lightshowFilename = light.lightshowFilename;
      }

      ary.push({
         info: d,
         version: ver,
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
      const path = resolve(
         options.directory ?? (defaultOptions.directory || globals.directory),
         d.filename,
      );
      const json = readJSONFileSync(path);
      const ver = +(retrieveVersion(json) || implicitVersion('difficulty')).at(
         0,
      )!;
      const beatmap = loadDifficulty(json, options.load);

      if (ver === 4) {
         const light = readLightshowFileSync(d.lightshowFilename, options);
         beatmap.lightshow = light.lightshow;
         beatmap.lightshowFilename = light.lightshowFilename;
      }

      ary.push({
         info: d,
         version: ver,
         beatmap,
      });
   }

   return ary;
}

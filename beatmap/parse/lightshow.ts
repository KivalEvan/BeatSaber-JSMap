import type { Info } from './v4/info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import type { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { shallowCopy } from '../../utils/misc.ts';
import { type AudioDataCheck, type InfoDataCheck, LightshowDataCheck } from './v4/dataCheck.ts';
import type { DifficultyDataCheck } from './v4/dataCheck.ts';
import type { Difficulty } from './v4/difficulty.ts';
import { Lightshow } from './v4/lightshow.ts';
import type { AudioData } from './v4/audioData.ts';

function tag(name: string): string[] {
   return ['parse', name];
}

export function parseLightshow(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Lightshow {
   logger.tInfo(tag('lightshow'), 'Parsing beatmap lightshow v4.x.x');
   data = shallowCopy(data);
   if (!data.version?.startsWith('4')) {
      logger.tWarn(tag('lightshow'), 'Unidentified beatmap version');
      data.version = '4.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, LightshowDataCheck, 'lightshow', data.version, checkData.throwError);
   }

   return Lightshow.fromJSON(data);
}

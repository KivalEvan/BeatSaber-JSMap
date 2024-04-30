import type { Info } from './v4/info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import type { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { shallowCopy } from '../../utils/misc.ts';
import type { AudioDataCheck, InfoDataCheck, LightshowDataCheck } from './v4/dataCheck.ts';
import { DifficultyDataCheck } from './v4/dataCheck.ts';
import { Difficulty } from './v4/difficulty.ts';
import type { Lightshow } from './v4/lightshow.ts';
import type { AudioData } from './v4/audioData.ts';

function tag(name: string): string[] {
   return ['parse', name];
}

export function parseDifficulty(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v4.x.x');
   data = shallowCopy(data);
   if (!data.version?.startsWith('4')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data.version = '4.0.0';
   }
   if (checkData.enabled) {
      deepCheck(
         data,
         DifficultyDataCheck,
         'difficulty',
         data.version,
         checkData.throwError,
      );
   }

   return Difficulty.fromJSON(data);
}

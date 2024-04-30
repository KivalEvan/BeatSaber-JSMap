import type { Info } from './v4/info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import type { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { shallowCopy } from '../../utils/misc.ts';
import { AudioDataCheck, type InfoDataCheck, type LightshowDataCheck } from './v4/dataCheck.ts';
import type { DifficultyDataCheck } from './v4/dataCheck.ts';
import type { Difficulty } from './v4/difficulty.ts';
import type { Lightshow } from './v4/lightshow.ts';
import { AudioData } from './v4/audioData.ts';

function tag(name: string): string[] {
   return ['parse', name];
}

export function parseAudio(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): AudioData {
   logger.tInfo(tag('audio'), 'Parsing beatmap audio data v4.x.x');
   data = shallowCopy(data);
   if (!data._version?.startsWith('4')) {
      logger.tWarn(tag('audio'), 'Unidentified beatmap version');
      data._version = '4.0.0';
   }
   if (checkData.enabled) {
      deepCheck(
         data,
         AudioDataCheck,
         'audio',
         data._version,
         checkData.throwError,
      );
   }

   return AudioData.fromJSON(data);
}

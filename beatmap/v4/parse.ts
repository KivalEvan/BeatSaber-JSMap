import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { shallowCopy } from '../../utils/misc.ts';
import { InfoDataCheck, LightshowDataCheck } from './dataCheck.ts';
import { DifficultyDataCheck } from './dataCheck.ts';
import { Difficulty } from './difficulty.ts';
import { Lightshow } from './lightshow.ts';

function tag(name: string): string[] {
   return ['v4', 'parse', name];
}

export function parseInfo(
   // deno-lint-ignore no-explicit-any
   data: Record<string, any>,
   checkData: IDataCheckOption = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v4.x.x');
   data = shallowCopy(data);
   if (!data.version?.startsWith('4')) {
      logger.tWarn(tag('info'), 'Unidentified beatmap version');
      data.version = '4.0.0';
   }
   if (checkData.enabled) {
      deepCheck(
         data,
         InfoDataCheck,
         'info',
         data._version,
         checkData.throwError,
      );
   }

   return Info.fromJSON(data);
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
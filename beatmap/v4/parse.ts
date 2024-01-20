import { Info } from './info.ts';
import { deepCheck } from '../shared/dataCheck.ts';
import logger from '../../logger.ts';
import { IDataCheckOption } from '../../types/beatmap/shared/dataCheck.ts';
import { shallowCopy } from '../../utils/misc.ts';

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
   if (!data._version?.startsWith('4')) {
      logger.tWarn(tag('info'), 'Unidentified beatmap version');
      data.version = '4.0.0';
   }
   if (checkData.enabled) {
      // FIXME: data check
      deepCheck(data, {}, 'info', data._version, checkData.throwError);
   }

   return new Info(data);
}

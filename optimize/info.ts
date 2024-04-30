import type { IOptimizeOptionsInfo } from '../types/bsmap/optimize.ts';
import logger from '../logger.ts';
import { cleanInfo as cleanV1Info } from '../beatmap/schema/v1/clean.ts';
import { cleanInfo as cleanV2Info } from '../beatmap/schema/v2/clean.ts';
import { cleanInfo as cleanV4Info } from '../beatmap/schema/v4/clean.ts';
import type { ICleanOptions } from '../types/beatmap/shared/clean.ts';
import { defaultOptions } from './options.ts';
import { tag } from './_common.ts';

export function info(
   // deno-lint-ignore no-explicit-any
   info: Record<string, any>,
   version: number,
   options: IOptimizeOptionsInfo = {},
) {
   const opt: Required<IOptimizeOptionsInfo> = {
      enabled: options.enabled ?? defaultOptions.info.enabled,
      floatTrim: options.floatTrim ?? defaultOptions.info.floatTrim,
      stringTrim: options.stringTrim ?? defaultOptions.info.stringTrim,
      purgeZeros: options.purgeZeros ?? defaultOptions.info.purgeZeros,
      deduplicate: options.deduplicate ?? defaultOptions.info.deduplicate,
      throwError: options.throwError ?? defaultOptions.info.throwError,
   };

   logger.tInfo(tag('info'), `Optimising info data`);

   // deno-lint-ignore no-explicit-any
   const clean: (data: any, opt: ICleanOptions) => void = version === 4
      ? cleanV4Info
      : version === 2
      ? cleanV2Info
      : version === 1
      ? cleanV1Info
      : () => {};
   clean(info, opt);
}

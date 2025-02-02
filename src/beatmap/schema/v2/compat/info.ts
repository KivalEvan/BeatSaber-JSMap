import type { ICompatibilityOptions } from '../../../../types/beatmap/options/compatibility.ts';
import type { IWrapInfoAttribute } from '../../../../types/beatmap/wrapper/info.ts';

/**
 * Check if beatmap info is compatible with v2 `Info` schema.
 */
export function compatInfo<T extends IWrapInfoAttribute>(
   _info: T,
   _options: ICompatibilityOptions,
) {}

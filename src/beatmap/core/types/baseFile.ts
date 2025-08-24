import type { LooseAutocomplete } from '../../../types/utils.ts';
import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap base file.
 */
export interface IWrapBaseFile<T extends string = ''> {
   filename: LooseAutocomplete<T>;

   /**
    * Upon load by any mean, this value is set by their corresponding implementation.
    * This can be used to implicitly save by version if not given explicitly.
    *
    * It is advisable to not explicitly set this value unless you know what you are doing.
    *
    * @default -1 prevents from saving entirely.
    */
   version: number;
}

export type IWrapBeatmapFile<T extends string = ''> =
   & IWrapBaseFile<T>
   & IWrapBaseItem;

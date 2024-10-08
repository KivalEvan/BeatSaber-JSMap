import type { LooseAutocomplete } from '../../utils.ts';
import type { IWrapBaseItem } from './baseItem.ts';

/**
 * Wrapper attribute for beatmap base file.
 */
export interface IWrapBaseFileAttribute<T extends string = ''> {
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

/**
 * Wrapper for beatmap base file.
 */
export interface IWrapBaseFile<T extends string = ''> extends IWrapBaseFileAttribute<T> {
   setFilename(filename: this['filename']): this;
   setVersion(version: this['version']): this;
}

/**
 * Wrapper for beatmap base file.
 */
export type IWrapBeatmapFile<T extends string = ''> = IWrapBaseFile<T> & IWrapBaseItem;

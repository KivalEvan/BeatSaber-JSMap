import type { LooseAutocomplete } from '../../utils.ts';
import type { GenericFilename } from '../shared/filename.ts';
import type { IWrapBaseItem } from './baseItem.ts';

export interface IWrapBaseFileAttribute {
   filename: LooseAutocomplete<GenericFilename>;
}

export interface IWrapBaseFile extends IWrapBaseFileAttribute {
   setFilename(filename: this['filename']): this;
}

export type IWrapBeatmapFile =
   & IWrapBaseFile
   & IWrapBaseItem;

// deno-lint-ignore-file no-explicit-any
import type { LooseAutocomplete } from '../../utils.ts';
import type { GenericFilename } from '../shared/filename.ts';
import type { IWrapBaseItem, IWrapBaseItemAttribute } from './baseItem.ts';

export interface IWrapBaseFileAttribute extends IWrapBaseItemAttribute {
   filename: LooseAutocomplete<GenericFilename>;
}

export interface IWrapBaseFile<T extends Record<string, any> = IWrapBaseFileAttribute>
   extends IWrapBaseItem<T>,
      IWrapBaseFileAttribute {
   setFilename(filename: LooseAutocomplete<GenericFilename>): this;
}

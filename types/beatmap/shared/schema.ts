// deno-lint-ignore-file no-explicit-any
import type { DeepPartial } from '../../utils.ts';

export interface ISchemaContainer<
   TWrap = { [key: string]: any },
   TSerial = { [key: string]: any },
> {
   defaultValue: Required<TSerial>;
   serialize: (data: TWrap) => TSerial;
   deserialize: (data?: DeepPartial<TSerial>) => DeepPartial<TWrap>;
   isValid: (data: TWrap) => boolean;
   isChroma: (data: TWrap) => boolean;
   isNoodleExtensions: (data: TWrap) => boolean;
   isMappingExtensions: (data: TWrap) => boolean;
}

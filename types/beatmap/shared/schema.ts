// deno-lint-ignore-file no-explicit-any
import type { DeepPartial } from '../../utils.ts';
import type { Version } from './version.ts';

interface ISchemaDeclarationBase {
   readonly type: string | string[]; // string array because there'll soon be having to check both
   readonly version: Version;
   readonly array?: boolean;
   readonly optional?: boolean;
}

interface ISchemaDeclarationPrimitive extends ISchemaDeclarationBase {
   readonly type: 'string' | 'boolean';
}

interface ISchemaDeclarationNumber extends ISchemaDeclarationBase {
   readonly type: 'number';
   readonly int?: boolean;
   readonly unsigned?: boolean;
}

interface ISchemaDeclarationObject extends ISchemaDeclarationBase {
   readonly type: 'object' | 'array';
   readonly check: { [key: string]: ISchemaDeclaration };
}

export type ISchemaDeclaration =
   | ISchemaDeclarationPrimitive
   | ISchemaDeclarationNumber
   | ISchemaDeclarationObject;

export type BeatmapFileType = 'info' | 'audioData' | 'difficulty' | 'lightshow';

export interface ISchemaContainer<
   TWrap = { [key: string]: any },
   TSerial = { [key: string]: any },
> {
   serialize: (data: TWrap) => TSerial;
   deserialize: (data?: DeepPartial<TSerial>) => DeepPartial<TWrap>;
}

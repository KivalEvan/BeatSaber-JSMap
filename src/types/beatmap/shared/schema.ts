// deno-lint-ignore-file no-explicit-any
import type { DeepPartial } from '../../utils.ts';
import type { Version } from './version.ts';

interface ISchemaDeclarationBase {
   readonly type: string | string[]; // string array because there'll soon be having to check both
   readonly version?: Version;
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

/**
 * Schema type declaration.
 */
export type ISchemaDeclaration =
   | ISchemaDeclarationPrimitive
   | ISchemaDeclarationNumber
   | ISchemaDeclarationObject;

/**
 * Beatmap file type.
 */
export type BeatmapFileType = 'info' | 'audioData' | 'difficulty' | 'lightshow';

/**
 * Schema container for serialization.
 */
export interface ISchemaContainer<
   TWrapper = { [key: string]: any },
   TSerial = { [key: string]: any },
   TSerializationOptions = { [key: string]: any },
   TDeserializationOptions = { [key: string]: any },
> {
   serialize: (
      data: TWrapper,
      options?: DeepPartial<TSerializationOptions>,
   ) => TSerial;
   deserialize: (
      data: TSerial,
      options?: DeepPartial<TDeserializationOptions>,
   ) => TWrapper;
}

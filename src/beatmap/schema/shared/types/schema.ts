import type { Version } from './version.ts';

/**
 * Defines whether deserialized custom data is copied or transferred.
 * Transfer mode preserves source references. Repeated indexed records can share mutable custom
 * data in the deserialized result.
 */
export type CustomDataOwnership = 'copy' | 'transfer';

/**
 * Context passed to schema deserializers.
 */
export interface DeserializationOptions {
   /**
    * Defines whether custom-data values are copied before they are assigned to wrappers.
    * `copy` creates independent nested values; `transfer` passes references unchanged.
    */
   customDataOwnership: CustomDataOwnership;
}

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

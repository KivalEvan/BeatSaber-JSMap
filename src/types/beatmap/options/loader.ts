// deno-lint-ignore-file no-explicit-any no-explicit-any
import type { ISchemaCheckOptions } from './schema.ts';

export interface ILoadOptions<T extends Record<string, any> = Record<string, any>> {
   /**
    * Force version conversion if loaded difficulty version is mismatched.
    *
    * @default true
    */
   forceConvert?: boolean;
   /** Data check option when loading. */
   schemaCheck?: Partial<ISchemaCheckOptions>;
   /**
    * Sort object(s) on load.
    *
    * @default true
    */
   sort?: boolean;
   /**
    * Perform any preprocessing when JSON is created or passed.
    *
    * **Warning**: This may result in side-effects if object is passed.
    *
    * @default []
    */
   preprocess?: ((data: Record<string, any>) => Record<string, any>)[];
   /**
    * Perform any postprocessing after object class has been instantiated.
    *
    * @default []
    */
   postprocess?: ((data: T) => T)[];
}

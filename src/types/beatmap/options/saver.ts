// deno-lint-ignore-file no-explicit-any
import type { ICompatibilityOptions } from './compatibility.ts';
import type { ISchemaCheckOptions } from './schema.ts';
import type { IOptimizeOptions } from './optimize.ts';

export interface ISaveOptions<
   T extends Record<string, any> = Record<string, any>,
> {
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /**
    * Force convert beatmap version if mismatched.
    *
    * @default true
    */
   forceConvert?: boolean;
   /** Validate class object integrity when saving. */
   validate?: Partial<ISaveValidate>;
   /** Optimization option when saving. */
   optimize?: Partial<IOptimizeOptions>;
   /**
    * Sort the objects in array with the correct order.
    *
    * @default true
    */
   sort?: boolean;
   /**
    * Perform any preprocessing to object before transformed into JSON.
    *
    * **Warning**: This may result in side-effects.
    *
    * @default []
    */
   preprocess?: ((data: T) => T)[];
   /**
    * Perform any postprocessing after transformed into JSON.
    *
    * @default []
    */
   postprocess?: ((data: Record<string, any>) => Record<string, any>)[];
}

export interface ISaveValidate {
   /**
    * Enable class object validation check.
    *
    * @default true
    */
   enabled?: boolean;
   /**
    * Check if beatmap is valid in vanilla.
    *
    * @default false
    */
   vanilla?: boolean;
   compatibility?: ICompatibilityOptions;
   schemaCheck?: ISchemaCheckOptions;
}

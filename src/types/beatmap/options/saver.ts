// deno-lint-ignore-file no-explicit-any
import type { MirrorFn } from '../shared/functions.ts';
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../shared/infer.ts';
import type { BeatmapFileType } from '../shared/schema.ts';
import type { ICompatibilityOptions } from './compatibility.ts';
import type { IOptimizeOptions } from './optimize.ts';
import type { ISchemaCheckOptions } from './schema.ts';

export interface ISaveOptions<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper = Record<string, any>,
   TSerial = Record<string, any>,
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
   preprocess?: [
      ((data: TWrapper, version?: TVersion | null) => InferBeatmapAttribute<TFileType>),
      ...MirrorFn<InferBeatmapAttribute<TFileType>>[],
   ];
   /**
    * Perform any postprocessing after transformed into JSON.
    *
    * @default []
    */
   postprocess?: [
      ...MirrorFn<InferBeatmapSerial<TFileType, TVersion>>[],
      ((data: InferBeatmapSerial<TFileType, TVersion>, version?: TVersion | null) => TSerial),
   ];
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

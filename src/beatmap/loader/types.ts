// deno-lint-ignore-file no-explicit-any no-explicit-any
import type { MirrorFn } from '../schema/shared/types/functions.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../schema/shared/types/schema.ts';
import type { ISchemaCheckOptions } from '../mapping/types/schema.ts';

export interface ILoadOptions<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper = Record<string, any>,
   TSerial = Record<string, any>,
> {
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
   preprocess?: [
      ((data: TSerial, version?: TVersion | null) => InferBeatmapSerial<TFileType, TVersion>),
      ...MirrorFn<InferBeatmapSerial<TFileType, TVersion>>[],
   ];
   /**
    * Perform any postprocessing after object attribute has been instantiated.
    *
    * @default []
    */
   postprocess?: [
      ...MirrorFn<InferBeatmap<TFileType>>[],
      ((data: InferBeatmap<TFileType>, version?: TVersion | null) => TWrapper),
   ];
}

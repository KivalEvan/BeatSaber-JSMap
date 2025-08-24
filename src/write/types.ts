// deno-lint-ignore-file no-explicit-any
import type { ISaveOptions } from '../beatmap/saver/types.ts';
import type { InferBeatmapVersion } from '../beatmap/schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../beatmap/schema/shared/types/schema.ts';
import type { IBaseOptions } from '../types/_bsmap_io.ts';

export interface IWriteOptions<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = Record<string, any>,
   TSerial extends Record<string, any> = Record<string, any>,
> extends IBaseOptions {
   filename?: string;
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   save?: ISaveOptions<TFileType, TVersion, TWrapper, TSerial>;
}

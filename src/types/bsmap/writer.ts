// deno-lint-ignore-file no-explicit-any
import type { ISaveOptions } from '../beatmap/options/saver.ts';
import type { InferBeatmapVersion } from '../beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../mod.ts';
import type { IBaseOptions } from './_common.ts';

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

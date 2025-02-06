// deno-lint-ignore-file no-explicit-any
import type { ILoadOptions } from '../beatmap/options/loader.ts';
import type { InferBeatmapVersion } from '../beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../mod.ts';
import type { IBaseOptions } from './_common.ts';

export interface IReadOptions<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = Record<string, any>,
   TSerial extends Record<string, any> = Record<string, any>,
> extends IBaseOptions {
   load?: ILoadOptions<TFileType, TVersion, TWrapper, TSerial>;
}

// deno-lint-ignore-file no-explicit-any
import type { ILoadOptions } from '../beatmap/loader/types.ts';
import type { InferBeatmapVersion } from '../beatmap/schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../beatmap/schema/shared/types/schema.ts';
import type { InferBeatmapWrapper } from '../beatmap/schema/shared/types/infer.ts';
import type { IBaseOptions } from '../types/_bsmap_io.ts';

export interface IReadOptions<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = Record<string, any>,
   TSerial extends Record<string, any> = Record<string, any>,
> extends IBaseOptions {
   load?: ILoadOptions<TFileType, TVersion, TWrapper, TSerial>;
}

export interface IBeatmapInfoData<
   TWrapper extends Record<string, any> = InferBeatmapWrapper<'difficulty'>,
> {
   info: Pick<InferBeatmapWrapper<'info'>, 'difficulties'>['difficulties'][number];
   beatmap: TWrapper;
}

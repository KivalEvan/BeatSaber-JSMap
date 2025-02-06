// deno-lint-ignore-file no-explicit-any
import type { InferBeatmapAttribute } from '../beatmap/shared/infer.ts';

export interface IBeatmapInfoData<
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
> {
   info: Pick<InferBeatmapAttribute<'info'>, 'difficulties'>['difficulties'][number];
   beatmap: TWrapper;
}

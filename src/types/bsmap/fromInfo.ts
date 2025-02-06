// deno-lint-ignore-file no-explicit-any
import type { InferBeatmap } from '../beatmap/shared/infer.ts';

export interface IBeatmapInfoData<
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
> {
   info: Pick<InferBeatmap<'info'>, 'difficulties'>['difficulties'][number];
   beatmap: TWrapper;
}

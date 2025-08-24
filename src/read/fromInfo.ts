// deno-lint-ignore-file no-explicit-any
import type { MirrorFn } from '../beatmap/schema/shared/types/functions.ts';
import type {
   InferBeatmap,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../beatmap/schema/shared/types/infer.ts';
import type { IBeatmapInfoData } from './types.ts';
import type { IReadOptions } from './types.ts';
import { readDifficultyFile, readDifficultyFileSync } from './difficulty.ts';
import { readLightshowFileSync } from './lightshow.ts';

export async function readFromInfo<
   T extends Pick<InferBeatmap<'info'>, 'difficulties'>,
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<
      'difficulty',
      TVersion
   >,
>(
   info: T,
   options: IReadOptions<'difficulty', TVersion, TWrapper, TSerial> = {},
): Promise<IBeatmapInfoData<TWrapper>[]> {
   const ary: IBeatmapInfoData<TWrapper>[] = [];
   for (const d of info.difficulties) {
      const [posttransformer, ...postprocesses] = [
         ...(options.load?.postprocess ?? []),
      ].reverse() as [
         (data: InferBeatmap<'difficulty'>) => TWrapper,
         ...MirrorFn<InferBeatmap<'difficulty'>>[],
      ];
      const beatmap = await readDifficultyFile(d.filename, {
         ...options,
         load: {
            postprocess: [
               ...postprocesses,
               (x) => {
                  if (x.version === 4) {
                     const light = readLightshowFileSync(d.lightshowFilename, {
                        directory: options.directory ?? options.directory,
                     });
                     x.lightshow = light.lightshow;
                     x.lightshowFilename = light.lightshowFilename;
                  }
                  return x;
               },
               posttransformer,
            ],
         },
      });
      ary.push({ info: d, beatmap });
   }
   return ary;
}

export function readFromInfoSync<
   T extends Pick<InferBeatmap<'info'>, 'difficulties'>,
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmap<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<
      'difficulty',
      TVersion
   >,
>(
   info: T,
   options: IReadOptions<'difficulty', TVersion, TWrapper, TSerial> = {},
): IBeatmapInfoData<TWrapper>[] {
   const ary: IBeatmapInfoData<TWrapper>[] = [];
   for (const d of info.difficulties) {
      const [posttransformer, ...postprocesses] = [
         ...(options.load?.postprocess ?? []),
      ].reverse() as [
         (data: InferBeatmap<'difficulty'>) => TWrapper,
         ...MirrorFn<InferBeatmap<'difficulty'>>[],
      ];
      const beatmap = readDifficultyFileSync(d.filename, {
         ...options,
         load: {
            postprocess: [
               ...postprocesses,
               (x) => {
                  if (x.version === 4) {
                     const light = readLightshowFileSync(d.lightshowFilename, {
                        directory: options.directory,
                     });
                     x.lightshow = light.lightshow;
                     x.lightshowFilename = light.lightshowFilename;
                  }
                  return x;
               },
               posttransformer,
            ],
         },
      });
      ary.push({ info: d, beatmap });
   }
   return ary;
}

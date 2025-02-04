// deno-lint-ignore-file no-explicit-any
import type { MirrorFn } from '../types/beatmap/shared/functions.ts';
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { IBeatmapInfoData } from '../types/bsmap/fromInfo.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';
import { readDifficultyFile, readDifficultyFileSync } from './difficulty.ts';
import { readLightshowFileSync } from './lightshow.ts';

export async function readFromInfo<
   T extends Pick<InferBeatmapAttribute<'info'>, 'difficulties'>,
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   info: T,
   options: IReadOptions<'difficulty', TVersion, TWrapper, TSerial> = {},
): Promise<IBeatmapInfoData<TWrapper>[]> {
   const ary: IBeatmapInfoData<TWrapper>[] = [];
   for (const d of info.difficulties) {
      const [posttransformer, ...postprocesses] =
         (options.load?.postprocess?.toReversed() ?? []) as [
            (data: InferBeatmapAttribute<'difficulty'>) => TWrapper,
            ...MirrorFn<InferBeatmapAttribute<'difficulty'>>[],
         ];
      const beatmap = await readDifficultyFile(d.filename, {
         ...options,
         load: {
            postprocess: [...postprocesses, (x) => {
               if (x.version === 4) {
                  const light = readLightshowFileSync(d.lightshowFilename, {
                     directory: options.directory ?? options.directory,
                  });
                  x.lightshow = light.lightshow;
                  x.lightshowFilename = light.lightshowFilename;
               }
               return x;
            }, posttransformer],
         },
      });
      ary.push({ info: d, beatmap });
   }
   return ary;
}

export function readFromInfoSync<
   T extends Pick<InferBeatmapAttribute<'info'>, 'difficulties'>,
   TVersion extends InferBeatmapVersion<'difficulty'>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<'difficulty'>,
   TSerial extends Record<string, any> = InferBeatmapSerial<'difficulty', TVersion>,
>(
   info: T,
   options: IReadOptions<'difficulty', TVersion, TWrapper, TSerial> = {},
): IBeatmapInfoData<TWrapper>[] {
   const ary: IBeatmapInfoData<TWrapper>[] = [];
   for (const d of info.difficulties) {
      const [posttransformer, ...postprocesses] =
         (options.load?.postprocess?.toReversed() ?? []) as [
            (data: InferBeatmapAttribute<'difficulty'>) => TWrapper,
            ...MirrorFn<InferBeatmapAttribute<'difficulty'>>[],
         ];
      const beatmap = readDifficultyFileSync(d.filename, {
         ...options,
         load: {
            postprocess: [...postprocesses, (x) => {
               if (x.version === 4) {
                  const light = readLightshowFileSync(d.lightshowFilename, {
                     directory: options.directory,
                  });
                  x.lightshow = light.lightshow;
                  x.lightshowFilename = light.lightshowFilename;
               }
               return x;
            }, posttransformer],
         },
      });
      ary.push({ info: d, beatmap });
   }
   return ary;
}

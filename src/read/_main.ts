// deno-lint-ignore-file no-explicit-any
import { loadBeatmap } from '../beatmap/loader/_main.ts';
import { globals } from '../globals.ts';
import { readJSONFile, readJSONFileSync } from '../shims/_json.ts';
import { path } from '../shims/path.ts';
import type { MirrorFn } from '../beatmap/schema/shared/types/functions.ts';
import type {
   InferBeatmapSerial,
   InferBeatmapVersion,
   InferBeatmapWrapper,
} from '../beatmap/schema/shared/types/infer.ts';
import type { BeatmapFileType } from '../beatmap/schema/shared/types/schema.ts';
import type { IReadOptions } from './types.ts';

const defaultOptions = {
   directory: '',
   load: {},
} as const;

export function tag(name: string): string[] {
   return ['reader', name];
}

export function handleRead<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<TFileType, TVersion>,
>(
   type: TFileType,
   src: string,
   version?:
      | TVersion
      | null
      | IReadOptions<TFileType, TVersion, TWrapper, TSerial>,
   options: IReadOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): Promise<TWrapper> {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const p = path.resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   const [posttransformer, ...postprocesses] = [
      ...(opt.load?.postprocess ?? []),
   ].reverse() as [
      (data: InferBeatmapWrapper<TFileType>) => TWrapper,
      ...MirrorFn<InferBeatmapWrapper<TFileType>>[],
   ];
   return (readJSONFile(p) as Promise<TSerial>).then((data) => {
      return loadBeatmap(type, data, ver, {
         ...opt.load,
         postprocess: [
            ...postprocesses,
            (x) => {
               if (type === 'lightshow' && 'lightshowFilename' in x) {
                  x.lightshowFilename = path.basename(p);
               } else x.filename = path.basename(p);
               return posttransformer ? posttransformer(x) : (x as TWrapper);
            },
         ],
      });
   });
}

export function handleReadSync<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmapWrapper<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<TFileType, TVersion>,
>(
   type: TFileType,
   src: string,
   version?:
      | TVersion
      | null
      | IReadOptions<TFileType, TVersion, TWrapper, TSerial>,
   options: IReadOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): TWrapper {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const p = path.resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   const [posttransformer, ...postprocesses] = [
      ...(opt.load?.postprocess ?? []),
   ].reverse() as [
      (data: InferBeatmapWrapper<TFileType>) => TWrapper,
      ...MirrorFn<InferBeatmapWrapper<TFileType>>[],
   ];
   const d = loadBeatmap(type, readJSONFileSync(p) as TSerial, ver, {
      ...opt.load,
      postprocess: [
         ...postprocesses,
         (x) => {
            if (type === 'lightshow' && 'lightshowFilename' in x) {
               x.lightshowFilename = path.basename(p);
            } else x.filename = path.basename(p);
            return posttransformer ? posttransformer(x) : (x as TWrapper);
         },
      ],
   });
   return d;
}

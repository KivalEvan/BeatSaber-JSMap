// deno-lint-ignore-file no-explicit-any
import { loadBeatmap } from '../beatmap/loader/_main.ts';
import { globals } from '../globals.ts';
import { readJSONFile, readJSONFileSync } from '../shims/_json.ts';
import { path } from '../shims/path.ts';
import type { BeatmapFileType } from '../types/beatmap/shared/schema.ts';
import { IWrapBeatmapAttribute } from '../types/beatmap/wrapper/beatmap.ts';
import type { IReadOptions } from '../types/bsmap/reader.ts';

const defaultOptions: Required<IReadOptions> = {
   directory: '',
   load: {},
};

export function tag(name: string): string[] {
   return ['reader', name];
}

export function handleRead<T extends Record<string, any>>(
   type: BeatmapFileType,
   src: string,
   version?: number | null | IReadOptions<T>,
   options: IReadOptions<T> = {},
): Promise<T> {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const p = path.resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   return readJSONFile(p)
      .then((data) => loadBeatmap(type, data, ver, opt.load) as unknown as IWrapBeatmapAttribute)
      .then((d) => {
         if (type === 'lightshow' && 'lightshowFilename' in d) {
            d.lightshowFilename = path.basename(p);
         } else d.filename = path.basename(p);
         return d as unknown as T;
      });
}

export function handleReadSync<T extends Record<string, any>>(
   type: BeatmapFileType,
   src: string,
   version?: number | null | IReadOptions<T>,
   options: IReadOptions<T> = {},
): T {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const p = path.resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   const d = loadBeatmap(
      type,
      readJSONFileSync(p),
      ver,
      opt.load,
   ) as unknown as IWrapBeatmapAttribute;
   if (type === 'lightshow' && 'lightshowFilename' in d) d.lightshowFilename = path.basename(p);
   else d.filename = path.basename(p);
   return d as unknown as T;
}

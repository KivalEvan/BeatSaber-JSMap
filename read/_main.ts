// deno-lint-ignore-file no-explicit-any
import { loadBeatmap } from '../beatmap/loader/_main.ts';
import { path } from '../shims/path.ts';
import { readJSONFile, readJSONFileSync } from '../shims/_json.ts';
import globals from '../globals.ts';
import type { BeatmapFileType } from '../types/beatmap/shared/schema.ts';
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
      .then((data) => loadBeatmap(type, data, ver, opt.load))
      .then((d) => {
         if (type === 'lightshow') d.setLightshowFilename(path.basename(p));
         else d.setFilename(path.basename(p));
         return d;
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
   ).setFilename(path.basename(p));
   if (type === 'lightshow') d.setLightshowFilename(path.basename(p));
   else d.setFilename(path.basename(p));
   return d;
}

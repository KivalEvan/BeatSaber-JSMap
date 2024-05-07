// deno-lint-ignore-file no-explicit-any
import { loadBeatmap } from '../beatmap/loader/main.ts';
import { resolve } from '../deps.ts';
import { readJSONFile, readJSONFileSync } from '../fs/_json.ts';
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
   const path = resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   return readJSONFile(path).then((data) => loadBeatmap(type, data, ver, opt.load));
}

export function handleReadSync<T extends Record<string, any>>(
   type: BeatmapFileType,
   src: string,
   version?: number | null | IReadOptions<T>,
   options: IReadOptions<T> = {},
): T {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const path = resolve(
      opt.directory ?? (defaultOptions.directory || globals.directory),
      src,
   );
   return loadBeatmap(type, readJSONFileSync(path), ver, opt.load);
}

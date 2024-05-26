// deno-lint-ignore-file no-explicit-any
import { saveBeatmap } from '../beatmap/saver/_main.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../fs/_json.ts';
import globals from '../globals.ts';
import type { BeatmapFileType } from '../types/beatmap/shared/schema.ts';
import type { IWrapBeatmapFile } from '../types/beatmap/wrapper/baseFile.ts';
import type { IWriteOptions } from '../types/bsmap/writer.ts';

const defaultOptions: Required<IWriteOptions> = {
   directory: '',
   filename: '',
   format: 0,
   save: {},
};

export function tag(name: string): string[] {
   return ['writer', name];
}

function getFileName(type: BeatmapFileType, data: Record<string, any>): string {
   switch (type) {
      case 'lightshow':
         return data.lightshowFilename;
      default:
         return data.filename;
   }
}

export function handleWrite<T extends Record<string, any>>(
   type: BeatmapFileType,
   data: IWrapBeatmapFile,
   version?: number | null | IWriteOptions<T>,
   options: IWriteOptions<T> = {},
): Promise<Record<string, any>> {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const json = saveBeatmap(type, data, ver, opt.save);
   return writeJSONFile(
      resolve(
         opt.directory ?? (globals.directory || defaultOptions.directory),
         opt.filename ??
            (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      opt.format,
   ).then(() => json);
}

export function handleWriteSync<T extends Record<string, any>>(
   type: BeatmapFileType,
   data: IWrapBeatmapFile,
   version?: number | null | IWriteOptions<T>,
   options: IWriteOptions<T> = {},
): Record<string, any> {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   console.log(opt)
   const json = saveBeatmap(type, data, ver, opt.save);
   writeJSONFileSync(
      resolve(
         opt.directory ?? (globals.directory || defaultOptions.directory),
         opt.filename ??
            (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      opt.format,
   );
   return json;
}

// deno-lint-ignore-file no-explicit-any
import { saveBeatmap } from '../beatmap/saver/main.ts';
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
   version: number,
   options: IWriteOptions<T> = {},
): Promise<Record<string, any>> {
   const json = saveBeatmap(type, data, version, options.save);
   return writeJSONFile(
      resolve(
         options.directory ?? (globals.directory || defaultOptions.directory),
         options.filename ??
            (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      options.format,
   ).then(() => json);
}

export function handleWriteSync<T extends Record<string, any>>(
   type: BeatmapFileType,
   data: IWrapBeatmapFile,
   version: number,
   options: IWriteOptions<T> = {},
): Record<string, any> {
   const json = saveBeatmap(type, data, version, options.save);
   writeJSONFileSync(
      resolve(
         options.directory ?? (globals.directory || defaultOptions.directory),
         options.filename ??
            (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      options.format,
   );
   return json;
}

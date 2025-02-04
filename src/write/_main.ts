// deno-lint-ignore-file no-explicit-any
import { saveBeatmap } from '../beatmap/saver/_main.ts';
import { globals } from '../globals.ts';
import { writeJSONFile, writeJSONFileSync } from '../shims/_json.ts';
import { path } from '../shims/path.ts';
import type {
   InferBeatmapAttribute,
   InferBeatmapSerial,
   InferBeatmapVersion,
} from '../types/beatmap/shared/infer.ts';
import type { BeatmapFileType } from '../types/beatmap/shared/schema.ts';
import type { IWriteOptions } from '../types/bsmap/writer.ts';

const defaultOptions = {
   directory: '',
   filename: '',
   format: 0,
   save: {},
} as const;

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

export function handleWrite<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<
      TFileType,
      TVersion
   >,
>(
   type: TFileType,
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<TFileType, TVersion, TWrapper, TSerial>,
   options: IWriteOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): Promise<TSerial> {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const json = saveBeatmap(type, data, ver, opt.save);
   return writeJSONFile(
      path.resolve(
         opt.directory ?? (globals.directory || defaultOptions.directory),
         opt.filename ?? (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      opt.format,
   ).then(() => json);
}

export function handleWriteSync<
   TFileType extends BeatmapFileType,
   TVersion extends InferBeatmapVersion<TFileType>,
   TWrapper extends Record<string, any> = InferBeatmapAttribute<TFileType>,
   TSerial extends Record<string, any> = InferBeatmapSerial<
      TFileType,
      TVersion
   >,
>(
   type: TFileType,
   data: TWrapper,
   version?: TVersion | null | IWriteOptions<TFileType, TVersion, TWrapper, TSerial>,
   options: IWriteOptions<TFileType, TVersion, TWrapper, TSerial> = {},
): TSerial {
   const ver = typeof version === 'number' ? version : null;
   const opt = (typeof version !== 'number' ? version : options) ?? {};
   const json = saveBeatmap(type, data, ver, opt.save);
   writeJSONFileSync(
      path.resolve(
         opt.directory ?? (globals.directory || defaultOptions.directory),
         opt.filename ?? (getFileName(type, data) || defaultOptions.filename),
      ),
      json,
      opt.format,
   );
   return json;
}

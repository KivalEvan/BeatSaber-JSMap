// deno-lint-ignore-file no-explicit-any
import { parseAudio as parseV2Audio } from '../beatmap/v2/parse.ts';
import { parseAudio as parseV4Audio } from '../beatmap/v4/parse.ts';
import { toV2Audio } from '../converter/toV2/audioData.ts';
import { toV4Audio } from '../converter/toV4/audioData.ts';
import { BPMInfo as V2Audio } from '../beatmap/v2/bpmInfo.ts';
import { AudioData as V4Audio } from '../beatmap/v4/audioData.ts';
import { resolve } from '../deps.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { IWrapAudio } from '../types/beatmap/wrapper/audioData.ts';
import { ILoadOptionsAudioData } from '../types/bsmap/load.ts';
import { LooseAutocomplete } from '../types/utils.ts';
import { readJSONFile, readJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';

function tag(name: string): string[] {
   return ['load', name];
}

const parseMap: Record<number, any> = {
   2: parseV2Audio,
   4: parseV4Audio,
} as const;
const convertMap: Record<number, any> = {
   2: toV2Audio,
   4: toV4Audio,
} as const;

function _audioData(
   json: Record<string, unknown>,
   filePath: string,
   targetVer: number | null | undefined,
   options: ILoadOptionsAudioData,
) {
   const opt: Required<ILoadOptionsAudioData> = {
      directory: '',
      forceConvert: options.forceConvert ?? defaultOptions.audioData.forceConvert,
      dataCheck: {
         ...defaultOptions.audioData.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.audioData.sort,
      preprocess: options.preprocess ?? defaultOptions.audioData.preprocess,
      postprocess: options.postprocess ?? defaultOptions.audioData.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(tag('_audioData'), 'Running preprocess function #' + (i + 1));
      json = fn(json);
   });

   const jsonVerStr = typeof json._version === 'string'
      ? json._version.at(0)
      : typeof json.version === 'string'
      ? json.version.at(0)
      : null;
   let jsonVer: number;
   if (jsonVerStr) {
      jsonVer = parseInt(jsonVerStr);
   } else {
      jsonVer = json.songName ? 1 : 2;
      logger.tWarn(
         tag('_audioData'),
         'Could not identify audio version from JSON, assume implicit version',
         jsonVer,
      );
   }

   let data: IWrapAudio;
   const parser = parseMap[jsonVer];
   if (parser) data = parser(json, opt.dataCheck).setFilename(filePath);
   else {
      throw new Error(
         `Audio data version ${jsonVer} is not supported, this may be an error in JSON or is newer than currently supported.`,
      );
   }

   if (targetVer && jsonVer !== targetVer) {
      if (!opt.forceConvert) {
         throw new Error(
            `Audio data version unmatched, expected ${targetVer} but received ${jsonVer}`,
         );
      }
      logger.tWarn(
         tag('_audioData'),
         'Audio data version unmatched, expected',
         targetVer,
         'but received',
         jsonVer,
         'for version; Converting to audio version',
         targetVer,
      );
      data = convertMap[targetVer](data);
   }

   if (opt.sort) data.sort();

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(tag('_audioData'), 'Running postprocess function #' + (i + 1));
      data = fn(data);
   });
   return data;
}

/**
 * Asynchronously load beatmap audio data file.
 * ```ts
 * load.audioData(4).then((data) => console.log(data));
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function audioData(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: 2,
   options?: ILoadOptionsAudioData,
): Promise<V2Audio>;
export function audioData(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: 4,
   options?: ILoadOptionsAudioData,
): Promise<V4Audio>;
export function audioData(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: number,
   options?: ILoadOptionsAudioData,
): Promise<IWrapAudio>;
export function audioData(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: number,
   options: ILoadOptionsAudioData = {},
): Promise<IWrapAudio> {
   logger.tInfo(tag('audioData'), 'Async loading audio');
   const path = resolve(
      options.directory ??
         (defaultOptions.audioData.directory || globals.directory),
      filePath,
   );
   return readJSONFile(path).then((data) => _audioData(data, filePath, version, options));
}

/**
 * Synchronously load beatmap audio data file.
 * ```ts
 * const audio = load.audioDataSync(4);
 * console.log(audio);
 * ```
 *
 * Mismatched beatmap version will be automatically converted, unspecified will leave the version as is but not known.
 */
export function audioDataSync(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: 2,
   options?: ILoadOptionsAudioData,
): V2Audio;
export function audioDataSync(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: 4,
   options?: ILoadOptionsAudioData,
): V4Audio;
export function audioDataSync(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: number,
   options?: ILoadOptionsAudioData,
): IWrapAudio;
export function audioDataSync(
   filePath: LooseAutocomplete<'Audio.dat' | 'BPMInfo.dat'>,
   version?: number,
   options: ILoadOptionsAudioData = {},
): IWrapAudio {
   logger.tInfo(tag('audioDataSync'), 'Sync loading audio');
   const path = resolve(
      options.directory ??
         (defaultOptions.audioData.directory || globals.directory),
      filePath,
   );
   return _audioData(readJSONFileSync(path), filePath, version, options);
}

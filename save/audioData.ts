import type { ISaveOptionsAudioData } from '../types/bsmap/save.ts';
import * as optimize from '../optimize/mod.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { deepCheck } from '../beatmap/shared/dataCheck.ts';
import { BPMInfoDataCheck as V2AudioCheck } from '../beatmap/v2/dataCheck.ts';
import { AudioDataCheck as V4AudioCheck } from '../beatmap/v4/dataCheck.ts';
import type { BPMInfo as V2Audio } from '../beatmap/v2/bpmInfo.ts';
import type { AudioData as V4Audio } from '../beatmap/v4/audioData.ts';
import type { IBPMInfo as IV2Audio } from '../types/beatmap/v2/bpmInfo.ts';
import type { IAudio as IV4Audio } from '../types/beatmap/v4/audioData.ts';
import type { IWrapAudio } from '../types/beatmap/wrapper/audioData.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import type { DataCheck } from '../types/beatmap/shared/dataCheck.ts';

function tag(name: string): string[] {
   return ['save', name];
}

const dataCheckMap: Record<number, Record<string, DataCheck>> = {
   2: V2AudioCheck,
   4: V4AudioCheck,
};

function _audioData(data: IWrapAudio, options: ISaveOptionsAudioData) {
   const opt: Required<ISaveOptionsAudioData> = {
      directory: '',
      filePath: '',
      format: options.format ?? defaultOptions.audioData.format,
      optimize: { ...defaultOptions.audioData.optimize, ...options.optimize },
      validate: { ...defaultOptions.audioData.validate, ...options.validate },
      dataCheck: {
         ...defaultOptions.audioData.dataCheck,
         ...options.dataCheck,
      },
      sort: options.sort ?? defaultOptions.audioData.sort,
      write: true,
      preprocess: options.preprocess ?? defaultOptions.audioData.preprocess,
      postprocess: options.postprocess ?? defaultOptions.audioData.postprocess,
   };
   opt.preprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_audioData'),
         'Running preprocess function #' + (i + 1),
      );
      data = fn(data);
   });

   if (opt.sort) {
      logger.tInfo(tag('_audioData'), 'Sorting beatmap objects');
      data.sort();
   }

   const ver = parseInt(data.version.at(0) || '0');
   let json = data.toJSON();

   if (opt.optimize.enabled) {
      optimize.audioData(json, ver, opt.optimize);
   }

   if (opt.dataCheck.enabled) {
      logger.tInfo(tag('_audioData'), 'Checking audio data value');
      const dataCheck = dataCheckMap[ver] ?? {};
      deepCheck(
         json,
         dataCheck,
         'audio',
         data.version,
         opt.dataCheck.throwError,
      );
   }

   opt.postprocess.forEach((fn, i) => {
      logger.tInfo(
         tag('_audioData'),
         'Running postprocess function #' + (i + 1),
      );
      json = fn(json);
   });
   return json;
}

/**
 * Asynchronously save beatmap audio.
 * ```ts
 * await save.audioData(audio);
 * ```
 */
export function audioData(data: V2Audio, options?: ISaveOptionsAudioData): Promise<IV2Audio>;
export function audioData(data: V4Audio, options?: ISaveOptionsAudioData): Promise<IV4Audio>;
export function audioData(
   data: IWrapAudio,
   options?: ISaveOptionsAudioData,
   // deno-lint-ignore no-explicit-any
): Promise<Record<string, any>>;
export function audioData(data: IWrapAudio, options: ISaveOptionsAudioData = {}) {
   logger.tInfo(tag('audioData'), 'Async saving audio');
   const json = _audioData(data, options);
   if (options.write ?? defaultOptions.audioData.write) {
      return writeJSONFile(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.audioData.directory),
            options.filePath ??
               (data.filename || defaultOptions.audioData.filePath || 'Audio.dat'),
         ),
         options.format,
      );
   }
   return new Promise<typeof json>((resolve) => resolve(json));
}

/**
 * Synchronously save beatmap audio.
 * ```ts
 * save.audioDataSync(audio);
 * ```
 */
export function audioDataSync(data: V2Audio, options?: ISaveOptionsAudioData): IV2Audio;
export function audioDataSync(data: V4Audio, options?: ISaveOptionsAudioData): IV4Audio;
export function audioDataSync(
   data: IWrapAudio,
   options?: ISaveOptionsAudioData,
   // deno-lint-ignore no-explicit-any
): Record<string, any>;
export function audioDataSync(data: IWrapAudio, options: ISaveOptionsAudioData = {}) {
   logger.tInfo(tag('audioDataSync'), 'Sync saving audio');
   const json = _audioData(data, options);
   if (options.write ?? defaultOptions.audioData.write) {
      writeJSONFileSync(
         json,
         resolve(
            options.directory ??
               (globals.directory || defaultOptions.audioData.directory),
            options.filePath ??
               (data.filename || defaultOptions.audioData.filePath || 'Audio.dat'),
         ),
         options.format,
      );
   }
   return json;
}

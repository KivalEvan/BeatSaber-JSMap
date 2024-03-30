// deno-lint-ignore-file no-explicit-any
import type { ISaveOptionsList } from '../types/bsmap/save.ts';
import type { IBeatmapData } from '../types/bsmap/beatmap.ts';
import globals from '../globals.ts';
import logger from '../logger.ts';
import { resolve } from '../deps.ts';
import { writeJSONFile, writeJSONFileSync } from '../utils/_fs.ts';
import { defaultOptions } from './options.ts';
import { _difficulty } from './difficulty.ts';

function tag(name: string): string[] {
   return ['save', name];
}

/**
 * Asynchronously save multiple beatmap difficulties.
 * ```ts
 * await save.beatmapList(difficulties);
 * ```
 */
export function beatmapList(
   difficulties: IBeatmapData[],
   options: ISaveOptionsList = {},
): Promise<PromiseSettledResult<Record<string, any>>[]> {
   logger.tInfo(tag('beatmapList'), 'Async saving list of difficulty');
   return Promise.allSettled(
      difficulties.map((dl) => {
         const json = _difficulty(dl.data, options);
         if (options.write ?? defaultOptions.difficulty.write) {
            return writeJSONFile(
               json,
               resolve(
                  options.directory ??
                     (globals.directory || defaultOptions.difficulty.directory),
                  dl.settings.filename ||
                     dl.data.filename ||
                     defaultOptions.difficulty.filePath ||
                     'UnnamedDifficulty.dat',
               ),
               options.format,
            ).then(() => json);
         }
         return new Promise<typeof json>((resolve) => resolve(json));
      }),
   );
}

/**
 * Synchronously save multiple beatmap difficulties.
 * ```ts
 * save.beatmapList(difficulties);
 * ```
 */
export function beatmapListSync(
   difficulties: IBeatmapData[],
   options: ISaveOptionsList = {},
): Record<string, any>[] {
   logger.tInfo(tag('beatmapListSync'), 'Sync saving list of difficulty');
   const ary = [];
   for (const dl of difficulties) {
      const json = _difficulty(dl.data, options);
      if (options.write ?? defaultOptions.difficulty.write) {
         writeJSONFileSync(
            json,
            resolve(
               options.directory ??
                  (globals.directory || defaultOptions.difficulty.directory),
               dl.settings.filename ||
                  dl.data.filename ||
                  defaultOptions.difficulty.filePath ||
                  'UnnamedDifficulty.dat',
            ),
            options.format,
         );
      }
      ary.push(json);
   }
   return ary;
}

import { ISaveOptionsList } from '../types/bsmap/save.ts';
import { ILoadInfoData } from '../types/bsmap/infoBeatmap.ts';
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
   difficulties: ILoadInfoData[],
   options: ISaveOptionsList = {},
) {
   logger.tInfo(tag('beatmapList'), 'Async saving list of difficulty');
   return Promise.allSettled(
      difficulties.map(async (dl) => {
         await writeJSONFile(
            _difficulty(dl.data, options),
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
   difficulties: ILoadInfoData[],
   options: ISaveOptionsList = {},
) {
   logger.tInfo(tag('beatmapListSync'), 'Sync saving list of difficulty');
   for (const dl of difficulties) {
      writeJSONFileSync(
         _difficulty(dl.data, options),
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
}

import globals from '../../globals.ts';
import { zip } from './deps.ts';
import { IInfo } from '../../types/beatmap/shared/info.ts';
import * as save from '../../save.ts';

export async function compress(info: IInfo, zipName: string) {
   await save.info(info);
   const toZip: string[] = [globals.directory + 'Info.dat'];
   for (const set of info._difficultyBeatmapSets) {
      for (const diff of set._difficultyBeatmaps) {
         toZip.push((globals.directory + diff._beatmapFilename) as string);
      }
   }
   return zip.compress(toZip, globals.directory + zipName + '.zip', {
      overwrite: true,
   });
}

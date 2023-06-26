import globals from '../../globals.ts';
import { zip } from './deps.ts';
import { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import * as save from '../../save.ts';
import { resolve } from '../../deps.ts';

export async function compress(info: IWrapInfo, zipName: string) {
   await save.info(info);
   const toZip: string[] = [globals.directory + 'Info.dat'];
   for (const [_, d] of info.listMap()) {
      toZip.push(resolve(globals.directory + d.filename));
   }
   return zip.compress(toZip, globals.directory + zipName + '.zip', {
      overwrite: true,
   });
}

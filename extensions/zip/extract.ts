import globals from '../../globals.ts';
import { zip } from './deps.ts';
import * as load from '../../load.ts';
import { fs } from './deps.ts';
import { IWrapInfo } from '../../types/beatmap/wrapper/info.ts';
import { IDifficultyList } from '../../types/bsmap/list.ts';
import { resolve } from '../../deps.ts';

export async function extract(
   zipPath: string,
): Promise<{ info: IWrapInfo; difficulties: IDifficultyList }> {
   try {
      fs.ensureDirSync(globals.directory + 'temp_bsmap_extract');
      const location = await zip.decompress(zipPath, globals.directory + 'temp_bsmap_extract', {
         includeFileName: true,
      });
      let info: IWrapInfo;
      try {
         info = load.infoSync(null, { directory: resolve(globals.directory + location) });
      } catch {
         info = load.infoSync(null, {
            directory: resolve(globals.directory + location),
            filePath: 'info.dat',
         });
      }
      const list = load.difficultyFromInfoSync(info, {
         directory: resolve(globals.directory + location),
      });
      return { info, difficulties: list };
   } catch (e) {
      throw e;
   } finally {
      Deno.removeSync(globals.directory + 'temp_bsmap_extract', {
         recursive: true,
      });
   }
}

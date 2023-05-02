import globals from '../../globals.ts';
import { zip } from './deps.ts';
import * as load from '../../load.ts';
import { IDifficultyList, IInfo } from '../../types/mod.ts';
import { fs } from './deps.ts';

export async function extract(
    zipPath: string,
): Promise<{ info: IInfo; difficulties: IDifficultyList }> {
    try {
        fs.ensureDirSync(globals.directory + 'temp_bsmap_extract');
        const location = await zip.decompress(zipPath, globals.directory + 'temp_bsmap_extract', {
            includeFileName: true,
        });
        let info: IInfo;
        try {
            info = load.infoSync({ directory: globals.directory + location });
        } catch {
            info = load.infoSync({
                directory: globals.directory + location,
                filePath: 'info.dat',
            });
        }
        const list = load.difficultyFromInfoSync(info, {
            directory: globals.directory + location,
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

import { Difficulty as DifficultyV2 } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../../beatmap/v3/difficulty.ts';
import { isV2 } from '../../beatmap/version.ts';
import { v2 } from './v2.ts';
import { v3 } from './v3.ts';

/** Supports both beatmap v2 and v3.
 *
 * **WARNING:** These patch uses default value provided by class object, any changes to said default value will be affected here.
 */
export function difficulty(data: DifficultyV2 | DifficultyV3) {
    if (isV2(data)) {
        v2(data);
    } else {
        v3(data);
    }
}

export { info } from './info.ts';
export * from './helpers.ts';

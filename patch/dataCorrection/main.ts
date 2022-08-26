import { Difficulty as DifficultyV2 } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../../beatmap/v3/difficulty.ts';
import { isV2 } from '../../beatmap/version.ts';
import logger from '../../logger.ts';
import { patchV2 } from './v2.ts';
import { patchV3 } from './v3.ts';

export function dataCorrection(data: DifficultyV2 | DifficultyV3) {
    if (isV2(data)) {
        logger.info('[patch::dataCorrection] Verifying and correcting data type for beatmap v2...');
        patchV2(data);
    } else {
        logger.info('[patch::dataCorrection] Verifying and correcting data type for beatmap v3...');
        patchV3(data);
    }
}

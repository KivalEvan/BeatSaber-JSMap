import type { ICustomDataDifficulty as ICustomDataDifficultyV2 } from '../../../schema/v2/types/custom/difficulty.ts';
import type { ICustomDataDifficulty as ICustomDataDifficultyV3 } from '../../../schema/v3/types/custom/difficulty.ts';

/**
 * Aggregated custom data for difficulty.
 */
export type ICustomDataDifficulty = ICustomDataDifficultyV2 & ICustomDataDifficultyV3;

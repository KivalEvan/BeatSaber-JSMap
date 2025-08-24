import type { IColor } from '../../../../../types/colors.ts';
import type { IContributor } from '../../../shared/types/custom/contributor.ts';

/**
 * Custom data schema for v1 info.
 */
export interface ICustomInfo {
   contributors?: IContributor[];
   customEnvironment?: string;
   customEnvironmentHash?: string;
}

/**
 * Custom data schema for v1 info difficulty.
 */
export interface ICustomInfoDifficulty {
   /**
    * **Type:** `i32`
    */
   offset?: number;
   /**
    * **Type:** `i32`
    */
   oldOffset?: number;
   chromaToggle?: string;
   customColors?: boolean;
   difficultyLabel?: string;
   colorLeft?: Omit<IColor, 'a'>;
   colorRight?: Omit<IColor, 'a'>;
   envColorLeft?: Omit<IColor, 'a'>;
   envColorRight?: Omit<IColor, 'a'>;
   obstacleColor?: Omit<IColor, 'a'>;
}

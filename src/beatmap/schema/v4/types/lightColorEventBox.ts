import type { IChromaGLSColorDistributions } from '../../v3/types/custom/chromaGLS.ts';
import type { IEventBoxCommon } from './eventBoxCommon.ts';

/**
 * Schema for v4 `Light Color Event Box`.
 */
export interface ILightColorEventBox extends IEventBoxCommon {
   customData?: IChromaGLSColorDistributions;
}

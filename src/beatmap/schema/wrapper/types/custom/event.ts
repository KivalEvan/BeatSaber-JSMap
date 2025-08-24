import type {
   IChromaEventLaser as IChromaEventLaserV2,
   IChromaEventLight as IChromaEventLightV2,
   IChromaEventZoom as IChromaEventZoomV2,
} from '../../../../schema/v2/types/custom/chroma.ts';
import type {
   IChromaEventLaser as IChromaEventLaserV3,
   IChromaEventLight as IChromaEventLightV3,
   IChromaEventZoom as IChromaEventZoomV3,
} from '../../../../schema/v3/types/custom/chroma.ts';

/**
 * Aggregated custom data for event.
 */
export type ICustomDataEvent =
   & IChromaEventLightV2
   & IChromaEventLightV3
   & IChromaEventZoomV2
   & IChromaEventZoomV3
   & IChromaEventLaserV2
   & IChromaEventLaserV3;

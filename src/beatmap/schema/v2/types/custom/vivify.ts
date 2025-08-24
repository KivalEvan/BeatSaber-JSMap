import type { LooseAutocomplete, Nullable } from '../../../../../types/utils.ts';
import type { AssetBundleTarget } from '../../../shared/types/custom/vivify.ts';

export interface IVivifyCustomDataInfo {
   _assetBundle?: Nullable<
      Record<LooseAutocomplete<AssetBundleTarget>, number>
   >;
   _anisotropicFiltering?: 0 | 1 | 2;
   _antiAliasing?: 0 | 2 | 4 | 8;
   _pixelLightCount?: number; // int
   _realtimeReflectionProbes?: boolean;
   _shadowCascades?: 0 | 2 | 4;
   _shadowDistance?: number; // float
   _shadowmaskMode?: 0 | 1;
   _shadowNearPlaneOffset?: number; // float
   _shadowProjection?: 0 | 1;
   _shadowResolution?: 0 | 1 | 2 | 3;
   _shadows?: 0 | 1 | 2;
   _softParticles?: boolean;
}

import type { ColorArray } from '../../../../../types/colors.ts';
import type { Easings } from '../../../../../types/easings.ts';
import type { Nullable } from '../../../../../types/utils.ts';
import type { Vector3 } from '../../../../../types/vector.ts';
import type {
   AmbientMode,
   AnisotropicFiltering,
   Bool,
   DefaultReflectionMode,
   FogMode,
   ShadowMaskMode,
   ShadowProjection,
   ShadowResolution,
   Shadows,
} from '../../../shared/types/custom/constants.ts';
import type {
   FloatPointDefinition,
   Vector4PointDefinition,
} from '../../../shared/types/custom/heck.ts';

export interface IVivifyMaterialProperty {
   id: string;
   type: 'Texture' | 'Float' | 'Color' | 'Vector' | 'Keyword';
   value:
      | string
      | number
      | boolean
      | Vector4PointDefinition;
}

export interface IVivifyAnimatorProperty {
   id: string;
   type: 'Bool' | 'Float' | 'Integer' | 'Trigger';
   value: number | boolean | FloatPointDefinition;
}

export interface IVivifyCameraProperty {
   id?: string;
   properties: {
      depthTextureMode?: string[];
      clearFlags?: 'Skybox' | 'SolidColor' | 'Depth' | 'Nothing';
      backgroundColor: ColorArray[];
      culling?: {
         track: string | string[];
         whitelist?: boolean;
      };
      bloomPrePass?: boolean;
      mainEffect?: boolean;
   };
}

export interface IVivifyCustomEventSetMaterialProperty {
   asset: string;
   duration?: number; // float
   easing?: Easings;
   properties: IVivifyMaterialProperty[];
}

export interface IVivifyCustomEventSetGlobalProperty {
   duration?: number; // float
   easing?: Easings;
   properties: IVivifyMaterialProperty[];
}

export interface IVivifyCustomEventBlit {
   asset?: string;
   priority?: number; // int
   pass?: number; // int
   order?: 'BeforeMainEffect' | 'AfterMainEffect';
   source?: string;
   destination?: string | string[];
   duration?: number; // float
   easing?: Easings;
   properties?: IVivifyMaterialProperty[];
}

export interface IVivifyCustomEventCreateCamera extends Nullable<IVivifyCameraProperty> {
   id: string;
   texture?: string;
   depthTexture?: string;
}

export interface IVivifyCustomEventCreateScreenTexture {
   id: string;
   xRatio?: number; // float
   yRatio?: number; // float
   width?: number; // int
   height?: number; // int
   colorFormat?:
      | 'ARGB32'
      | 'Depth'
      | 'ARGBHalf'
      | 'Shadowmap'
      | 'RGB565'
      | 'ARGB4444'
      | 'ARGB1555'
      | 'Default'
      | 'ARGB2101010'
      | 'DefaultHDR'
      | 'ARGB64'
      | 'ARGBFloat'
      | 'RGFloat'
      | 'RGHalf'
      | 'RFloat'
      | 'RHalf'
      | 'R8'
      | 'ARGBInt'
      | 'RGInt'
      | 'RInt'
      | 'BGRA32'
      | 'RGB111110Float'
      | 'RG32'
      | 'RGBAUShort'
      | 'RG16'
      | 'BGRA101010_XR'
      | 'BGR101010_XR'
      | 'R16';
   filterMode?: 'Point' | 'Bilinear' | 'Trilinear';
}

export interface IVivifyCustomEventDeclareRenderTexture {
   id: string;
}

export interface IVivifyCustomEventDestroyTexture {
   id: string;
}

export interface IVivifyCustomEventInstantiatePrefab {
   asset: string;
   id?: string;
   track?: string;
   position?: Vector3;
   localPosition?: Vector3;
   rotation?: Vector3;
   localRotation?: Vector3;
   scale?: Vector3;
}

export interface IVivifyCustomEventDestroyObject {
   id: string | string[];
}

export interface IVivifyCustomEventSetAnimatorProperty {
   id: string;
   duration?: number; // float
   easing?: Easings;
   properties: IVivifyAnimatorProperty[];
}

export interface IVivifyCustomEventSetCameraProperty {
   id?: string;
   properties: IVivifyCameraProperty;
}

export interface IVivifyCustomEventAssignObjectPrefab {
   loadMode?: 'Single' | 'Additive';
   colorNotes?: {
      track: string;
      asset?: string;
      anyDirectionAsset?: string;
      debrisAsset?: string;
   };
   burstSliders?: {
      track: string;
      asset?: string;
      debrisAsset?: string;
   };
   burstSlidersElement?: {
      track: string;
      asset?: string;
      debrisAsset?: string;
   };
   bombNotes?: {
      track: string;
      asset?: string;
   };
   saber?: {
      type: 'Left' | 'Right' | 'Both';
      asset?: string;
      trailAsset?: string;
      trailTopPos?: Vector3;
      trailBottomPos?: Vector3;
      trailDuration?: number; // float
      trailSamplingFrequency?: number; // int
      trailGranularity?: number; // int
   };
}

export interface IVivifyCustomEventSetRenderingSettings {
   duration?: number; // float
   easing?: Easings;
   renderSettings?: {
      ambientEquatorColor?: Vector4PointDefinition;
      ambientGroundColor?: Vector4PointDefinition;
      ambientIntensity?: number | FloatPointDefinition; //float
      ambientLight?: Vector4PointDefinition;
      ambientMode?: AmbientMode | FloatPointDefinition;
      ambientSkyColor?: Vector4PointDefinition;
      defaultReflectionMode?: DefaultReflectionMode | FloatPointDefinition;
      defaultReflectionResolution?: number | FloatPointDefinition; // int
      flareFadeSpeed?: number | FloatPointDefinition; // float
      flareStrength?: number | FloatPointDefinition; // float
      fog?: Bool | FloatPointDefinition;
      fogColor?: Vector4PointDefinition;
      fogDensity?: number | FloatPointDefinition; // float
      fogStartDistance?: number | FloatPointDefinition; // float
      fogMode?: FogMode | FloatPointDefinition;
      fogEndDistance?: number | FloatPointDefinition; // float
      haloStrength?: number | FloatPointDefinition; // float
      reflectionBounces?: number | FloatPointDefinition; // int
      reflectionIntensity?: number | FloatPointDefinition; // float
      skybox?: string;
      subtractiveShadowColor?: Vector4PointDefinition;
      sun?: string;
   };
   qualitySettings?: {
      anisotropicFiltering?: AnisotropicFiltering | FloatPointDefinition;
      antiAliasing?: 0 | 2 | 4 | 8 | FloatPointDefinition;
      pixelLightCount?: number | FloatPointDefinition; // int
      realtimeReflectionProbes?: Bool | FloatPointDefinition;
      shadowCascades?: 0 | 2 | 4 | FloatPointDefinition;
      shadowDistance?: number | FloatPointDefinition; // float
      shadowMaskMode?: ShadowMaskMode | FloatPointDefinition;
      shadowNearPlaneOffset?: number | FloatPointDefinition; // float
      shadowProjection?: ShadowProjection | FloatPointDefinition;
      shadowResolution?: ShadowResolution | FloatPointDefinition;
      shadows?: Shadows | FloatPointDefinition;
      softParticles?: Bool | FloatPointDefinition;
   };
   xrSettings?: {
      useOcclusionMesh?: Bool | FloatPointDefinition;
   };
}

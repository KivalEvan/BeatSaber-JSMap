import type { ColorArray } from '../../../colors.ts';
import type { Easings } from '../../../easings.ts';
import type { Vector3, Vector4 } from '../../../vector.ts';
import type {
   FloatPointDefinition,
   Vector3PointDefinition,
   Vector4PointDefinition,
} from '../../shared/custom/heck.ts';

export interface IVivifyMaterialProperty {
   id: string;
   type: 'Texture' | 'Float' | 'Color' | 'Vector' | 'Keyword';
   value:
      | string
      | number
      | boolean
      | Vector3
      | Vector4
      | FloatPointDefinition
      | Vector3PointDefinition
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
   duration: number; // float
   easing: Easings;
   properties: IVivifyMaterialProperty[];
}

export interface IVivifyCustomEventSetGlobalProperty {
   duration: number; // float
   easing: Easings;
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

export interface IVivifyCustomEventCreateCamera {
   id: string;
   texture?: string;
   depthTexture?: string;
   properties?: IVivifyCameraProperty;
}

export interface IVivifyCustomEventCreateScreenTexture {
   id: string;
   xRatio?: number; // float
   yRatio?: number; // float
   width?: number; // int
   height?: number; // int
   colorFormat?: string;
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
   object: {
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
   };
}

export interface IVivifyCustomEventSetRenderingSettings {
   duration?: number; // float
   easing?: Easings;
   renderSettings?: {
      ambientEquatorColor?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      ambientGroundColor?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      ambientIntensity?: number | FloatPointDefinition; //float
      ambientLight?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      ambientMode?: 0 | 1 | 3 | 4 | FloatPointDefinition;
      ambientSkyColor?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      defaultReflectionMode?: 0 | 1 | FloatPointDefinition;
      defaultReflectionResolution?: number | FloatPointDefinition; // int
      flareFadeSpeed?: number | FloatPointDefinition; // float
      flareStrength?: number | FloatPointDefinition; // float
      fog?: 0 | 1 | FloatPointDefinition;
      fogColor?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      fogDensity?: number | FloatPointDefinition; // float
      fogStartDistance?: number | FloatPointDefinition; // float
      fogMode?: 1 | 2 | 3 | FloatPointDefinition;
      fogEndDistance?: number | FloatPointDefinition; // float
      haloStrength?: number | FloatPointDefinition; // float
      reflectionBounces?: number | FloatPointDefinition; // int
      reflectionIntensity?: number | FloatPointDefinition; // float
      skybox?: string;
      subtractiveShadowColor?:
         | Vector3
         | Vector4
         | Vector3PointDefinition
         | Vector4PointDefinition;
      sun?: string;
   };
   qualitySettings?: {
      anisotropicFiltering?: 0 | 1 | 2 | FloatPointDefinition;
      antiAliasing?: 0 | 2 | 4 | 8 | FloatPointDefinition;
      pixelLightCount?: number | FloatPointDefinition; // int
      realtimeReflectionProbes?: 0 | 1 | FloatPointDefinition;
      shadowCascades?: 0 | 2 | 4 | FloatPointDefinition;
      shadowDistance?: number | FloatPointDefinition; // float
      shadowmaskMode?: 0 | 1 | FloatPointDefinition;
      shadowNearPlaneOffset?: number | FloatPointDefinition; // float
      shadowProjection?: 0 | 1 | FloatPointDefinition;
      shadowResolution?: 0 | 1 | 2 | 3 | FloatPointDefinition;
      shadows?: 0 | 1 | 2 | FloatPointDefinition;
      softParticles?: 0 | 1 | FloatPointDefinition;
   };
   xrSettings?: {
      useOcclusionMesh?: 0 | 1 | FloatPointDefinition;
   };
}

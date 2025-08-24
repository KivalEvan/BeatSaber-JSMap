import type { Member } from '../../../../../types/utils.ts';

export const Bool = {
   FALSE: 0,
   TRUE: 1,
} as const;
export type Bool = Member<typeof Bool>;

export const AmbientMode = {
   SKYBOX: 0,
   TRILIGHT: 1,
   FLAT: 3,
   CUSTOM: 4,
} as const;
export type AmbientMode = Member<typeof AmbientMode>;

export const DefaultReflectionMode = {
   SKYBOX: 0,
   CUSTOM: 1,
} as const;
export type DefaultReflectionMode = Member<typeof DefaultReflectionMode>;

export const FogMode = {
   LINEAR: 1,
   EXPONENTIAL: 2,
   EXPONENTIAL_SQUARED: 3,
} as const;
export type FogMode = Member<typeof FogMode>;

export const AnisotropicFiltering = {
   DISABLE: 0,
   ENABLE: 1,
   FORCE_ENABLE: 2,
} as const;
export type AnisotropicFiltering = Member<typeof AnisotropicFiltering>;

export const ShadowMaskMode = {
   SHADOWMASK: 0,
   DISTANCE_SHADOWMASK: 1,
} as const;
export type ShadowMaskMode = Member<typeof ShadowMaskMode>;

export const ShadowProjection = {
   CLOSE_FIT: 0,
   STABLE_FIT: 1,
} as const;
export type ShadowProjection = Member<typeof ShadowProjection>;

export const ShadowResolution = {
   LOW: 0,
   MEDIUM: 1,
   HIGH: 2,
   VERY_HIGH: 3,
} as const;
export type ShadowResolution = Member<typeof ShadowResolution>;

export const Shadows = {
   DISABLE: 0,
   HARD_ONLY: 1,
   ALL: 2,
};
export type Shadows = Member<typeof Shadows>;

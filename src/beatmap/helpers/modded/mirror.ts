import type { Vector3PointDefinition } from '../../../types/beatmap/shared/custom/heck.ts';
import type { ICustomDataNote } from '../../../types/beatmap/wrapper/custom/note.ts';
import type { ICustomDataSlider } from '../../../types/beatmap/wrapper/custom/slider.ts';
import { isVector3 } from '../../../utils/vector.ts';

/**
 * Mirrors the object for Noodle Extensions in beatmap v2.
 */
export function mirrorNoodleExtensionsV2<
   T extends { customData: ICustomDataNote | ICustomDataSlider },
>(data: T) {
   if (data.customData._position) {
      data.customData._position[0] = -1 - data.customData._position[0];
   }
   if (data.customData._flip) {
      data.customData._flip[0] = -1 - data.customData._flip[0];
   }
   if (data.customData._animation) {
      if (Array.isArray(data.customData._animation._definitePosition)) {
         if (isVector3(data.customData._animation._definitePosition)) {
            data.customData._animation._definitePosition[0] = -data.customData._animation
               ._definitePosition[0];
         } else {
            data.customData._animation._definitePosition.forEach((dp: Vector3PointDefinition) => {
               if (Array.isArray(dp)) dp[0] = -dp[0];
            });
         }
      }
      if (Array.isArray(data.customData._animation._offsetPosition)) {
         if (isVector3(data.customData._animation._offsetPosition)) {
            data.customData._animation._offsetPosition[0] = -data.customData._animation
               ._offsetPosition[0];
         } else {
            data.customData._animation._offsetPosition.forEach((op: Vector3PointDefinition) => {
               if (Array.isArray(op)) op[0] = -op[0];
            });
         }
      }
   }
}

/**
 * Mirrors the object for Noodle Extensions in beatmap v3.
 */
export function mirrorNoodleExtensionsV3<
   T extends { customData: ICustomDataNote | ICustomDataSlider },
>(data: T) {
   if (data.customData.coordinates) {
      data.customData.coordinates[0] = -1 - data.customData.coordinates[0];
   }
   if (data.customData.tailCoordinates) {
      data.customData.tailCoordinates[0] = -1 - data.customData.tailCoordinates[0];
   }
   if (data.customData.flip) {
      data.customData.flip[0] = -1 - data.customData.flip[0];
   }
   if (data.customData.animation) {
      if (Array.isArray(data.customData.animation.definitePosition)) {
         if (isVector3(data.customData.animation.definitePosition)) {
            data.customData.animation.definitePosition[0] = -data.customData.animation
               .definitePosition[0];
         } else {
            data.customData.animation.definitePosition.forEach((dp: Vector3PointDefinition) => {
               if (Array.isArray(dp)) dp[0] = -dp[0];
            });
         }
      }
      if (Array.isArray(data.customData.animation.offsetPosition)) {
         if (isVector3(data.customData.animation.offsetPosition)) {
            data.customData.animation.offsetPosition[0] = -data.customData.animation
               .offsetPosition[0];
         } else {
            data.customData.animation.offsetPosition.forEach((op: Vector3PointDefinition) => {
               if (Array.isArray(op)) op[0] = -op[0];
            });
         }
      }
   }
}

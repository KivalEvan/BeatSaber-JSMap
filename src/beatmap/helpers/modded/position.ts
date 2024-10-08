import type { IWrapBaseItemAttribute } from '../../../types/beatmap/wrapper/baseItem.ts';
import type { Vector2 } from '../../../types/vector.ts';

/**
 * Get position of Noodle Extensions in beatmap v2.
 */
export function getNoodleExtensionsPositionV2(
   data: IWrapBaseItemAttribute,
): Vector2 | null {
   return Array.isArray(data.customData._position)
      ? [data.customData._position[0], data.customData._position[1]]
      : null;
}

/**
 * Get position of Noodle Extensions in beatmap v3.
 */
export function getNoodleExtensionsPositionV3(
   data: IWrapBaseItemAttribute,
): Vector2 | null {
   return Array.isArray(data.customData.coordinates)
      ? [data.customData.coordinates[0], data.customData.coordinates[1]]
      : null;
}

/**
 * Get tail position of Noodle Extensions in beatmap v3.
 */
export function getNoodleExtensionsTailPositionV3(
   data: IWrapBaseItemAttribute,
): Vector2 | null {
   return Array.isArray(data.customData.tailCoordinates)
      ? [data.customData.tailCoordinates[0], data.customData.tailCoordinates[1]]
      : null;
}

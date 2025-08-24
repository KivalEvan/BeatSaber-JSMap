import type { ICustomDataNote } from '../../core/types/custom/note.ts';
import type { ICustomDataSlider } from '../../core/types/custom/slider.ts';
import type { Vector2 } from '../../../types/vector.ts';

/**
 * Get position of Noodle Extensions in beatmap v2.
 */
export function getNoodleExtensionsPositionV2<
   T extends { customData: Pick<ICustomDataNote, '_position'> },
>(data: T): Vector2 | null {
   return Array.isArray(data.customData._position)
      ? [data.customData._position[0], data.customData._position[1]]
      : null;
}

/**
 * Get position of Noodle Extensions in beatmap v3.
 */
export function getNoodleExtensionsPositionV3<
   T extends { customData: Pick<ICustomDataNote, 'coordinates'> },
>(data: T): Vector2 | null {
   return Array.isArray(data.customData.coordinates)
      ? [data.customData.coordinates[0], data.customData.coordinates[1]]
      : null;
}

/**
 * Get tail position of Noodle Extensions in beatmap v3.
 */
export function getNoodleExtensionsTailPositionV3<
   T extends { customData: Pick<ICustomDataSlider, 'tailCoordinates'> },
>(data: T): Vector2 | null {
   return Array.isArray(data.customData.tailCoordinates)
      ? [data.customData.tailCoordinates[0], data.customData.tailCoordinates[1]]
      : null;
}

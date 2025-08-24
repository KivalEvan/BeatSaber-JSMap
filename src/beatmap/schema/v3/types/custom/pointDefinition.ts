import type { ColorArray } from '../../../../../types/colors.ts';
import type { Vector2, Vector3 } from '../../../../../types/vector.ts';
import type {
   FloatPointDefinition,
   Vector3PointDefinition,
   Vector4PointDefinition,
} from '../../../shared/types/custom/heck.ts';

/** Point Definition interface. */
export type IPointDefinition = {
   [key: string]:
      | [number]
      | Vector2
      | Vector3
      | ColorArray
      | FloatPointDefinition
      | Vector3PointDefinition
      | Vector4PointDefinition;
};

import { ColorArray } from '../../../colors.ts';
import { Vector2, Vector3 } from '../../../vector.ts';
import {
   FloatPointDefinition,
   Vector3PointDefinition,
   Vector4PointDefinition,
} from '../../shared/custom/heck.ts';

/** Point Definition interface. */
export interface IPointDefinition {
   _name: string;
   _points:
      | number
      | Vector2
      | Vector3
      | ColorArray
      | FloatPointDefinition[]
      | Vector3PointDefinition[]
      | Vector4PointDefinition[];
}

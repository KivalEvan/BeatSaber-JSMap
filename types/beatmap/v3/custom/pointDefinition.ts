import { ColorArray } from '../../../colors.ts';
import { Vector2, Vector3 } from '../../../vector.ts';
import {
    FloatPointDefinition,
    Vector3PointDefinition,
    Vector4PointDefinition,
} from '../../shared/custom/heck.ts';

/** Point Definition interface. */
export type IPointDefinition = {
    [key: string]:
        | number
        | Vector2
        | Vector3
        | ColorArray
        | FloatPointDefinition[]
        | Vector3PointDefinition[]
        | Vector4PointDefinition[];
};

import { ColorArray } from '../../../colors.ts';
import { Vector2, Vector3 } from '../../../vector.ts';
import { ColorPointDefinition } from '../../shared/custom/chroma.ts';
import {
    PercentPointDefinition,
    Vector2PointDefinition,
    Vector3PointDefinition,
} from '../../shared/custom/heck.ts';

/** Point Definition interface. */
export type IPointDefinition = {
    [key: string]:
        | number
        | Vector2
        | Vector3
        | ColorArray
        | PercentPointDefinition[]
        | Vector2PointDefinition[]
        | Vector3PointDefinition[]
        | ColorPointDefinition[];
};

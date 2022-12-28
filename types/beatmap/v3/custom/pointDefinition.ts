import { ColorPointDefinition } from '../../shared/custom/chroma.ts';
import {
    PercentPointDefinition,
    Vector2PointDefinition,
    Vector3PointDefinition,
} from '../../shared/custom/heck.ts';

/** Point Definition interface. */
export type IPointDefinition = {
    [key: string]:
        | PercentPointDefinition[]
        | Vector2PointDefinition[]
        | Vector3PointDefinition[]
        | ColorPointDefinition[];
};

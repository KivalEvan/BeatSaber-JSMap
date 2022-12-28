import { ColorPointDefinition } from '../../shared/custom/chroma.ts';
import {
    PercentPointDefinition,
    Vector2PointDefinition,
    Vector3PointDefinition,
} from '../../shared/custom/heck.ts';

/** Point Definition interface. */
export interface IPointDefinition {
    _name: string;
    _points:
        | PercentPointDefinition[]
        | Vector2PointDefinition[]
        | Vector3PointDefinition[]
        | ColorPointDefinition[];
}

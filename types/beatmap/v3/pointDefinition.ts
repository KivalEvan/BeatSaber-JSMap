import { ColorPointDefinition } from '../mod.ts';
import { PercentPointDefinition, Vector2PointDefinition, Vector3PointDefinition } from '../shared/heck.ts';

/** Point Definition interface. */
export interface IPointDefinition {
    name: string;
    points:
        | PercentPointDefinition[]
        | Vector2PointDefinition[]
        | Vector3PointDefinition[]
        | ColorPointDefinition[];
}

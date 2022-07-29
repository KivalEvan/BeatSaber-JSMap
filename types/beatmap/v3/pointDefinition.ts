import { ColorPointDefinition } from '../shared/chroma.ts';
import { PercentPointDefinition, Vector2PointDefinition, Vector3PointDefinition } from '../shared/heck.ts';

/** Point Definition interface. */
export type IPointDefinition = {
    [key: string]:
        | PercentPointDefinition[]
        | Vector2PointDefinition[]
        | Vector3PointDefinition[]
        | ColorPointDefinition[];
};

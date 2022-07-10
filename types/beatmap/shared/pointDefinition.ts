import { ColorPointDefinition } from './chroma.ts';
import { Vector2PointDefinition, Vector3PointDefinition } from './heck.ts';

export type PointDefinition =
    | Vector2PointDefinition[]
    | Vector3PointDefinition[]
    | ColorPointDefinition[];

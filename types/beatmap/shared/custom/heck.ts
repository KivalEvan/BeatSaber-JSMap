import { Easings } from '../../../easings.ts';
import { Vector3, Vector4 } from '../../../vector.ts';
export type FloatPointDefinition = [
   percent: number,
   time: number,
   ...options: (Easings | PointFlag | PointModifier)[],
];
export type Vector3PointDefinition = [
   ...vector3: Vector3,
   time: number,
   ...options: (Easings | PointFlag | PointModifier)[],
];
export type Vector4PointDefinition = [
   ...vector4: Vector4,
   time: number,
   ...options: ('lerpHSV' | Easings | PointFlag | PointModifier)[],
];

export type PointModifier = `op${'None' | 'Add' | 'Sub' | 'Mul' | 'Div'}`;
export type PointFlag = 'splineCatmullRom';

import { v } from '../../../../deps.ts';

/** Schema declaration for one-dimensional vector tuple. */
export const Vector1Schema = v.tuple([v.number()]);
/** Schema declaration for two-dimensional vector tuple. */
export const Vector2Schema = v.tuple([v.number(), v.number()]);
/** Schema declaration for three-dimensional vector tuple. */
export const Vector3Schema = v.tuple([v.number(), v.number(), v.number()]);
/** Schema declaration for four-dimensional vector tuple. */
export const Vector4Schema = v.tuple([v.number(), v.number(), v.number(), v.number()]);

/** Schema declaration for three-dimensional vector object. */
export const Vector2ObjectSchema = v.object({ x: v.number(), y: v.number() });
/** Schema declaration for three-dimensional vector object. */
export const Vector3ObjectSchema = v.object({ x: v.number(), y: v.number(), z: v.number() });

/** Schema declaration for float vector. */
export const VectorFloatSchema = v.tuple([
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
]);

/** Schema declaration for three-dimensional color vector. */
export const Vector3ColorSchema = v.tuple([
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
]);
/** Schema declaration for four-dimensional color vector. */
export const Vector4ColorSchema = v.tuple([
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
]);

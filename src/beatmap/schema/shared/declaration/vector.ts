import { maxValue, minValue, number, object, pipe, tuple } from '@valibot/valibot';

/** Schema declaration for one-dimensional vector tuple. */
export const Vector1Schema = tuple([number()]);
/** Schema declaration for two-dimensional vector tuple. */
export const Vector2Schema = tuple([number(), number()]);
/** Schema declaration for three-dimensional vector tuple. */
export const Vector3Schema = tuple([number(), number(), number()]);
/** Schema declaration for four-dimensional vector tuple. */
export const Vector4Schema = tuple([number(), number(), number(), number()]);

/** Schema declaration for three-dimensional vector object. */
export const Vector2ObjectSchema = object({ x: number(), y: number() });
/** Schema declaration for three-dimensional vector object. */
export const Vector3ObjectSchema = object({ x: number(), y: number(), z: number() });

/** Schema declaration for float vector. */
export const VectorFloatSchema = tuple([
   pipe(number(), minValue(0), maxValue(1)),
]);

/** Schema declaration for three-dimensional color vector. */
export const Vector3ColorSchema = tuple([
   pipe(number(), minValue(0), maxValue(1)),
   pipe(number(), minValue(0), maxValue(1)),
   pipe(number(), minValue(0), maxValue(1)),
]);
/** Schema declaration for four-dimensional color vector. */
export const Vector4ColorSchema = tuple([
   pipe(number(), minValue(0), maxValue(1)),
   pipe(number(), minValue(0), maxValue(1)),
   pipe(number(), minValue(0), maxValue(1)),
   pipe(number(), minValue(0), maxValue(1)),
]);

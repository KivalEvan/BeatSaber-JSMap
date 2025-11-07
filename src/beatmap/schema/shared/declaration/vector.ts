import * as v from 'valibot';

/** Schema declaration for one-dimensional vector tuple. */
export function Vector1Schema() {
   return v.tuple([v.number()]);
}
/** Schema declaration for two-dimensional vector tuple. */
export function Vector2Schema() {
   return v.tuple([v.number(), v.number()]);
}
/** Schema declaration for three-dimensional vector tuple. */
export function Vector3Schema() {
   return v.tuple([v.number(), v.number(), v.number()]);
}
/** Schema declaration for four-dimensional vector tuple. */
export function Vector4Schema() {
   return v.tuple([v.number(), v.number(), v.number(), v.number()]);
}

/** Schema declaration for three-dimensional vector object. */
export function Vector2ObjectSchema() {
   return v.object({ x: v.number(), y: v.number() });
}
/** Schema declaration for three-dimensional vector object. */
export function Vector3ObjectSchema() {
   return v.object({ x: v.number(), y: v.number(), z: v.number() });
}

/** Schema declaration for float vector. */
export function VectorFloatSchema() {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}

/** Schema declaration for three-dimensional color vector. */
export function Vector3ColorSchema() {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}
/** Schema declaration for four-dimensional color vector. */
export function Vector4ColorSchema() {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}

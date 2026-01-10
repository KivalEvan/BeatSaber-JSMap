import * as v from 'valibot';

/** Schema declaration for one-dimensional vector tuple. */
export function Vector1Schema(): v.TupleSchema<[v.NumberSchema<undefined>], undefined> {
   return v.tuple([v.number()]);
}
/** Schema declaration for two-dimensional vector tuple. */
export function Vector2Schema(): v.TupleSchema<
   [v.NumberSchema<undefined>, v.NumberSchema<undefined>],
   undefined
> {
   return v.tuple([v.number(), v.number()]);
}
/** Schema declaration for three-dimensional vector tuple. */
export function Vector3Schema(): v.TupleSchema<
   [v.NumberSchema<undefined>, v.NumberSchema<undefined>, v.NumberSchema<undefined>],
   undefined
> {
   return v.tuple([v.number(), v.number(), v.number()]);
}
/** Schema declaration for four-dimensional vector tuple. */
export function Vector4Schema(): v.TupleSchema<
   [
      v.NumberSchema<undefined>,
      v.NumberSchema<undefined>,
      v.NumberSchema<undefined>,
      v.NumberSchema<undefined>,
   ],
   undefined
> {
   return v.tuple([v.number(), v.number(), v.number(), v.number()]);
}

/** Schema declaration for three-dimensional vector object. */
export function Vector2ObjectSchema(): v.ObjectSchema<
   { readonly x: v.NumberSchema<undefined>; readonly y: v.NumberSchema<undefined> },
   undefined
> {
   return v.object({ x: v.number(), y: v.number() });
}
/** Schema declaration for three-dimensional vector object. */
export function Vector3ObjectSchema(): v.ObjectSchema<
   {
      readonly x: v.NumberSchema<undefined>;
      readonly y: v.NumberSchema<undefined>;
      readonly z: v.NumberSchema<undefined>;
   },
   undefined
> {
   return v.object({ x: v.number(), y: v.number(), z: v.number() });
}

/** Schema declaration for float vector. */
export function VectorFloatSchema(): v.TupleSchema<
   [
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
   ],
   undefined
> {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}

/** Schema declaration for three-dimensional color vector. */
export function Vector3ColorSchema(): v.TupleSchema<
   [
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
   ],
   undefined
> {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}
/** Schema declaration for four-dimensional color vector. */
export function Vector4ColorSchema(): v.TupleSchema<
   [
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
      v.SchemaWithPipe<
         readonly [
            v.NumberSchema<undefined>,
            v.MinValueAction<number, 0, undefined>,
            v.MaxValueAction<number, 1, undefined>,
         ]
      >,
   ],
   undefined
> {
   return v.tuple([
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
   ]);
}

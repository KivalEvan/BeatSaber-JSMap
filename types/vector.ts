/**
 * Represented as `[x, y]`.
 */
export type Vector2 = [x: number, y: number];
/**
 * Represented as `[x, y, z]`.
 */
export type Vector3 = [x: number, y: number, z: number];
/**
 * Represented as `[x, y, z, w]`.
 */
export type Vector4 = [x: number, y: number, z: number, w: number];

/**
 * Object representation of `Vector2`.
 */
export type Vector2Object = {
   /**
    * **Type:** `f32`
    */
   x: number;
   /**
    * **Type:** `f32`
    */
   y: number;
};

/**
 * Object representation of `Vector3`.
 */
export type Vector3Object = {
   /**
    * **Type:** `f32`
    */
   x: number;
   /**
    * **Type:** `f32`
    */
   y: number;
   /**
    * **Type:** `f32`
    */
   z: number;
};

/**
 * Object representation of `Vector4`.
 */
export type Vector4Object = {
   /**
    * **Type:** `f32`
    */
   x: number;
   /**
    * **Type:** `f32`
    */
   y: number;
   /**
    * **Type:** `f32`
    */
   z: number;
   /**
    * **Type:** `f32`
    */
   w: number;
};

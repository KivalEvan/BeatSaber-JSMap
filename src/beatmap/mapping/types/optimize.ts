export interface IOptimizeOptions {
   /**
    * Allow JSON optimisation to take place.
    *
    * @default true
    */
   enabled?: boolean;
   /**
    * Round number in JSON by decimal point.
    *
    * @default 4
    */
   floatTrim?: number;
   /**
    * Trim string.
    *
    * @default true
    */
   stringTrim?: boolean;
   /**
    * Remove zero-valued attribute in JSON.
    *
    * @default true
    */
   purgeZeros?: boolean;
   /**
    * Throw error when encountering null or undefined value.
    *
    * @default true
    */
   throwNullish?: boolean;
   /**
    * Deduplicate object in beatmap V4.
    *
    * @default true
    */
   deduplicate?: boolean;
   /**
    * Rebuild v3/v4 difficulty and lightshow data instead of deleting fields.
    * This can reduce cleanup time and allocated memory. Gains depend on the data and options.
    * This mode keeps the root and arrays in place, and does not copy nested custom data.
    * Existing deduplication can still replace data arrays. Internal aliases are preserved.
    * External references to replaced data become stale. Set this to false when those
    * references must remain valid.
    * Other schema versions and file types keep their existing cleanup behavior.
    *
    * @default true
    */
   fastMode?: boolean;
}

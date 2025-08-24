/**
 * Region schema for v2 `BPM Info`.
 */
export interface IBPMInfoRegion {
   /**
    * **Type:** `i32`
    */
   _startSampleIndex: number;
   /**
    * **Type:** `i32`
    */
   _endSampleIndex: number;
   /**
    * **Type:** `f32`
    */
   _startBeat: number;
   /**
    * **Type:** `f32`
    */
   _endBeat: number;
}

/**
 * Schema for v2 `BPM Info`.
 */
export interface IBPMInfo {
   _version: '2.0.0';
   /**
    * **Type:** `i32`
    */
   _songSampleCount: number;
   /**
    * **Type:** `i32`
    */
   _songFrequency: number;
   _regions: IBPMInfoRegion[];
}

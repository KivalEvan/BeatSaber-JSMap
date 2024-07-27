/**
 * Schema for v4 `Audio Data`.
 */
export interface IAudio {
   version: '4.0.0';
   songChecksum: string;
   /**
    * **Type:** `i32`
    */
   songSampleCount: number;
   /**
    * **Type:** `i32`
    */
   songFrequency: number;
   bpmData: IAudioBPM[];
   lufsData: IAudioLUFS[];
}

/**
 * BPM data schema for v4 `Audio Data`.
 */
export interface IAudioBPM {
   /**
    * **Type:** `i32`
    */
   si: number;
   /**
    * **Type:** `i32`
    */
   ei: number;
   /**
    * **Type:** `f32`
    */
   sb: number;
   /**
    * **Type:** `f32`
    */
   eb: number;
}

/**
 * LUFS data schema for v4 `Audio Data`.
 */
export interface IAudioLUFS {
   /**
    * **Type:** `i32`
    */
   si: number;
   /**
    * **Type:** `i32`
    */
   ei: number;
   /**
    * **Type:** `f32`
    */
   l: number;
}

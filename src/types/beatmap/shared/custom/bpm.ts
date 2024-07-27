/** Beatmap difficulty custom data interface for BPM Change Time Scale. */
export interface IBPMTimeScale {
   /**
    * **Type:** `f32`
    */
   time: number;
   /**
    * **Type:** `f32`
    */
   scale: number;
}

export interface IBPMChangeTime {
   /**
    * **Type:** `f32`
    */
   time: number;
   /**
    * **Type:** `f32`
    */
   newTime: number;
   /**
    * **Type:** `f32`
    */
   BPM: number;
   /**
    * **Type:** `f32`
    */
   beatsPerBar: number;
   /**
    * **Type:** `f32`
    */
   metronomeOffset: number;
}

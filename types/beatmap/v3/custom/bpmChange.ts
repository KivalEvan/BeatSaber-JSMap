/** Beatmap difficulty custom data interface for BPM Change. */
export interface IBPMChange {
   /**
    * Beat time of BPM change.
    *
    * **Type:** `f32`
    */
   b: number;
   /**
    * BPM of BPM change.
    *
    * **Type:** `f32`
    */
   m: number;
   /**
    * Beats per bar of BPM change.
    *
    * **Type:** `f32`
    */
   p: number;
   /**
    * Metronome offset of BPM change.
    *
    * **Type:** `f32`
    */
   o: number;
}

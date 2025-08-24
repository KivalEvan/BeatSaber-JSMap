/**
 * BPM Change schema for v2 difficulty custom data.
 */
export interface IBPMChange {
   /**
    * **Type:** `f32`
    */
   _time: number;
   _bpm?: never;
   /**
    * **Type:** `f32`
    */
   _BPM: number;
   /**
    * **Type:** `f32`
    */
   _beatsPerBar: number;
   /**
    * **Type:** `f32`
    */
   _metronomeOffset: number;
}

/**
 * Old BPM Change schema for v2 difficulty custom data.
 */
export interface IBPMChangeOld {
   /**
    * **Type:** `f32`
    */
   _time: number;
   /**
    * **Type:** `f32`
    */
   _bpm: number;
   _BPM?: never;
   /**
    * **Type:** `f32`
    */
   _beatsPerBar: number;
   /**
    * **Type:** `f32`
    */
   _metronomeOffset: number;
}

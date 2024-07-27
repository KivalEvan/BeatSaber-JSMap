import type { INote } from './note.ts';
import type { IObstacle } from './obstacle.ts';
import type { IEvent } from './event.ts';
import type { ICustomDifficulty } from './custom/difficulty.ts';

/**
 * Schema for v1 `Difficulty`.
 */
export interface IDifficulty extends ICustomDifficulty {
   _version: '1.5.0';
   /**
    * **Type:** `f32`
    */
   _beatsPerMinute: number;
   /**
    * **Type:** `i32`
    */
   _beatsPerBar: number;
   /**
    * **Type:** `f32`
    */
   _shuffle: number;
   /**
    * **Type:** `f32`
    */
   _shufflePeriod: number;
   /**
    * **Type:** `f32`
    */
   _noteJumpSpeed: number;
   /**
    * **Type:** `f32`
    */
   _noteJumpStartBeatOffset: number;
   _events: IEvent[];
   _notes: INote[];
   _obstacles: IObstacle[];
}

import type { Easings } from '../../../../../types/easings.ts';
import type { Vector3PointDefinition } from '../../../shared/types/custom/heck.ts';

/** Heck Base Custom Event interface. */
export interface IHeckBase {
   track?: string | string[];
}

/**
 * AssignPathAnimation interface for Heck Custom Event.
 */
export interface IHeckCustomEventDataAnimateTrack extends Required<IHeckBase> {
   /**
    * **Type:** `f32`
    */
   duration?: number;
   /**
    * **Type:** `i32`
    */
   repeat?: number;
   easing?: Easings;
   position?: string | Vector3PointDefinition;
   rotation?: string | Vector3PointDefinition;
   localRotation?: string | Vector3PointDefinition;
   scale?: string | Vector3PointDefinition;
}

/**
 * AssignPathAnimation interface for Heck Custom Event.
 */
export interface IHeckCustomEventDataAssignPathAnimation extends Required<IHeckBase> {
   easing?: Easings;
   position?: string | Vector3PointDefinition;
   rotation?: string | Vector3PointDefinition;
   localRotation?: string | Vector3PointDefinition;
   scale?: string | Vector3PointDefinition;
}

/** Heck Custom Data interface for difficulty custom data. */
export interface IHeckCustomData {
   eventDefinitions?: unknown[];
}

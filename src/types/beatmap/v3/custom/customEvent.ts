import type {
   IChromaCustomEventDataAnimateComponent,
   IChromaCustomEventDataAnimateTrack,
   IChromaCustomEventDataAssignPathAnimation,
} from './chroma.ts';
import type {
   IHeckCustomEventDataAnimateTrack,
   IHeckCustomEventDataAssignPathAnimation,
} from './heck.ts';
import type {
   INECustomEventDataAnimateTrack,
   INECustomEventDataAssignPathAnimation,
   INECustomEventDataAssignPlayerToTrack,
   INECustomEventDataAssignTrackParent,
} from './noodleExtensions.ts';

export type ICustomEventDataAnimateTrack =
   & IHeckCustomEventDataAnimateTrack
   & IChromaCustomEventDataAnimateTrack
   & INECustomEventDataAnimateTrack;

export type ICustomEventDataAssignPathAnimation =
   & IHeckCustomEventDataAssignPathAnimation
   & IChromaCustomEventDataAssignPathAnimation
   & INECustomEventDataAssignPathAnimation;

/** Custom Event interface for AnimateTrack. */
export interface ICustomEventAnimateTrack {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
   t: 'AnimateTrack';
   d: ICustomEventDataAnimateTrack;
}

/** Custom Event interface for AssignPathAnimation. */
export interface ICustomEventAssignPathAnimation {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
   t: 'AssignPathAnimation';
   d: ICustomEventDataAssignPathAnimation;
}

/** Custom Event interface for InvokeEvent. */
// export interface IHeckCustomEventInvokeEvent {
//     b: number;
//     t: 'InvokeEvent';
//     d: IHeckCustomEventDataInvokeEvent;
// }

/** Custom Event interface for AnimateComponent. */
export interface ICustomEventAnimateComponent {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
   t: 'AnimateComponent';
   d: IChromaCustomEventDataAnimateComponent;
}

/** Custom Event interface for AssignTrackParent. */
export interface ICustomEventAssignTrackParent {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
   t: 'AssignTrackParent';
   d: INECustomEventDataAssignTrackParent;
}

/** Custom Event interface for AssignPlayerToTrack. */
export interface ICustomEventAssignPlayerToTrack {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
   t: 'AssignPlayerToTrack';
   d: INECustomEventDataAssignPlayerToTrack;
}

export type ICustomEvent =
   | ICustomEventAnimateTrack
   | ICustomEventAssignPathAnimation
   | ICustomEventAnimateComponent
   | ICustomEventAssignTrackParent
   | ICustomEventAssignPlayerToTrack;

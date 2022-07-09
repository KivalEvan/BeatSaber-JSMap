import { Easings } from '../../easings.ts';
import { PointDefinition, Vector3PointDefinition } from '../shared/heck.ts';

/** Heck Base Custom Event interface. */
export interface IHeckCustomEventDataBase {
    track: string | string[];
    repeat?: number;
}

/** AssignPathAnimation interface for Heck Custom Event.
 * @extends IHeckCustomEventDataBase
 */
export interface IHeckCustomEventDataAnimateTrack extends IHeckCustomEventDataBase {
    duration: number;
    easing?: Easings;
    position?: string | Vector3PointDefinition[];
    rotation?: string | Vector3PointDefinition[];
    localRotation?: string | Vector3PointDefinition[];
    scale?: string | Vector3PointDefinition[];
}

/** AssignPathAnimation interface for Heck Custom Event.
 * @extends IHeckCustomEventDataBase
 */
export interface IHeckCustomEventDataAssignPathAnimation extends IHeckCustomEventDataBase {
    duration: number;
    easing?: Easings;
    position?: string | Vector3PointDefinition[];
    rotation?: string | Vector3PointDefinition[];
    localRotation?: string | Vector3PointDefinition[];
    scale?: string | Vector3PointDefinition[];
}

/** Heck Custom Event interface for InvokeEvent. */
// export interface IHeckCustomEventInvokeEvent {
//     b: number;
//     t: 'InvokeEvent';
//     d: IHeckCustomEventDataInvokeEvent;
// }

/** Heck Point Definition interface. */
export interface IHeckPointDefinition {
    name: string;
    points: PointDefinition[];
}

/** Heck Custom Data interface for difficulty custom data. */
export interface IHeckCustomData {
    eventDefinitions?: unknown[];
    pointDefinitions?: IHeckPointDefinition[];
}

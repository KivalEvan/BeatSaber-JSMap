import type { Nullable } from '../../../../../types/utils.ts';
import type { Vector2, Vector3 } from '../../../../../types/vector.ts';
import type {
   FloatPointDefinition,
   Vector3PointDefinition,
} from '../../../shared/types/custom/heck.ts';
import type { PlayerObject } from '../../../shared/types/custom/noodleExtensions.ts';
import type { IHeckBase } from './heck.ts';

/** Noodle Extensions Object interface for Beatmap Object. */
interface INEObject {
   coordinates?: Vector2;
   worldRotation?: number | Vector3;
   localRotation?: Vector3;
   /**
    * **Type:** `f32`
    */
   noteJumpMovementSpeed?: number;
   /**
    * **Type:** `f32`
    */
   noteJumpStartBeatOffset?: number;
   uninteractable?: boolean;
}

/**
 * Noodle Extensions Note interface for Beatmap Note.
 */
export interface INENote extends INEObject {
   flip?: Vector2;
   disableNoteGravity?: boolean;
   disableNoteLook?: boolean;
   disableBadCutDirection?: boolean;
   disableBadCutSpeed?: boolean;
   disableBadCutSaberType?: boolean;
   link?: string;
}

/**
 * Noodle Extensions Slider interface for Beatmap Arc.
 */
export interface INESlider extends INENote {
   tailCoordinates?: Vector2;
}

/**
 * Noodle Extensions Obstacle interface for Beatmap Obstacle.
 */
export interface INEObstacle extends INEObject {
   size?: Nullable<Vector3>;
}

/**
 * AssignPathAnimation interface for Noodle Extensions Custom Event.
 */
export interface INECustomEventDataAnimateTrack extends Required<IHeckBase> {
   offsetPosition?: string | Vector3PointDefinition;
   offsetWorldRotation?: string | Vector3PointDefinition;
   dissolve?: string | FloatPointDefinition;
   dissolveArrow?: string | FloatPointDefinition;
   interactable?: string | FloatPointDefinition;
   time?: string | FloatPointDefinition;
}

/**
 * AssignPathAnimation interface for Noodle Extensions Custom Event.
 */
export interface INECustomEventDataAssignPathAnimation extends Required<IHeckBase> {
   offsetPosition?: string | Vector3PointDefinition;
   offsetWorldRotation?: string | Vector3PointDefinition;
   dissolve?: string | FloatPointDefinition;
   dissolveArrow?: string | FloatPointDefinition;
   interactable?: string | FloatPointDefinition;
   definitePosition?: string | Vector3PointDefinition;
}

/** AssignPathAnimation interface for Noodle Extensions Custom Event. */
export interface INECustomEventDataAssignTrackParent {
   childrenTracks: string | string[];
   parentTrack: string;
   worldPositionStays?: boolean;
}

/**
 * AssignPlayerToTrack interface for Noodle Extensions Custom Event.
 */
export interface INECustomEventDataAssignPlayerToTrack extends Required<IHeckBase> {
   target?: PlayerObject;
}

/** Noodle Extensions Animation interface for Noodle Extensions Object. */
export interface INEAnimation {
   offsetPosition?: string | Vector3PointDefinition;
   offsetWorldRotation?: string | Vector3PointDefinition;
   localRotation?: string | Vector3PointDefinition;
   scale?: string | Vector3PointDefinition;
   dissolve?: string | FloatPointDefinition;
   dissolveArrow?: string | FloatPointDefinition;
   interactable?: string | FloatPointDefinition;
   definitePosition?: string | Vector3PointDefinition;
   time?: string | FloatPointDefinition;
}

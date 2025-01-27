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
import type {
   IVivifyCustomEventAssignObjectPrefab,
   IVivifyCustomEventBlit,
   IVivifyCustomEventCreateCamera,
   IVivifyCustomEventCreateScreenTexture,
   IVivifyCustomEventDeclareRenderTexture,
   IVivifyCustomEventDestroyObject,
   IVivifyCustomEventDestroyTexture,
   IVivifyCustomEventInstantiatePrefab,
   IVivifyCustomEventSetAnimatorProperty,
   IVivifyCustomEventSetCameraProperty,
   IVivifyCustomEventSetGlobalProperty,
   IVivifyCustomEventSetMaterialProperty,
   IVivifyCustomEventSetRenderingSettings,
} from './vivify.ts';

export type ICustomEventDataAnimateTrack =
   & IHeckCustomEventDataAnimateTrack
   & IChromaCustomEventDataAnimateTrack
   & INECustomEventDataAnimateTrack;

export type ICustomEventDataAssignPathAnimation =
   & IHeckCustomEventDataAssignPathAnimation
   & IChromaCustomEventDataAssignPathAnimation
   & INECustomEventDataAssignPathAnimation;

export interface ICustomEventBase {
   /**
    * Beat time of custom event.
    *
    * **Type:** `f32`
    */
   b: number;
}

/** Custom Event interface for AnimateTrack. */
export interface ICustomEventAnimateTrack extends ICustomEventBase {
   t: 'AnimateTrack';
   d: ICustomEventDataAnimateTrack;
}

/** Custom Event interface for AssignPathAnimation. */
export interface ICustomEventAssignPathAnimation extends ICustomEventBase {
   t: 'AssignPathAnimation';
   d: ICustomEventDataAssignPathAnimation;
}

/** Custom Event interface for AnimateComponent. */
export interface ICustomEventAnimateComponent extends ICustomEventBase {
   t: 'AnimateComponent';
   d: IChromaCustomEventDataAnimateComponent;
}

/** Custom Event interface for AssignTrackParent. */
export interface ICustomEventAssignTrackParent extends ICustomEventBase {
   t: 'AssignTrackParent';
   d: INECustomEventDataAssignTrackParent;
}

/** Custom Event interface for AssignPlayerToTrack. */
export interface ICustomEventAssignPlayerToTrack extends ICustomEventBase {
   t: 'AssignPlayerToTrack';
   d: INECustomEventDataAssignPlayerToTrack;
}

export interface ICustomEventSetMaterialProperty extends ICustomEventBase {
   t: 'SetMaterialProperty';
   d: IVivifyCustomEventSetMaterialProperty;
}

export interface ICustomEventSetGlobalProperty extends ICustomEventBase {
   t: 'SetGlobalProperty';
   d: IVivifyCustomEventSetGlobalProperty;
}

export interface ICustomEventBlit extends ICustomEventBase {
   t: 'Blit';
   d: IVivifyCustomEventBlit;
}

export interface ICustomEventCreateCamera extends ICustomEventBase {
   t: 'CreateCamera';
   d: IVivifyCustomEventCreateCamera;
}

export interface ICustomEventCreateScreenTexture extends ICustomEventBase {
   t: 'CreateScreenTexture';
   d: IVivifyCustomEventCreateScreenTexture;
}

export interface ICustomEventDeclareRenderTexture extends ICustomEventBase {
   t: 'DeclareTexture';
   d: IVivifyCustomEventDeclareRenderTexture;
}

export interface ICustomEventDestroyTexture extends ICustomEventBase {
   t: 'DestroyTexture';
   d: IVivifyCustomEventDestroyTexture;
}

export interface ICustomEventInstantiatePrefab extends ICustomEventBase {
   t: 'InstantiatePrefab';
   d: IVivifyCustomEventInstantiatePrefab;
}

export interface ICustomEventDestroyObject extends ICustomEventBase {
   t: 'DestroyObject';
   d: IVivifyCustomEventDestroyObject;
}

export interface ICustomEventSetAnimatorProperty extends ICustomEventBase {
   t: 'SetAnimatorProperty';
   d: IVivifyCustomEventSetAnimatorProperty;
}

export interface ICustomEventSetCameraProperty extends ICustomEventBase {
   t: 'SetCameraProperty';
   d: IVivifyCustomEventSetCameraProperty;
}

export interface ICustomEventAssignObjectPrefab extends ICustomEventBase {
   t: 'AssignObjectPrefab';
   d: IVivifyCustomEventAssignObjectPrefab;
}

export interface ICustomEventSetRenderingSettings extends ICustomEventBase {
   t: 'SetRenderingSettings';
   d: IVivifyCustomEventSetRenderingSettings;
}

export type ICustomEvent =
   | ICustomEventAnimateTrack
   | ICustomEventAssignPathAnimation
   | ICustomEventAnimateComponent
   | ICustomEventAssignTrackParent
   | ICustomEventAssignPlayerToTrack
   | ICustomEventSetMaterialProperty
   | ICustomEventSetGlobalProperty
   | ICustomEventBlit
   | ICustomEventCreateCamera
   | ICustomEventCreateScreenTexture
   | ICustomEventDeclareRenderTexture
   | ICustomEventDestroyTexture
   | ICustomEventInstantiatePrefab
   | ICustomEventDestroyObject
   | ICustomEventSetAnimatorProperty
   | ICustomEventSetCameraProperty
   | ICustomEventAssignObjectPrefab
   | ICustomEventSetRenderingSettings;

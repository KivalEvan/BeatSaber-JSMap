import type { IArc } from '../v4/arc.ts';
import type { IBasicEvent } from '../v4/basicEvent.ts';
import type { IBombNote } from '../v4/bombNote.ts';
import type { IChain } from '../v4/chain.ts';
import type { IColorBoostEvent } from '../v4/colorBoostEvent.ts';
import type { IColorNote } from '../v4/colorNote.ts';
import type { IEventBoxGroup } from '../v4/eventBoxGroup.ts';
import type { IFxEventBox } from '../v4/fxEventBox.ts';
import type { IFxEventFloat } from '../v4/fxEventFloat.ts';
import type { IIndexFilter } from '../v4/indexFilter.ts';
import type { ILightColorEvent } from '../v4/lightColorEvent.ts';
import type { ILightColorEventBox } from '../v4/lightColorEventBox.ts';
import type { ILightRotationEvent } from '../v4/lightRotationEvent.ts';
import type { ILightRotationEventBox } from '../v4/lightRotationEventBox.ts';
import type { ILightTranslationEvent } from '../v4/lightTranslationEvent.ts';
import type { ILightTranslationEventBox } from '../v4/lightTranslationEventBox.ts';
import type { INJSEvent } from '../v4/njsEvent.ts';
import type { IObjectLane } from '../v4/object.ts';
import type { IObject, IObjectArc, IObjectChain } from '../v4/object.ts';
import type { IObstacle } from '../v4/obstacle.ts';
import type { ISpawnRotation } from '../v4/spawnRotation.ts';
import type { IWaypoint } from '../v4/waypoint.ts';

/**
 * Schema container for v4 `Arc`.
 *
 * Contains `IObjectArc`, `IArc` and `IColorNote`.
 */
export interface IArcContainer {
   object: IObjectArc;
   data: IArc;
   headData: IColorNote;
   tailData: IColorNote;
}

/**
 * Schema container for v4 `Basic Event`.
 *
 * Contains `IObject` and `IBasicEvent`.
 */
export interface IBasicEventContainer {
   object: IObject;
   data: IBasicEvent;
}

/**
 * Schema container for v4 `NJS Event`.
 *
 * Contains `IObject` and `INjsEvent`.
 */
export interface INjsEventContainer {
   object: IObject;
   data: INJSEvent;
}

/**
 * Schema container for v4 `Bomb Note`.
 *
 * Contains `IObjectLane` and `IBombNote`.
 */
export interface IBombNoteContainer {
   object: IObjectLane;
   data: IBombNote;
}

/**
 * Schema container for v4 `Chain`.
 *
 * Contains `IObjectChain`, `IChain` and `IColorNote`.
 */
export interface IChainContainer {
   object: IObjectChain;
   data: IColorNote;
   chainData: IChain;
}

/**
 * Schema container for v4 `Color Boost Event`.
 *
 * Contains `IObject` and `IColorBoostEvent`.
 */
export interface IColorBoostEventContainer {
   object: IObject;
   data: IColorBoostEvent;
}

/**
 * Schema container for v4 `Color Note`.
 *
 * Contains `IObjectLane` and `IColorNote`.
 */
export interface IColorNoteContainer {
   object: IObjectLane;
   data: IColorNote;
}

/**
 * Schema container for v4 `Event Box Group`.
 *
 * Contains `IEventBoxGroup` and generic `TEvent`.
 */
export interface IEventBoxGroupContainer<TEvent> {
   object: IEventBoxGroup;
   boxData: TEvent[];
}

/**
 * Schema container for v4 `Light Color Event Box`.
 *
 * Contains `ILightColorEventBox`, `ILightColorEventContainer[]` and `IIndexFilter`.
 */
export interface ILightColorBoxContainer {
   data: ILightColorEventBox;
   filterData: IIndexFilter;
   eventData: ILightColorEventContainer[];
}

/**
 * Schema container for v4 `Light Color Event`.
 *
 * Contains `ILightColorEvent` and `f32`.
 */
export interface ILightColorEventContainer {
   data: ILightColorEvent;
   time: number;
}

/**
 * Schema container for v4 `Light Rotation Event Box`.
 *
 * Contains `ILightRotationEventBox`, `ILightRotationEventContainer[]` and `IIndexFilter`.
 */
export interface ILightRotationBoxContainer {
   data: ILightRotationEventBox;
   filterData: IIndexFilter;
   eventData: ILightRotationEventContainer[];
}

/**
 * Schema container for v4 `Light Rotation Event`.
 *
 * Contains `ILightRotationEvent` and `f32`.
 */
export interface ILightRotationEventContainer {
   data: ILightRotationEvent;
   time: number;
}

/**
 * Schema container for v4 `Light Translation Event Box`.
 *
 * Contains `ILightTranslationEventBox`, `ILightTranslationEventContainer[]` and `IIndexFilter`.
 */
export interface ILightTranslationBoxContainer {
   data: ILightTranslationEventBox;
   filterData: IIndexFilter;
   eventData: ILightTranslationEventContainer[];
}

/**
 * Schema container for v4 `Light Translation Event`.
 *
 * Contains `ILightTranslationEvent` and `f32`.
 */
export interface ILightTranslationEventContainer {
   data: ILightTranslationEvent;
   time: number;
}

/**
 * Schema container for v4 `FX Event Float Box Group`.
 *
 * Contains `IFxEventBox`, `IFxEventFloatContainer[]` and `IIndexFilter`.
 */
export interface IFxEventFloatBoxContainer {
   data: IFxEventBox;
   filterData: IIndexFilter;
   eventData: IFxEventFloatContainer[];
}

/**
 * Schema container for v4 `FX Event Float`.
 *
 * Contains `IFxEventFloat` and `f32`.
 */
export interface IFxEventFloatContainer {
   data: IFxEventFloat;
   time: number;
}

/**
 * Schema container for v4 `Obstacle`.
 *
 * Contains `IObjectLane` and `IObstacle`.
 */
export interface IObstacleContainer {
   object: IObjectLane;
   data: IObstacle;
}

/**
 * Schema container for v4 `Spawn Rotation`.
 *
 * Contains `IObject` and `ISpawnRotation`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export interface ISpawnRotationContainer {
   object: IObject;
   data: ISpawnRotation;
}

/**
 * Schema container for v4 `Waypoint`.
 *
 * Contains `IObjectLane` and `IWaypoint`.
 */
export interface IWaypointContainer {
   object: IObjectLane;
   data: IWaypoint;
}

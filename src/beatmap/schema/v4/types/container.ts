import type { IArc } from './arc.ts';
import type { IBasicEvent } from './basicEvent.ts';
import type { IBombNote } from './bombNote.ts';
import type { IChain } from './chain.ts';
import type { IColorBoostEvent } from './colorBoostEvent.ts';
import type { IColorNote } from './colorNote.ts';
import type { IEventBoxGroup } from './eventBoxGroup.ts';
import type { IFxEventBox } from './fxEventBox.ts';
import type { IFxEventFloat } from './fxEventFloat.ts';
import type { IIndexFilter } from './indexFilter.ts';
import type { ILightColorEvent } from './lightColorEvent.ts';
import type { ILightColorEventBox } from './lightColorEventBox.ts';
import type { ILightRotationEvent } from './lightRotationEvent.ts';
import type { ILightRotationEventBox } from './lightRotationEventBox.ts';
import type { ILightTranslationEvent } from './lightTranslationEvent.ts';
import type { ILightTranslationEventBox } from './lightTranslationEventBox.ts';
import type { INJSEvent } from './njsEvent.ts';
import type { IObjectLane } from './object.ts';
import type { IObject, IObjectArc, IObjectChain } from './object.ts';
import type { IObstacle } from './obstacle.ts';
import type { ISpawnRotation } from './spawnRotation.ts';
import type { IWaypoint } from './waypoint.ts';

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

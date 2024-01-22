import { IArc } from './arc.ts';
import { IBasicEvent } from './basicEvent.ts';
import { IBombNote } from './bombNote.ts';
import { IChain } from './chain.ts';
import { IColorBoostEvent } from './colorBoostEvent.ts';
import { IColorNote } from './colorNote.ts';
import { IEventBoxGroup } from './eventBoxGroup.ts';
import { IFxEventBox } from './fxEventBox.ts';
import { IFxEventFloat } from './fxEventFloat.ts';
import { IIndexFilter } from './indexFilter.ts';
import { ILightColorEvent } from './lightColorEvent.ts';
import { ILightColorEventBox } from './lightColorEventBox.ts';
import { ILightRotationEvent } from './lightRotationEvent.ts';
import { ILightRotationEventBox } from './lightRotationEventBox.ts';
import { ILightTranslationEvent } from './lightTranslationEvent.ts';
import { ILightTranslationEventBox } from './lightTranslationEventBox.ts';
import { IObjectLane } from './object.ts';
import { IObject, IObjectArc, IObjectChain } from './object.ts';
import { IObstacle } from './obstacle.ts';
import { IWaypoint } from './waypoint.ts';

export interface IArcContainer {
   object: IObjectArc;
   data: IArc;
   headData: IColorNote;
   tailData: IColorNote;
}

export interface IBasicEventContainer {
   object: IObject;
   data: IBasicEvent;
}

export interface IBombNoteContainer {
   object: IObjectLane;
   data: IBombNote;
}

export interface IChainContainer {
   object: IObjectChain;
   data: IColorNote;
   chainData: IChain;
}

export interface IColorBoostEventContainer {
   object: IObject;
   data: IColorBoostEvent;
}

export interface IColorNoteContainer {
   object: IObjectLane;
   data: IColorNote;
}

export interface IEventBoxGroupContainer<TEvent> {
   object: IEventBoxGroup;
   boxData: TEvent[];
}

export interface ILightColorBoxContainer {
   data: ILightColorEventBox;
   filterData: IIndexFilter;
   eventData: ILightColorEventContainer[];
}

export interface ILightColorEventContainer {
   data: ILightColorEvent;
   time: number;
}

export interface ILightRotationBoxContainer {
   data: ILightRotationEventBox;
   filterData: IIndexFilter;
   eventData: ILightRotationEventContainer[];
}

export interface ILightRotationEventContainer {
   data: ILightRotationEvent;
   time: number;
}

export interface ILightTranslationBoxContainer {
   data: ILightTranslationEventBox;
   filterData: IIndexFilter;
   eventData: ILightTranslationEventContainer[];
}

export interface ILightTranslationEventContainer {
   data: ILightTranslationEvent;
   time: number;
}

export interface IFxEventFloatBoxContainer {
   data: IFxEventBox;
   filterData: IIndexFilter;
   eventData: IFxEventFloatContainer[];
}

export interface IFxEventFloatContainer {
   data: IFxEventFloat;
   time: number;
}

export interface IObstacleContainer {
   object: IObjectLane;
   data: IObstacle;
}

export interface IWaypointContainer {
   object: IObjectLane;
   data: IWaypoint;
}

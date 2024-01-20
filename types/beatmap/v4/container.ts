import { IArc } from './arc.ts';
import { IBasicEvent } from './basicEvent.ts';
import { IBombNote } from './bombNote.ts';
import { IChain } from './chain.ts';
import { IColorBoostEvent } from './colorBoostEvent.ts';
import { IColorNote } from './colorNote.ts';
import { IEventBox } from './eventBox.ts';
import { IEventBoxCommon } from './eventBoxCommon.ts';
import { IEventBoxGroup } from './eventBoxGroup.ts';
import { IIndexFilter } from './indexFilter.ts';
import { IObjectLane } from './object.ts';
import { IObject, IObjectArc, IObjectChain } from './object.ts';
import { IObstacle } from './obstacle.ts';

export interface ArcContainer {
   arcObject: IObjectArc;
   data: IArc;
   headData: IColorNote;
   tailData: IColorNote;
}

export interface BasicEventContainer {
   object: IObject;
   data: IBasicEvent;
}

export interface BombNoteContainer {
   object: IObjectLane;
   data: IBombNote;
}

export interface ChainContainer {
   object: IObjectChain;
   data: IChain;
   headData: IColorNote;
}

export interface ColorBoostEventContainer {
   object: IObject;
   data: IColorBoostEvent;
}

export interface ColorNoteContainer {
   object: IObjectLane;
   data: IColorNote;
}

export interface EventBoxGroupContainer<TEvent, TBox extends IEventBoxCommon = IEventBox> {
   object: IObject;
   data: IEventBoxGroup;
   filterData: IIndexFilter;
   boxData: TBox;
   eventData: TEvent[];
}

export interface ObstacleContainer {
   object: IObjectLane;
   data: IObstacle;
}

export interface WaypointContainer {
   object: IObjectLane;
   data: IColorNote;
}

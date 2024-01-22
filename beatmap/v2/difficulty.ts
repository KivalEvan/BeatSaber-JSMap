import { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { Note } from './note.ts';
import { Arc } from './arc.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';
import { SpecialEventsKeywordFilters } from './specialEventsKeywordFilters.ts';
import { deepCopy } from '../../utils/misc.ts';
import { INote } from '../../types/beatmap/v2/note.ts';
import { IObstacle } from '../../types/beatmap/v2/obstacle.ts';
import {
   IEvent,
   IEventBoost,
   IEventBPMChange,
   IEventLaneRotation,
} from '../../types/beatmap/v2/event.ts';
import { IWaypoint } from '../../types/beatmap/v2/waypoint.ts';
import { IArc } from '../../types/beatmap/v2/arc.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import logger from '../../logger.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v2', 'difficulty', name];
}

/** Difficulty beatmap v2 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   readonly version = '2.6.0';
   bpmEvents: never[] = [];
   rotationEvents: never[] = [];
   colorNotes: Note[];
   bombNotes: never[] = [];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: never[] = [];
   waypoints: Waypoint[];
   basicEvents: Event[];
   colorBoostEvents: never[] = [];
   lightColorEventBoxGroups: never[] = [];
   lightRotationEventBoxGroups: never[] = [];
   lightTranslationEventBoxGroups: never[] = [];
   fxEventBoxGroups: never[] = [];
   eventTypesWithKeywords: SpecialEventsKeywordFilters;
   useNormalEventsAsCompatibleEvents = true;

   constructor(data: Partial<IDifficulty> = {}) {
      super();

      this.colorNotes = (data._notes ?? []).map((obj) => new Note(obj));
      this.arcs = (data._sliders ?? []).map((obj) => new Arc(obj));
      this.obstacles = (data._obstacles ?? []).map((obj) => new Obstacle(obj));
      this.basicEvents = (data._events ?? []).map((obj) => new Event(obj));
      this.waypoints = (data._waypoints ?? []).map((obj) => new Waypoint(obj));
      this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(
         data._specialEventsKeywordFilters ?? {
            _keywords: [],
         },
      );
      this.customData = deepCopy(data._customData ?? {});
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): Required<IDifficulty> {
      return {
         _version: this.version,
         _notes: this.colorNotes.map((obj) => obj.toJSON()),
         _sliders: this.arcs.map((obj) => obj.toJSON()),
         _obstacles: this.obstacles.map((obj) => obj.toJSON()),
         _events: this.basicEvents.map((obj) => obj.toJSON()),
         _waypoints: this.waypoints.map((obj) => obj.toJSON()),
         _specialEventsKeywordFilters: this.eventTypesWithKeywords.toJSON(),
         _customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IDifficulty['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['_customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(Note, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(Event, obj, keepRef));
      this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
      this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
      this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(this.eventTypesWithKeywords);

      return this;
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute>[]): this;
   addBpmEvents(...data: Partial<IEventBPMChange>[]): this;
   addBpmEvents(
      ...data: (Partial<IEventBPMChange> & Partial<IWrapBPMEventAttribute<IEventBPMChange>>)[]
   ): this;
   addBpmEvents(
      ...data: (Partial<IEventBPMChange> & Partial<IWrapBPMEventAttribute<IEventBPMChange>>)[]
   ): this {
      for (const obj of data) {
         this.basicEvents.push(new Event({ ...obj, type: 100, value: obj.bpm }));
      }
      return this;
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): this;
   addRotationEvents(...data: Partial<IEventLaneRotation>[]): this;
   addRotationEvents(
      ...data: (
         & Partial<IEventLaneRotation>
         & Partial<IWrapRotationEventAttribute<IEventLaneRotation>>
      )[]
   ): this;
   addRotationEvents(
      ...data: (
         & Partial<IEventLaneRotation>
         & Partial<IWrapRotationEventAttribute<IEventLaneRotation>>
      )[]
   ): this {
      for (const obj of data) {
         this.basicEvents.push(
            new Event({
               ...obj,
               type: typeof obj.executionTime === 'number'
                  ? obj.executionTime === 0 ? 14 : 15
                  : obj._type,
            }),
         );
      }
      logger.tWarn(tag('addRotationEvents'), 'This may not work correctly');
      return this;
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<INote>>[]): this;
   addColorNotes(...data: Partial<INote>[]): this;
   addColorNotes(...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]): this;
   addColorNotes(...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]): this {
      for (const obj of data) this.colorNotes.push(new Note(obj));
      return this;
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<INote>>[]): this;
   addBombNotes(...data: Partial<INote>[]): this;
   addBombNotes(...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]): this;
   addBombNotes(...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]): this {
      for (const obj of data) this.colorNotes.push(new Note({ ...obj, type: 3 }));
      return this;
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): this;
   addObstacles(...data: Partial<IObstacle>[]): this;
   addObstacles(...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<IObstacle>>)[]): this;
   addObstacles(
      ...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<IObstacle>>)[]
   ): this {
      for (const obj of data) this.obstacles.push(new Obstacle(obj));
      return this;
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArc>>[]): this;
   addArcs(...data: Partial<IArc>[]): this;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): this;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): this {
      for (const obj of data) this.arcs.push(new Arc(obj));
      return this;
   }

   addChains(..._: never[]): this {
      logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V2');
      return this;
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): this;
   addWaypoints(...data: Partial<IWaypoint>[]): this;
   addWaypoints(...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]): this;
   addWaypoints(
      ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]
   ): this {
      for (const obj of data) this.waypoints.push(new Waypoint(obj));
      return this;
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IEvent>>[]): this;
   addBasicEvents(...data: Partial<IEvent>[]): this;
   addBasicEvents(...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]): this;
   addBasicEvents(...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]): this {
      for (const obj of data) this.basicEvents.push(new Event(obj));
      return this;
   }

   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute<IEventBoost>>[]): this;
   addColorBoostEvents(...data: Partial<IEventBoost>[]): this;
   addColorBoostEvents(
      ...data: (Partial<IEventBoost> & Partial<IWrapColorBoostEventAttribute<IEventBoost>>)[]
   ): this;
   addColorBoostEvents(
      ...data: (Partial<IEventBoost> & Partial<IWrapColorBoostEventAttribute<IEventBoost>>)[]
   ): this {
      for (const obj of data) {
         this.basicEvents.push(new Event({ ...obj, value: obj.toggle ? 1 : obj._value }));
      }
      return this;
   }

   addLightColorEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightColorEventBoxGroups'),
         'Light Color Event Box Group does not exist in beatmap V2',
      );
      return this;
   }

   addLightRotationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in beatmap V2',
      );
      return this;
   }

   addLightTranslationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in beatmap V2',
      );
      return this;
   }

   addFxEventBoxGroups(..._: never[]): this {
      logger.tWarn(tag('addFxEventBoxGroups'), 'FX Event Box Group does not exist in beatmap V2');
      return this;
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(Note, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(Event, obj)) ||
         this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
         this.arcs.every((obj) => this.checkClass(Arc, obj)) ||
         this.eventTypesWithKeywords instanceof SpecialEventsKeywordFilters
      );
   }
}

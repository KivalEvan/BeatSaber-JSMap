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
import { FxEventsCollection } from './_fxEventsCollection.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v2', 'difficulty', name];
}

/** Difficulty beatmap v2 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   version: `2.${0 | 2 | 4 | 5 | 6}.0`;
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
   fxEventsCollection: FxEventsCollection = new FxEventsCollection();
   useNormalEventsAsCompatibleEvents = true;

   constructor(data: Partial<IDifficulty> = {}) {
      super();
      let temp;

      this.version = '2.6.0';

      temp = data._notes ?? [];
      this.colorNotes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.colorNotes[i] = new Note(temp[i]);
      }

      temp = data._sliders ?? [];
      this.arcs = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) this.arcs[i] = new Arc(temp[i]);

      temp = data._obstacles ?? [];
      this.obstacles = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.obstacles[i] = new Obstacle(temp[i]);
      }

      temp = data._events ?? [];
      this.basicEvents = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.basicEvents[i] = new Event(temp[i]);
      }

      temp = data._waypoints ?? [];
      this.waypoints = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.waypoints[i] = new Waypoint(temp[i]);
      }

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
      const json: Required<IDifficulty> = {
         _version: this.version,
         _notes: new Array(this.colorNotes.length),
         _sliders: new Array(this.arcs.length),
         _obstacles: new Array(this.obstacles.length),
         _events: new Array(this.basicEvents.length),
         _waypoints: new Array(this.waypoints.length),
         _specialEventsKeywordFilters: this.eventTypesWithKeywords.toJSON(),
         _customData: deepCopy(this.customData),
      };
      for (let i = 0; i < this.colorNotes.length; i++) {
         json._notes[i] = this.colorNotes[i].toJSON();
      }
      for (let i = 0; i < this.arcs.length; i++) {
         json._sliders[i] = this.arcs[i].toJSON();
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         json._obstacles[i] = this.obstacles[i].toJSON();
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         json._events[i] = this.basicEvents[i].toJSON();
      }
      for (let i = 0; i < this.waypoints.length; i++) {
         json._waypoints[i] = this.waypoints[i].toJSON();
      }

      return json;
   }

   get customData(): NonNullable<IDifficulty['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['_customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): this {
      for (let i = 0; i < this.colorNotes.length; i++) {
         this.colorNotes[i] = this.createOrKeep(Note, this.colorNotes[i], keepRef);
      }
      for (let i = 0; i < this.arcs.length; i++) {
         this.arcs[i] = this.createOrKeep(Arc, this.arcs[i], keepRef);
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         this.obstacles[i] = this.createOrKeep(Obstacle, this.obstacles[i], keepRef);
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         this.basicEvents[i] = this.createOrKeep(Event, this.basicEvents[i], keepRef);
      }
      for (let i = 0; i < this.waypoints.length; i++) {
         this.waypoints[i] = this.createOrKeep(Waypoint, this.waypoints[i], keepRef);
      }

      this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(
         this.eventTypesWithKeywords,
      );

      return this;
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute>[]): void;
   addBpmEvents(...data: Partial<IEventBPMChange>[]): void;
   addBpmEvents(
      ...data: (
         & Partial<IEventBPMChange>
         & Partial<IWrapBPMEventAttribute<IEventBPMChange>>
      )[]
   ): void;
   addBpmEvents(
      ...data: (
         & Partial<IEventBPMChange>
         & Partial<IWrapBPMEventAttribute<IEventBPMChange>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(
            new Event({ ...data[i], type: 100, value: data[i].bpm }),
         );
      }
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): void;
   addRotationEvents(...data: Partial<IEventLaneRotation>[]): void;
   addRotationEvents(
      ...data: (
         & Partial<IEventLaneRotation>
         & Partial<IWrapRotationEventAttribute<IEventLaneRotation>>
      )[]
   ): void;
   addRotationEvents(
      ...data: (
         & Partial<IEventLaneRotation>
         & Partial<IWrapRotationEventAttribute<IEventLaneRotation>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(
            new Event({
               ...data[i],
               type: typeof data[i].executionTime === 'number'
                  ? data[i].executionTime === 0 ? 14 : 15
                  : data[i]._type,
            }),
         );
      }
      logger.tWarn(tag('addRotationEvents'), 'This may not work correctly');
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<INote>>[]): void;
   addColorNotes(...data: Partial<INote>[]): void;
   addColorNotes(
      ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]
   ): void;
   addColorNotes(
      ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.colorNotes.push(new Note(data[i]));
      }
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<INote>>[]): void;
   addBombNotes(...data: Partial<INote>[]): void;
   addBombNotes(
      ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]
   ): void;
   addBombNotes(
      ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.colorNotes.push(new Note({ ...data[i], type: 3 }));
      }
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): void;
   addObstacles(...data: Partial<IObstacle>[]): void;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): void;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.obstacles.push(new Obstacle(data[i]));
      }
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArc>>[]): void;
   addArcs(...data: Partial<IArc>[]): void;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): void;
   addArcs(
      ...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) this.arcs.push(new Arc(data[i]));
   }

   addChains(..._: never[]): void {
      logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V2');
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): void;
   addWaypoints(...data: Partial<IWaypoint>[]): void;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): void;
   addWaypoints(
      ...data: (
         & Partial<IWaypoint>
         & Partial<IWrapWaypointAttribute<IWaypoint>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.waypoints.push(new Waypoint(data[i]));
      }
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IEvent>>[]): void;
   addBasicEvents(...data: Partial<IEvent>[]): void;
   addBasicEvents(
      ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]
   ): void;
   addBasicEvents(
      ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(new Event(data[i]));
      }
   }

   addColorBoostEvents(
      ...data: Partial<IWrapColorBoostEventAttribute<IEventBoost>>[]
   ): void;
   addColorBoostEvents(...data: Partial<IEventBoost>[]): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IEventBoost>
         & Partial<IWrapColorBoostEventAttribute<IEventBoost>>
      )[]
   ): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IEventBoost>
         & Partial<IWrapColorBoostEventAttribute<IEventBoost>>
      )[]
   ): void {
      for (let i = 0; i < data.length; i++) {
         this.basicEvents.push(
            new Event({
               ...data[i],
               value: data[i].toggle ? 1 : data[i]._value,
            }),
         );
      }
   }

   addLightColorEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightColorEventBoxGroups'),
         'Light Color Event Box Group does not exist in beatmap V2',
      );
   }

   addLightRotationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in beatmap V2',
      );
   }

   addLightTranslationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in beatmap V2',
      );
   }

   addFxEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addFxEventBoxGroups'),
         'FX Event Box Group does not exist in beatmap V2',
      );
   }

   isValid(): boolean {
      for (let i = 0; i < this.colorNotes.length; i++) {
         if (this.checkClass(Note, this.colorNotes[i]) === false) return false;
      }

      for (let i = 0; i < this.basicEvents.length; i++) {
         if (this.checkClass(Event, this.basicEvents[i]) === false) {
            return false;
         }
      }

      for (let i = 0; i < this.waypoints.length; i++) {
         if (this.checkClass(Waypoint, this.waypoints[i]) === false) {
            return false;
         }
      }

      for (let i = 0; i < this.obstacles.length; i++) {
         if (this.checkClass(Obstacle, this.obstacles[i]) === false) {
            return false;
         }
      }

      for (let i = 0; i < this.arcs.length; i++) {
         if (this.checkClass(Arc, this.arcs[i]) === false) return false;
      }

      return this.eventTypesWithKeywords instanceof SpecialEventsKeywordFilters;
   }
}

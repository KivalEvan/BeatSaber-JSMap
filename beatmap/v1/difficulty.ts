import { IDifficulty } from '../../types/beatmap/v1/difficulty.ts';
import { Note } from './note.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { INote } from '../../types/beatmap/v1/note.ts';
import { IObstacle } from '../../types/beatmap/v1/obstacle.ts';
import { IEvent } from '../../types/beatmap/v1/event.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import logger from '../../logger.ts';
import { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import { SpecialEventsKeywordFilters } from './_specialEventsKeywordFilters.ts';
import { FxEventsCollection } from './_fxEventsCollection.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v1', 'difficulty', name];
}

/** Difficulty beatmap v1 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   version: '1.5.0';
   bpmEvents: never[] = [];
   rotationEvents: never[] = [];
   colorNotes: Note[];
   bombNotes: never[] = [];
   obstacles: Obstacle[];
   arcs: never[] = [];
   chains: never[] = [];
   waypoints: never[] = [];
   basicEvents: Event[];
   colorBoostEvents: never[] = [];
   lightColorEventBoxGroups: never[] = [];
   lightRotationEventBoxGroups: never[] = [];
   lightTranslationEventBoxGroups: never[] = [];
   fxEventBoxGroups: never[] = [];
   eventTypesWithKeywords: SpecialEventsKeywordFilters = new SpecialEventsKeywordFilters();
   fxEventsCollection: FxEventsCollection = new FxEventsCollection();
   useNormalEventsAsCompatibleEvents = true;

   beatsPerMinute: number;
   beatsPerBar: number;
   shuffle: number;
   shufflePeriod: number;
   noteJumpSpeed: number;
   noteJumpStartBeatOffset: number;
   time: number;
   BPMChanges;
   bookmarks;

   constructor(data: Partial<IDifficulty> = {}) {
      super();
      let temp;

      this.version = '1.5.0';

      temp = data._notes ?? [];
      this.colorNotes = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.colorNotes[i] = new Note(temp[i]);
      }

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

      this.beatsPerMinute = data._beatsPerMinute ?? 120;
      this.beatsPerBar = data._beatsPerBar ?? 4;
      this.shuffle = data._shuffle ?? 0;
      this.shufflePeriod = data._shufflePeriod ?? 0;
      this.noteJumpSpeed = data._noteJumpSpeed ?? 0;
      this.noteJumpStartBeatOffset = data._noteJumpStartBeatOffset ?? 0;
      this.time = data._time ?? 0;
      this.BPMChanges = data._BPMChanges ?? [];
      this.bookmarks = data._bookmarks ?? [];
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): Required<IDifficulty> {
      const json: Required<IDifficulty> = {
         _version: this.version,
         _beatsPerMinute: this.beatsPerMinute,
         _beatsPerBar: this.beatsPerBar,
         _shuffle: this.shuffle,
         _shufflePeriod: this.shufflePeriod,
         _noteJumpSpeed: this.noteJumpSpeed,
         _noteJumpStartBeatOffset: this.noteJumpStartBeatOffset,
         _notes: new Array(this.colorNotes.length),
         _obstacles: new Array(this.obstacles.length),
         _events: new Array(this.basicEvents.length),
         _time: this.time,
         _BPMChanges: this.BPMChanges,
         _bookmarks: this.bookmarks,
      };
      for (let i = 0; i < this.colorNotes.length; i++) {
         json._notes[i] = this.colorNotes[i].toJSON();
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         json._obstacles[i] = this.obstacles[i].toJSON();
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         json._events[i] = this.basicEvents[i].toJSON();
      }

      return json;
   }

   get customData(): Record<string, never> {
      return {};
   }
   set customData(_: Record<string, never>) {
      logger.tWarn(
         tag('customData'),
         'Custom data does not exist in beatmap V1',
      );
   }

   reparse(keepRef?: boolean): this {
      for (let i = 0; i < this.colorNotes.length; i++) {
         this.colorNotes[i] = this.createOrKeep(
            Note,
            this.colorNotes[i],
            keepRef,
         );
      }

      for (let i = 0; i < this.obstacles.length; i++) {
         this.obstacles[i] = this.createOrKeep(
            Obstacle,
            this.obstacles[i],
            keepRef,
         );
      }

      for (let i = 0; i < this.basicEvents.length; i++) {
         this.basicEvents[i] = this.createOrKeep(
            Event,
            this.basicEvents[i],
            keepRef,
         );
      }

      return this;
   }

   addBpmEvents(..._: never[]): void {
      logger.tWarn(
         tag('addBpmEvents'),
         'BPM Event does not exist in beatmap V1',
      );
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): void;
   addRotationEvents(...data: Partial<IEvent>[]): void;
   addRotationEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapRotationEventAttribute<IEvent>>
      )[]
   ): void;
   addRotationEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapRotationEventAttribute<IEvent>>
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

   addArcs(..._: never[]): void {
      logger.tWarn(tag('addArcs'), 'Arc does not exist in beatmap V1');
   }

   addChains(..._: never[]): void {
      logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V1');
   }

   addWaypoints(..._: never[]): void {
      logger.tWarn(
         tag('addWaypoints'),
         'Waypoint does not exist in beatmap V1',
      );
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
      ...data: Partial<IWrapColorBoostEventAttribute<IEvent>>[]
   ): void;
   addColorBoostEvents(...data: Partial<IEvent>[]): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapColorBoostEventAttribute<IEvent>>
      )[]
   ): void;
   addColorBoostEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapColorBoostEventAttribute<IEvent>>
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
         'Light Color Event Box Group does not exist in beatmap V1',
      );
   }

   addLightRotationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in beatmap V1',
      );
   }

   addLightTranslationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in beatmap V1',
      );
   }

   addFxEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addFxEventBoxGroups'),
         'FX Event Box Group does not exist in beatmap V1',
      );
   }

   isValid(): boolean {
      for (let i = 0; i < this.colorNotes.length; i++) {
         if (!this.checkClass(Note, this.colorNotes[i])) return false;
      }
      for (let i = 0; i < this.obstacles.length; i++) {
         if (!this.checkClass(Obstacle, this.obstacles[i])) return false;
      }
      for (let i = 0; i < this.basicEvents.length; i++) {
         if (!this.checkClass(Event, this.basicEvents[i])) return false;
      }
      return true;
   }
}

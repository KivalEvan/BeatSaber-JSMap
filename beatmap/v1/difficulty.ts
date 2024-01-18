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
   version: '1.5.0' = '1.5.0';
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

      this.beatsPerMinute = data._beatsPerMinute ?? 120;
      this.beatsPerBar = data._beatsPerBar ?? 4;
      this.shuffle = data._shuffle ?? 0;
      this.shufflePeriod = data._shufflePeriod ?? 0;
      this.noteJumpSpeed = data._noteJumpSpeed ?? 0;
      this.noteJumpStartBeatOffset = data._noteJumpStartBeatOffset ?? 0;
      this.colorNotes = (data._notes ?? []).map((obj) => new Note(obj));
      this.obstacles = (data._obstacles ?? []).map((obj) => new Obstacle(obj));
      this.basicEvents = (data._events ?? []).map((obj) => new Event(obj));
      this.time = data._time ?? 0;
      this.BPMChanges = data._BPMChanges ?? [];
      this.bookmarks = data._bookmarks ?? [];
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): Required<IDifficulty> {
      return {
         _version: this.version,
         _beatsPerMinute: this.beatsPerMinute,
         _beatsPerBar: this.beatsPerBar,
         _shuffle: this.shuffle,
         _shufflePeriod: this.shufflePeriod,
         _noteJumpSpeed: this.noteJumpSpeed,
         _noteJumpStartBeatOffset: this.noteJumpStartBeatOffset,
         _notes: this.colorNotes.map((obj) => obj.toJSON()),
         _obstacles: this.obstacles.map((obj) => obj.toJSON()),
         _events: this.basicEvents.map((obj) => obj.toJSON()),
         _time: this.time,
         _BPMChanges: this.BPMChanges,
         _bookmarks: this.bookmarks,
      };
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
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(Note, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(Event, obj, keepRef));

      return this;
   }

   addBpmEvents(..._: never[]): this {
      logger.tWarn(
         tag('addBpmEvents'),
         'BPM Event does not exist in beatmap V1',
      );
      return this;
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): this;
   addRotationEvents(...data: Partial<IEvent>[]): this;
   addRotationEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapRotationEventAttribute<IEvent>>
      )[]
   ): this;
   addRotationEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapRotationEventAttribute<IEvent>>
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
   addColorNotes(
      ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]
   ): this;
   addColorNotes(
      ...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]
   ): this {
      for (const obj of data) this.colorNotes.push(new Note(obj));
      return this;
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<INote>>[]): this;
   addBombNotes(...data: Partial<INote>[]): this;
   addBombNotes(
      ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]
   ): this;
   addBombNotes(
      ...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]
   ): this {
      for (const obj of data) {
         this.colorNotes.push(new Note({ ...obj, type: 3 }));
      }
      return this;
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): this;
   addObstacles(...data: Partial<IObstacle>[]): this;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): this;
   addObstacles(
      ...data: (
         & Partial<IObstacle>
         & Partial<IWrapObstacleAttribute<IObstacle>>
      )[]
   ): this {
      for (const obj of data) this.obstacles.push(new Obstacle(obj));
      return this;
   }

   addArcs(..._: never[]): this {
      logger.tWarn(tag('addArcs'), 'Arc does not exist in beatmap V1');
      return this;
   }

   addChains(..._: never[]): this {
      logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V1');
      return this;
   }

   addWaypoints(..._: never[]): this {
      logger.tWarn(
         tag('addWaypoints'),
         'Waypoint does not exist in beatmap V1',
      );
      return this;
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IEvent>>[]): this;
   addBasicEvents(...data: Partial<IEvent>[]): this;
   addBasicEvents(
      ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]
   ): this;
   addBasicEvents(
      ...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]
   ): this {
      for (const obj of data) this.basicEvents.push(new Event(obj));
      return this;
   }

   addColorBoostEvents(
      ...data: Partial<IWrapColorBoostEventAttribute<IEvent>>[]
   ): this;
   addColorBoostEvents(...data: Partial<IEvent>[]): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapColorBoostEventAttribute<IEvent>>
      )[]
   ): this;
   addColorBoostEvents(
      ...data: (
         & Partial<IEvent>
         & Partial<IWrapColorBoostEventAttribute<IEvent>>
      )[]
   ): this {
      for (const obj of data) {
         this.basicEvents.push(
            new Event({ ...obj, value: obj.toggle ? 1 : obj._value }),
         );
      }
      return this;
   }

   addLightColorEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightColorEventBoxGroups'),
         'Light Color Event Box Group does not exist in beatmap V1',
      );
      return this;
   }

   addLightRotationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in beatmap V1',
      );
      return this;
   }

   addLightTranslationEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in beatmap V1',
      );
      return this;
   }

   addFxEventBoxGroups(..._: never[]): this {
      logger.tWarn(
         tag('addFxEventBoxGroups'),
         'FX Event Box Group does not exist in beatmap V1',
      );
      return this;
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(Note, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(Event, obj))
      );
   }
}

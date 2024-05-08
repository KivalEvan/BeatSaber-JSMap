// deno-lint-ignore-file no-explicit-any
import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import type {
   IWrapBPMEvent,
   IWrapBPMEventAttribute,
} from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapChain, IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type {
   IWrapColorNote,
   IWrapColorNoteAttribute,
} from '../../types/beatmap/wrapper/colorNote.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import type {
   IWrapRotationEvent,
   IWrapRotationEventAttribute,
} from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapArc, IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type { DeepPartial, LooseAutocomplete } from '../../types/utils.ts';
import type { GenericFilename } from '../../types/beatmap/shared/filename.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type {
   IWrapDifficulty,
   IWrapDifficultyAttribute,
} from '../../types/beatmap/wrapper/difficulty.ts';
import { sortNoteFn, sortObjectFn } from '../shared/helpers.ts';
import type { ISchemaContainer } from '../../types/beatmap/shared/schema.ts';
import { BPMEvent } from './bpmEvent.ts';
import { RotationEvent } from './rotationEvent.ts';
import { ColorNote } from './colorNote.ts';
import { BombNote } from './bombNote.ts';
import { Obstacle } from './obstacle.ts';
import { Arc } from './arc.ts';
import { Chain } from './chain.ts';
import { deepCopy } from '../../utils/misc.ts';

export class Difficulty extends BaseItem implements IWrapDifficulty {
   static schema: Record<number, ISchemaContainer<IWrapDifficultyAttribute>> = {};
   static defaultValue: IWrapDifficultyAttribute = {
      filename: 'Unnamed.beatmap.dat',
      bpmEvents: [],
      rotationEvents: [],
      colorNotes: [],
      bombNotes: [],
      obstacles: [],
      arcs: [],
      chains: [],
      customData: {},
   };

   static create(...data: DeepPartial<IWrapDifficultyAttribute>[]): Difficulty[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapDifficultyAttribute> = {}) {
      super();
      this.filename = data.filename ?? 'Unnamed.beatmap.dat';
      this.bpmEvents = (data.bpmEvents ?? Difficulty.defaultValue.bpmEvents).map(
         (e) => new BPMEvent(e),
      );
      this.rotationEvents = (
         data.rotationEvents ?? Difficulty.defaultValue.rotationEvents
      ).map((e) => new RotationEvent(e));
      this.colorNotes = (
         data.colorNotes ?? Difficulty.defaultValue.colorNotes
      ).map((e) => new ColorNote(e));
      this.bombNotes = (data.bombNotes ?? Difficulty.defaultValue.bombNotes).map(
         (e) => new BombNote(e),
      );
      this.obstacles = (data.obstacles ?? Difficulty.defaultValue.obstacles).map(
         (e) => new Obstacle(e),
      );
      this.arcs = (data.arcs ?? Difficulty.defaultValue.arcs).map(
         (e) => new Arc(e),
      );
      this.chains = (data.chains ?? Difficulty.defaultValue.chains).map(
         (e) => new Chain(e),
      );
      this.customData = deepCopy(
         data.customData ?? Difficulty.defaultValue.customData,
      );
   }
   static fromJSON(data: Record<string, any>, version: number): Difficulty {
      return new this(Difficulty.schema[version]?.deserialize(data));
   }
   toSchema<T extends Record<string, any>>(version?: number): T {
      return (Difficulty.schema[version || 0]?.serialize(this) ||
         this.toJSON()) as T;
   }
   toJSON(): IWrapDifficultyAttribute {
      return {
         filename: this.filename,
         bpmEvents: this.bpmEvents.map((e) => e.toJSON()),
         rotationEvents: this.rotationEvents.map((e) => e.toJSON()),
         colorNotes: this.colorNotes.map((e) => e.toJSON()),
         bombNotes: this.bombNotes.map((e) => e.toJSON()),
         obstacles: this.obstacles.map((e) => e.toJSON()),
         arcs: this.arcs.map((e) => e.toJSON()),
         chains: this.chains.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }
   isValid(): boolean {
      return true;
   }

   filename = 'Unnamed.beatmap.dat';

   bpmEvents: IWrapBPMEvent[];
   rotationEvents: IWrapRotationEvent[];
   colorNotes: IWrapColorNote[];
   bombNotes: IWrapBombNote[];
   obstacles: IWrapObstacle[];
   arcs: IWrapArc[];
   chains: IWrapChain[];

   setFilename(filename: LooseAutocomplete<GenericFilename>): this {
      this.filename = filename;
      return this;
   }

   sort(): this {
      this.bpmEvents.sort(sortObjectFn);
      this.rotationEvents.sort(sortObjectFn);
      this.colorNotes.sort(sortNoteFn);
      this.bombNotes.sort(sortNoteFn);
      this.obstacles.sort(sortObjectFn);
      this.arcs.sort(sortNoteFn);
      this.chains.sort(sortNoteFn);

      return this;
   }

   addBpmEvents(...data: DeepPartial<IWrapBPMEventAttribute>[]): this {
      for (const d of data) {
         this.bpmEvents.push(new BPMEvent(d));
      }
      return this;
   }
   addRotationEvents(
      ...data: DeepPartial<IWrapRotationEventAttribute>[]
   ): this {
      for (const d of data) {
         this.rotationEvents.push(new RotationEvent(d));
      }
      return this;
   }
   addColorNotes(...data: DeepPartial<IWrapColorNoteAttribute>[]): this {
      for (const d of data) {
         this.colorNotes.push(new ColorNote(d));
      }
      return this;
   }
   addBombNotes(...data: DeepPartial<IWrapBombNoteAttribute>[]): this {
      for (const d of data) {
         this.bombNotes.push(new BombNote(d));
      }
      return this;
   }
   addObstacles(...data: DeepPartial<IWrapObstacleAttribute>[]): this {
      for (const d of data) {
         this.obstacles.push(new Obstacle(d));
      }
      return this;
   }
   addArcs(...data: DeepPartial<IWrapArcAttribute>[]): this {
      for (const d of data) {
         this.arcs.push(new Arc(d));
      }
      return this;
   }
   addChains(...data: DeepPartial<IWrapChainAttribute>[]): this {
      for (const d of data) {
         this.chains.push(new Chain(d));
      }
      return this;
   }
}

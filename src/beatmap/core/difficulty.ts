import type { IWrapArc, IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
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
   IWrapDifficulty,
   IWrapDifficultyAttribute,
} from '../../types/beatmap/wrapper/difficulty.ts';
import type {
   IWrapNJSEvent,
   IWrapNJSEventAttribute,
} from '../../types/beatmap/wrapper/njsEvent.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import type {
   IWrapRotationEvent,
   IWrapRotationEventAttribute,
} from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { sortNoteFn, sortObjectFn } from '../helpers/sort.ts';
import { BaseItem } from './abstract/baseItem.ts';
import { Arc, createArc } from './arc.ts';
import { BombNote, createBombNote } from './bombNote.ts';
import { BPMEvent, createBPMEvent } from './bpmEvent.ts';
import { Chain, createChain } from './chain.ts';
import { ColorNote, createColorNote } from './colorNote.ts';
import { createNJSEvent, NJSEvent } from './njsEvent.ts';
import { createObstacle, Obstacle } from './obstacle.ts';
import { createRotationEvent, RotationEvent } from './rotationEvent.ts';

export function createDifficulty(
   data: DeepPartial<IWrapDifficultyAttribute> = {},
): IWrapDifficultyAttribute {
   return {
      bpmEvents: data.bpmEvents?.map(createBPMEvent) ?? [],
      rotationEvents: data.rotationEvents?.map(createRotationEvent) ?? [],
      colorNotes: data.colorNotes?.map(createColorNote) ?? [],
      bombNotes: data.bombNotes?.map(createBombNote) ?? [],
      obstacles: data.obstacles?.map(createObstacle) ?? [],
      arcs: data.arcs?.map(createArc) ?? [],
      chains: data.chains?.map(createChain) ?? [],
      njsEvents: data.njsEvents?.map(createNJSEvent) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap difficulty.
 */
export class Difficulty extends BaseItem implements IWrapDifficulty {
   static defaultValue: IWrapDifficultyAttribute = createDifficulty();

   static createOne(data: Partial<IWrapDifficultyAttribute> = {}): Difficulty {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapDifficultyAttribute, 'customData'>[]
   ): Difficulty[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapDifficultyAttribute, 'customData'> = {}) {
      super();
      this.bpmEvents = (data.bpmEvents ?? Difficulty.defaultValue.bpmEvents).map(
         (e) => new BPMEvent(e),
      );
      this.rotationEvents = (data.rotationEvents ?? Difficulty.defaultValue.rotationEvents).map(
         (e) => new RotationEvent(e),
      );
      this.colorNotes = (data.colorNotes ?? Difficulty.defaultValue.colorNotes).map(
         (e) => new ColorNote(e),
      );
      this.bombNotes = (data.bombNotes ?? Difficulty.defaultValue.bombNotes).map(
         (e) => new BombNote(e),
      );
      this.obstacles = (data.obstacles ?? Difficulty.defaultValue.obstacles).map(
         (e) => new Obstacle(e),
      );
      this.arcs = (data.arcs ?? Difficulty.defaultValue.arcs).map((e) => new Arc(e));
      // shut the fuck up, ts, it's not that deep
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      this.chains = (data.chains ?? Difficulty.defaultValue.chains).map((e) => new Chain(e));
      this.njsEvents = (data.njsEvents ?? Difficulty.defaultValue.njsEvents).map((e) =>
         new NJSEvent(e)
      );
      this.customData = deepCopy(data.customData ?? Difficulty.defaultValue.customData);
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.bpmEvents.every((e) => e.isValid()) &&
         this.rotationEvents.every((e) => e.isValid()) &&
         this.colorNotes.every((e) => e.isValid()) &&
         this.bombNotes.every((e) => e.isValid()) &&
         this.obstacles.every((e) => e.isValid()) &&
         this.arcs.every((e) => e.isValid()) &&
         this.chains.every((e) => e.isValid());
   }

   bpmEvents: IWrapBPMEvent[];
   rotationEvents: IWrapRotationEvent[];
   colorNotes: IWrapColorNote[];
   bombNotes: IWrapBombNote[];
   obstacles: IWrapObstacle[];
   arcs: IWrapArc[];
   chains: IWrapChain[];
   njsEvents: IWrapNJSEvent[];

   override sort(): this {
      this.bpmEvents.sort(sortObjectFn);
      this.rotationEvents.sort(sortObjectFn);
      this.colorNotes.sort(sortNoteFn);
      this.bombNotes.sort(sortNoteFn);
      this.obstacles.sort(sortObjectFn);
      this.arcs.sort(sortNoteFn);
      this.chains.sort(sortNoteFn);

      return this;
   }

   addBpmEvents(...data: DeepPartialIgnore<IWrapBPMEventAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.bpmEvents.push(new BPMEvent(d));
      }
      return this;
   }
   addRotationEvents(
      ...data: DeepPartialIgnore<IWrapRotationEventAttribute, 'customData'>[]
   ): this {
      for (const d of data) {
         this.rotationEvents.push(new RotationEvent(d));
      }
      return this;
   }
   addColorNotes(...data: DeepPartialIgnore<IWrapColorNoteAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.colorNotes.push(new ColorNote(d));
      }
      return this;
   }
   addBombNotes(...data: DeepPartialIgnore<IWrapBombNoteAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.bombNotes.push(new BombNote(d));
      }
      return this;
   }
   addObstacles(...data: DeepPartialIgnore<IWrapObstacleAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.obstacles.push(new Obstacle(d));
      }
      return this;
   }
   addArcs(...data: DeepPartialIgnore<IWrapArcAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.arcs.push(new Arc(d));
      }
      return this;
   }
   addChains(...data: DeepPartialIgnore<IWrapChainAttribute, 'customData'>[]): this {
      for (const d of data) {
         this.chains.push(new Chain(d));
      }
      return this;
   }
   addNjsEvents(...data: Partial<IWrapNJSEventAttribute>[]): this {
      for (const d of data) {
         this.njsEvents.push(new NJSEvent(d));
      }
      return this;
   }
}

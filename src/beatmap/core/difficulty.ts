import type { IWrapArc } from './types/arc.ts';
import type { IWrapBombNote } from './types/bombNote.ts';
import type { IWrapBPMEvent } from './types/bpmEvent.ts';
import type { IWrapChain } from './types/chain.ts';
import type { IWrapColorNote } from './types/colorNote.ts';
import type { IWrapDifficulty } from './types/difficulty.ts';
import type { IWrapNJSEvent } from './types/njsEvent.ts';
import type { IWrapObstacle } from './types/obstacle.ts';
import type { IWrapRotationEvent } from './types/rotationEvent.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { sortNoteFn, sortObjectFn } from '../helpers/sort.ts';
import { BaseItem } from './abstract/baseItem.ts';
import type { BaseObject } from './abstract/baseObject.ts';
import { Arc, createArc } from './arc.ts';
import { BombNote, createBombNote } from './bombNote.ts';
import { BPMEvent, createBPMEvent } from './bpmEvent.ts';
import { Chain, createChain } from './chain.ts';
import { ColorNote, createColorNote } from './colorNote.ts';
import { createNJSEvent, NJSEvent } from './njsEvent.ts';
import { createObstacle, Obstacle } from './obstacle.ts';
import { createRotationEvent, RotationEvent } from './rotationEvent.ts';

export function createDifficulty(
   data: DeepPartial<IWrapDifficulty> = {},
): IWrapDifficulty {
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
   static defaultValue: IWrapDifficulty = createDifficulty();

   bpmEvents: BPMEvent[];
   rotationEvents: RotationEvent[];
   colorNotes: ColorNote[];
   bombNotes: BombNote[];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: Chain[];
   njsEvents: NJSEvent[];
   override customData: IWrapDifficulty['customData'];

   static createOne(data: DeepPartial<IWrapDifficulty> = {}): Difficulty {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapDifficulty>[]
   ): Difficulty[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapDifficulty> = {}) {
      super();
      this.bpmEvents = (
         data.bpmEvents ?? Difficulty.defaultValue.bpmEvents
      ).map((e) => new BPMEvent(e));
      this.rotationEvents = (
         data.rotationEvents ?? Difficulty.defaultValue.rotationEvents
      ).map((e) => new RotationEvent(e));
      this.colorNotes = (
         data.colorNotes ?? Difficulty.defaultValue.colorNotes
      ).map((e) => new ColorNote(e));
      this.bombNotes = (
         data.bombNotes ?? Difficulty.defaultValue.bombNotes
      ).map((e) => new BombNote(e));
      this.obstacles = (
         data.obstacles ?? Difficulty.defaultValue.obstacles
      ).map((e) => new Obstacle(e));
      this.arcs = (data.arcs ?? Difficulty.defaultValue.arcs).map(
         (e) => new Arc(e),
      );
      this.chains = (data.chains ?? Difficulty.defaultValue.chains).map(
         (e) => new Chain(e),
      );
      this.njsEvents = (
         data.njsEvents ?? Difficulty.defaultValue.njsEvents
      ).map((e) => new NJSEvent(e));
      this.customData = deepCopy(
         data.customData ?? Difficulty.defaultValue.customData,
      );
   }

   override reconcile(): this {
      this.bpmEvents = reconcileClassObject(this.bpmEvents, BPMEvent);
      this.rotationEvents = reconcileClassObject(
         this.rotationEvents,
         RotationEvent,
      );
      this.colorNotes = reconcileClassObject(this.colorNotes, ColorNote);
      this.bombNotes = reconcileClassObject(this.bombNotes, BombNote);
      this.obstacles = reconcileClassObject(this.obstacles, Obstacle);
      this.arcs = reconcileClassObject(this.arcs, Arc);
      this.chains = reconcileClassObject(this.chains, Chain);
      this.njsEvents = reconcileClassObject(this.njsEvents, NJSEvent);
      return this;
   }

   override isValid(
      fn?: (object: this) => boolean,
      override?: boolean,
   ): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         this.bpmEvents.every((e) => e.isValid()) &&
         this.rotationEvents.every((e) => e.isValid()) &&
         this.colorNotes.every((e) => e.isValid()) &&
         this.bombNotes.every((e) => e.isValid()) &&
         this.obstacles.every((e) => e.isValid()) &&
         this.arcs.every((e) => e.isValid()) &&
         this.chains.every((e) => e.isValid());
   }

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

   allObjects(): BaseObject[] {
      return [
         ...this.bpmEvents,
         ...this.rotationEvents,
         ...this.colorNotes,
         ...this.bombNotes,
         ...this.obstacles,
         ...this.arcs,
         ...this.chains,
         ...this.njsEvents,
      ];
   }

   addBpmEvents(
      ...data: DeepPartial<IWrapBPMEvent>[]
   ): this {
      for (const d of data) {
         this.bpmEvents.push(new BPMEvent(d));
      }
      return this;
   }
   addRotationEvents(
      ...data: DeepPartial<IWrapRotationEvent>[]
   ): this {
      for (const d of data) {
         this.rotationEvents.push(new RotationEvent(d));
      }
      return this;
   }
   addColorNotes(
      ...data: DeepPartial<IWrapColorNote>[]
   ): this {
      for (const d of data) {
         this.colorNotes.push(new ColorNote(d));
      }
      return this;
   }
   addBombNotes(
      ...data: DeepPartial<IWrapBombNote>[]
   ): this {
      for (const d of data) {
         this.bombNotes.push(new BombNote(d));
      }
      return this;
   }
   addObstacles(
      ...data: DeepPartial<IWrapObstacle>[]
   ): this {
      for (const d of data) {
         this.obstacles.push(new Obstacle(d));
      }
      return this;
   }
   addArcs(...data: DeepPartial<IWrapArc>[]): this {
      for (const d of data) {
         this.arcs.push(new Arc(d));
      }
      return this;
   }
   addChains(...data: DeepPartial<IWrapChain>[]): this {
      for (const d of data) {
         this.chains.push(new Chain(d));
      }
      return this;
   }
   addNjsEvents(...data: Partial<IWrapNJSEvent>[]): this {
      for (const d of data) {
         this.njsEvents.push(new NJSEvent(d));
      }
      return this;
   }
}

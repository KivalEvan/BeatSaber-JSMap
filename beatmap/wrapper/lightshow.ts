import { IWrapEvent, IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import {
   _ObtainCustomData,
   DeepPartialWrapper,
   LooseAutocomplete,
   PartialWrapper,
} from '../../types/utils.ts';
import { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import { EventContainer } from '../../types/beatmap/wrapper/container.ts';
import { WrapBaseItem } from './baseItem.ts';
import { IWrapLightshow } from '../../types/beatmap/wrapper/lightshow.ts';
import { IWrapFxEventsCollection } from '../../types/beatmap/wrapper/fxEventsCollection.ts';
import {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { sortObjectFn } from '../shared/helpers.ts';

/** Lightshow beatmap class object. */
export abstract class WrapLightshow<T extends { [P in keyof T]: T[P] }> extends WrapBaseItem<T>
   implements IWrapLightshow<T> {
   private _filename = 'UnnamedLightshow.dat';

   abstract basicEvents: IWrapEvent[];
   abstract colorBoostEvents: IWrapColorBoostEvent[];
   abstract lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   abstract lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   abstract lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   abstract fxEventBoxGroups: IWrapFxEventBoxGroup[];
   abstract fxEventsCollection: IWrapFxEventsCollection;

   clone<U extends this>(): U {
      return super.clone().setFileName(this.filename) as U;
   }

   set filename(name: LooseAutocomplete<GenericFileName>) {
      this._filename = name.trim();
   }
   get filename(): string {
      return this._filename;
   }

   setFileName(filename: LooseAutocomplete<GenericFileName>) {
      this.filename = filename;
      return this;
   }

   sort(): this {
      this.basicEvents.sort(sortObjectFn);
      this.colorBoostEvents.sort(sortObjectFn);
      this.lightColorEventBoxGroups.sort(sortObjectFn);
      this.lightRotationEventBoxGroups.sort(sortObjectFn);
      this.lightTranslationEventBoxGroups.sort(sortObjectFn);
      this.fxEventBoxGroups.sort(sortObjectFn);
      this.fxEventsCollection.intList.sort(sortObjectFn);
      this.fxEventsCollection.floatList.sort(sortObjectFn);

      this.lightColorEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );
      this.lightRotationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );
      this.lightTranslationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn))
      );

      return this;
   }

   abstract reparse(keepRef?: boolean): this;

   protected createOrKeep<T, U>(concrete: { new (data: T | U): U }, obj: U, keep?: boolean): U {
      return keep && obj instanceof concrete ? obj : new concrete(obj);
   }

   protected checkClass<T, U>(concrete: { new (data: T): U }, obj: U): boolean {
      return obj instanceof concrete;
   }

   getEventContainer(): EventContainer[] {
      const ec: EventContainer[] = [];
      this.basicEvents.forEach((be) => ec.push({ type: 'basicEvent', data: be }));
      this.colorBoostEvents.forEach((b) => ec.push({ type: 'boost', data: b }));
      return ec.sort((a, b) => a.data.time - b.data.time);
   }

   abstract addBasicEvents(...data: PartialWrapper<IWrapEventAttribute>[]): void;
   abstract addColorBoostEvents(...data: PartialWrapper<IWrapColorBoostEventAttribute>[]): void;
   abstract addLightColorEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightColorEventBoxGroupAttribute>[]
   ): void;
   abstract addLightRotationEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightRotationEventBoxGroupAttribute>[]
   ): void;
   abstract addLightTranslationEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): void;
   abstract addFxEventBoxGroups(...data: DeepPartialWrapper<IWrapFxEventBoxGroupAttribute>[]): void;
}

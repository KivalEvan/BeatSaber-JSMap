import { IWrapFxEventsCollection } from '../../types/beatmap/wrapper/fxEventsCollection.ts';
import { DeepPartial } from '../../types/utils.ts';
import { WrapFxEventsCollection } from '../wrapper/fxEventsCollection.ts';

/** Dummy FX events collection beatmap v1 class object. */
export class FxEventsCollection extends WrapFxEventsCollection<
   Record<string, unknown>,
   Record<string, unknown>,
   Record<string, unknown>
> {
   static default: Required<Record<string, unknown>> = {
      _fl: [],
      _il: [],
   };

   constructor();
   constructor(data: DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>>);
   constructor(data: DeepPartial<Record<string, unknown>>);
   constructor(
      data:
         & DeepPartial<Record<string, unknown>>
         & DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>>,
   );
   constructor(
      _:
         & DeepPartial<Record<string, unknown>>
         & DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>> = {},
   ) {
      super();
   }

   static create(): FxEventsCollection;
   static create(
      data: DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>>,
   ): FxEventsCollection;
   static create(data: DeepPartial<Record<string, unknown>>): FxEventsCollection;
   static create(
      data:
         & DeepPartial<Record<string, unknown>>
         & DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>>,
   ): FxEventsCollection;
   static create(
      data:
         & DeepPartial<Record<string, unknown>>
         & DeepPartial<IWrapFxEventsCollection<Record<string, unknown>>> = {},
   ): FxEventsCollection {
      return new this(data);
   }

   toJSON(): Required<Record<string, unknown>> {
      return {
         _fl: [],
         _il: [],
      };
   }

   get floatList(): never[] {
      return this._floatList as never[];
   }
   set floatList(value: never[]) {
      this._floatList = value;
   }
   get intList(): never[] {
      return this._intList as never[];
   }
   set intList(value: never[]) {
      this._intList = value;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}

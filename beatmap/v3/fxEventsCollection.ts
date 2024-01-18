import { IFxEventsCollection } from '../../types/beatmap/v3/fxEventsCollection.ts';
import { IWrapFxEventsCollection } from '../../types/beatmap/wrapper/fxEventsCollection.ts';
import { DeepPartial } from '../../types/utils.ts';
import { WrapFxEventsCollection } from '../wrapper/fxEventsCollection.ts';
import { IFxEventFloat } from '../../types/beatmap/v3/fxEventFloat.ts';
import { IFxEventInt } from '../../types/beatmap/v3/fxEventInt.ts';
import { FxEventFloat } from './fxEventFloat.ts';
import { FxEventInt } from './fxEventInt.ts';

/** FX events collection beatmap v3 class object. */
export class FxEventsCollection extends WrapFxEventsCollection<
   IFxEventsCollection,
   IFxEventFloat,
   IFxEventInt
> {
   static default: Required<IFxEventsCollection> = {
      _fl: [],
      _il: [],
   };

   constructor();
   constructor(data: DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>>);
   constructor(data: DeepPartial<IFxEventsCollection>);
   constructor(
      data:
         & DeepPartial<IFxEventsCollection>
         & DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>>,
   );
   constructor(
      data:
         & DeepPartial<IFxEventsCollection>
         & DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>> = {},
   ) {
      super();

      this.floatList = (data.floatList ?? data._fl ?? FxEventsCollection.default._fl)
         .map((d) => {
            if (d) return new FxEventFloat(d);
         })
         .filter((d) => d) as FxEventFloat[];
      this.intList = (data.intList ?? data._il ?? FxEventsCollection.default._il)
         .map((d) => {
            if (d) return new FxEventInt(d);
         })
         .filter((d) => d) as FxEventInt[];
   }

   static create(): FxEventsCollection;
   static create(
      data: DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>>,
   ): FxEventsCollection;
   static create(data: DeepPartial<IFxEventsCollection>): FxEventsCollection;
   static create(
      data:
         & DeepPartial<IFxEventsCollection>
         & DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>>,
   ): FxEventsCollection;
   static create(
      data:
         & DeepPartial<IFxEventsCollection>
         & DeepPartial<IWrapFxEventsCollection<IFxEventsCollection>> = {},
   ): FxEventsCollection {
      return new this(data);
   }

   toJSON(): Required<IFxEventsCollection> {
      return {
         _fl: this.floatList.map((d) => d.toJSON()),
         _il: this.intList.map((d) => d.toJSON()),
      };
   }

   get floatList(): FxEventFloat[] {
      return this._floatList as FxEventFloat[];
   }
   set floatList(value: FxEventFloat[]) {
      this._floatList = value;
   }
   get intList(): FxEventInt[] {
      return this._intList as FxEventInt[];
   }
   set intList(value: FxEventInt[]) {
      this._intList = value;
   }

   isValid(): boolean {
      throw new Error('Method not implemented.');
   }
}

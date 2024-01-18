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
      let temp;

      temp = data.floatList ?? data._fl ?? FxEventsCollection.default._fl;
      this.floatList = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.floatList[i] = new FxEventFloat(temp[i]!);
      }

      temp = data.intList ?? data._il ?? FxEventsCollection.default._il;
      this.intList = new Array(temp.length);
      for (let i = 0; i < temp.length; i++) {
         this.intList[i] = new FxEventInt(temp[i]!);
      }
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
      const json: Required<IFxEventsCollection> = {
         _fl: new Array(this._floatList.length),
         _il: new Array(this._intList.length),
      };
      for (let i = 0; i < this._floatList.length; i++) {
         json._fl[i] = this._floatList[i].toJSON();
      }
      for (let i = 0; i < this._intList.length; i++) {
         json._il[i] = this._intList[i].toJSON();
      }

      return json;
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

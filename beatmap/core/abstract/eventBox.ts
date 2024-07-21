import type { IWrapBaseObject } from '../../../types/beatmap/wrapper/baseObject.ts';
import type { IWrapBasicEventBox } from '../../../types/beatmap/wrapper/eventBox.ts';
import type { IWrapIndexFilter } from '../../../types/beatmap/wrapper/indexFilter.ts';
import { BaseItem } from './baseItem.ts';

/** Base event box beatmap class object. */
export abstract class EventBox extends BaseItem implements IWrapBasicEventBox {
   filter!: IWrapIndexFilter;
   beatDistribution: IWrapBasicEventBox['beatDistribution'] = 0;
   beatDistributionType: IWrapBasicEventBox['beatDistributionType'] = 1;
   easing: IWrapBasicEventBox['easing'] = 0;
   affectFirst: IWrapBasicEventBox['affectFirst'] = 0;
   abstract events: IWrapBaseObject[];

   setFilter(value: IWrapIndexFilter): this {
      this.filter = value;
      return this;
   }
   setBeatDistribution(value: this['beatDistribution']): this {
      this.beatDistribution = value;
      return this;
   }
   setBeatDistributionType(value: this['beatDistributionType']): this {
      this.beatDistributionType = value;
      return this;
   }
   setEasing(value: this['easing']): this {
      this.easing = value;
      return this;
   }
   setAffectFirst(value: this['affectFirst']): this {
      this.affectFirst = value;
      return this;
   }
   abstract setEvents(value: IWrapBaseObject[]): this;

   isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.beatDistributionType === 1 || this.beatDistributionType === 2) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         this.events.every((e) => typeof e === 'number' || e.isValid()) &&
         this.filter.isValid();
   }
}

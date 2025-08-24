import type { IWrapEventBox } from '../../schema/wrapper/types/eventBox.ts';
import type { IndexFilter } from '../indexFilter.ts';
import { BaseItem } from './baseItem.ts';
import type { BaseObject } from './baseObject.ts';

/**
 * Base event box beatmap object.
 *
 * @abstract
 */
export abstract class EventBox extends BaseItem implements IWrapEventBox {
   filter!: IndexFilter;
   beatDistribution: IWrapEventBox['beatDistribution'] = 0;
   beatDistributionType: IWrapEventBox['beatDistributionType'] = 1;
   easing: IWrapEventBox['easing'] = 0;
   affectFirst: IWrapEventBox['affectFirst'] = 0;
   abstract events: BaseObject[];

   setFilter(value: IndexFilter): this {
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
   abstract setEvents(value: BaseObject[]): this;

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.beatDistributionType === 1 || this.beatDistributionType === 2) &&
         this.easing >= -1 &&
         this.easing <= 103 &&
         this.events.every((e) => typeof e === 'number' || e.isValid()) &&
         this.filter.isValid();
   }
}

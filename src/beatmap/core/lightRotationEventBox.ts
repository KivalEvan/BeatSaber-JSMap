import type {
   IWrapLightRotationEventBox,
} from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBox } from './abstract/eventBox.ts';
import { createIndexFilter, IndexFilter } from './indexFilter.ts';
import { createLightRotationEvent, LightRotationEvent } from './lightRotationEvent.ts';

export function createLightRotationEventBox(
   data: DeepPartial<IWrapLightRotationEventBox> = {},
): IWrapLightRotationEventBox {
   return {
      filter: createIndexFilter(data.filter),
      axis: data.axis ?? 0,
      flip: data.flip ?? 0,
      beatDistribution: data.beatDistribution ?? 0,
      beatDistributionType: data.beatDistributionType ?? 1,
      rotationDistribution: data.rotationDistribution ?? 0,
      rotationDistributionType: data.rotationDistributionType ?? 1,
      affectFirst: data.affectFirst ?? 0,
      easing: data.easing ?? 0,
      events: data.events?.map((o) => createLightRotationEvent(o)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap light rotation event box.
 */
export class LightRotationEventBox extends EventBox implements IWrapLightRotationEventBox {
   static defaultValue: IWrapLightRotationEventBox = createLightRotationEventBox();

   static createOne(
      data: Partial<IWrapLightRotationEventBox> = {},
   ): LightRotationEventBox {
      return new this(data);
   }
   static create(...data: Partial<IWrapLightRotationEventBox>[]): LightRotationEventBox[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapLightRotationEventBox, 'customData'> = {}) {
      super();
      this.filter = new IndexFilter(data.filter ?? LightRotationEventBox.defaultValue.filter);
      this.axis = data.axis ?? LightRotationEventBox.defaultValue.axis;
      this.flip = data.flip ?? LightRotationEventBox.defaultValue.flip;
      this.beatDistribution = data.beatDistribution ??
         LightRotationEventBox.defaultValue.beatDistribution;
      this.beatDistributionType = data.beatDistributionType ??
         LightRotationEventBox.defaultValue.beatDistributionType;
      this.rotationDistribution = data.rotationDistribution ??
         LightRotationEventBox.defaultValue.rotationDistribution;
      this.rotationDistributionType = data.rotationDistributionType ??
         LightRotationEventBox.defaultValue.rotationDistributionType;
      this.affectFirst = data.affectFirst ?? LightRotationEventBox.defaultValue.affectFirst;
      this.easing = data.easing ?? LightRotationEventBox.defaultValue.easing;
      this.events = (data.events ?? LightRotationEventBox.defaultValue.events).map(
         (obj) => new LightRotationEvent(obj),
      );
      this.customData = deepCopy(data.customData ?? LightRotationEventBox.defaultValue.customData);
   }

   override reconcile(): this {
      this.events = reconcileClassObject(this.events, LightRotationEvent);
      return this;
   }

   rotationDistribution: IWrapLightRotationEventBox['rotationDistribution'];
   rotationDistributionType: IWrapLightRotationEventBox['rotationDistributionType'];
   axis: IWrapLightRotationEventBox['axis'];
   flip: IWrapLightRotationEventBox['flip'];
   events: LightRotationEvent[];

   setRotationDistribution(value: this['rotationDistribution']): this {
      this.rotationDistribution = value;
      return this;
   }
   setRotationDistributionType(value: this['rotationDistributionType']): this {
      this.rotationDistributionType = value;
      return this;
   }
   setAxis(value: this['axis']): this {
      this.axis = value;
      return this;
   }
   setFlip(value: this['flip']): this {
      this.flip = value;
      return this;
   }
   setEvents(value: this['events']): this {
      this.events = value;
      return this;
   }

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override ? super.isValid(fn, override) : super.isValid(fn, override) &&
         (this.rotationDistributionType === 1 || this.rotationDistributionType === 2) &&
         (this.axis === 0 || this.axis === 1 || this.axis === 2) &&
         (this.flip === 0 || this.flip === 1) &&
         (this.affectFirst === 0 || this.affectFirst === 1);
   }
}

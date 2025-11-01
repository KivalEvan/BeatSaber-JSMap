import type { IWrapFxEventBoxGroup } from '../schema/wrapper/types/fxEventBoxGroup.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { FxEventBox } from './fxEventBox.ts';
import { createFxEventBoxGroup } from '../schema/wrapper/fxEventBoxGroup.ts';

/**
 * Core beatmap FX event box group.
 */
export class FxEventBoxGroup extends EventBoxGroup implements IWrapFxEventBoxGroup {
   static defaultValue: IWrapFxEventBoxGroup = /* @__PURE__ */ createFxEventBoxGroup();

   static createOne(
      data: DeepPartial<IWrapFxEventBoxGroup> = {},
   ): FxEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapFxEventBoxGroup>[]
   ): FxEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapFxEventBoxGroup> = {}) {
      super();
      this.time = data.time ?? FxEventBoxGroup.defaultValue.time;
      this.id = data.id ?? FxEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? FxEventBoxGroup.defaultValue.boxes).map((e) => new FxEventBox(e));
      this.customData = deepCopy(data.customData ?? FxEventBoxGroup.defaultValue.customData);
   }

   override reconcile(): this {
      this.boxes = reconcileClassObject(this.boxes, FxEventBox);
      for (let j = 0; j < this.boxes.length; j++) {
         this.boxes[j].reconcile();
      }
      return this;
   }

   boxes: FxEventBox[];
}

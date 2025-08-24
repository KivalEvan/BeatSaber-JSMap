import type { IWrapLightColorEventBoxGroup } from '../schema/wrapper/types/lightColorEventBoxGroup.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';
import { createLightColorEventBoxGroup } from '../schema/wrapper/lightColorEventBoxGroup.ts';

/**
 * Core beatmap light color event box group.
 */
export class LightColorEventBoxGroup extends EventBoxGroup implements IWrapLightColorEventBoxGroup {
   static defaultValue: IWrapLightColorEventBoxGroup = createLightColorEventBoxGroup();

   static createOne(
      data: Partial<IWrapLightColorEventBoxGroup> = {},
   ): LightColorEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapLightColorEventBoxGroup>[]
   ): LightColorEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartial<IWrapLightColorEventBoxGroup> = {}) {
      super();
      this.time = data.time ?? LightColorEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightColorEventBoxGroup.defaultValue.id;
      this.boxes = (
         data.boxes ?? LightColorEventBoxGroup.defaultValue.boxes
      ).map((e) => new LightColorEventBox(e));
      this.customData = deepCopy(
         data.customData ?? LightColorEventBoxGroup.defaultValue.customData,
      );
   }

   override reconcile(): this {
      this.boxes = reconcileClassObject(this.boxes, LightColorEventBox);
      for (let j = 0; j < this.boxes.length; j++) {
         this.boxes[j].reconcile();
      }
      return this;
   }

   boxes: LightColorEventBox[];
}

import type { IWrapLightRotationEventBoxGroup } from '../schema/wrapper/types/lightRotationEventBoxGroup.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { createLightRotationEventBoxGroup } from '../schema/wrapper/lightRotationEventBoxGroup.ts';

/**
 * Core beatmap light rotation event box group.
 */
export class LightRotationEventBoxGroup extends EventBoxGroup
   implements IWrapLightRotationEventBoxGroup {
   static defaultValue: IWrapLightRotationEventBoxGroup = createLightRotationEventBoxGroup();

   static createOne(
      data: DeepPartial<IWrapLightRotationEventBoxGroup> = {},
   ): LightRotationEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartial<IWrapLightRotationEventBoxGroup>[]
   ): LightRotationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartial<IWrapLightRotationEventBoxGroup> = {},
   ) {
      super();
      this.time = data.time ?? LightRotationEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightRotationEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? LightRotationEventBoxGroup.defaultValue.boxes).map(
         (e) => new LightRotationEventBox(e),
      );
      this.customData = deepCopy(
         data.customData ?? LightRotationEventBoxGroup.defaultValue.customData,
      );
   }

   override reconcile(): this {
      this.boxes = reconcileClassObject(this.boxes, LightRotationEventBox);
      for (let j = 0; j < this.boxes.length; j++) {
         this.boxes[j].reconcile();
      }
      return this;
   }

   boxes: LightRotationEventBox[];
}

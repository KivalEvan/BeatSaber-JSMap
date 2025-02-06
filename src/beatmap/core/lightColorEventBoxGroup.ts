import type {
   IWrapLightColorEventBoxGroup,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { reconcileClassObject } from '../helpers/core/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { createLightColorEventBox, LightColorEventBox } from './lightColorEventBox.ts';

export function createLightColorEventBoxGroup(
   data: DeepPartial<IWrapLightColorEventBoxGroup> = {},
): IWrapLightColorEventBoxGroup {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightColorEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

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
      ...data: DeepPartialIgnore<IWrapLightColorEventBoxGroup, 'customData'>[]
   ): LightColorEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapLightColorEventBoxGroup, 'customData'> = {}) {
      super();
      this.time = data.time ?? LightColorEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightColorEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? LightColorEventBoxGroup.defaultValue.boxes).map(
         (e) => new LightColorEventBox(e),
      );
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

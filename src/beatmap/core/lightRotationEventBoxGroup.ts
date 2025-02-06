import type { IWrapLightRotationEventBox } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { createLightRotationEventBox, LightRotationEventBox } from './lightRotationEventBox.ts';

export function createLightRotationEventBoxGroup(
   data: DeepPartial<IWrapLightRotationEventBoxGroupAttribute> = {},
): IWrapLightRotationEventBoxGroupAttribute {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightRotationEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap light rotation event box group.
 */
export class LightRotationEventBoxGroup extends EventBoxGroup
   implements IWrapLightRotationEventBoxGroup {
   static defaultValue: IWrapLightRotationEventBoxGroupAttribute =
      createLightRotationEventBoxGroup();

   static createOne(
      data: Partial<IWrapLightRotationEventBoxGroupAttribute> = {},
   ): LightRotationEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapLightRotationEventBoxGroupAttribute, 'customData'>[]
   ): LightRotationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartialIgnore<IWrapLightRotationEventBoxGroupAttribute, 'customData'> = {},
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

   boxes: IWrapLightRotationEventBox[];
}

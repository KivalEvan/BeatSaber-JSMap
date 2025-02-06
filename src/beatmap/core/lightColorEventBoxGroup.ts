import type { IWrapLightColorEventBox } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import type {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { createLightColorEventBox, LightColorEventBox } from './lightColorEventBox.ts';

export function createLightColorEventBoxGroup(
   data: DeepPartial<IWrapLightColorEventBoxGroupAttribute> = {},
): IWrapLightColorEventBoxGroupAttribute {
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
   static defaultValue: IWrapLightColorEventBoxGroupAttribute = createLightColorEventBoxGroup();

   static createOne(
      data: Partial<IWrapLightColorEventBoxGroupAttribute> = {},
   ): LightColorEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapLightColorEventBoxGroupAttribute, 'customData'>[]
   ): LightColorEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapLightColorEventBoxGroupAttribute, 'customData'> = {}) {
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

   boxes: IWrapLightColorEventBox[];
}

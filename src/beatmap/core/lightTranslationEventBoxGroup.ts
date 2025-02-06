import type { IWrapLightTranslationEventBox } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import type {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import {
   createLightTranslationEventBox,
   LightTranslationEventBox,
} from './lightTranslationEventBox.ts';

export function createLightTranslationEventBoxGroup(
   data: DeepPartial<IWrapLightTranslationEventBoxGroupAttribute> = {},
): IWrapLightTranslationEventBoxGroupAttribute {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map((e) => createLightTranslationEventBox(e)) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap light translation event box group.
 */
export class LightTranslationEventBoxGroup extends EventBoxGroup
   implements IWrapLightTranslationEventBoxGroup {
   static defaultValue: IWrapLightTranslationEventBoxGroupAttribute =
      createLightTranslationEventBoxGroup();

   static createOne(
      data: Partial<IWrapLightTranslationEventBoxGroupAttribute> = {},
   ): LightTranslationEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapLightTranslationEventBoxGroupAttribute, 'customData'>[]
   ): LightTranslationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartialIgnore<IWrapLightTranslationEventBoxGroupAttribute, 'customData'> = {},
   ) {
      super();
      this.time = data.time ?? LightTranslationEventBoxGroup.defaultValue.time;
      this.id = data.id ?? LightTranslationEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? LightTranslationEventBoxGroup.defaultValue.boxes).map(
         (e) => new LightTranslationEventBox(e),
      );
      this.customData = deepCopy(
         data.customData ?? LightTranslationEventBoxGroup.defaultValue.customData,
      );
   }

   boxes: IWrapLightTranslationEventBox[];
}

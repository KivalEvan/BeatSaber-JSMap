import type {
   IWrapLightTranslationEventBoxGroup,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import {
   createLightTranslationEventBox,
   LightTranslationEventBox,
} from './lightTranslationEventBox.ts';

export function createLightTranslationEventBoxGroup(
   data: DeepPartial<IWrapLightTranslationEventBoxGroup> = {},
): IWrapLightTranslationEventBoxGroup {
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
   static defaultValue: IWrapLightTranslationEventBoxGroup = createLightTranslationEventBoxGroup();

   static createOne(
      data: Partial<IWrapLightTranslationEventBoxGroup> = {},
   ): LightTranslationEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapLightTranslationEventBoxGroup, 'customData'>[]
   ): LightTranslationEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(
      data: DeepPartialIgnore<IWrapLightTranslationEventBoxGroup, 'customData'> = {},
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

   boxes: LightTranslationEventBox[];
}

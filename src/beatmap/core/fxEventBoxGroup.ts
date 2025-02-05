import type { IWrapFxEventBox } from '../../types/beatmap/wrapper/fxEventBox.ts';
import type {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { DeepPartial, DeepPartialIgnore } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { EventBoxGroup } from './abstract/eventBoxGroup.ts';
import { createFxEventBox, FxEventBox } from './fxEventBox.ts';

export function createFxEventBoxGroup(
   data: DeepPartial<IWrapFxEventBoxGroupAttribute> = {},
): IWrapFxEventBoxGroupAttribute {
   return {
      time: data.time ?? 0,
      id: data.id ?? 0,
      boxes: data.boxes?.map(createFxEventBox) ?? [],
      customData: deepCopy({ ...data.customData }),
   };
}

/**
 * Core beatmap FX event box group.
 */
export class FxEventBoxGroup extends EventBoxGroup implements IWrapFxEventBoxGroup {
   static defaultValue: IWrapFxEventBoxGroupAttribute = createFxEventBoxGroup();

   static createOne(
      data: Partial<IWrapFxEventBoxGroupAttribute> = {},
   ): FxEventBoxGroup {
      return new this(data);
   }
   static create(
      ...data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'>[]
   ): FxEventBoxGroup[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: DeepPartialIgnore<IWrapFxEventBoxGroupAttribute, 'customData'> = {}) {
      super();
      this.time = data.time ?? FxEventBoxGroup.defaultValue.time;
      this.id = data.id ?? FxEventBoxGroup.defaultValue.id;
      this.boxes = (data.boxes ?? FxEventBoxGroup.defaultValue.boxes).map((e) => new FxEventBox(e));
      this.customData = deepCopy(data.customData ?? FxEventBoxGroup.defaultValue.customData);
   }

   boxes: IWrapFxEventBox[];
}

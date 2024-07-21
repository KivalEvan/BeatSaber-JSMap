import type { IWrapBasicEventBox } from '../../../types/beatmap/wrapper/eventBox.ts';
import type { IWrapBasicEventBoxGroup } from '../../../types/beatmap/wrapper/eventBoxGroup.ts';
import { BaseObject } from './baseObject.ts';

/** Base event box group beatmap class object. */
export abstract class EventBoxGroup extends BaseObject implements IWrapBasicEventBoxGroup {
   id: IWrapBasicEventBoxGroup['id'] = 0;
   abstract boxes: IWrapBasicEventBox[];

   isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && this.id >= 0 && this.boxes.every((e) => e.isValid());
   }
}

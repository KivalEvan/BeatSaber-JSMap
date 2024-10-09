import type { IWrapEventBox } from '../../../types/beatmap/wrapper/eventBox.ts';
import type { IWrapEventBoxGroup } from '../../../types/beatmap/wrapper/eventBoxGroup.ts';
import { BaseObject } from './baseObject.ts';

/**
 * Base event box group beatmap object.
 *
 * @abstract
 */
export abstract class EventBoxGroup extends BaseObject implements IWrapEventBoxGroup {
   id: IWrapEventBoxGroup['id'] = 0;
   abstract boxes: IWrapEventBox[];

   override isValid(fn?: (object: this) => boolean, override?: boolean): boolean {
      return override
         ? super.isValid(fn, override)
         : super.isValid(fn, override) && this.id >= 0 && this.boxes.every((e) => e.isValid());
   }
}

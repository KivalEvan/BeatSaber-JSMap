import type { IWrapBaseObject } from '../../../types/beatmap/wrapper/baseObject.ts';
import { BaseItem } from './baseItem.ts';

/**
 * Basic building block of beatmap object.
 *
 * Object may exist in a beatmap as a physical object or as an event.
 *
 * @abstract
 */
export abstract class BaseObject extends BaseItem implements IWrapBaseObject {
   time: IWrapBaseObject['time'] = 0;

   setTime(value: this['time']): this {
      this.time = value;
      return this;
   }
}

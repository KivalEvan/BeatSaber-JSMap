import { IObject } from './object.ts';
import { IItem } from './item.ts';

export interface IEventBox extends IItem {
   /** Index `<int>` of index filter array. */
   f?: number;
   /** Index `<int>` of typed event box array. */
   i?: number;
   /** Index `<int>` of typed event array. */
   l?: IObject[];
}

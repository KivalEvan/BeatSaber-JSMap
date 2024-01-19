import { IGrid } from './grid.ts';
import { ICustomDataBase } from '../shared/custom/customData.ts';

export interface IBombNote extends IGrid {
   customData?: ICustomDataBase;
}

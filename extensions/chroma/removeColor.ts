import { IChromaObject } from './types/colors.ts';

export function removeColor(objects: IChromaObject[]) {
   objects.forEach((obj) => {
      const cd = obj.customData;
      if (cd.color) {
         delete cd.color;
      }
   });
}

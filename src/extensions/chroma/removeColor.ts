import type { IChromaObject } from './types/colors.ts';

export function removeColor<T extends IChromaObject>(objects: T[]): void {
   objects.forEach((obj) => {
      const cd = obj.customData;
      if (cd.color) {
         delete cd.color;
      }
   });
}

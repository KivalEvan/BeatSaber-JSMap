import type { IChromaObject } from './types/colors.ts';

export function removeColor<
   T extends Pick<IChromaObject, 'customData'>,
>(objects: T[]): void {
   objects.forEach((obj) => {
      const cd = obj.customData;
      if (cd.color) {
         delete cd.color;
      }
   });
}

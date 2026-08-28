import type { ISwingAnalysisBaseNote, ISwingContainer } from './types/swing.ts';

/** Get minimum value of slider speed from swings. */
export function getMinSliderSpeed<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   let maxSpeed = 0;
   const length = swings.length;
   for (let i = 0; i < length; i++) {
      maxSpeed = Math.max(
         maxSpeed,
         i in swings ? swings[i].minSpeed : Number.NaN,
      );
   }
   return maxSpeed;
}

/** Get maximum value of slider speed from swings. */
export function getMaxSliderSpeed<
   T extends ISwingAnalysisBaseNote,
>(swings: ISwingContainer<T>[]): number {
   let minSpeed = Number.POSITIVE_INFINITY;
   let hasNonZeroSpeed = false;
   const length = swings.length;
   for (let i = 0; i < length; i++) {
      if (!(i in swings)) continue;
      const speed = swings[i].maxSpeed;
      if (speed !== 0) {
         minSpeed = Math.min(minSpeed, speed);
         hasNonZeroSpeed = true;
      }
   }
   return hasNonZeroSpeed ? minSpeed : 0;
}

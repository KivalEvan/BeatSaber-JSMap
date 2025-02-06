import type { IWrapBaseSlider } from '../../../types/beatmap/wrapper/baseSlider.ts';

/** Checks if the slider is inverted. */
export function isInverseSlider<
   T extends Pick<IWrapBaseSlider, 'time' | 'tailTime'>,
>(object: T): boolean {
   return object.time > object.tailTime;
}

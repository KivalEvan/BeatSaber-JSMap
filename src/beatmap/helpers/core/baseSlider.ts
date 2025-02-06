import type { IWrapBaseSliderAttribute } from '../../../types/beatmap/wrapper/baseSlider.ts';

/** Checks if the slider is inverted. */
export function isInverseSlider<
   T extends Pick<IWrapBaseSliderAttribute, 'time' | 'tailTime'>,
>(object: T): boolean {
   return object.time > object.tailTime;
}

import type { IWrapBaseSlider } from '../../schema/wrapper/types/baseSlider.ts';

/** Checks if the slider is inverted. */
export function isInverseSlider<
   T extends Pick<IWrapBaseSlider, 'time' | 'tailTime'>,
>(object: T): boolean {
   return object.time > object.tailTime;
}

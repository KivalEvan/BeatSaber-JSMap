import { WrapBaseSlider } from './baseSlider.ts';
import { IWrapBurstSlider } from '../../types/beatmap/wrapper/burstSlider.ts';

/** Burst slider beatmap class object.
 *
 * Also known as chain.
 */
export abstract class WrapBurstSlider<T extends Record<keyof T, unknown>> extends WrapBaseSlider<T>
    implements IWrapBurstSlider {
    abstract get sliceCount(): IWrapBurstSlider['sliceCount'];
    abstract set sliceCount(value: IWrapBurstSlider['sliceCount']);
    abstract get squish(): IWrapBurstSlider['squish'];
    abstract set squish(value: IWrapBurstSlider['squish']);

    setSliceCount(value: IWrapBurstSlider['sliceCount']) {
        this.sliceCount = value;
        return this;
    }
    setSquish(value: IWrapBurstSlider['squish']) {
        this.squish = value;
        return this;
    }
}

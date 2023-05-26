import { WrapBaseSlider } from './baseSlider.ts';
import { IWrapChain } from '../../types/beatmap/wrapper/chain.ts';

/** Chain beatmap class object.
 *
 * Also known as chain.
 */
export abstract class WrapChain<T extends Record<keyof T, unknown>> extends WrapBaseSlider<T>
    implements IWrapChain<T> {
    protected _sliceCount!: IWrapChain['sliceCount'];
    protected _squish!: IWrapChain['squish'];

    abstract get sliceCount(): IWrapChain['sliceCount'];
    abstract set sliceCount(value: IWrapChain['sliceCount']);
    abstract get squish(): IWrapChain['squish'];
    abstract set squish(value: IWrapChain['squish']);

    setSliceCount(value: IWrapChain['sliceCount']) {
        this.sliceCount = value;
        return this;
    }
    setSquish(value: IWrapChain['squish']) {
        this.squish = value;
        return this;
    }

    isMappingExtensions() {
        return (
            this.posY > 2 ||
            this.posY < 0 ||
            this.posX <= -1000 ||
            this.posX >= 1000 ||
            (this.direction >= 1000 && this.direction <= 1360)
        );
    }

    isValid() {
        return (
            !(
                this.isMappingExtensions() ||
                this.isInverse() ||
                this.posX < 0 ||
                this.posX > 3 ||
                this.tailPosX < 0 ||
                this.tailPosX > 3
            ) && !(this.posX === this.tailPosX && this.posY === this.tailPosY)
        );
    }
}

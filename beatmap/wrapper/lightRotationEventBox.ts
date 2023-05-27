import { IWrapLightRotationBase } from '../../types/beatmap/wrapper/lightRotationBase.ts';
import { IWrapLightRotationEventBox } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import { WrapEventBox } from './eventBox.ts';

/** Light rotation event box beatmap class object. */
export abstract class WrapLightRotationEventBox<
    TBox extends { [P in keyof TBox]: TBox[P] },
    TBase extends { [P in keyof TBase]: TBase[P] },
    TFilter extends { [P in keyof TFilter]: TFilter[P] },
> extends WrapEventBox<TBox, TBase, TFilter>
    implements IWrapLightRotationEventBox<TBox, TBase, TFilter> {
    protected _rotationDistribution!: IWrapLightRotationEventBox['rotationDistribution'];
    protected _rotationDistributionType!: IWrapLightRotationEventBox['rotationDistributionType'];
    protected _axis!: IWrapLightRotationEventBox['axis'];
    protected _flip!: IWrapLightRotationEventBox['flip'];
    protected _affectFirst!: IWrapLightRotationEventBox['affectFirst'];
    declare protected _events: IWrapLightRotationBase<TBase>[];

    abstract get rotationDistribution(): IWrapLightRotationEventBox['rotationDistribution'];
    abstract set rotationDistribution(value: IWrapLightRotationEventBox['rotationDistribution']);
    abstract get rotationDistributionType(): IWrapLightRotationEventBox['rotationDistributionType'];
    abstract set rotationDistributionType(
        value: IWrapLightRotationEventBox['rotationDistributionType'],
    );
    abstract get axis(): IWrapLightRotationEventBox['axis'];
    abstract set axis(value: IWrapLightRotationEventBox['axis']);
    abstract get flip(): IWrapLightRotationEventBox['flip'];
    abstract set flip(value: IWrapLightRotationEventBox['flip']);
    abstract get affectFirst(): IWrapLightRotationEventBox['affectFirst'];
    abstract set affectFirst(value: IWrapLightRotationEventBox['affectFirst']);
    abstract get events(): IWrapLightRotationBase<TBase>[];
    abstract set events(value: IWrapLightRotationBase<TBase>[]);

    setRotationDistribution(value: IWrapLightRotationEventBox['rotationDistribution']) {
        this.rotationDistribution = value;
        return this;
    }
    setRotationDistributionType(value: IWrapLightRotationEventBox['rotationDistributionType']) {
        this.rotationDistributionType = value;
        return this;
    }
    setAxis(value: IWrapLightRotationEventBox['axis']) {
        this.axis = value;
        return this;
    }
    setFlip(value: IWrapLightRotationEventBox['flip']) {
        this.flip = value;
        return this;
    }
    setAffectFirst(value: IWrapLightRotationEventBox['affectFirst']) {
        this.affectFirst = value;
        return this;
    }

    isValid(): boolean {
        return (
            super.isValid() &&
            (this.rotationDistributionType === 1 || this.rotationDistributionType === 2) &&
            (this.axis === 0 || this.axis === 1) &&
            (this.flip === 0 || this.flip === 1) &&
            (this.affectFirst === 0 || this.affectFirst === 1)
        );
    }
}

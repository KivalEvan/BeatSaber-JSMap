import { IWrapLightColorBase } from '../../types/beatmap/wrapper/lightColorBase.ts';
import { IWrapLightColorEventBox } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import { WrapEventBox } from './eventBox.ts';

/** Light color event box beatmap class object. */
export abstract class WrapLightColorEventBox<
    TBox extends { [P in keyof TBox]: TBox[P] },
    TBase extends { [P in keyof TBase]: TBase[P] },
    TFilter extends { [P in keyof TFilter]: TFilter[P] },
> extends WrapEventBox<TBox, TBase, TFilter>
    implements IWrapLightColorEventBox<TBox, TBase, TFilter> {
    protected _brightnessDistribution!: IWrapLightColorEventBox['brightnessDistribution'];
    protected _brightnessDistributionType!: IWrapLightColorEventBox['brightnessDistributionType'];
    protected _affectFirst!: IWrapLightColorEventBox['affectFirst'];
    declare protected _events: IWrapLightColorBase<TBase>[];

    abstract get brightnessDistribution(): IWrapLightColorEventBox['brightnessDistribution'];
    abstract set brightnessDistribution(value: IWrapLightColorEventBox['brightnessDistribution']);
    abstract get brightnessDistributionType(): IWrapLightColorEventBox[
        'brightnessDistributionType'
    ];
    abstract set brightnessDistributionType(
        value: IWrapLightColorEventBox['brightnessDistributionType'],
    );
    abstract get affectFirst(): IWrapLightColorEventBox['affectFirst'];
    abstract set affectFirst(value: IWrapLightColorEventBox['affectFirst']);
    abstract get events(): IWrapLightColorBase<TBase>[];
    abstract set events(value: IWrapLightColorBase<TBase>[]);

    setBrightnessDistribution(value: IWrapLightColorEventBox['brightnessDistribution']) {
        this.brightnessDistribution = value;
        return this;
    }
    setBrightnessDistributionType(value: IWrapLightColorEventBox['brightnessDistributionType']) {
        this.brightnessDistributionType = value;
        return this;
    }
    setAffectFirst(value: IWrapLightColorEventBox['affectFirst']) {
        this.affectFirst = value;
        return this;
    }
    abstract setEvents(value: IWrapLightColorBase<TBase>[]): this;

    isValid(): boolean {
        return (
            super.isValid() &&
            (this.brightnessDistributionType === 1 || this.brightnessDistributionType === 2) &&
            (this.affectFirst === 0 || this.affectFirst === 1)
        );
    }
}

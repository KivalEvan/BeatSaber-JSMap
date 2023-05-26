import { IWrapLightTranslationBase } from '../../types/beatmap/wrapper/lightTranslationBase.ts';
import { IWrapLightTranslationEventBox } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import { WrapEventBox } from './eventBox.ts';

/** Light translation event box beatmap class object. */
export abstract class WrapLightTranslationEventBox<
    TBox extends Record<keyof TBox, unknown>,
    TBase extends Record<keyof TBase, unknown>,
    TFilter extends Record<keyof TFilter, unknown>,
> extends WrapEventBox<TBox, TBase, TFilter> implements IWrapLightTranslationEventBox<TBox> {
    protected _translationDistribution!: IWrapLightTranslationEventBox['translationDistribution'];
    protected _translationDistributionType!:
        IWrapLightTranslationEventBox['translationDistributionType'];
    protected _axis!: IWrapLightTranslationEventBox['axis'];
    protected _flip!: IWrapLightTranslationEventBox['flip'];
    protected _affectFirst!: IWrapLightTranslationEventBox['affectFirst'];
    declare protected _events: IWrapLightTranslationBase<TBase>[];

    abstract get translationDistribution(): IWrapLightTranslationEventBox[
        'translationDistribution'
    ];
    abstract set translationDistribution(
        value: IWrapLightTranslationEventBox['translationDistribution'],
    );
    abstract get translationDistributionType(): IWrapLightTranslationEventBox[
        'translationDistributionType'
    ];
    abstract set translationDistributionType(
        value: IWrapLightTranslationEventBox['translationDistributionType'],
    );
    abstract get axis(): IWrapLightTranslationEventBox['axis'];
    abstract set axis(value: IWrapLightTranslationEventBox['axis']);
    abstract get flip(): IWrapLightTranslationEventBox['flip'];
    abstract set flip(value: IWrapLightTranslationEventBox['flip']);
    abstract get affectFirst(): IWrapLightTranslationEventBox['affectFirst'];
    abstract set affectFirst(value: IWrapLightTranslationEventBox['affectFirst']);
    abstract get events(): IWrapLightTranslationBase<TBase>[];
    abstract set events(value: IWrapLightTranslationBase<TBase>[]);

    setTranslationDistribution(value: IWrapLightTranslationEventBox['translationDistribution']) {
        this.translationDistribution = value;
        return this;
    }
    setTranslationDistributionType(
        value: IWrapLightTranslationEventBox['translationDistributionType'],
    ) {
        this.translationDistributionType = value;
        return this;
    }
    setAxis(value: IWrapLightTranslationEventBox['axis']) {
        this.axis = value;
        return this;
    }
    setFlip(value: IWrapLightTranslationEventBox['flip']) {
        this.flip = value;
        return this;
    }
    setAffectFirst(value: IWrapLightTranslationEventBox['affectFirst']) {
        this.affectFirst = value;
        return this;
    }
    abstract setEvents(value: IWrapLightTranslationBase<TBase>[]): this;

    isValid(): boolean {
        return (
            super.isValid() &&
            (this.translationDistributionType === 1 || this.translationDistributionType === 2) &&
            (this.axis === 0 || this.axis === 1) &&
            (this.flip === 0 || this.flip === 1) &&
            (this.affectFirst === 0 || this.affectFirst === 1)
        );
    }
}

import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapLightTranslationBaseAttribute } from '../../types/beatmap/wrapper/lightTranslationBase.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightTranslationBase } from '../wrapper/lightTranslationBase.ts';

/** Light translation base beatmap v3 class object. */
export class LightTranslationBase extends WrapLightTranslationBase<
    Required<ILightTranslationBase>
> {
    static default: ObjectReturnFn<Required<ILightTranslationBase>> = {
        b: 0,
        p: 0,
        e: 0,
        t: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>>);
    constructor(data: Partial<ILightTranslationBase>);
    constructor(
        data:
            & Partial<ILightTranslationBase>
            & Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>>,
    );
    constructor(
        data:
            & Partial<ILightTranslationBase>
            & Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? LightTranslationBase.default.b,
            p: data.previous ?? data.p ?? LightTranslationBase.default.p,
            e: data.easing ?? data.e ?? LightTranslationBase.default.e,
            t: data.translation ?? data.t ?? LightTranslationBase.default.t,
            customData: data.customData ?? LightTranslationBase.default.customData(),
        });
    }

    static create(): LightTranslationBase[];
    static create(
        ...data: Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>>[]
    ): LightTranslationBase[];
    static create(...data: Partial<ILightTranslationBase>[]): LightTranslationBase[];
    static create(
        ...data: (
            & Partial<ILightTranslationBase>
            & Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>>
        )[]
    ): LightTranslationBase[];
    static create(
        ...data: (
            & Partial<ILightTranslationBase>
            & Partial<IWrapLightTranslationBaseAttribute<Required<ILightTranslationBase>>>
        )[]
    ): LightTranslationBase[] {
        const result: LightTranslationBase[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightTranslationBase> {
        return {
            b: this.time,
            p: this.previous,
            e: this.easing,
            t: this.translation,
            customData: deepCopy(this.data.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ILightTranslationBase['b']) {
        this.data.b = value;
    }

    get previous() {
        return this.data.p;
    }
    set previous(value: ILightTranslationBase['p']) {
        this.data.p = value;
    }

    get easing() {
        return this.data.e;
    }
    set easing(value: ILightTranslationBase['e']) {
        this.data.e = value;
    }

    get translation() {
        return this.data.t;
    }
    set translation(value: ILightTranslationBase['t']) {
        this.data.t = value;
    }

    get customData(): NonNullable<ILightTranslationBase['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightTranslationBase['customData']>) {
        this.data.customData = value;
    }
}

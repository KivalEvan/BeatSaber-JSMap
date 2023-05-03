import { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import { IWrapLightColorBaseAttribute } from '../../types/beatmap/wrapper/lightColorBase.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorBase } from '../wrapper/lightColorBase.ts';

/** Light color base beatmap v3 class object. */
export class LightColorBase extends WrapLightColorBase<Required<ILightColorBase>> {
    static default: ObjectReturnFn<Required<ILightColorBase>> = {
        b: 0,
        i: 0,
        c: 0,
        s: 1,
        f: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>);
    constructor(data: Partial<ILightColorBase>);
    constructor(
        data:
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>,
    );
    constructor(
        data:
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? LightColorBase.default.b,
            i: data.transition ?? data.i ?? LightColorBase.default.i,
            c: data.color ?? data.c ?? LightColorBase.default.c,
            s: data.brightness ?? data.s ?? LightColorBase.default.s,
            f: data.frequency ?? data.f ?? LightColorBase.default.f,
            customData: data.customData ?? LightColorBase.default.customData(),
        });
    }

    static create(): LightColorBase[];
    static create(
        ...data: Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>[]
    ): LightColorBase[];
    static create(...data: Partial<ILightColorBase>[]): LightColorBase[];
    static create(
        ...data: (
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>
        )[]
    ): LightColorBase[];
    static create(
        ...data: (
            & Partial<ILightColorBase>
            & Partial<IWrapLightColorBaseAttribute<Required<ILightColorBase>>>
        )[]
    ): LightColorBase[] {
        const result: LightColorBase[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightColorBase> {
        return {
            b: this.time,
            i: this.transition,
            c: this.color,
            s: this.brightness,
            f: this.frequency,
            customData: deepCopy(this.data.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ILightColorBase['b']) {
        this.data.b = value;
    }

    get transition() {
        return this.data.i;
    }
    set transition(value: ILightColorBase['i']) {
        this.data.i = value;
    }

    get color() {
        return this.data.c;
    }
    set color(value: ILightColorBase['c']) {
        this.data.c = value;
    }

    get brightness() {
        return this.data.s;
    }
    set brightness(value: ILightColorBase['s']) {
        this.data.s = value;
    }

    get frequency() {
        return this.data.f;
    }
    set frequency(value: ILightColorBase['f']) {
        this.data.f = value;
    }

    get customData(): NonNullable<ILightColorBase['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightColorBase['customData']>) {
        this.data.customData = value;
    }
}

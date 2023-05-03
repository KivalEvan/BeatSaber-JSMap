import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { IWrapLightRotationBaseAttribute } from '../../types/beatmap/wrapper/lightRotationBase.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationBase } from '../wrapper/lightRotationBase.ts';

/** Light rotation base beatmap v3 class object. */
export class LightRotationBase extends WrapLightRotationBase<Required<ILightRotationBase>> {
    static default: ObjectReturnFn<Required<ILightRotationBase>> = {
        b: 0,
        p: 0,
        e: 0,
        l: 0,
        r: 0,
        o: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>>);
    constructor(data: Partial<ILightRotationBase>);
    constructor(
        data:
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>>,
    );
    constructor(
        data:
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? LightRotationBase.default.b,
            p: data.previous ?? data.p ?? LightRotationBase.default.p,
            e: data.easing ?? data.e ?? LightRotationBase.default.e,
            l: data.loop ?? data.l ?? LightRotationBase.default.l,
            r: data.rotation ?? data.r ?? LightRotationBase.default.r,
            o: data.direction ?? data.o ?? LightRotationBase.default.o,
            customData: data.customData ?? LightRotationBase.default.customData(),
        });
    }

    static create(): LightRotationBase[];
    static create(
        ...data: Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>>[]
    ): LightRotationBase[];
    static create(...data: Partial<ILightRotationBase>[]): LightRotationBase[];
    static create(
        ...data: (
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>>
        )[]
    ): LightRotationBase[];
    static create(
        ...data: (
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<Required<ILightRotationBase>>>
        )[]
    ): LightRotationBase[] {
        const result: LightRotationBase[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightRotationBase> {
        return {
            b: this.time,
            p: this.previous,
            e: this.easing,
            l: this.loop,
            r: this.rotation,
            o: this.direction,
            customData: deepCopy(this.data.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ILightRotationBase['b']) {
        this.data.b = value;
    }

    get previous() {
        return this.data.p;
    }
    set previous(value: ILightRotationBase['p']) {
        this.data.p = value;
    }

    get easing() {
        return this.data.e;
    }
    set easing(value: ILightRotationBase['e']) {
        this.data.e = value;
    }

    get loop() {
        return this.data.l;
    }
    set loop(value: ILightRotationBase['l']) {
        this.data.l = value;
    }

    get rotation() {
        return this.data.r;
    }
    set rotation(value: ILightRotationBase['r']) {
        this.data.r = value;
    }

    get direction() {
        return this.data.o;
    }
    set direction(value: ILightRotationBase['o']) {
        this.data.o = value;
    }

    get customData(): NonNullable<ILightRotationBase['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightRotationBase['customData']>) {
        this.data.customData = value;
    }
}

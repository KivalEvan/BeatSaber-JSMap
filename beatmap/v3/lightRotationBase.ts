import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { IWrapLightRotationBaseAttribute } from '../../types/beatmap/wrapper/lightRotationBase.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightRotationBase } from '../wrapper/lightRotationBase.ts';

/** Light rotation base beatmap v3 class object. */
export class LightRotationBase extends WrapLightRotationBase<ILightRotationBase> {
    static default: ObjectReturnFn<ILightRotationBase> = {
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
    constructor(data: Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>>);
    constructor(data: Partial<ILightRotationBase>);
    constructor(
        data:
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>>,
    );
    constructor(
        data:
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>> = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? LightRotationBase.default.b;
        this._previous = data.previous ?? data.p ?? LightRotationBase.default.p;
        this._easing = data.easing ?? data.e ?? LightRotationBase.default.e;
        this._loop = data.loop ?? data.l ?? LightRotationBase.default.l;
        this._rotation = data.rotation ?? data.r ?? LightRotationBase.default.r;
        this._direction = data.direction ?? data.o ?? LightRotationBase.default.o;
        this._customData = data.customData ?? LightRotationBase.default.customData();
    }

    static create(): LightRotationBase[];
    static create(
        ...data: Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>>[]
    ): LightRotationBase[];
    static create(...data: Partial<ILightRotationBase>[]): LightRotationBase[];
    static create(
        ...data: (
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>>
        )[]
    ): LightRotationBase[];
    static create(
        ...data: (
            & Partial<ILightRotationBase>
            & Partial<IWrapLightRotationBaseAttribute<ILightRotationBase>>
        )[]
    ): LightRotationBase[] {
        const result: LightRotationBase[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): ILightRotationBase {
        return {
            b: this.time,
            p: this.previous,
            e: this.easing,
            l: this.loop,
            r: this.rotation,
            o: this.direction,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: ILightRotationBase['b']) {
        this._time = value;
    }

    get previous() {
        return this._previous;
    }
    set previous(value: ILightRotationBase['p']) {
        this._previous = value;
    }

    get easing() {
        return this._easing;
    }
    set easing(value: ILightRotationBase['e']) {
        this._easing = value;
    }

    get loop() {
        return this._loop;
    }
    set loop(value: ILightRotationBase['l']) {
        this._loop = value;
    }

    get rotation() {
        return this._rotation;
    }
    set rotation(value: ILightRotationBase['r']) {
        this._rotation = value;
    }

    get direction() {
        return this._direction;
    }
    set direction(value: ILightRotationBase['o']) {
        this._direction = value;
    }

    get customData(): NonNullable<ILightRotationBase['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<ILightRotationBase['customData']>) {
        this._customData = value;
    }
}

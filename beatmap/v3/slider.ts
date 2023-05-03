import { ISlider } from '../../types/beatmap/v3/slider.ts';
import { IWrapSliderAttribute } from '../../types/beatmap/wrapper/slider.ts';
import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { isVector3 } from '../../utils/vector.ts';
import { WrapSlider } from '../wrapper/slider.ts';

/** Slider beatmap v3 class object.
 *
 * Also known as arc.
 */
export class Slider extends WrapSlider<Required<ISlider>> {
    static default: ObjectReturnFn<Required<ISlider>> = {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        mu: 1,
        tb: 0,
        tx: 0,
        ty: 0,
        tc: 0,
        tmu: 1,
        m: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapSliderAttribute<Required<ISlider>>>);
    constructor(data: Partial<ISlider>);
    constructor(data: Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>);
    constructor(data: Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>> = {}) {
        super({
            b: data.time ?? data.b ?? Slider.default.b,
            c: data.color ?? data.c ?? Slider.default.c,
            x: data.posX ?? data.x ?? Slider.default.x,
            y: data.posY ?? data.y ?? Slider.default.y,
            d: data.direction ?? data.d ?? Slider.default.d,
            mu: data.lengthMultiplier ?? data.mu ?? Slider.default.mu,
            tb: data.tailTime ?? data.tb ?? Slider.default.tb,
            tx: data.tailPosX ?? data.tx ?? Slider.default.tx,
            ty: data.tailPosY ?? data.ty ?? Slider.default.ty,
            tc: data.tailDirection ?? data.tc ?? Slider.default.tc,
            tmu: data.tailLengthMultiplier ?? data.tmu ?? Slider.default.tmu,
            m: data.midAnchor ?? data.m ?? Slider.default.m,
            customData: data.customData ?? Slider.default.customData(),
        });
    }

    static create(): Slider[];
    static create(...data: Partial<IWrapSliderAttribute<Required<ISlider>>>[]): Slider[];
    static create(...data: Partial<ISlider>[]): Slider[];
    static create(
        ...data: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): Slider[];
    static create(
        ...data: (Partial<ISlider> & Partial<IWrapSliderAttribute<Required<ISlider>>>)[]
    ): Slider[] {
        const result: Slider[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ISlider> {
        return {
            b: this.time,
            c: this.color,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            mu: this.lengthMultiplier,
            tb: this.tailTime,
            tx: this.tailPosX,
            ty: this.tailPosY,
            tc: this.tailDirection,
            tmu: this.tailLengthMultiplier,
            m: this.midAnchor,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ISlider['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: ISlider['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: ISlider['y']) {
        this.data.y = value;
    }

    get color() {
        return this.data.c;
    }
    set color(value: ISlider['c']) {
        this.data.c = value;
    }

    get direction() {
        return this.data.d;
    }
    set direction(value: ISlider['d']) {
        this.data.d = value;
    }

    get lengthMultiplier() {
        return this.data.mu;
    }
    set lengthMultiplier(value: ISlider['mu']) {
        this.data.mu = value;
    }

    get tailTime() {
        return this.data.tb;
    }
    set tailTime(value: ISlider['tb']) {
        this.data.tb = value;
    }

    get tailPosX() {
        return this.data.tx;
    }
    set tailPosX(value: ISlider['tx']) {
        this.data.tx = value;
    }

    get tailPosY() {
        return this.data.ty;
    }
    set tailPosY(value: ISlider['ty']) {
        this.data.ty = value;
    }

    get tailDirection() {
        return this.data.tc;
    }
    set tailDirection(value: ISlider['tc']) {
        this.data.tc = value;
    }

    get tailLengthMultiplier() {
        return this.data.tmu;
    }
    set tailLengthMultiplier(value: ISlider['tmu']) {
        this.data.tmu = value;
    }

    get midAnchor() {
        return this.data.m;
    }
    set midAnchor(value: ISlider['m']) {
        this.data.m = value;
    }

    get customData(): NonNullable<ISlider['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ISlider['customData']>) {
        this.data.customData = value;
    }

    mirror(flipColor = true) {
        if (this.customData.coordinates) {
            this.customData.coordinates[0] = -1 - this.customData.coordinates[0];
        }
        if (this.customData.flip) {
            this.customData.flip[0] = -1 - this.customData.flip[0];
        }
        if (this.customData.animation) {
            if (Array.isArray(this.customData.animation.definitePosition)) {
                if (isVector3(this.customData.animation.definitePosition)) {
                    this.customData.animation.definitePosition[0] = -this.customData.animation
                        .definitePosition[0];
                } else {
                    // deno-lint-ignore no-explicit-any
                    this.customData.animation.definitePosition.forEach((dp: any) => {
                        dp[0] = -dp[0];
                    });
                }
            }
            if (Array.isArray(this.customData.animation.offsetPosition)) {
                if (isVector3(this.customData.animation.offsetPosition)) {
                    this.customData.animation.offsetPosition[0] = -this.customData.animation
                        .offsetPosition[0];
                } else {
                    // deno-lint-ignore no-explicit-any
                    this.customData.animation.offsetPosition.forEach((op: any) => {
                        op[0] = -op[0];
                    });
                }
            }
        }
        return super.mirror(flipColor);
    }

    getPosition(type?: ModType): Vector2 {
        switch (type) {
            case 'vanilla':
                return super.getPosition();
            case 'ne':
                if (this.customData.coordinates) {
                    return [this.customData.coordinates[0], this.customData.coordinates[1]];
                }
            /** falls through */
            case 'me':
            default:
                return [
                    (this.posX <= -1000
                        ? this.posX / 1000
                        : this.posX >= 1000
                        ? this.posX / 1000
                        : this.posX) - 2,
                    this.posY <= -1000
                        ? this.posY / 1000
                        : this.posY >= 1000
                        ? this.posY / 1000
                        : this.posY,
                ];
        }
    }

    getAngle(type?: ModType) {
        switch (type) {
            case 'vanilla':
            case 'ne':
                return super.getAngle();
            case 'me':
            default:
                if (this.direction >= 1000) {
                    return Math.abs(((this.direction % 1000) % 360) - 360);
                }
                return super.getAngle();
        }
    }

    getTailPosition(type?: ModType): Vector2 {
        switch (type) {
            case 'vanilla':
                return super.getTailPosition();
            case 'ne':
                if (this.customData.tailCoordinates) {
                    return [this.customData.tailCoordinates[0], this.customData.tailCoordinates[1]];
                }
            /** falls through */
            case 'me':
            default:
                return [
                    (this.tailPosX <= -1000
                        ? this.tailPosX / 1000
                        : this.tailPosX >= 1000
                        ? this.tailPosX / 1000
                        : this.tailPosX) - 2,
                    this.tailPosY <= -1000
                        ? this.tailPosY / 1000
                        : this.tailPosY >= 1000
                        ? this.tailPosY / 1000
                        : this.tailPosY,
                ];
        }
    }

    getTailAngle(type?: ModType) {
        switch (type) {
            case 'vanilla':
            case 'ne':
                return super.getTailAngle();
            case 'me':
                if (this.tailDirection >= 1000) {
                    return Math.abs(((this.tailDirection % 1000) % 360) - 360);
                }
            /** falls through */
            default:
                return super.getTailAngle();
        }
    }

    isChroma(): boolean {
        return (
            Array.isArray(this.customData.color) ||
            typeof this.customData.spawnEffect === 'boolean' ||
            typeof this.customData.disableDebris === 'boolean'
        );
    }

    isNoodleExtensions(): boolean {
        return (
            Array.isArray(this.customData.animation) ||
            typeof this.customData.disableNoteGravity === 'boolean' ||
            typeof this.customData.disableNoteLook === 'boolean' ||
            typeof this.customData.disableBadCutDirection === 'boolean' ||
            typeof this.customData.disableBadCutSaberType === 'boolean' ||
            typeof this.customData.disableBadCutSpeed === 'boolean' ||
            Array.isArray(this.customData.flip) ||
            typeof this.customData.uninteractable === 'boolean' ||
            Array.isArray(this.customData.localRotation) ||
            typeof this.customData.noteJumpMovementSpeed === 'number' ||
            typeof this.customData.noteJumpStartBeatOffset === 'number' ||
            Array.isArray(this.customData.coordinates) ||
            Array.isArray(this.customData.tailCoordinates) ||
            Array.isArray(this.customData.worldRotation) ||
            typeof this.customData.worldRotation === 'number'
        );
    }
}

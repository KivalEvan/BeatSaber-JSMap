import { IBaseSlider, BaseSlider } from './baseSlider.ts';
import { LINE_COUNT } from './constants.ts';

export interface ISlider extends IBaseSlider {
    /** Head control point length multiplier `<float>` of slider.
     * ```ts
     * 0 -> Flat Start
     * 1 -> Curved Start
     * ```
     * ---
     * Range: `0-1`
     */
    mu: number;
    /** Tail control point length multiplier `<float>` of slider.
     * ```ts
     * 0 -> Flat End
     * 1 -> Curved End
     * ```
     * ---
     * Range: `0-1`
     */
    tmu: number;
    /** Tail cut direction `<int>` of slider.
     * ```ts
     * 4 | 0 | 5
     * 2 | 8 | 3
     * 6 | 1 | 7
     * ```
     * ---
     * Grid represents cut direction from center.
     *
     * **WARNING:** Dot-directional is not recommended, assumes down-directional.
     */
    tc: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** Mid anchor mode `<int>` of slider.
     * ```ts
     * 0 -> Straight
     * 1 -> Clockwise
     * 2 -> Counter-Clockwise
     * ```
     */
    m: 0 | 1 | 2;
}

const defaultValue: Required<ISlider> = {
    b: 0,
    c: 0,
    x: 0,
    y: 0,
    d: 0,
    mu: 0.5,
    tb: 0,
    tx: 0,
    ty: 0,
    tc: 0,
    tmu: 0.5,
    m: 1,
};

/** Slider beatmap object.
 *
 * Also known as arc.
 */
export class Slider extends BaseSlider {
    private mu;
    private tmu;
    private tc;
    private m;
    constructor(slider: Required<ISlider>) {
        super(slider);
        this.mu = slider.mu;
        this.tmu = slider.tmu;
        this.tc = slider.tc;
        this.m = slider.m;
    }

    static create(): Slider;
    static create(sliders: Partial<ISlider>): Slider;
    static create(...sliders: Partial<ISlider>[]): Slider[];
    static create(...sliders: Partial<ISlider>[]): Slider | Slider[] {
        const result: Slider[] = [];
        sliders?.forEach((s) =>
            result.push(
                new Slider({
                    b: s.b ?? defaultValue.b,
                    c: s.c ?? defaultValue.c,
                    x: s.x ?? defaultValue.x,
                    y: s.y ?? defaultValue.y,
                    d: s.d ?? defaultValue.d,
                    mu: s.mu ?? defaultValue.mu,
                    tb: s.tb ?? defaultValue.tb,
                    tx: s.tx ?? defaultValue.tx,
                    ty: s.ty ?? defaultValue.ty,
                    tc: s.tc ?? defaultValue.tc,
                    tmu: s.tmu ?? defaultValue.tmu,
                    m: s.m ?? defaultValue.m,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new Slider({
            b: defaultValue.b,
            c: defaultValue.c,
            x: defaultValue.x,
            y: defaultValue.y,
            d: defaultValue.d,
            mu: defaultValue.mu,
            tb: defaultValue.tb,
            tx: defaultValue.tx,
            ty: defaultValue.ty,
            tc: defaultValue.tc,
            tmu: defaultValue.tmu,
            m: defaultValue.m,
        });
    }

    toObject(): ISlider {
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
        };
    }

    /** Head control point length multiplier `<float>` of slider.
     * ```ts
     * 0 -> Flat Start
     * 1 -> Curved Start
     * ```
     * ---
     * Range: `0-1`
     */
    get lengthMultiplier() {
        return this.mu;
    }
    set lengthMultiplier(value: ISlider['mu']) {
        this.mu = value;
    }

    /** Tail control point length multiplier `<float>` of slider.
     * ```ts
     * 0 -> Flat End
     * 1 -> Curved End
     * ```
     * ---
     * Range: `0-1`
     */
    get tailLengthMultiplier() {
        return this.tmu;
    }
    set tailLengthMultiplier(value: ISlider['tmu']) {
        this.tmu = value;
    }

    /** Tail cut direction `<int>` of slider.
     * ```ts
     * 4 | 0 | 5
     * 2 | 8 | 3
     * 6 | 1 | 7
     * ```
     * ---
     * Grid represents cut direction from center.
     *
     * **WARNING:** Dot-directional is not recommended, assumes down-directional.
     */
    get tailDirection() {
        return this.tc;
    }
    set tailDirection(value: ISlider['tc']) {
        this.tc = value;
    }

    /** Mid anchor mode `<int>` of slider.
     * ```ts
     * 0 -> Straight
     * 1 -> Clockwise
     * 2 -> Counter-Clockwise
     * ```
     */
    get midAnchor() {
        return this.m;
    }
    set midAnchor(value: ISlider['m']) {
        this.m = value;
    }

    setLengthMultiplier(value: ISlider['mu']) {
        this.lengthMultiplier = value;
        return this;
    }
    setTailLengthMultiplier(value: ISlider['tmu']) {
        this.tailLengthMultiplier = value;
        return this;
    }
    setTailDirection(value: ISlider['tc']) {
        this.tailDirection = value;
        return this;
    }
    setMidAnchor(value: ISlider['m']) {
        this.midAnchor = value;
        return this;
    }

    mirror(flipColor = true) {
        this.posX = LINE_COUNT - 1 - this.posX;
        this.tailPosX = LINE_COUNT - 1 - this.tailPosX;
        if (flipColor) {
            this.color = ((1 + this.color) % 2) as typeof this.color;
        }
        switch (this.direction) {
            case 2:
                this.direction = 3;
                break;
            case 3:
                this.direction = 2;
                break;
            case 6:
                this.direction = 7;
                break;
            case 7:
                this.direction = 6;
                break;
            case 4:
                this.direction = 5;
                break;
            case 5:
                this.direction = 4;
                break;
        }
        switch (this.tailDirection) {
            case 2:
                this.tailDirection = 3;
                break;
            case 3:
                this.tailDirection = 2;
                break;
            case 6:
                this.tailDirection = 7;
                break;
            case 7:
                this.tailDirection = 6;
                break;
            case 4:
                this.tailDirection = 5;
                break;
            case 5:
                this.tailDirection = 4;
                break;
        }
        if (this.midAnchor) {
            this.midAnchor = this.midAnchor === 1 ? 2 : 1;
        }
    }
}

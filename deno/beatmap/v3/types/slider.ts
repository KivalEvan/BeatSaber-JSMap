import { IBaseSlider, BaseSlider } from './baseSlider.ts';
import { LINE_COUNT } from './constants.ts';

/** Slider beatmap object.
 *
 * Also known as arc.
 */
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

export class Slider extends BaseSlider {
    private mu;
    private tmu;
    private tc;
    private m;
    constructor(slider: ISlider) {
        super(slider);
        this.mu = slider.mu;
        this.tmu = slider.tmu;
        this.tc = slider.tc;
        this.m = slider.m;
    }

    public toObject(): ISlider {
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

    get lengthMultiplier() {
        return this.mu;
    }
    set lengthMultiplier(value: ISlider['mu']) {
        this.mu = value;
    }

    get tailLengthMultiplier() {
        return this.tmu;
    }
    set tailLengthMultiplier(value: ISlider['tmu']) {
        this.tmu = value;
    }

    get tailDirection() {
        return this.tc;
    }
    set tailDirection(value: ISlider['tc']) {
        this.tc = value;
    }

    get midAnchor() {
        return this.m;
    }
    set midAnchor(value: ISlider['m']) {
        this.m = value;
    }

    public mirror(flipColor = true) {
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

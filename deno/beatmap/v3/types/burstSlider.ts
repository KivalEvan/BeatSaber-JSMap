import { IBaseSlider, BaseSlider } from './baseSlider.ts';
import { LINE_COUNT } from './constants.ts';

export interface IBurstSlider extends IBaseSlider {
    /** Slice count or element `<int>` in burst slider.
     *
     * **NOTE:** Must be more than `0`, the head counts as `1`.
     */
    sc: number;
    /** Length multiplier `<float>` of element in burst slider.
     * ```ts
     * 1 -> Normal length
     * 0.5 -> Half length
     * 0.25 -> Quarter length
     * ```
     * **WARNING:** Value `0` will crash the game.
     */
    s: number;
}

const defaultValue: Required<IBurstSlider> = {
    b: 0,
    c: 0,
    x: 0,
    y: 0,
    d: 0,
    tb: 0,
    tx: 0,
    ty: 0,
    sc: 1,
    s: 1,
};

/** Burst slider beatmap object.
 *
 * Also known as chain.
 */
export class BurstSlider extends BaseSlider {
    private sc;
    private s;
    constructor(burstSlider: Required<IBurstSlider>) {
        super(burstSlider);
        this.sc = burstSlider.sc;
        this.s = burstSlider.s;
    }

    static create(): BurstSlider;
    static create(burstSliders: Partial<IBurstSlider>): BurstSlider;
    static create(...burstSliders: Partial<IBurstSlider>[]): BurstSlider[];
    static create(
        ...burstSliders: Partial<IBurstSlider>[]
    ): BurstSlider | BurstSlider[] {
        const result: BurstSlider[] = [];
        burstSliders?.forEach((bs) =>
            result.push(
                new BurstSlider({
                    b: bs.b ?? bs.tb ?? defaultValue.b,
                    c: bs.c ?? defaultValue.c,
                    x: bs.x ?? defaultValue.x,
                    y: bs.y ?? defaultValue.y,
                    d: bs.d ?? defaultValue.d,
                    tb: bs.tb ?? bs.b ?? defaultValue.tb,
                    tx: bs.tx ?? defaultValue.tx,
                    ty: bs.ty ?? defaultValue.ty,
                    sc: bs.sc ?? defaultValue.sc,
                    s: bs.s ?? defaultValue.s,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new BurstSlider({
            b: defaultValue.b,
            c: defaultValue.c,
            x: defaultValue.x,
            y: defaultValue.y,
            d: defaultValue.d,
            tb: defaultValue.tb,
            tx: defaultValue.tx,
            ty: defaultValue.ty,
            sc: defaultValue.sc,
            s: defaultValue.s,
        });
    }

    toObject(): IBurstSlider {
        return {
            b: this.time,
            c: this.color,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            tb: this.tailTime,
            tx: this.tailPosX,
            ty: this.tailPosY,
            sc: this.sliceCount,
            s: this.squish,
        };
    }

    /** Slice count or element `<int>` in burst slider.
     *
     * **NOTE:** Must be more than `0`, the head counts as `1`.
     */
    get sliceCount() {
        return this.sc;
    }
    set sliceCount(value: IBurstSlider['sc']) {
        this.sc = value;
    }

    /** Length multiplier `<float>` of element in burst slider.
     * ```ts
     * 1 -> Normal length
     * 0.5 -> Half length
     * 0.25 -> Quarter length
     * ```
     * **WARNING:** Value `0` will crash the game.
     */
    get squish() {
        return this.s;
    }
    set squish(value: IBurstSlider['s']) {
        this.s = value;
    }

    setSliceCount(value: IBurstSlider['sc']) {
        this.sliceCount = value;
        return this;
    }
    setSquish(value: IBurstSlider['s']) {
        this.squish = value;
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
    }
}

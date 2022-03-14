import { IBaseObject, BaseObject } from './baseObject.ts';

export interface IBaseSlider extends IBaseObject {
    /** Color type `<int>` of base slider.
     * ```ts
     * 0 -> Red
     * 1 -> Blue
     * ```
     */
    c: 0 | 1;
    /** Head position x `<int>` of base slider.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `0-3`
     */
    x: number;
    /** Head position y `<int>` of base slider.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    y: number;
    /** Head cut direction `<int>` of base slider.
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
    d: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** Tail beat time `<float>` of base slider. */
    tb: number;
    /** Tail position x `<int>` of base slider.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `none`
     */
    tx: number;
    /** Tail position y `<int>` of base slider.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    ty: number;
}

/** Base slider beatmap object. */
export abstract class BaseSlider extends BaseObject<IBaseSlider> {
    private c;
    private x;
    private y;
    private d;
    private tb;
    private tx;
    private ty;
    constructor(baseSlider: Required<IBaseSlider>) {
        super(baseSlider);
        this.c = baseSlider.c;
        this.x = baseSlider.x;
        this.y = baseSlider.y;
        this.d = baseSlider.d;
        this.tb = baseSlider.tb;
        this.tx = baseSlider.tx;
        this.ty = baseSlider.ty;
    }

    /** Color type `<int>` of base slider.
     * ```ts
     * 0 -> Red
     * 1 -> Blue
     * ```
     */
    get color() {
        return this.c;
    }
    set color(value: IBaseSlider['c']) {
        this.c = value;
    }

    /** Head position x `<int>` of base slider.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `0-3`
     */
    get posX() {
        return this.x;
    }
    set posX(value: IBaseSlider['x']) {
        this.x = value;
    }

    /** Head position y `<int>` of base slider.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    get posY() {
        return this.y;
    }
    set posY(value: IBaseSlider['y']) {
        this.y = value;
    }

    /** Head cut direction `<int>` of base slider.
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
    get direction() {
        return this.d;
    }
    set direction(value: IBaseSlider['d']) {
        this.d = value;
    }

    /** Tail beat time `<float>` of base slider. */
    get tailTime() {
        return this.tb;
    }
    set tailTime(value: number) {
        this.tb = value;
    }

    /** Tail position x `<int>` of base slider.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `none`
     */
    get tailPosX() {
        return this.tx;
    }
    set tailPosX(value: IBaseSlider['tx']) {
        this.tx = value;
    }

    /** Tail position y `<int>` of base slider.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    get tailPosY() {
        return this.ty;
    }
    set tailPosY(value: IBaseSlider['ty']) {
        this.ty = value;
    }

    setColor(value: IBaseSlider['c']) {
        this.color = value;
        return this;
    }
    setPosX(value: IBaseSlider['x']) {
        this.posX = value;
        return this;
    }
    setPosY(value: IBaseSlider['y']) {
        this.posY = value;
        return this;
    }
    setDirection(value: IBaseSlider['d']) {
        this.direction = value;
        return this;
    }
    setTailTime(value: number) {
        this.tailTime = value;
        return this;
    }
    setTailPosX(value: IBaseSlider['tx']) {
        this.tailPosX = value;
        return this;
    }
    setTailPosY(value: IBaseSlider['ty']) {
        this.tailPosY = value;
        return this;
    }

    isInverse() {
        return this.time < this.tailTime;
    }

    hasDot() {
        return this.direction === 8;
    }

    abstract mirror(): void;
}

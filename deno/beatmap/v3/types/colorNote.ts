import { IBaseObject, BaseObject } from './baseObject.ts';
import { LINE_COUNT } from './constants.ts';
import { CustomData } from './customData.ts';

/** Color note beatmap object. */
export interface IColorNote extends IBaseObject {
    /** Position x `<int>` of note.
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
    /** Position y `<int>` of note.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    y: number;
    /** Color type `<int>` of note.
     * ```ts
     * 0 -> Red
     * 1 -> Blue
     * ```
     */
    c: 0 | 1;
    /** Cut direction `<int>` of note.
     * ```ts
     * 4 | 0 | 5
     * 2 | 8 | 3
     * 6 | 1 | 7
     * ```
     * ---
     * Grid represents cut direction from center.
     *
     * **WARNING:** Dot-directional is not recommended with sliders, assumes down-directional.
     */
    d: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /** Angle offset in degree counter-clockwise `<int>` of note.*/
    a: number;
    cd?: CustomData;
}

export class ColorNote extends BaseObject<IColorNote> {
    private c;
    private x;
    private y;
    private d;
    private a;
    constructor(colorNote: IColorNote) {
        super(colorNote);
        this.c = colorNote.c;
        this.x = colorNote.x;
        this.y = colorNote.y;
        this.d = colorNote.d;
        this.a = colorNote.a;
    }

    public toObject(): IColorNote {
        return {
            b: this.time,
            c: this.color,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            a: this.angleOffset,
        };
    }

    get color() {
        return this.c;
    }
    set color(value: IColorNote['c']) {
        this.c = value;
    }

    get posX() {
        return this.x;
    }
    set posX(value: IColorNote['x']) {
        this.x = value;
    }

    get posY() {
        return this.y;
    }
    set posY(value: IColorNote['y']) {
        this.y = value;
    }

    get direction() {
        return this.d;
    }
    set direction(value: IColorNote['d']) {
        this.d = value;
    }

    get angleOffset() {
        return this.a;
    }
    set angleOffset(value: IColorNote['a']) {
        this.a = value;
    }

    public mirror(flipColor = true) {
        this.x = LINE_COUNT - 1 - this.x;
        if (flipColor) {
            this.c = ((1 + this.c) % 2) as typeof this.c;
        }
        this.a = 0 - this.a;
        switch (this.d) {
            case 2:
                this.d = 3;
                break;
            case 3:
                this.d = 2;
                break;
            case 6:
                this.d = 7;
                break;
            case 7:
                this.d = 6;
                break;
            case 4:
                this.d = 5;
                break;
            case 5:
                this.d = 4;
                break;
        }
    }
}

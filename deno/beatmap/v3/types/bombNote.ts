import { IBaseObject, BaseObject } from './baseObject.ts';
import { LINE_COUNT } from './constants.ts';

export interface IBombNote extends IBaseObject {
    /** Position x `<int>` of bomb.
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
    /** Position y `<int>` of bomb.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    y: number;
}

const defaultValue: Required<IBombNote> = {
    b: 0,
    x: 0,
    y: 0,
};

/** Bomb note beatmap object. */
export class BombNote extends BaseObject<IBombNote> {
    private x;
    private y;
    constructor(bombNote: Required<IBombNote>) {
        super(bombNote);
        this.x = bombNote.x;
        this.y = bombNote.y;
    }

    static create(): BombNote;
    static create(bombNotes: Partial<IBombNote>): BombNote;
    static create(...bombNotes: Partial<IBombNote>[]): BombNote[];
    static create(...bombNotes: Partial<IBombNote>[]): BombNote | BombNote[] {
        const result: BombNote[] = [];
        bombNotes?.forEach((bn) =>
            result.push(
                new BombNote({
                    b: bn.b ?? defaultValue.b,
                    x: bn.x ?? defaultValue.x,
                    y: bn.y ?? defaultValue.y,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new BombNote({
            b: defaultValue.b,
            x: defaultValue.x,
            y: defaultValue.y,
        });
    }

    toObject(): IBombNote {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
        };
    }

    /** Position x `<int>` of bomb.
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
    set posX(value: IBombNote['x']) {
        this.x = value;
    }

    /** Position y `<int>` of bomb.
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
    set posY(value: IBombNote['y']) {
        this.y = value;
    }

    setPosX(value: IBombNote['x']) {
        this.posX = value;
        return this;
    }
    setPosY(value: IBombNote['y']) {
        this.posY = value;
        return this;
    }

    /** Check if bomb has Mapping Extensions properties.
     * ```ts
     * if (bomb.hasMappingExtensions()) {}
     * ```
     */
    hasMappingExtensions() {
        return this.posX > 3 || this.posX < 0 || this.posY > 2 || this.posY < 0;
    }

    mirror() {
        this.x = LINE_COUNT - 1 - this.x;
        return this;
    }
}

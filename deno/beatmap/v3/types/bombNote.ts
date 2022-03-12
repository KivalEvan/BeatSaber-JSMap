import { IBaseObject, BaseObject } from './baseObject.ts';
import { LINE_COUNT } from './constants.ts';

/** Bomb note beatmap object. */
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
                    b: bn.b ?? 0,
                    x: bn.x ?? 0,
                    y: bn.y ?? 0,
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
            b: 0,
            x: 0,
            y: 0,
        });
    }

    public toObject(): IBombNote {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
        };
    }

    get posX() {
        return this.x;
    }
    set posX(value: IBombNote['x']) {
        this.x = value;
    }

    get posY() {
        return this.y;
    }
    set posY(value: IBombNote['y']) {
        this.y = value;
    }

    public mirror() {
        this.x = LINE_COUNT - 1 - this.x;
    }
}

import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { WrapBombNote } from '../wrapper/bombNote.ts';
import { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { isVector3 } from '../../utils/vector.ts';

/** Bomb note beatmap v3 class object. */
export class BombNote extends WrapBombNote<Required<IBombNote>> {
    static default: ObjectReturnFn<Required<IBombNote>> = {
        b: 0,
        x: 0,
        y: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapBombNoteAttribute<Required<IBombNote>>>);
    constructor(data: Partial<IBombNote>);
    constructor(data: Partial<IBombNote> & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>);
    constructor(
        data: Partial<IBombNote> & Partial<IWrapBombNoteAttribute<Required<IBombNote>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? BombNote.default.b,
            x: data.posX ?? data.x ?? BombNote.default.x,
            y: data.posY ?? data.y ?? BombNote.default.y,
            customData: data.customData ?? BombNote.default.customData(),
        });
    }

    static create(): BombNote[];
    static create(...data: Partial<IWrapBombNoteAttribute<Required<IBombNote>>>[]): BombNote[];
    static create(...data: Partial<IBombNote>[]): BombNote[];
    static create(
        ...data: (Partial<IBombNote> & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>)[]
    ): BombNote[];
    static create(
        ...data: (Partial<IBombNote> & Partial<IWrapBombNoteAttribute<Required<IBombNote>>>)[]
    ): BombNote[] {
        const result: BombNote[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IBombNote> {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IBombNote['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: IBombNote['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: IBombNote['y']) {
        this.data.y = value;
    }

    get customData(): NonNullable<IBombNote['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IBombNote['customData']>) {
        this.data.customData = value;
    }

    mirror() {
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
        return super.mirror();
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
            Array.isArray(this.customData.worldRotation) ||
            typeof this.customData.worldRotation === 'number' ||
            typeof this.customData.link === 'string'
        );
    }
}

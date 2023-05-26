import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapColorNote } from '../wrapper/colorNote.ts';
import { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import { isVector3 } from '../../utils/vector.ts';
import { Vector2 } from '../../types/vector.ts';
import { ModType } from '../../types/beatmap/shared/modCheck.ts';

/** Color note beatmap v3 class object. */
export class ColorNote extends WrapColorNote<Required<IColorNote>> {
    static default: ObjectReturnFn<Required<IColorNote>> = {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        a: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapColorNoteAttribute<Required<IColorNote>>>);
    constructor(data: Partial<IColorNote>);
    constructor(data: Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>);
    constructor(
        data: Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>> = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? ColorNote.default.b;
        this._posX = data.posX ?? data.x ?? ColorNote.default.x;
        this._posY = data.posY ?? data.y ?? ColorNote.default.y;
        this._color = data.color ?? data.c ?? ColorNote.default.c;
        this._direction = data.direction ?? data.d ?? ColorNote.default.d;
        this._angleOffset = data.angleOffset ?? data.a ?? ColorNote.default.a;
        this._customData = data.customData ?? ColorNote.default.customData();
    }

    static create(): ColorNote[];
    static create(...data: Partial<IWrapColorNoteAttribute<Required<IColorNote>>>[]): ColorNote[];
    static create(...data: Partial<IColorNote>[]): ColorNote[];
    static create(
        ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>)[]
    ): ColorNote[];
    static create(
        ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<Required<IColorNote>>>)[]
    ): ColorNote[] {
        const result: ColorNote[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IColorNote> {
        return {
            b: this.time,
            c: this.color,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            a: this.angleOffset,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: IColorNote['b']) {
        this._time = value;
    }

    get posX() {
        return this._posX;
    }
    set posX(value: IColorNote['x']) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }
    set posY(value: IColorNote['y']) {
        this._posY = value;
    }

    get color() {
        return this._color;
    }
    set color(value: IColorNote['c']) {
        this._color = value;
    }

    get type() {
        return this._color;
    }
    set type(value: IColorNote['c']) {
        this._color = value;
    }

    get direction() {
        return this._direction;
    }
    set direction(value: IColorNote['d']) {
        this._direction = value;
    }

    get angleOffset() {
        return this._angleOffset;
    }
    set angleOffset(value: IColorNote['a']) {
        this._angleOffset = value;
    }

    get customData(): NonNullable<IColorNote['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<IColorNote['customData']>) {
        this._customData = value;
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
                    this.customData.animation.definitePosition.forEach((dp) => {
                        dp[0] = -dp[0];
                    });
                }
            }
            if (Array.isArray(this.customData.animation.offsetPosition)) {
                if (isVector3(this.customData.animation.offsetPosition)) {
                    this.customData.animation.offsetPosition[0] = -this.customData.animation
                        .offsetPosition[0];
                } else {
                    this.customData.animation.offsetPosition.forEach((op) => {
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
            /* falls through */
            case 'me':
            default:
                if (this.direction >= 1000) {
                    return Math.abs(((this.direction % 1000) % 360) - 360);
                }
                return super.getAngle();
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
            Array.isArray(this.customData.worldRotation) ||
            typeof this.customData.worldRotation === 'number' ||
            typeof this.customData.link === 'string'
        );
    }
}

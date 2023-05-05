import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { IBurstSlider } from '../../types/beatmap/v3/burstSlider.ts';
import { IWrapBurstSliderAttribute } from '../../types/beatmap/wrapper/burstSlider.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { isVector3 } from '../../utils/vector.ts';
import { WrapBurstSlider } from '../wrapper/burstSlider.ts';

/** Burst slider beatmap v3 class object.
 *
 * Also known as chain.
 */
export class BurstSlider extends WrapBurstSlider<Required<IBurstSlider>> {
    static default: ObjectReturnFn<Required<IBurstSlider>> = {
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
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>);
    constructor(data: Partial<IBurstSlider>);
    constructor(
        data: Partial<IBurstSlider> & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>,
    );
    constructor(
        data:
            & Partial<IBurstSlider>
            & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? data.tb ?? BurstSlider.default.b,
            c: data.color ?? data.c ?? BurstSlider.default.c,
            x: data.posX ?? data.x ?? BurstSlider.default.x,
            y: data.posY ?? data.y ?? BurstSlider.default.y,
            d: data.direction ?? data.d ?? BurstSlider.default.d,
            tb: data.tailTime ?? data.tb ?? data.b ?? BurstSlider.default.tb,
            tx: data.tailPosX ?? data.tx ?? BurstSlider.default.tx,
            ty: data.tailPosY ?? data.ty ?? BurstSlider.default.ty,
            sc: data.sliceCount ?? data.sc ?? BurstSlider.default.sc,
            s: data.squish ?? data.s ?? BurstSlider.default.s,
            customData: data.customData ?? BurstSlider.default.customData(),
        });
    }

    static create(): BurstSlider[];
    static create(
        ...data: Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>[]
    ): BurstSlider[];
    static create(...data: Partial<IBurstSlider>[]): BurstSlider[];
    static create(
        ...data: (
            & Partial<IBurstSlider>
            & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>
        )[]
    ): BurstSlider[];
    static create(
        ...data: (
            & Partial<IBurstSlider>
            & Partial<IWrapBurstSliderAttribute<Required<IBurstSlider>>>
        )[]
    ): BurstSlider[] {
        const result: BurstSlider[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IBurstSlider> {
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
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IBurstSlider['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: IBurstSlider['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: IBurstSlider['y']) {
        this.data.y = value;
    }

    get color() {
        return this.data.c;
    }
    set color(value: IBurstSlider['c']) {
        this.data.c = value;
    }

    get direction() {
        return this.data.d;
    }
    set direction(value: IBurstSlider['d']) {
        this.data.d = value;
    }

    get tailTime() {
        return this.data.tb;
    }
    set tailTime(value: IBurstSlider['tb']) {
        this.data.tb = value;
    }

    get tailPosX() {
        return this.data.tx;
    }
    set tailPosX(value: IBurstSlider['tx']) {
        this.data.tx = value;
    }

    get tailPosY() {
        return this.data.ty;
    }
    set tailPosY(value: IBurstSlider['ty']) {
        this.data.ty = value;
    }

    get sliceCount() {
        return this.data.sc;
    }
    set sliceCount(value: IBurstSlider['sc']) {
        this.data.sc = value;
    }

    get squish() {
        return this.data.s;
    }
    set squish(value: IBurstSlider['s']) {
        this.data.s = value;
    }

    get customData(): NonNullable<IBurstSlider['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IBurstSlider['customData']>) {
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
            case 'me':
                if (this.direction >= 1000) {
                    return Math.abs(((this.direction % 1000) % 360) - 360);
                }
            /* falls through */
            case 'vanilla':
            case 'ne':
            default:
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

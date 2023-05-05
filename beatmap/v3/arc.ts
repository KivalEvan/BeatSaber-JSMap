import { IArc } from '../../types/beatmap/v3/arc.ts';
import { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import { ModType } from '../../types/beatmap/shared/modCheck.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { Vector2 } from '../../types/vector.ts';
import { deepCopy } from '../../utils/misc.ts';
import { isVector3 } from '../../utils/vector.ts';
import { WrapArc } from '../wrapper/arc.ts';

/** Arc beatmap v3 class object.
 *
 * Also known as slider internally.
 */
export class Arc extends WrapArc<Required<IArc>> {
    static default: ObjectReturnFn<Required<IArc>> = {
        b: 0,
        c: 0,
        x: 0,
        y: 0,
        d: 0,
        mu: 1,
        tb: 0,
        tx: 0,
        ty: 0,
        tc: 0,
        tmu: 1,
        m: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapArcAttribute<Required<IArc>>>);
    constructor(data: Partial<IArc>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>);
    constructor(data: Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>> = {}) {
        super({
            b: data.time ?? data.b ?? Arc.default.b,
            c: data.color ?? data.c ?? Arc.default.c,
            x: data.posX ?? data.x ?? Arc.default.x,
            y: data.posY ?? data.y ?? Arc.default.y,
            d: data.direction ?? data.d ?? Arc.default.d,
            mu: data.lengthMultiplier ?? data.mu ?? Arc.default.mu,
            tb: data.tailTime ?? data.tb ?? Arc.default.tb,
            tx: data.tailPosX ?? data.tx ?? Arc.default.tx,
            ty: data.tailPosY ?? data.ty ?? Arc.default.ty,
            tc: data.tailDirection ?? data.tc ?? Arc.default.tc,
            tmu: data.tailLengthMultiplier ?? data.tmu ?? Arc.default.tmu,
            m: data.midAnchor ?? data.m ?? Arc.default.m,
            customData: data.customData ?? Arc.default.customData(),
        });
    }

    static create(): Arc[];
    static create(...data: Partial<IWrapArcAttribute<Required<IArc>>>[]): Arc[];
    static create(...data: Partial<IArc>[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[] {
        const result: Arc[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IArc> {
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
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IArc['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: IArc['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: IArc['y']) {
        this.data.y = value;
    }

    get color() {
        return this.data.c;
    }
    set color(value: IArc['c']) {
        this.data.c = value;
    }

    get direction() {
        return this.data.d;
    }
    set direction(value: IArc['d']) {
        this.data.d = value;
    }

    get lengthMultiplier() {
        return this.data.mu;
    }
    set lengthMultiplier(value: IArc['mu']) {
        this.data.mu = value;
    }

    get tailTime() {
        return this.data.tb;
    }
    set tailTime(value: IArc['tb']) {
        this.data.tb = value;
    }

    get tailPosX() {
        return this.data.tx;
    }
    set tailPosX(value: IArc['tx']) {
        this.data.tx = value;
    }

    get tailPosY() {
        return this.data.ty;
    }
    set tailPosY(value: IArc['ty']) {
        this.data.ty = value;
    }

    get tailDirection() {
        return this.data.tc;
    }
    set tailDirection(value: IArc['tc']) {
        this.data.tc = value;
    }

    get tailLengthMultiplier() {
        return this.data.tmu;
    }
    set tailLengthMultiplier(value: IArc['tmu']) {
        this.data.tmu = value;
    }

    get midAnchor() {
        return this.data.m;
    }
    set midAnchor(value: IArc['m']) {
        this.data.m = value;
    }

    get customData(): NonNullable<IArc['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IArc['customData']>) {
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
            case 'vanilla':
            case 'ne':
                return super.getAngle();
            case 'me':
            default:
                if (this.direction >= 1000) {
                    return Math.abs(((this.direction % 1000) % 360) - 360);
                }
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

    getTailAngle(type?: ModType) {
        switch (type) {
            case 'vanilla':
            case 'ne':
                return super.getTailAngle();
            case 'me':
                if (this.tailDirection >= 1000) {
                    return Math.abs(((this.tailDirection % 1000) % 360) - 360);
                }
            /** falls through */
            default:
                return super.getTailAngle();
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
            typeof this.customData.worldRotation === 'number' ||
            typeof this.customData.link === 'string'
        );
    }
}

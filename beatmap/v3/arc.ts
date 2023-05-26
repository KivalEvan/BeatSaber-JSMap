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
        super();

        this._time = data.time ?? data.b ?? Arc.default.b;
        this._color = data.color ?? data.c ?? Arc.default.c;
        this._posX = data.posX ?? data.x ?? Arc.default.x;
        this._posY = data.posY ?? data.y ?? Arc.default.y;
        this._direction = data.direction ?? data.d ?? Arc.default.d;
        this._lengthMultiplier = data.lengthMultiplier ?? data.mu ?? Arc.default.mu;
        this._tailTime = data.tailTime ?? data.tb ?? Arc.default.tb;
        this._tailPosX = data.tailPosX ?? data.tx ?? Arc.default.tx;
        this._tailPosY = data.tailPosY ?? data.ty ?? Arc.default.ty;
        this._tailDirection = data.tailDirection ?? data.tc ?? Arc.default.tc;
        this._tailLengthMultiplier = data.tailLengthMultiplier ?? data.tmu ?? Arc.default.tmu;
        this._midAnchor = data.midAnchor ?? data.m ?? Arc.default.m;
        this._customData = data.customData ?? Arc.default.customData();
    }

    static create(): Arc[];
    static create(...data: Partial<IWrapArcAttribute<Required<IArc>>>[]): Arc[];
    static create(...data: Partial<IArc>[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[];
    static create(...data: (Partial<IArc> & Partial<IWrapArcAttribute<Required<IArc>>>)[]): Arc[] {
        const result: Arc[] = [];
        data.forEach((obj) => result.push(new this(obj)));
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
        return this._time;
    }
    set time(value: IArc['b']) {
        this._time = value;
    }

    get posX() {
        return this._posX;
    }
    set posX(value: IArc['x']) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }
    set posY(value: IArc['y']) {
        this._posY = value;
    }

    get color() {
        return this._color;
    }
    set color(value: IArc['c']) {
        this._color = value;
    }

    get direction() {
        return this._direction;
    }
    set direction(value: IArc['d']) {
        this._direction = value;
    }

    get lengthMultiplier() {
        return this._lengthMultiplier;
    }
    set lengthMultiplier(value: IArc['mu']) {
        this._lengthMultiplier = value;
    }

    get tailTime() {
        return this._tailTime;
    }
    set tailTime(value: IArc['tb']) {
        this._tailTime = value;
    }

    get tailPosX() {
        return this._tailPosX;
    }
    set tailPosX(value: IArc['tx']) {
        this._tailPosX = value;
    }

    get tailPosY() {
        return this._tailPosY;
    }
    set tailPosY(value: IArc['ty']) {
        this._tailPosY = value;
    }

    get tailDirection() {
        return this._tailDirection;
    }
    set tailDirection(value: IArc['tc']) {
        this._tailDirection = value;
    }

    get tailLengthMultiplier() {
        return this._tailLengthMultiplier;
    }
    set tailLengthMultiplier(value: IArc['tmu']) {
        this._tailLengthMultiplier = value;
    }

    get midAnchor() {
        return this._midAnchor;
    }
    set midAnchor(value: IArc['m']) {
        this._midAnchor = value;
    }

    get customData(): NonNullable<IArc['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<IArc['customData']>) {
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

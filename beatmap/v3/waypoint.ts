import { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapWaypoint } from '../wrapper/waypoint.ts';

/** Waypoint beatmap v3 class object. */
export class Waypoint extends WrapWaypoint<IWaypoint> {
    static default: ObjectReturnFn<IWaypoint> = {
        b: 0,
        x: 0,
        y: 0,
        d: 0,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapWaypointAttribute<IWaypoint>>);
    constructor(data: Partial<IWaypoint>);
    constructor(data: Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>);
    constructor(data: Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>> = {}) {
        super();

        this._time = data.time ?? data.b ?? Waypoint.default.b;
        this._posX = data.posX ?? data.x ?? Waypoint.default.x;
        this._posY = data.posY ?? data.y ?? Waypoint.default.y;
        this._direction = data.direction ?? data.d ?? Waypoint.default.d;
        this._customData = data.customData ?? Waypoint.default.customData();
    }

    static create(): Waypoint[];
    static create(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): Waypoint[];
    static create(...data: Partial<IWaypoint>[]): Waypoint[];
    static create(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]
    ): Waypoint[];
    static create(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]
    ): Waypoint[] {
        const result: Waypoint[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): IWaypoint {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: IWaypoint['b']) {
        this._time = value;
    }

    get posX() {
        return this._posX;
    }
    set posX(value: IWaypoint['x']) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }
    set posY(value: IWaypoint['y']) {
        this._posY = value;
    }

    get direction() {
        return this._direction;
    }
    set direction(value: IWaypoint['d']) {
        this._direction = value;
    }

    get customData(): NonNullable<IWaypoint['customData']> {
        return this._customData;
    }
    set customData(value: NonNullable<IWaypoint['customData']>) {
        this._customData = value;
    }
}

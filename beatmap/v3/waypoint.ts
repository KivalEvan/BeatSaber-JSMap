import { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';
import { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapWaypoint } from '../wrapper/waypoint.ts';

/** Waypoint beatmap v3 class object. */
export class Waypoint extends WrapWaypoint<Required<IWaypoint>> {
    static default: ObjectReturnFn<Required<IWaypoint>> = {
        b: 0,
        x: 0,
        y: 0,
        d: 1,
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(data: Partial<IWrapWaypointAttribute<Required<IWaypoint>>>);
    constructor(data: Partial<IWaypoint>);
    constructor(data: Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>);
    constructor(
        data: Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>> = {},
    ) {
        super({
            b: data.time ?? data.b ?? Waypoint.default.b,
            x: data.posX ?? data.x ?? Waypoint.default.x,
            y: data.posY ?? data.y ?? Waypoint.default.y,
            d: data.direction ?? data.d ?? Waypoint.default.d,
            customData: data.customData ?? Waypoint.default.customData(),
        });
    }

    static create(): Waypoint[];
    static create(...data: Partial<IWrapWaypointAttribute<Required<IWaypoint>>>[]): Waypoint[];
    static create(...data: Partial<IWaypoint>[]): Waypoint[];
    static create(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): Waypoint[];
    static create(
        ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<Required<IWaypoint>>>)[]
    ): Waypoint[] {
        const result: Waypoint[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<IWaypoint> {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            d: this.direction,
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: IWaypoint['b']) {
        this.data.b = value;
    }

    get posX() {
        return this.data.x;
    }
    set posX(value: IWaypoint['x']) {
        this.data.x = value;
    }

    get posY() {
        return this.data.y;
    }
    set posY(value: IWaypoint['y']) {
        this.data.y = value;
    }

    get direction() {
        return this.data.d;
    }
    set direction(value: IWaypoint['d']) {
        this.data.d = value;
    }

    get customData(): NonNullable<IWaypoint['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<IWaypoint['customData']>) {
        this.data.customData = value;
    }
}

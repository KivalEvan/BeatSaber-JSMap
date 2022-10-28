import { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { LINE_COUNT } from '../shared/constants.ts';
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

    protected constructor(waypoint: Required<IWaypoint>) {
        super(waypoint);
    }

    static create(): Waypoint[];
    static create(...waypoints: Partial<IWaypoint>[]): Waypoint[];
    static create(...waypoints: Partial<IWaypoint>[]): Waypoint[] {
        const result: Waypoint[] = [];
        waypoints?.forEach((w) =>
            result.push(
                new this({
                    b: w.b ?? Waypoint.default.b,
                    x: w.x ?? Waypoint.default.x,
                    y: w.y ?? Waypoint.default.y,
                    d: w.d ?? Waypoint.default.d,
                    customData: w.customData ?? Waypoint.default.customData(),
                }),
            )
        );
        if (result.length) {
            return result;
        }
        return [
            new this({
                b: Waypoint.default.b,
                x: Waypoint.default.x,
                y: Waypoint.default.y,
                d: Waypoint.default.d,
                customData: Waypoint.default.customData(),
            }),
        ];
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

    setCustomData(value: NonNullable<IWaypoint['customData']>): this {
        this.customData = value;
        return this;
    }
    addCustomData(object: IWaypoint['customData']): this {
        this.customData = { ...this.customData, object };
        return this;
    }

    mirror() {
        this.posX = LINE_COUNT - 1 - this.posX;
        switch (this.direction) {
            case 2:
                this.direction = 3;
                break;
            case 3:
                this.direction = 2;
                break;
            case 6:
                this.direction = 7;
                break;
            case 7:
                this.direction = 6;
                break;
            case 4:
                this.direction = 5;
                break;
            case 5:
                this.direction = 4;
                break;
        }
        return this;
    }

    isValid(): boolean {
        return this.direction >= 0 && this.direction <= 9;
    }
}

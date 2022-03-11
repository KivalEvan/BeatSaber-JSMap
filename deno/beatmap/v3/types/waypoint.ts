import { IBaseObject, BaseObject } from './baseObject.ts';
import { LINE_COUNT } from './constants.ts';

/** Waypoint beatmap object. */
export interface IWaypoint extends IBaseObject {
    /** Position x `<int>` of waypoint.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `unknown`
     */
    x: number;
    /** Position y `<int>` of waypoint.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `unknown`
     */
    y: number;
    /** Offset direction `<int>` of waypoint.
     * ```ts
     * 4 | 0 | 5
     * 2 | 8 | 3
     * 6 | 1 | 7
     * ```
     * ---
     * Grid represents cut direction from center.
     */
    d: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
}

/** Boost event beatmap object. */
export class Waypoint extends BaseObject<IWaypoint> {
    private x;
    private y;
    private d;
    constructor(waypoint: IWaypoint) {
        super(waypoint);
        this.x = waypoint.x;
        this.y = waypoint.y;
        this.d = waypoint.d;
    }

    public toObject(): IWaypoint {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            d: this.direction,
        };
    }

    get posX() {
        return this.x;
    }
    set posX(value: IWaypoint['x']) {
        this.x = value;
    }

    get posY() {
        return this.y;
    }
    set posY(value: IWaypoint['y']) {
        this.y = value;
    }

    get direction() {
        return this.d;
    }
    set direction(value: IWaypoint['d']) {
        this.d = value;
    }

    public mirror() {
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
    }
}

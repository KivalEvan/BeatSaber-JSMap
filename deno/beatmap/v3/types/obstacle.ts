import { IBaseObject, BaseObject } from './baseObject.ts';
import { LINE_COUNT } from './constants.ts';

/** obstacle beatmap object. */
export interface IObstacle extends IBaseObject {
    /** Position x `<int>` of obstacle.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `none`
     */
    x: number;
    /** Position y `<int>` of obstacle.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    y: number;
    /** Duration `<float>` of obstacle.*/
    d: number;
    /** Width `<int>` of obstacle.
     * ---
     * Range: `none`
     */
    w: number;
    /** Height `<int>` of obstacle.
     * ```ts
     * 1 -> Short
     * 2 -> Moderate
     * 3 -> Crouch
     * 4 -> Tall
     * 5 -> Full
     * ```
     * ---
     * Range: `1-5`
     */
    h: number;
}

export class Obstacle extends BaseObject<IObstacle> {
    private x;
    private y;
    private d;
    private w;
    private h;
    constructor(obstacle: Required<IObstacle>) {
        super(obstacle);
        this.x = obstacle.x;
        this.y = obstacle.y;
        this.d = obstacle.d;
        this.w = obstacle.w;
        this.h = obstacle.h;
    }

    static create(): Obstacle;
    static create(obstacles: Partial<IObstacle>): Obstacle;
    static create(...obstacles: Partial<IObstacle>[]): Obstacle[];
    static create(...obstacles: Partial<IObstacle>[]): Obstacle | Obstacle[] {
        const result: Obstacle[] = [];
        obstacles?.forEach((o) =>
            result.push(
                new Obstacle({
                    b: o.b ?? 0,
                    x: o.x ?? 0,
                    y: o.y ?? 0,
                    d: o.d ?? 1,
                    w: o.w ?? 1,
                    h: o.h ?? 1,
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new Obstacle({
            b: 0,
            x: 0,
            y: 0,
            d: 1,
            w: 1,
            h: 1,
        });
    }

    public toObject(): IObstacle {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            d: this.duration,
            w: this.width,
            h: this.height,
        };
    }

    get posX() {
        return this.x;
    }
    set posX(value: IObstacle['x']) {
        this.x = value;
    }

    get posY() {
        return this.y;
    }
    set posY(value: IObstacle['y']) {
        this.y = value;
    }

    get duration() {
        return this.d;
    }
    set duration(value: IObstacle['d']) {
        this.d = value;
    }

    get width() {
        return this.w;
    }
    set width(value: IObstacle['w']) {
        this.w = value;
    }
    get height() {
        return this.h;
    }
    set height(value: IObstacle['h']) {
        this.h = value;
    }

    /** Check if obstacle is interactive.
     * ```ts
     * if (isInteractive(wall)) {}
     * ```
     */
    // FIXME: there are a lot more other variables
    public isInteractive() {
        return this.w - this.x > 1 || this.x === 1 || this.x === 2;
    }

    /** Check if obstacle is crouch.
     * ```ts
     * if (isCrouch(wall)) {}
     * ```
     */
    // FIXME: doesnt work properly
    public isCrouch() {
        return this.y === 2 && (this.w > 2 || (this.w === 2 && this.x === 1));
    }

    /** Check if obstacle has zero value.
     * ```ts
     * if (hasZero(wall)) {}
     * ```
     */
    public hasZero() {
        return this.d === 0 || this.w === 0 || this.h === 0;
    }

    public mirror() {
        this.x = LINE_COUNT - 1 - this.x;
    }

    /** Get obstacle and return the Beatwalls' position x and y value in tuple.
     * ```ts
     * const obstaclePos = getPosition(wall);
     * ```
     */
    public getPosition(): [number, number] {
        // if (obstacle._customData?._position) {
        //     return [obstacle._customData._position[0], obstacle._customData._position[1]];
        // }
        return [
            (this.posX <= -1000
                ? this.posX / 1000
                : this.posX >= 1000
                ? this.posX / 1000
                : this.posX) - 2,
            (this.posY <= -1000
                ? this.posY / 1000
                : this.posY >= 1000
                ? this.posY / 1000
                : this.posY) - 0.5,
        ];
    }

    /** Check if current obstacle is longer than previous obstacle.
     * ```ts
     * if (isLonger(currWall, prevWall)) {}
     * ```
     */
    public isLonger(compareTo: Obstacle, prevOffset = 0): boolean {
        return (
            this.time + this.duration > compareTo.time + compareTo.duration + prevOffset
        );
    }

    /** Check if obstacle has Mapping Extensions properties.
     * ```ts
     * if (hasMappingExtensions(wall)) {}
     * ```
     */
    public hasMappingExtensions(): boolean {
        return this.posY < 0 || this.posY > 2;
    }

    /** Check if obstacle is a valid, vanilla obstacle.
     * ```ts
     * if (isValid(wall)) {}
     * ```
     */
    public isValid(): boolean {
        return !this.hasMappingExtensions() && !this.hasZero();
    }
}

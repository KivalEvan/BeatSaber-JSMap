import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { BaseObject } from './baseObject.ts';
import { LINE_COUNT } from '../shared/constants.ts';

/** Obstacle beatmap object. */
export class Obstacle extends BaseObject<IObstacle> {
    static default: Required<IObstacle> = {
        b: 0,
        x: 0,
        y: 0,
        d: 1,
        w: 1,
        h: 1,
    };

    private constructor(obstacle: Required<IObstacle>) {
        super(obstacle);
    }

    static create(): Obstacle;
    static create(obstacles: Partial<IObstacle>): Obstacle;
    static create(...obstacles: Partial<IObstacle>[]): Obstacle[];
    static create(...obstacles: Partial<IObstacle>[]): Obstacle | Obstacle[] {
        const result: Obstacle[] = [];
        obstacles?.forEach((o) =>
            result.push(
                new Obstacle({
                    b: o.b ?? Obstacle.default.b,
                    x: o.x ?? Obstacle.default.x,
                    y: o.y ?? Obstacle.default.y,
                    d: o.d ?? Obstacle.default.d,
                    w: o.w ?? Obstacle.default.w,
                    h: o.h ?? Obstacle.default.h,
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
            b: Obstacle.default.b,
            x: Obstacle.default.x,
            y: Obstacle.default.y,
            d: Obstacle.default.d,
            w: Obstacle.default.w,
            h: Obstacle.default.h,
        });
    }

    toObject(): IObstacle {
        return {
            b: this.time,
            x: this.posX,
            y: this.posY,
            d: this.duration,
            w: this.width,
            h: this.height,
        };
    }

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
    get posX() {
        return this.data.x;
    }
    set posX(value: IObstacle['x']) {
        this.data.x = value;
    }

    /** Position y `<int>` of obstacle.
     * ```ts
     * 0 -> Bottom row
     * 1 -> Middle row
     * 2 -> Top row
     * ```
     * ---
     * Range: `0-2`
     */
    get posY() {
        return this.data.y;
    }
    set posY(value: IObstacle['y']) {
        this.data.y = value;
    }

    /** Duration `<float>` of obstacle.*/
    get duration() {
        return this.data.d;
    }
    set duration(value: IObstacle['d']) {
        this.data.d = value;
    }

    /** Width `<int>` of obstacle.
     * ---
     * Range: `none`
     */
    get width() {
        return this.data.w;
    }
    set width(value: IObstacle['w']) {
        this.data.w = value;
    }

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
    get height() {
        return this.data.h;
    }
    set height(value: IObstacle['h']) {
        this.data.h = value;
    }

    setPosX(value: IObstacle['x']) {
        this.posX = value;
        return this;
    }
    setPosY(value: IObstacle['y']) {
        this.posY = value;
        return this;
    }
    setDuration(value: IObstacle['d']) {
        this.duration = value;
        return this;
    }
    setWidth(value: IObstacle['w']) {
        this.width = value;
        return this;
    }
    setHeight(value: IObstacle['h']) {
        this.height = value;
        return this;
    }

    mirror() {
        this.posX = LINE_COUNT - 1 - this.posX;
        return this;
    }

    /** Check if obstacle is interactive.
     * ```ts
     * if (wall.isInteractive()) {}
     * ```
     */
    // FIXME: there are a lot more other variables
    isInteractive() {
        return this.width - this.posX > 1 || this.posX === 1 || this.posX === 2;
    }

    /** Check if obstacle is crouch.
     * ```ts
     * if (wall.isCrouch()) {}
     * ```
     */
    // FIXME: doesnt work properly
    isCrouch() {
        return (
            this.posY === 2 &&
            this.isInteractive() &&
            (this.width > 2 || (this.width === 2 && this.posX === 1))
        );
    }

    /** Check if obstacle has zero value.
     * ```ts
     * if (wall.hasZero()) {}
     * ```
     */
    hasZero() {
        return this.duration === 0 || this.width === 0 || this.height === 0;
    }

    /** Check if obstacle is crouch.
     * ```ts
     * if (wall.hasNegative()) {}
     * ```
     */
    hasNegative() {
        return this.posY < 0 || this.duration < 0 || this.width < 0 || this.height < 0;
    }

    /** Get obstacle and return the Beatwalls' position x and y value in tuple.
     * ```ts
     * const obstaclePos = wall.getPosition();
     * ```
     */
    getPosition(): [number, number] {
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
     * if (wall.isLonger(compareWall)) {}
     * ```
     */
    isLonger(compareTo: Obstacle, prevOffset = 0): boolean {
        return (
            this.time + this.duration > compareTo.time + compareTo.duration + prevOffset
        );
    }

    /** Check if obstacle has Mapping Extensions properties.
     * ```ts
     * if (wall.hasMappingExtensions()) {}
     * ```
     */
    hasMappingExtensions(): boolean {
        return this.posY > 2 || this.posX <= -1000 || this.posX >= 1000;
    }

    /** Check if obstacle is a valid, vanilla obstacle.
     * ```ts
     * if (wall.isValid()) {}
     * ```
     */
    isValid(): boolean {
        return !this.hasMappingExtensions() && !this.hasZero() && !this.hasNegative();
    }
}
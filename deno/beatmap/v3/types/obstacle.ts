import { BaseObject } from './baseObject.ts';

/** obstacle beatmap object. */
export interface Obstacle extends BaseObject {
    /** Position x `<int>` of obstacle.
     * ```ts
     * 0 -> Outer Left
     * 1 -> Middle Left
     * 2 -> Middle Right
     * 3 -> Outer Right
     * ```
     * ---
     * Range: `nonet`
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

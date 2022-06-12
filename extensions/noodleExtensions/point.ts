import { Vector2 } from '../../types/beatmap/shared/heck.ts';

/** Create points around circle, higher precision is more accurate. */
export function createCircle(radius: number, precision: number) {
    const points: Vector2[] = [];
    for (let i = 0; i < precision; i++) {
        points.push([
            radius * Math.cos(((2 * Math.PI) / precision) * i),
            radius * Math.sin(((2 * Math.PI) / precision) * i),
        ]);
    }
    return points;
}

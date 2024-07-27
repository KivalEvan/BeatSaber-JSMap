import type { Vector2 } from '../../vector.ts';

/** Function to mirror an object with arbitrary value. */
export type MirrorFn<T> = (object: T) => T;

/** Function to get angle from an object with arbitrary value. */
export type GetAngleFn<T> = (object: T) => number | null | undefined;

/** Function to get position from an object with arbitrary value. */
export type GetPositionFn<T> = (object: T) => Vector2 | null | undefined;

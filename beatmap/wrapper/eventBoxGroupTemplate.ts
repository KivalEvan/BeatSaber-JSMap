import { WrapEventBoxGroup } from './eventBoxGroup.ts';

/** Base event box group template beatmap class object. */
export abstract class WrapEventBoxGroupTemplate<T extends Record<keyof T, unknown>> extends WrapEventBoxGroup<T> {}

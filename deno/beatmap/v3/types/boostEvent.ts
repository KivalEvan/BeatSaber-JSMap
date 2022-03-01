import { BaseObject } from './baseObject.ts';

/** Boost event beatmap object. */
export interface BoostEvent extends BaseObject {
    /** Toggle `<boolean>` of boost event. */
    o: boolean;
}

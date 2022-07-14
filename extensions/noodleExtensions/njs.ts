import { NoteJumpSpeed } from '../../beatmap/shared/njs.ts';
import { INEObject } from './types/object.ts';
import { settings } from './settings.ts';
import { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import { EasingFunction } from '../../types/easings.ts';
import { lerp, normalize } from '../../utils/math.ts';
import logger from '../../logger.ts';

const tag = (name: string) => {
    return `[ext::NE::njs::${name}]`;
};

/** Set NJS to object from start to end object.
 *
 * **NOTE:** JD input will override NJS offset.
 */
export function setNJS(
    objects: INEObject[],
    options: {
        bpm: BeatPerMinute;
        njs: NoteJumpSpeed | number;
        offset?: number;
        jd?: number;
    },
): void {
    if (!objects.length) {
        logger.warn(tag('setNJS'), 'No object(s) received.');
        return;
    }
    const njs = typeof options.njs === 'number'
        ? NoteJumpSpeed.create(options.bpm, options.njs, options.offset)
        : options.njs;
    const offset = njs.calcHJDFromJD(options.jd) - njs.calcHJDRaw();
    objects.forEach((o) => {
        o.customData.noteJumpMovementSpeed = njs.value;
        o.customData.noteJumpStartBeatOffset = offset;
    });
}

/** Simultaneously spawn the object from start to end object.
 *
 * Speed determines how fast should note spawn from start to end.
 */
export function simultaneousSpawn(
    objects: INEObject[],
    speed: number,
    njsOffset?: NoteJumpSpeed | number | null,
): void {
    if (!objects.length) {
        logger.warn(tag('simultaneousSpawn'), 'No object(s) received.');
        return;
    }
    if (!speed) {
        logger.error(tag('simultaneousSpawn'), 'Speed cannot be 0!');
        speed = 1;
    }
    let offset: number;
    if (typeof njsOffset !== 'number') {
        if (njsOffset) {
            offset = njsOffset.offset;
        } else {
            offset = settings.NJS?.offset ?? 0;
        }
    } else {
        offset = njsOffset;
    }
    const startTime = objects[0].time;
    objects.forEach((o) => {
        o.customData.noteJumpStartBeatOffset = offset + o.time - startTime - (o.time - startTime) / speed;
    });
}

/** Gradually change NJS for objects from start to end objects.
 *
 * **NOTE:** JD input will override NJS offset.
 */
export function gradientNJS(
    objects: INEObject[],
    options: {
        bpm: BeatPerMinute | number;
        njsStart: number;
        njsEnd: number;
        njsOffset?: NoteJumpSpeed | number | null;
        jd?: number;
        easing?: EasingFunction;
    },
): void {
    if (!objects.length) {
        logger.warn(tag('gradientNJS'), 'No object(s) received.');
        return;
    }
    options.easing = options.easing ??
        function (x: number) {
            return x;
        };
    let offset: number;
    if (typeof options.njsOffset !== 'number') {
        if (options.njsOffset) {
            offset = options.njsOffset.offset;
        } else {
            offset = settings.NJS?.offset ?? 0;
        }
    } else {
        offset = options.njsOffset;
    }
    const startTime = objects[0].time;
    const endTime = objects.at(-1)!.time;
    objects.forEach((o) => {
        o.customData.noteJumpMovementSpeed = lerp(
            normalize(o.time, startTime, endTime),
            options.njsStart,
            options.njsEnd,
            options.easing,
        );
        if (typeof options.jd === 'number') {
            const currNJS = NoteJumpSpeed.create(options.bpm, o.customData.noteJumpMovementSpeed, offset);
            o.customData.noteJumpStartBeatOffset = currNJS.calcHJDFromJD(options.jd) - currNJS.calcHJDRaw();
        }
    });
}

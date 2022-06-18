import { NoteJumpSpeed } from '../../beatmap/shared/njs.ts';
import { INETrackObject } from './types/track.ts';
import { NJS } from './settings.ts';
import logger from '../../logger.ts';
import { BeatPerMinute } from '../../beatmap/shared/bpm.ts';
import { EasingFunction } from '../../types/beatmap/shared/easings.ts';
import { lerp } from '../../utils/math.ts';

/** Simultaneously spawn the object from start to end object. */
export function simultaneousSpawn(
    objects: INETrackObject[],
    speed: number,
    njsOffset?: NoteJumpSpeed | number | null,
): void {
    if (speed === 0) {
        logger.warn('Speed cannot be 0');
        speed = 1;
    }
    let offset: number;
    if (typeof njsOffset !== 'number') {
        if (njsOffset) {
            offset = njsOffset.offset;
        } else {
            offset = NJS?.offset ?? 0;
        }
    } else {
        offset = njsOffset;
    }
    const startTime = objects[0].time;
    objects.forEach((o) => {
        o.customData.noteJumpStartBeatOffset = offset + o.time - startTime - (o.time - startTime) / speed;
    });
}

/** Gradually change NJS for objects from start to end objects. */
export function gradientNJS(
    objects: INETrackObject[],
    options: {
        njs: NoteJumpSpeed | number;
        bpm: BeatPerMinute | number;
        njsStart: number;
        njsEnd: number;
        jd?: number;
        easing?: EasingFunction;
    },
): void {
    const factor = (options.njsEnd - options.njsStart) / (objects[objects.length - 1]?.time - objects[0]?.time) || 1;
    let offset: number;
    options.easing = options.easing ??
        function (x: number) {
            return x;
        };
    if (typeof options.njs !== 'number') {
        offset = options.njs.offset;
    } else {
        options.njs = NoteJumpSpeed.create(options.bpm, options.njs);
        offset = 0;
    }
    objects.forEach((o) => {
        o.customData.noteJumpMovementSpeed = lerp(
            options.njsStart + (o.time - objects[0]?.time) * factor,
            options.njsStart,
            options.njsEnd,
            options.easing,
        ) || options.njsEnd;
        if (typeof options.jd === 'number') {
            o.customData.noteJumpStartBeatOffset =
                NoteJumpSpeed.create(options.bpm, o.customData.noteJumpMovementSpeed).calcHJDFromJD(options.jd) -
                (options.njs as NoteJumpSpeed).calcHJD(o.customData.noteJumpMovementSpeed) +
                offset;
        }
    });
}

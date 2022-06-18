import { NoteJumpSpeed } from '../../beatmap/shared/njs.ts';
import { INETrackObject } from './types/track.ts';
import { NJS } from './settings.ts';
import logger from '../../logger.ts';

export function simultaneousSpawn(objects: INETrackObject[], speed: number, njsOffset?: NoteJumpSpeed | number | null) {
    let offset: number;
    if (speed === 0) {
        logger.warn('Speed cannot be 0');
        speed = 1;
    }
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
    return objects.forEach((o) => {
        o.customData.noteJumpStartBeatOffset = offset + o.time - startTime - (o.time - startTime) / speed;
    });
}

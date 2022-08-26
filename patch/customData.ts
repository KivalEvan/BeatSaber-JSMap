import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { isV2 } from '../beatmap/version.ts';
import eventToV2 from '../converter/customData/eventToV2.ts';
import eventToV3 from '../converter/customData/eventToV3.ts';
import objectToV2 from '../converter/customData/objectToV2.ts';
import objectToV3 from '../converter/customData/objectToV3.ts';
import logger from '../logger.ts';

function patchV2(data: DifficultyV2) {
    logger.debug('[patch::customData] Patching notes');
    data.notes.forEach((n) => {
        n.customData = objectToV2(n.customData);
    });
    logger.debug('[patch::customData] Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV2(o.customData);
    });
    logger.debug('[patch::customData] Patching events');
    data.events.forEach((e) => {
        e.customData = eventToV2(e.customData);
        if (e.isLaserRotationEvent()) {
            if (typeof e.customData._preciseSpeed !== 'number') {
                delete e.customData._speed;
            }
        } else {
            delete e.customData._preciseSpeed;
        }
    });
}

function patchV3(data: DifficultyV3) {
    logger.debug('[patch::customData] Patching color notes');
    data.colorNotes.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.debug('[patch::customData] Patching bomb notes');
    data.bombNotes.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.debug('[patch::customData] Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.debug('[patch::customData] Patching fake color notes');
    data.customData.fakeColorNotes?.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.debug('[patch::customData] Patching fake bomb notes');
    data.customData.fakeBombNotes?.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.debug('[patch::customData] Patching fake obstacles');
    data.customData.fakeObstacles?.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.debug('[patch::customData] Patching basic events');
    data.basicBeatmapEvents.forEach((e) => {
        e.customData = eventToV3(e.customData);
    });
}

export function fixCustomData(data: DifficultyV2 | DifficultyV3) {
    if (isV2(data)) {
        logger.info('[patch::customData] Patching custom data for beatmap v2...');
        patchV2(data);
    } else {
        logger.info('[patch::customData] Patching custom data for beatmap v3...');
        patchV3(data);
    }
}

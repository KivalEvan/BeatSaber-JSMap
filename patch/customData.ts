import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { isV2 } from '../beatmap/version.ts';
import objectToV2 from '../converter/customData/objectToV2.ts';
import objectToV3 from '../converter/customData/objectToV3.ts';
import logger from '../logger.ts';

function patchCDV2(data: DifficultyV2) {
    data.notes.forEach((n) => {
        n.customData = objectToV2(n.customData);
    });
    data.obstacles.forEach((o) => {
        o.customData = objectToV2(o.customData);
    });
    data.events.forEach((e) => {
        e.customData = objectToV2(e.customData);
    });
}

function patchCDV3(data: DifficultyV3) {
    data.colorNotes.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    data.bombNotes.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    data.obstacles.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    data.customData.fakeColorNotes?.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    data.customData.fakeBombNotes?.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    data.customData.fakeObstacles?.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    data.basicBeatmapEvents.forEach((e) => {
        e.customData = objectToV3(e.customData);
    });
}

export function patchCustomData(data: DifficultyV2 | DifficultyV3) {
    if (isV2(data)) {
        logger.info('Patching custom data for beatmap v2...');
        patchCDV2(data);
    } else {
        logger.info('Patching custom data for beatmap v3...');
        patchCDV3(data);
    }
}

import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { isV2 } from '../beatmap/version.ts';
import eventToV2 from '../converter/customData/eventToV2.ts';
import eventToV3 from '../converter/customData/eventToV3.ts';
import objectToV2 from '../converter/customData/objectToV2.ts';
import objectToV3 from '../converter/customData/objectToV3.ts';
import logger from '../logger.ts';
import { IPointDefinition } from '../types/beatmap/v3/pointDefinition.ts';

function v2(data: DifficultyV2) {
    logger.debug('[patch::customData::v2] Patching notes');
    data.notes.forEach((n) => {
        n.customData = objectToV2(n.customData);
    });
    logger.debug('[patch::customData::v2] Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV2(o.customData);
    });
    logger.debug('[patch::customData::v2] Patching events');
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

function v3(data: DifficultyV3) {
    logger.debug('[patch::customData::v3] Patching color notes');
    data.colorNotes.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.debug('[patch::customData::v3] Patching bomb notes');
    data.bombNotes.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.debug('[patch::customData::v3] Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.debug('[patch::customData::v3] Patching fake color notes');
    data.customData.fakeColorNotes?.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.debug('[patch::customData::v3] Patching fake bomb notes');
    data.customData.fakeBombNotes?.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.debug('[patch::customData::v3] Patching fake obstacles');
    data.customData.fakeObstacles?.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.debug('[patch::customData::v3] Patching basic events');
    data.basicEvents.forEach((e) => {
        e.customData = eventToV3(e.customData);
    });
    logger.debug('[patch::customData::v3] Patching bookmarks');
    data.customData.bookmarks?.forEach((b) => {
        // deno-lint-ignore no-explicit-any
        if ((b as any)._time) {
            // deno-lint-ignore no-explicit-any
            b.b = (b as any)._time;
            // deno-lint-ignore no-explicit-any
            delete (b as any)._time;
        }
        // deno-lint-ignore no-explicit-any
        if ((b as any)._name) {
            // deno-lint-ignore no-explicit-any
            b.n = (b as any)._name;
            // deno-lint-ignore no-explicit-any
            delete (b as any)._name;
        }
        // deno-lint-ignore no-explicit-any
        if ((b as any)._color) {
            // deno-lint-ignore no-explicit-any
            b.c = (b as any)._color;
            // deno-lint-ignore no-explicit-any
            delete (b as any)._color;
        }
    });
    logger.debug('[patch::customData::v3] Patching BPM changes');
    data.customData.BPMChanges?.forEach((bpmc) => {
        // deno-lint-ignore no-explicit-any
        if ((bpmc as any)._time) {
            // deno-lint-ignore no-explicit-any
            bpmc.b = (bpmc as any)._time;
            // deno-lint-ignore no-explicit-any
            delete (bpmc as any)._time;
        }
        // deno-lint-ignore no-explicit-any
        if ((bpmc as any)._BPM) {
            // deno-lint-ignore no-explicit-any
            bpmc.m = (bpmc as any)._BPM;
            // deno-lint-ignore no-explicit-any
            delete (bpmc as any)._BPM;
        }
        // deno-lint-ignore no-explicit-any
        if ((bpmc as any)._beatsPerBar) {
            // deno-lint-ignore no-explicit-any
            bpmc.p = (bpmc as any)._beatsPerBar;
            // deno-lint-ignore no-explicit-any
            delete (bpmc as any)._beatsPerBar;
        }
        // deno-lint-ignore no-explicit-any
        if ((bpmc as any)._metronomeOffset) {
            // deno-lint-ignore no-explicit-any
            bpmc.o = (bpmc as any)._metronomeOffset;
            // deno-lint-ignore no-explicit-any
            delete (bpmc as any)._metronomeOffset;
        }
    });
    logger.debug('[patch::customData::v3] Patching environment');
    data.customData.environment?.forEach((env) => {
        // deno-lint-ignore no-explicit-any
        if ((env as any).lightID) {
            // deno-lint-ignore no-explicit-any
            const id = (env as any).lightID as number;
            if (env.components) {
                if (env.components.ILightWithId) {
                    env.components.ILightWithId.lightID ??= id;
                } else {
                    env.components.ILightWithId = { lightID: id };
                }
            } else {
                env.components = { ILightWithId: { lightID: id } };
            }
            // deno-lint-ignore no-explicit-any
            delete (env as any).lightID;
        }
    });
    logger.debug('[patch::customData::v3] Patching point definitions');
    if (Array.isArray(data.customData.pointDefinitions)) {
        const fixedObj: IPointDefinition = {};
        data.customData.pointDefinitions.forEach((pd) => (fixedObj[pd.name as string] = pd.points));
        data.customData.pointDefinitions = fixedObj;
    }
}

export default function (data: DifficultyV2 | DifficultyV3) {
    if (isV2(data)) {
        logger.info('[patch::customDataUpdate] Patching custom data for beatmap v2...');
        v2(data);
    } else {
        logger.info('[patch::customDataUpdate] Patching custom data for beatmap v3...');
        v3(data);
    }
}

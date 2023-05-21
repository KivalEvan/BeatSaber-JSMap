// deno-lint-ignore-file no-explicit-any
import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { isV2, isV3 } from '../beatmap/version.ts';
import eventToV2 from '../converter/customData/eventToV2.ts';
import eventToV3 from '../converter/customData/eventToV3.ts';
import objectToV2 from '../converter/customData/objectToV2.ts';
import objectToV3 from '../converter/customData/objectToV3.ts';
import logger from '../logger.ts';
import { IPointDefinition } from '../types/beatmap/v3/custom/pointDefinition.ts';
import { IWrapDifficulty } from '../types/beatmap/wrapper/difficulty.ts';

function tag(name: string): string[] {
    return ['patch', 'customDataUpdate', name];
}

function v2(data: DifficultyV2) {
    logger.tDebug(tag('v2'), ' Patching notes');
    data.colorNotes.forEach((n) => {
        n.customData = objectToV2(n.customData);
    });
    logger.tDebug(tag('v2'), ' Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV2(o.customData);
    });
    logger.tDebug(tag('v2'), ' Patching events');
    data.basicEvents.forEach((e) => {
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
    logger.tDebug(tag('v3'), ' Patching color notes');
    data.colorNotes.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.tDebug(tag('v3'), ' Patching bomb notes');
    data.bombNotes.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.tDebug(tag('v3'), ' Patching obstacles');
    data.obstacles.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.tDebug(tag('v3'), ' Patching fake color notes');
    data.customData.fakeColorNotes?.forEach((n) => {
        n.customData = objectToV3(n.customData);
    });
    logger.tDebug(tag('v3'), ' Patching fake bomb notes');
    data.customData.fakeBombNotes?.forEach((b) => {
        b.customData = objectToV3(b.customData);
    });
    logger.tDebug(tag('v3'), ' Patching fake obstacles');
    data.customData.fakeObstacles?.forEach((o) => {
        o.customData = objectToV3(o.customData);
    });
    logger.tDebug(tag('v3'), ' Patching basic events');
    data.basicEvents.forEach((e) => {
        e.customData = eventToV3(e.customData);
    });
    logger.tDebug(tag('v3'), ' Patching bookmarks');
    data.customData.bookmarks?.forEach((b) => {
        if ((b as any)._time) {
            b.b = (b as any)._time;
            delete (b as any)._time;
        }
        if ((b as any)._name) {
            b.n = (b as any)._name;
            delete (b as any)._name;
        }
        if ((b as any)._color) {
            b.c = (b as any)._color;
            delete (b as any)._color;
        }
    });
    logger.tDebug(tag('v3'), ' Patching BPM changes');
    data.customData.BPMChanges?.forEach((bpmc) => {
        if ((bpmc as any)._time) {
            bpmc.b = (bpmc as any)._time;
            delete (bpmc as any)._time;
        }
        if ((bpmc as any)._BPM) {
            bpmc.m = (bpmc as any)._BPM;
            delete (bpmc as any)._BPM;
        }
        if ((bpmc as any)._beatsPerBar) {
            bpmc.p = (bpmc as any)._beatsPerBar;
            delete (bpmc as any)._beatsPerBar;
        }
        if ((bpmc as any)._metronomeOffset) {
            bpmc.o = (bpmc as any)._metronomeOffset;
            delete (bpmc as any)._metronomeOffset;
        }
    });
    logger.tDebug(tag('v3'), ' Patching environment');
    data.customData.environment?.forEach((env) => {
        if ((env as any).lightID) {
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
            delete (env as any).lightID;
        }
    });
    logger.tDebug(tag('v3'), ' Patching point definitions');
    if (Array.isArray(data.customData.pointDefinitions)) {
        const fixedObj: IPointDefinition = {};
        data.customData.pointDefinitions.forEach((pd) => (fixedObj[pd.name as string] = pd.points));
        data.customData.pointDefinitions = fixedObj;
    }
}

export default function (data: IWrapDifficulty) {
    if (isV2(data)) {
        logger.tInfo(['patch', 'customDataUpdate'], 'Patching custom data for beatmap v2...');
        v2(data);
    } else if (isV3(data)) {
        logger.tInfo(['patch', 'customDataUpdate'], 'Patching custom data for beatmap v3...');
        v3(data);
    }
}

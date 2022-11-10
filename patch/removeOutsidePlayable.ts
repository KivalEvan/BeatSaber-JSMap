import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { isV2 } from '../beatmap/version.ts';
import logger from '../logger.ts';
import { BeatPerMinute } from '../beatmap/shared/bpm.ts';
import { IWrapBaseObject } from '../types/beatmap/wrapper/baseObject.ts';

let duration = 0;
const filterTime = <T extends IWrapBaseObject>(obj: T) =>
    duration ? !(obj.time < 0 || obj.time > duration) : !(obj.time < 0);

function v2(data: DifficultyV2) {
    logger.debug('[patch::removeOutsidePlayable::v2] Removing outside playable notes');
    data.notes = data.notes.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v2] Removing outside playable obstacles',
    );
    data.obstacles = data.obstacles.filter(filterTime);
    logger.debug('[patch::removeOutsidePlayable::v2] Removing outside playable events');
    data.events = data.events.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v2] Removing outside playable waypoints',
    );
    data.waypoints = data.waypoints.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v2] Removing outside playable sliders',
    );
    data.sliders = data.sliders.filter((obj) => duration ? !(obj.time < 0 || obj.time > duration) : !(obj.time < 0));
}

function v3(data: DifficultyV3) {
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable BPM events',
    );
    data.bpmEvents = data.bpmEvents.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable rotation events',
    );
    data.rotationEvents = data.rotationEvents.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable color notes',
    );
    data.colorNotes = data.colorNotes.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable bomb notes',
    );
    data.bombNotes = data.bombNotes.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable obstacles',
    );
    data.obstacles = data.obstacles.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable sliders',
    );
    data.sliders = data.sliders.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable burst sliders',
    );
    data.burstSliders = data.burstSliders.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable waypoints',
    );
    data.waypoints = data.waypoints.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable fake color notes',
    );
    if (data.customData.fakeColorNotes) {
        data.customData.fakeColorNotes = data.customData.fakeColorNotes.filter((obj) =>
            duration ? !(obj.b < 0 || obj.b > duration) : !(obj.b < 0)
        );
    }
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable fake bomb notes',
    );
    if (data.customData.fakeBombNotes) {
        data.customData.fakeBombNotes = data.customData.fakeBombNotes.filter((obj) =>
            duration ? !(obj.b < 0 || obj.b > duration) : !(obj.b < 0)
        );
    }
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable fake obstacles',
    );
    if (data.customData.fakeObstacles) {
        data.customData.fakeObstacles = data.customData.fakeObstacles.filter((obj) =>
            duration ? !(obj.b < 0 || obj.b > duration) : !(obj.b < 0)
        );
    }
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable fake burst sliders',
    );
    if (data.customData.fakeBurstSliders) {
        data.customData.fakeBurstSliders = data.customData.fakeBurstSliders.filter(
            (obj) => (duration ? !(obj.b < 0 || obj.b > duration) : !(obj.b < 0)),
        );
    }
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable basic events',
    );
    data.basicEvents = data.basicEvents.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable color boost beatmap events',
    );
    data.colorBoostEvents = data.colorBoostEvents.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable light color event box groups',
    );
    data.lightColorEventBoxGroups = data.lightColorEventBoxGroups.filter(filterTime);
    logger.debug(
        '[patch::removeOutsidePlayable::v3] Removing outside playable light rotation event box groups',
    );
    data.lightRotationEventBoxGroups = data.lightRotationEventBoxGroups.filter(filterTime);
}

export default function (
    data: DifficultyV2 | DifficultyV3,
    bpm: BeatPerMinute,
    audioLength: number,
) {
    duration = bpm.toBeatTime(audioLength, true);
    if (isV2(data)) {
        logger.info(
            '[patch::removeOutsidePlayable] Removing outside playable object(s) for beatmap v2...',
        );
        v2(data);
    } else {
        logger.info(
            '[patch::removeOutsidePlayable] Removing outside playable object(s) for beatmap v3...',
        );
        v3(data);
    }
}

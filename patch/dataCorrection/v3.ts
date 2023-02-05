import { Difficulty } from '../../beatmap/v3/difficulty.ts';
import { ColorNote } from '../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../beatmap/v3/obstacle.ts';
import { BasicEvent } from '../../beatmap/v3/basicEvent.ts';
import { Waypoint } from '../../beatmap/v3/waypoint.ts';
import { Slider } from '../../beatmap/v3/slider.ts';
import { RotationEvent } from '../../beatmap/v3/rotationEvent.ts';
import { BPMEvent } from '../../beatmap/v3/bpmEvent.ts';
import { BombNote } from '../../beatmap/v3/bombNote.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { BurstSlider } from '../../beatmap/v3/burstSlider.ts';
import { IBurstSlider } from '../../types/beatmap/v3/burstSlider.ts';
import { ColorBoostEvent } from '../../beatmap/v3/colorBoostEvent.ts';
import { fixBoolean, fixFloat, fixInt } from './helpers.ts';
import { LightColorEventBoxGroup } from '../../beatmap/v3/lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from '../../beatmap/v3/lightRotationEventBoxGroup.ts';
import { IndexFilter } from '../../beatmap/v3/indexFilter.ts';
import { LightColorBase } from '../../beatmap/v3/lightColorBase.ts';
import { LightColorEventBox } from '../../beatmap/v3/lightColorEventBox.ts';
import { LightRotationBase } from '../../beatmap/v3/lightRotationBase.ts';
import { LightRotationEventBox } from '../../beatmap/v3/lightRotationEventBox.ts';
import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { fixCustomDataEvent } from './customDataEvent.ts';
import { fixCustomDataObject } from './customDataObject.ts';
import logger from '../../logger.ts';
import { LightTranslationBase } from '../../beatmap/v3/lightTranslationBase.ts';
import { LightTranslationEventBox } from '../../beatmap/v3/lightTranslationEventBox.ts';
import { LightTranslationEventBoxGroup } from '../../beatmap/v3/lightTranslationEventBoxGroup.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';

function fixBpmEvent(obj: BPMEvent) {
    obj.time = fixFloat(obj.time, BPMEvent.default.b);
    obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: RotationEvent) {
    obj.time = fixFloat(obj.time, RotationEvent.default.b);
    obj.executionTime = fixInt(obj.executionTime, RotationEvent.default.e, [0, 1]);
    obj.rotation = fixFloat(obj.rotation, RotationEvent.default.r);
}

function fixColorNote(obj: ColorNote) {
    obj.time = fixFloat(obj.time, ColorNote.default.b);
    obj.color = fixInt(obj.color, [0, 1], [0, 1]);
    obj.posX = fixInt(obj.posX, ColorNote.default.x);
    obj.posY = fixInt(obj.posY, ColorNote.default.y);
    obj.direction = fixInt(obj.direction, ColorNote.default.d);
    obj.angleOffset = fixInt(obj.angleOffset, ColorNote.default.a);
    fixCustomDataObject(obj.customData);
}

function fixFakeColorNote(obj: IColorNote) {
    obj.b = fixFloat(obj.b, ColorNote.default.b);
    obj.c = fixInt(obj.c, [0, 1], [0, 1]);
    obj.x = fixInt(obj.x, ColorNote.default.x);
    obj.y = fixInt(obj.y, ColorNote.default.y);
    obj.d = fixInt(obj.d, ColorNote.default.d);
    obj.a = fixInt(obj.a, ColorNote.default.a);
    fixCustomDataObject(obj.customData);
}

function fixBombNote(obj: BombNote) {
    obj.time = fixFloat(obj.time, BombNote.default.b);
    obj.posX = fixInt(obj.posX, BombNote.default.x);
    obj.posY = fixInt(obj.posY, BombNote.default.y);
    fixCustomDataObject(obj.customData);
}

function fixFakeBombNote(obj: IBombNote) {
    obj.b = fixFloat(obj.b, BombNote.default.b);
    obj.x = fixInt(obj.x, BombNote.default.x);
    obj.y = fixInt(obj.y, BombNote.default.y);
    fixCustomDataObject(obj.customData);
}

function fixObstacle(obj: Obstacle) {
    obj.time = fixFloat(obj.time, Obstacle.default.b);
    obj.posX = fixInt(obj.posX, Obstacle.default.x);
    obj.posY = fixInt(obj.posY, Obstacle.default.y);
    obj.duration = fixFloat(obj.duration, Obstacle.default.d);
    obj.width = fixInt(obj.width, Obstacle.default.w);
    obj.height = fixInt(obj.height, Obstacle.default.h);
    fixCustomDataObject(obj.customData);
}

function fixFakeObstacle(obj: IObstacle) {
    obj.b = fixFloat(obj.b, Obstacle.default.b);
    obj.x = fixInt(obj.x, Obstacle.default.x);
    obj.y = fixInt(obj.y, Obstacle.default.y);
    obj.d = fixFloat(obj.d, Obstacle.default.d);
    obj.w = fixInt(obj.w, Obstacle.default.w);
    obj.h = fixInt(obj.h, Obstacle.default.h);
    fixCustomDataObject(obj.customData);
}

function fixSlider(obj: Slider) {
    obj.time = fixFloat(obj.time, Slider.default.b);
    obj.color = fixInt(obj.color, [0, 1], [0, 1]);
    obj.posX = fixInt(obj.posX, Slider.default.x);
    obj.posY = fixInt(obj.posY, Slider.default.y);
    obj.direction = fixInt(obj.direction, Slider.default.d);
    obj.lengthMultiplier = fixFloat(obj.lengthMultiplier, Slider.default.mu);
    obj.tailTime = fixFloat(obj.tailTime, Slider.default.tb);
    obj.tailPosX = fixInt(obj.tailPosX, Slider.default.tx);
    obj.tailPosY = fixInt(obj.tailPosY, Slider.default.ty);
    obj.tailDirection = fixInt(obj.tailDirection, Slider.default.tc);
    obj.tailLengthMultiplier = fixFloat(obj.tailLengthMultiplier, Slider.default.tmu);
    obj.midAnchor = fixInt(obj.midAnchor, Slider.default.m);
    fixCustomDataObject(obj.customData);
}

function fixBurstSlider(obj: BurstSlider) {
    obj.time = fixFloat(obj.time, BurstSlider.default.b);
    obj.color = fixInt(obj.color, [0, 1], [0, 1]);
    obj.posX = fixInt(obj.posX, BurstSlider.default.x);
    obj.posY = fixInt(obj.posY, BurstSlider.default.y);
    obj.direction = fixInt(obj.direction, BurstSlider.default.d);
    obj.tailTime = fixFloat(obj.tailTime, BurstSlider.default.tb);
    obj.tailPosX = fixInt(obj.tailPosX, BurstSlider.default.tx);
    obj.tailPosY = fixInt(obj.tailPosY, BurstSlider.default.ty);
    obj.sliceCount = fixInt(obj.sliceCount, BurstSlider.default.sc) || 1;
    obj.squish = fixFloat(obj.squish, BurstSlider.default.s) || 0.001;
    fixCustomDataObject(obj.customData);
}

function fixFakeBurstSlider(obj: IBurstSlider) {
    obj.b = fixFloat(obj.b, BurstSlider.default.b);
    obj.c = fixInt(obj.c, [0, 1], [0, 1]);
    obj.x = fixInt(obj.x, BurstSlider.default.x);
    obj.y = fixInt(obj.y, BurstSlider.default.y);
    obj.d = fixInt(obj.d, BurstSlider.default.d);
    obj.tb = fixFloat(obj.tb, BurstSlider.default.tb);
    obj.tx = fixInt(obj.tx, BurstSlider.default.tx);
    obj.ty = fixInt(obj.ty, BurstSlider.default.ty);
    obj.sc = fixInt(obj.sc, BurstSlider.default.sc) || 1;
    obj.s = fixFloat(obj.s, BurstSlider.default.s) || 0.001;
    fixCustomDataObject(obj.customData);
}

function fixWaypoint(obj: Waypoint) {
    obj.time = fixFloat(obj.time, Waypoint.default.b);
    obj.posX = fixInt(obj.posX, Waypoint.default.x);
    obj.posY = fixInt(obj.posY, Waypoint.default.y);
    obj.direction = fixInt(obj.direction, Waypoint.default.d);
}

function fixBasicEvent(obj: BasicEvent) {
    obj.time = fixFloat(obj.time, BasicEvent.default.b);
    obj.type = fixInt(obj.type, BasicEvent.default.et);
    obj.value = fixInt(obj.value, BasicEvent.default.i);
    obj.floatValue = fixFloat(obj.floatValue, BasicEvent.default.f);
    fixCustomDataEvent(obj.customData);
}

function fixColorBoostEvent(obj: ColorBoostEvent) {
    obj.time = fixFloat(obj.time, ColorBoostEvent.default.b);
    obj.toggle = fixBoolean(obj.toggle, ColorBoostEvent.default.o);
}

function fixIndexFilter(obj: IndexFilter) {
    obj.type = fixInt(obj.type, IndexFilter.default.f, [1, 2]);
    obj.p0 = fixInt(obj.p0, IndexFilter.default.p);
    obj.p1 = fixInt(obj.p1, IndexFilter.default.t);
    obj.reverse = fixInt(obj.reverse, IndexFilter.default.r, [0, 1]);
    obj.chunks = fixInt(obj.chunks, IndexFilter.default.c);
    obj.random = fixInt(obj.random, IndexFilter.default.n, [0, 1, 2, 3]);
    obj.seed = fixInt(obj.seed, IndexFilter.default.s);
    obj.limit = fixFloat(obj.limit, IndexFilter.default.l, 0, 1);
    obj.limitAffectsType = fixInt(obj.limitAffectsType, IndexFilter.default.d, [0, 1, 2, 3]);
}

function fixLightColorBase(obj: LightColorBase) {
    obj.time = fixFloat(obj.time, LightColorBase.default.b);
    obj.transition = fixInt(obj.transition, LightColorBase.default.i, [0, 1, 2]);
    obj.color = obj.transition === 2
        ? fixInt(obj.color, -1, [-1, 0, 1, 2])
        : fixInt(obj.color, LightColorBase.default.c, [0, 1, 2]);
    obj.brightness = fixFloat(obj.brightness, LightColorBase.default.s);
    obj.frequency = fixInt(obj.frequency, LightColorBase.default.f);
}

function fixLightColorEventBox(obj: LightColorEventBox) {
    fixIndexFilter(obj.filter);
    obj.beatDistribution = fixFloat(obj.beatDistribution, LightColorEventBox.default.w);
    obj.beatDistributionType = fixInt(
        obj.beatDistributionType,
        LightColorEventBox.default.d,
        [1, 2],
    );
    obj.brightnessDistribution = fixFloat(obj.brightnessDistribution, LightColorEventBox.default.r);
    obj.brightnessDistributionType = fixInt(
        obj.brightnessDistributionType,
        LightColorEventBox.default.t,
        [1, 2],
    );
    obj.affectFirst = fixInt<ILightColorEventBox['b']>(
        obj.affectFirst,
        LightColorEventBox.default.b,
        [0, 1],
    );
    obj.events.forEach(fixLightColorBase);
}

function fixLightColorEventBoxGroup(obj: LightColorEventBoxGroup) {
    obj.time = fixFloat(obj.time, LightColorEventBoxGroup.default.b);
    obj.id = fixInt(obj.id, LightColorEventBoxGroup.default.g);
    obj.boxes.forEach(fixLightColorEventBox);
}

function fixLightRotationBase(obj: LightRotationBase) {
    obj.time = fixFloat(obj.time, LightRotationBase.default.b);
    obj.previous = fixInt(obj.previous, LightRotationBase.default.p, [0, 1]);
    obj.easing = fixInt(obj.easing, LightRotationBase.default.e, [-1, 0, 1, 2, 3]);
    obj.loop = fixInt(obj.loop, LightRotationBase.default.l);
    obj.rotation = fixFloat(obj.rotation, LightRotationBase.default.r);
    obj.direction = fixInt(obj.direction, LightRotationBase.default.o, [0, 1, 2]);
}

function fixLightRotationEventBox(obj: LightRotationEventBox) {
    fixIndexFilter(obj.filter);
    obj.beatDistribution = fixFloat(obj.beatDistribution, LightRotationEventBox.default.w);
    obj.beatDistributionType = fixInt(
        obj.beatDistributionType,
        LightRotationEventBox.default.d,
        [1, 2],
    );
    obj.rotationDistribution = fixFloat(obj.rotationDistribution, LightRotationEventBox.default.s);
    obj.rotationDistributionType = fixInt(
        obj.rotationDistributionType,
        LightRotationEventBox.default.t,
        [1, 2],
    );
    obj.axis = fixInt(obj.axis, LightRotationEventBox.default.a, [0, 1, 2]);
    obj.flip = fixInt<ILightRotationEventBox['r']>(
        obj.flip,
        LightRotationEventBox.default.r,
        [0, 1],
    );
    obj.affectFirst = fixInt<ILightRotationEventBox['b']>(
        obj.affectFirst,
        LightRotationEventBox.default.b,
        [0, 1],
    );
    obj.events.forEach(fixLightRotationBase);
}

function fixLightRotationEventBoxGroup(obj: LightRotationEventBoxGroup) {
    obj.time = fixFloat(obj.time, LightRotationEventBoxGroup.default.b);
    obj.id = fixInt(obj.id, LightRotationEventBoxGroup.default.g);
    obj.boxes.forEach(fixLightRotationEventBox);
}

function fixLightTranslationBase(obj: LightTranslationBase) {
    obj.time = fixFloat(obj.time, LightTranslationBase.default.b);
    obj.previous = fixInt(obj.previous, LightTranslationBase.default.p, [0, 1]);
    obj.easing = fixInt(obj.easing, LightTranslationBase.default.e, [-1, 0, 1, 2, 3]);
    obj.translation = fixFloat(obj.translation, LightTranslationBase.default.t);
}

function fixLightTranslationEventBox(obj: LightTranslationEventBox) {
    fixIndexFilter(obj.filter);
    obj.beatDistribution = fixFloat(obj.beatDistribution, LightTranslationEventBox.default.w);
    obj.beatDistributionType = fixInt(
        obj.beatDistributionType,
        LightTranslationEventBox.default.d,
        [1, 2],
    );
    obj.translationDistribution = fixFloat(
        obj.translationDistribution,
        LightTranslationEventBox.default.s,
    );
    obj.translationDistributionType = fixInt(
        obj.translationDistributionType,
        LightTranslationEventBox.default.t,
        [1, 2],
    );
    obj.axis = fixInt(obj.axis, LightTranslationEventBox.default.a, [0, 1, 2]);
    obj.flip = fixInt<ILightTranslationEventBox['r']>(
        obj.flip,
        LightTranslationEventBox.default.r,
        [0, 1],
    );
    obj.affectFirst = fixInt<ILightTranslationEventBox['b']>(
        obj.affectFirst,
        LightTranslationEventBox.default.b,
        [0, 1],
    );
    obj.events.forEach(fixLightTranslationBase);
}

function fixLightTranslationEventBoxGroup(obj: LightTranslationEventBoxGroup) {
    obj.time = fixFloat(obj.time, LightTranslationEventBoxGroup.default.b);
    obj.id = fixInt(obj.id, LightTranslationEventBoxGroup.default.g);
    obj.boxes.forEach(fixLightTranslationEventBox);
}

export function v3(data: Difficulty) {
    logger.info(
        '[patch::dataCorrection::difficulty::v3] Verifying and correcting data type for beatmap v3...',
    );

    data.bpmEvents.forEach(fixBpmEvent);
    data.rotationEvents.forEach(fixRotationEvent);
    data.colorNotes.forEach(fixColorNote);
    data.bombNotes.forEach(fixBombNote);
    data.obstacles.forEach(fixObstacle);
    data.sliders.forEach(fixSlider);
    data.burstSliders.forEach(fixBurstSlider);
    data.waypoints.forEach(fixWaypoint);
    data.customData.fakeColorNotes?.forEach(fixFakeColorNote);
    data.customData.fakeBombNotes?.forEach(fixFakeBombNote);
    data.customData.fakeObstacles?.forEach(fixFakeObstacle);
    data.customData.fakeBurstSliders?.forEach(fixFakeBurstSlider);
    data.basicEvents.forEach(fixBasicEvent);
    data.colorBoostEvents.forEach(fixColorBoostEvent);
    data.lightColorEventBoxGroups.forEach(fixLightColorEventBoxGroup);
    data.lightRotationEventBoxGroups.forEach(fixLightRotationEventBoxGroup);
    data.lightTranslationEventBoxGroups.forEach(fixLightTranslationEventBoxGroup);
    data.useNormalEventsAsCompatibleEvents = fixBoolean(data.useNormalEventsAsCompatibleEvents);
}

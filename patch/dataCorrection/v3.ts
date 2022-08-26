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

function fixBPMEvent(obj: BPMEvent) {
    obj.time = fixFloat(obj.time);
    obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: RotationEvent) {
    obj.time = fixFloat(obj.time);
    obj.executionTime = fixInt(obj.executionTime);
    obj.rotation = fixInt(obj.rotation);
}

function fixColorNote(obj: ColorNote) {
    obj.time = fixFloat(obj.time);
    obj.color = fixInt(obj.color);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
    obj.angleOffset = fixInt(obj.angleOffset);
}

function fixFakeColorNote(obj: IColorNote) {
    obj.b = fixFloat(obj.b);
    obj.c = fixInt(obj.c);
    obj.x = fixInt(obj.x);
    obj.y = fixInt(obj.y);
    obj.d = fixInt(obj.d);
    obj.a = fixInt(obj.a);
}

function fixBombNote(obj: BombNote) {
    obj.time = fixFloat(obj.time);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
}

function fixFakeBombNote(obj: IBombNote) {
    obj.b = fixFloat(obj.b);
    obj.x = fixInt(obj.x);
    obj.y = fixInt(obj.y);
}

function fixObstacle(obj: Obstacle) {
    obj.time = fixFloat(obj.time);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.duration = fixFloat(obj.duration);
    obj.width = fixInt(obj.width);
    obj.height = fixInt(obj.height);
}

function fixFakeObstacle(obj: IObstacle) {
    obj.b = fixFloat(obj.b);
    obj.x = fixInt(obj.x);
    obj.y = fixInt(obj.y);
    obj.d = fixFloat(obj.d);
    obj.w = fixInt(obj.w);
    obj.h = fixInt(obj.h);
}

function fixSlider(obj: Slider) {
    obj.time = fixFloat(obj.time);
    obj.color = fixInt(obj.color);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
    obj.lengthMultiplier = fixFloat(obj.lengthMultiplier);
    obj.tailTime = fixFloat(obj.tailTime);
    obj.tailPosX = fixInt(obj.tailPosX);
    obj.tailPosY = fixInt(obj.tailPosY);
    obj.tailDirection = fixInt(obj.tailDirection);
    obj.tailLengthMultiplier = fixFloat(obj.tailLengthMultiplier);
    obj.midAnchor = fixInt(obj.midAnchor);
}

function fixBurstSlider(obj: BurstSlider) {
    obj.time = fixFloat(obj.time);
    obj.color = fixInt(obj.color);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
    obj.tailTime = fixFloat(obj.tailTime);
    obj.tailPosX = fixInt(obj.tailPosX);
    obj.tailPosY = fixInt(obj.tailPosY);
    obj.sliceCount = fixInt(obj.sliceCount);
    obj.squish = fixFloat(obj.squish);
}

function fixFakeBurstSlider(obj: IBurstSlider) {
    obj.b = fixFloat(obj.b);
    obj.c = fixInt(obj.c);
    obj.x = fixInt(obj.x);
    obj.y = fixInt(obj.y);
    obj.d = fixInt(obj.d);
    obj.tb = fixFloat(obj.tb);
    obj.tx = fixInt(obj.tx);
    obj.ty = fixInt(obj.ty);
    obj.sc = fixInt(obj.sc);
    obj.s = fixFloat(obj.s);
}

function fixWaypoint(obj: Waypoint) {
    obj.time = fixFloat(obj.time);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
}

function fixBasicEvent(obj: BasicEvent) {
    obj.time = fixFloat(obj.time);
    obj.type = fixInt(obj.type);
    obj.value = fixInt(obj.value);
    obj.floatValue = fixFloat(obj.floatValue);
}

function fixColorBoostEvent(obj: ColorBoostEvent) {
    obj.time = fixFloat(obj.time);
    obj.toggle = fixBoolean(obj.toggle);
}

function fixIndexFilter(obj: IndexFilter) {
    obj.type = fixInt(obj.type);
    obj.p0 = fixInt(obj.p0);
    obj.p1 = fixInt(obj.p1);
    obj.reverse = fixInt(obj.reverse);
}

function fixLightColorBase(obj: LightColorBase) {
    obj.time = fixFloat(obj.time);
    obj.transition = fixInt(obj.transition);
    obj.color = fixInt(obj.color);
    obj.brightness = fixFloat(obj.brightness);
    obj.frequency = fixInt(obj.frequency);
}

function fixLightColorEventBox(obj: LightColorEventBox) {
    fixIndexFilter(obj.filter);
    obj.beatDistribution = fixFloat(obj.beatDistribution);
    obj.beatDistributionType = fixInt(obj.beatDistributionType);
    obj.brightnessDistribution = fixFloat(obj.brightnessDistribution);
    obj.brightnessDistributionType = fixInt(obj.brightnessDistributionType);
    obj.affectFirst = fixInt<ILightColorEventBox['b']>(obj.affectFirst);
    obj.events.forEach(fixLightColorBase);
}

function fixLightColorEventBoxGroup(obj: LightColorEventBoxGroup) {
    obj.time = fixFloat(obj.time);
    obj.groupID = fixInt(obj.groupID);
    obj.events.forEach(fixLightColorEventBox);
}

function fixLightRotationBase(obj: LightRotationBase) {
    obj.time = fixFloat(obj.time);
    obj.previous = fixInt(obj.previous);
    obj.ease = fixInt(obj.ease);
    obj.loop = fixInt(obj.loop);
    obj.rotation = fixFloat(obj.rotation);
    obj.direction = fixInt(obj.direction);
}

function fixLightRotationEventBox(obj: LightRotationEventBox) {
    fixIndexFilter(obj.filter);
    obj.beatDistribution = fixFloat(obj.beatDistribution);
    obj.beatDistributionType = fixInt(obj.beatDistributionType);
    obj.rotationDistribution = fixFloat(obj.rotationDistribution);
    obj.rotationDistributionType = fixInt(obj.rotationDistributionType);
    obj.axis = fixInt(obj.axis);
    obj.flip = fixInt<ILightRotationEventBox['r']>(obj.flip);
    obj.affectFirst = fixInt<ILightRotationEventBox['b']>(obj.affectFirst);
    obj.events.forEach(fixLightRotationBase);
}

function fixLightRotationEventBoxGroup(obj: LightRotationEventBoxGroup) {
    obj.time = fixFloat(obj.time);
    obj.groupID = fixInt(obj.groupID);
    obj.events.forEach(fixLightRotationEventBox);
}

export function patchV3(data: Difficulty) {
    data.bpmEvents.forEach(fixBPMEvent);
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
    data.basicBeatmapEvents.forEach(fixBasicEvent);
    data.colorBoostBeatmapEvents.forEach(fixColorBoostEvent);
    data.lightColorEventBoxGroups.forEach(fixLightColorEventBoxGroup);
    data.lightRotationEventBoxGroups.forEach(fixLightRotationEventBoxGroup);
    data.useNormalEventsAsCompatibleEvents = fixBoolean(data.useNormalEventsAsCompatibleEvents);
}

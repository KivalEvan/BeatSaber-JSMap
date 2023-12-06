import { Difficulty } from '../../beatmap/v3/difficulty.ts';
import { ColorNote } from '../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../beatmap/v3/obstacle.ts';
import { BasicEvent } from '../../beatmap/v3/basicEvent.ts';
import { Waypoint } from '../../beatmap/v3/waypoint.ts';
import { Arc } from '../../beatmap/v3/arc.ts';
import { RotationEvent } from '../../beatmap/v3/rotationEvent.ts';
import { BPMEvent } from '../../beatmap/v3/bpmEvent.ts';
import { BombNote } from '../../beatmap/v3/bombNote.ts';
import { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import { Chain } from '../../beatmap/v3/chain.ts';
import { IChain } from '../../types/beatmap/v3/chain.ts';
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
import { EventLaneRotationValue } from '../../beatmap/shared/constants.ts';
import { FxEventsCollection } from '../../beatmap/v3/fxEventsCollection.ts';
import { FxEventFloat } from '../../beatmap/v3/fxEventFloat.ts';
import { FxEventInt } from '../../beatmap/v3/fxEventInt.ts';
import { FxEventBox } from '../../beatmap/v3/fxEventBox.ts';
import { FxEventBoxGroup } from '../../beatmap/v3/fxEventBoxGroup.ts';
import { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';

function fixBpmEvent(obj: BPMEvent): void {
   obj.time = fixFloat(obj.time, BPMEvent.default.b);
   obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: RotationEvent): void {
   obj.time = fixFloat(obj.time, RotationEvent.default.b);
   obj.executionTime = fixInt(obj.executionTime, RotationEvent.default.e, [0, 1]);
   obj.rotation = fixFloat(obj.rotation, RotationEvent.default.r);
}

function fixColorNote(obj: ColorNote): void {
   obj.time = fixFloat(obj.time, ColorNote.default.b);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, ColorNote.default.x);
   obj.posY = fixInt(obj.posY, ColorNote.default.y);
   obj.direction = fixInt(obj.direction, ColorNote.default.d);
   obj.angleOffset = fixInt(obj.angleOffset, ColorNote.default.a);
   fixCustomDataObject(obj.customData);
}

function fixFakeColorNote(obj: IColorNote): void {
   obj.b = fixFloat(obj.b, ColorNote.default.b);
   obj.c = fixInt<Required<IColorNote>['c']>(obj.c, [0, 1], [0, 1]);
   obj.x = fixInt(obj.x, ColorNote.default.x);
   obj.y = fixInt(obj.y, ColorNote.default.y);
   obj.d = fixInt(obj.d, ColorNote.default.d);
   obj.a = fixInt(obj.a, ColorNote.default.a);
   fixCustomDataObject(obj.customData);
}

function fixBombNote(obj: BombNote): void {
   obj.time = fixFloat(obj.time, BombNote.default.b);
   obj.posX = fixInt(obj.posX, BombNote.default.x);
   obj.posY = fixInt(obj.posY, BombNote.default.y);
   fixCustomDataObject(obj.customData);
}

function fixFakeBombNote(obj: IBombNote): void {
   obj.b = fixFloat(obj.b, BombNote.default.b);
   obj.x = fixInt(obj.x, BombNote.default.x);
   obj.y = fixInt(obj.y, BombNote.default.y);
   fixCustomDataObject(obj.customData);
}

function fixObstacle(obj: Obstacle): void {
   obj.time = fixFloat(obj.time, Obstacle.default.b);
   obj.posX = fixInt(obj.posX, Obstacle.default.x);
   obj.posY = fixInt(obj.posY, Obstacle.default.y);
   obj.duration = fixFloat(obj.duration, Obstacle.default.d);
   obj.width = fixInt(obj.width, Obstacle.default.w);
   obj.height = fixInt(obj.height, Obstacle.default.h);
   fixCustomDataObject(obj.customData);
}

function fixFakeObstacle(obj: IObstacle): void {
   obj.b = fixFloat(obj.b, Obstacle.default.b);
   obj.x = fixInt(obj.x, Obstacle.default.x);
   obj.y = fixInt(obj.y, Obstacle.default.y);
   obj.d = fixFloat(obj.d, Obstacle.default.d);
   obj.w = fixInt(obj.w, Obstacle.default.w);
   obj.h = fixInt(obj.h, Obstacle.default.h);
   fixCustomDataObject(obj.customData);
}

function fixSlider(obj: Arc): void {
   obj.time = fixFloat(obj.time, Arc.default.b);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, Arc.default.x);
   obj.posY = fixInt(obj.posY, Arc.default.y);
   obj.direction = fixInt(obj.direction, Arc.default.d);
   obj.lengthMultiplier = fixFloat(obj.lengthMultiplier, Arc.default.mu);
   obj.tailTime = fixFloat(obj.tailTime, Arc.default.tb);
   obj.tailPosX = fixInt(obj.tailPosX, Arc.default.tx);
   obj.tailPosY = fixInt(obj.tailPosY, Arc.default.ty);
   obj.tailDirection = fixInt(obj.tailDirection, Arc.default.tc);
   obj.tailLengthMultiplier = fixFloat(obj.tailLengthMultiplier, Arc.default.tmu);
   obj.midAnchor = fixInt(obj.midAnchor, Arc.default.m);
   fixCustomDataObject(obj.customData);
}

function fixChain(obj: Chain): void {
   obj.time = fixFloat(obj.time, Chain.default.b);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, Chain.default.x);
   obj.posY = fixInt(obj.posY, Chain.default.y);
   obj.direction = fixInt(obj.direction, Chain.default.d);
   obj.tailTime = fixFloat(obj.tailTime, Chain.default.tb);
   obj.tailPosX = fixInt(obj.tailPosX, Chain.default.tx);
   obj.tailPosY = fixInt(obj.tailPosY, Chain.default.ty);
   obj.sliceCount = fixInt(obj.sliceCount, Chain.default.sc) || 1;
   obj.squish = fixFloat(obj.squish, Chain.default.s) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixFakeChain(obj: IChain): void {
   obj.b = fixFloat(obj.b, Chain.default.b);
   obj.c = fixInt<Required<IChain>['c']>(obj.c, [0, 1], [0, 1]);
   obj.x = fixInt(obj.x, Chain.default.x);
   obj.y = fixInt(obj.y, Chain.default.y);
   obj.d = fixInt(obj.d, Chain.default.d);
   obj.tb = fixFloat(obj.tb, Chain.default.tb);
   obj.tx = fixInt(obj.tx, Chain.default.tx);
   obj.ty = fixInt(obj.ty, Chain.default.ty);
   obj.sc = fixInt(obj.sc, Chain.default.sc) || 1;
   obj.s = fixFloat(obj.s, Chain.default.s) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixWaypoint(obj: Waypoint): void {
   obj.time = fixFloat(obj.time, Waypoint.default.b);
   obj.posX = fixInt(obj.posX, Waypoint.default.x);
   obj.posY = fixInt(obj.posY, Waypoint.default.y);
   obj.direction = fixInt(obj.direction, Waypoint.default.d);
}

function fixBasicEvent(obj: BasicEvent): void {
   obj.time = fixFloat(obj.time, BasicEvent.default.b);
   obj.type = fixInt(obj.type, BasicEvent.default.et);
   obj.value = fixInt(obj.value, BasicEvent.default.i);
   obj.floatValue = fixFloat(obj.floatValue, BasicEvent.default.f);
   fixCustomDataEvent(obj.customData);
}

function fixColorBoostEvent(obj: ColorBoostEvent): void {
   obj.time = fixFloat(obj.time, ColorBoostEvent.default.b);
   obj.toggle = fixBoolean(obj.toggle, ColorBoostEvent.default.o);
}

function fixIndexFilter(obj: IndexFilter): void {
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

function fixLightColorBase(obj: LightColorBase): void {
   obj.time = fixFloat(obj.time, LightColorBase.default.b);
   obj.frequency = fixInt(obj.frequency, LightColorBase.default.f);
   obj.color = obj.transition === 2
      ? fixInt(obj.color, -1, [-1, 0, 1, 2])
      : fixInt(obj.color, LightColorBase.default.c, [0, 1, 2]);
   obj.transition = fixInt(obj.transition, LightColorBase.default.i, [0, 1, 2]);
   obj.brightness = fixFloat(obj.brightness, LightColorBase.default.s);
   obj.strobeBrightness = fixFloat(obj.strobeBrightness, LightColorBase.default.sb);
   obj.strobeFade = fixInt(obj.strobeFade, LightColorBase.default.sf, [0, 1]);
}

function fixLightColorEventBox(obj: LightColorEventBox): void {
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
   obj.affectFirst = fixInt<Required<ILightColorEventBox>['b']>(
      obj.affectFirst,
      LightColorEventBox.default.b,
      [0, 1],
   );
   obj.events.forEach(fixLightColorBase);
}

function fixLightColorEventBoxGroup(obj: LightColorEventBoxGroup): void {
   obj.time = fixFloat(obj.time, LightColorEventBoxGroup.default.b);
   obj.id = fixInt(obj.id, LightColorEventBoxGroup.default.g);
   obj.boxes.forEach(fixLightColorEventBox);
}

function fixLightRotationBase(obj: LightRotationBase): void {
   obj.time = fixFloat(obj.time, LightRotationBase.default.b);
   obj.easing = fixInt(obj.easing, LightRotationBase.default.e);
   obj.loop = fixInt(obj.loop, LightRotationBase.default.l);
   obj.direction = fixInt(obj.direction, LightRotationBase.default.o, [0, 1, 2]);
   obj.previous = fixInt(obj.previous, LightRotationBase.default.p, [0, 1]);
   obj.rotation = fixFloat(obj.rotation, LightRotationBase.default.r);
}

function fixLightRotationEventBox(obj: LightRotationEventBox): void {
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
   obj.flip = fixInt<Required<ILightRotationEventBox>['r']>(
      obj.flip,
      LightRotationEventBox.default.r,
      [0, 1],
   );
   obj.affectFirst = fixInt<Required<ILightRotationEventBox>['b']>(
      obj.affectFirst,
      LightRotationEventBox.default.b,
      [0, 1],
   );
   obj.events.forEach(fixLightRotationBase);
}

function fixLightRotationEventBoxGroup(obj: LightRotationEventBoxGroup): void {
   obj.time = fixFloat(obj.time, LightRotationEventBoxGroup.default.b);
   obj.id = fixInt(obj.id, LightRotationEventBoxGroup.default.g);
   obj.boxes.forEach(fixLightRotationEventBox);
}

function fixLightTranslationBase(obj: LightTranslationBase): void {
   obj.time = fixFloat(obj.time, LightTranslationBase.default.b);
   obj.easing = fixInt(obj.easing, LightTranslationBase.default.e);
   obj.previous = fixInt(obj.previous, LightTranslationBase.default.p, [0, 1]);
   obj.translation = fixFloat(obj.translation, LightTranslationBase.default.t);
}

function fixLightTranslationEventBox(obj: LightTranslationEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(obj.beatDistribution, LightTranslationEventBox.default.w);
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      LightTranslationEventBox.default.d,
      [1, 2],
   );
   obj.gapDistribution = fixFloat(obj.gapDistribution, LightTranslationEventBox.default.s);
   obj.gapDistributionType = fixInt(
      obj.gapDistributionType,
      LightTranslationEventBox.default.t,
      [1, 2],
   );
   obj.axis = fixInt(obj.axis, LightTranslationEventBox.default.a, [0, 1, 2]);
   obj.flip = fixInt<Required<ILightTranslationEventBox>['r']>(
      obj.flip,
      LightTranslationEventBox.default.r,
      [0, 1],
   );
   obj.affectFirst = fixInt<Required<ILightTranslationEventBox>['b']>(
      obj.affectFirst,
      LightTranslationEventBox.default.b,
      [0, 1],
   );
   obj.events.forEach(fixLightTranslationBase);
}

function fixLightTranslationEventBoxGroup(obj: LightTranslationEventBoxGroup): void {
   obj.time = fixFloat(obj.time, LightTranslationEventBoxGroup.default.b);
   obj.id = fixInt(obj.id, LightTranslationEventBoxGroup.default.g);
   obj.boxes.forEach(fixLightTranslationEventBox);
}

function fixFxEventBox(obj: FxEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(obj.beatDistribution, FxEventBox.default.w);
   obj.beatDistributionType = fixInt(obj.beatDistributionType, FxEventBox.default.d, [1, 2]);
   obj.fxDistribution = fixFloat(obj.fxDistribution, FxEventBox.default.s);
   obj.fxDistributionType = fixInt(obj.fxDistributionType, FxEventBox.default.t, [1, 2]);
   obj.affectFirst = fixInt<Required<IFxEventBox>['b']>(
      obj.affectFirst,
      FxEventBox.default.b,
      [0, 1],
   );
   obj.events.forEach((e, i) => (obj.events[i] = fixInt(e)));
}

function fixFxEventBoxGroup(obj: FxEventBoxGroup): void {
   obj.time = fixFloat(obj.time, FxEventBoxGroup.default.b);
   obj.id = fixInt(obj.id, FxEventBoxGroup.default.g);
   obj.boxes.forEach(fixFxEventBox);
}

function fixFxEventInt(obj: FxEventInt): void {
   obj.time = fixFloat(obj.time, FxEventInt.default.b);
   obj.previous = fixInt(obj.previous, FxEventInt.default.p, [0, 1]);
   obj.value = fixFloat(obj.value, FxEventInt.default.v);
}

function fixFxEventFloat(obj: FxEventFloat): void {
   obj.time = fixFloat(obj.time, FxEventFloat.default.b);
   obj.easing = fixInt(obj.easing, FxEventFloat.default.i);
   obj.previous = fixInt(obj.previous, FxEventFloat.default.p, [0, 1]);
   obj.value = fixFloat(obj.value, FxEventFloat.default.v);
}

function fixFxEventsCollection(obj: FxEventsCollection): void {
   obj.intList.forEach(fixFxEventInt);
   obj.floatList.forEach(fixFxEventFloat);
}

export function v3(data: Difficulty): void {
   logger.tInfo(
      ['patch', 'dataCorrection', 'difficulty', 'v3'],
      'Verifying and correcting data type for beatmap v3...',
   );

   data.bpmEvents.forEach(fixBpmEvent);
   data.rotationEvents.forEach(fixRotationEvent);
   data.colorNotes.forEach(fixColorNote);
   data.bombNotes.forEach(fixBombNote);
   data.obstacles.forEach(fixObstacle);
   data.arcs.forEach(fixSlider);
   data.chains.forEach(fixChain);
   data.waypoints.forEach(fixWaypoint);
   data.customData.fakeColorNotes?.forEach(fixFakeColorNote);
   data.customData.fakeBombNotes?.forEach(fixFakeBombNote);
   data.customData.fakeObstacles?.forEach(fixFakeObstacle);
   data.customData.fakeChains?.forEach(fixFakeChain);
   data.basicEvents.forEach(fixBasicEvent);
   data.colorBoostEvents.forEach(fixColorBoostEvent);
   data.lightColorEventBoxGroups.forEach(fixLightColorEventBoxGroup);
   data.lightRotationEventBoxGroups.forEach(fixLightRotationEventBoxGroup);
   data.lightTranslationEventBoxGroups.forEach(fixLightTranslationEventBoxGroup);
   data.fxEventBoxGroups.forEach(fixFxEventBoxGroup);
   fixFxEventsCollection(data.fxEventsCollection);
   data.useNormalEventsAsCompatibleEvents = fixBoolean(data.useNormalEventsAsCompatibleEvents);

   const boost = data.basicEvents.filter((ev) => ev.isLaneRotationEvent());
   const laneRotation = data.basicEvents.filter((ev) => ev.isColorBoost());
   data.basicEvents = data.basicEvents.filter(
      (ev) => !(ev.isColorBoost() || ev.isLaneRotationEvent()),
   );
   data.colorBoostEvents.push(
      ...boost.map((ev) => new ColorBoostEvent({ time: ev.time, toggle: ev.value ? true : false })),
   );
   data.rotationEvents.push(
      ...laneRotation.map(
         (ev) =>
            new RotationEvent({
               time: ev.time,
               executionTime: ev.type == 15 ? 1 : 0,
               rotation: ev.customData._rotation ??
                  (ev.value >= 1000 && ev.value <= 1720
                     ? ev.value - 1360
                     : ev.value >= 0 && ev.value <= 7
                     ? EventLaneRotationValue[ev.value]
                     : 0),
            }),
      ),
   );
}

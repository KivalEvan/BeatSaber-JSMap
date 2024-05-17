import logger from '../../logger.ts';
import { fixBoolean, fixFloat, fixInt } from './helpers.ts';
import type { IWrapBeatmap } from '../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import type { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import { ColorNote } from '../../beatmap/core/colorNote.ts';
import { Obstacle } from '../../beatmap/core/obstacle.ts';
import { BasicEvent } from '../../beatmap/core/event.ts';
import { Waypoint } from '../../beatmap/core/waypoint.ts';
import { Arc } from '../../beatmap/core/arc.ts';
import { RotationEvent } from '../../beatmap/core/rotationEvent.ts';
import { BPMEvent } from '../../beatmap/core/bpmEvent.ts';
import { BombNote } from '../../beatmap/core/bombNote.ts';
import type { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import type { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import type { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import type { IChain } from '../../types/beatmap/v3/chain.ts';
import type { IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { IWrapIndexFilterAttribute } from '../../types/beatmap/wrapper/indexFilter.ts';
import type { IWrapLightColorEventAttribute } from '../../types/beatmap/wrapper/lightColorEvent.ts';
import type { IWrapLightColorEventBoxAttribute } from '../../types/beatmap/wrapper/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEventAttribute } from '../../types/beatmap/wrapper/lightRotationEvent.ts';
import type { IWrapLightRotationEventBoxAttribute } from '../../types/beatmap/wrapper/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEventAttribute } from '../../types/beatmap/wrapper/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventBoxAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import { Chain } from '../../beatmap/core/chain.ts';
import { ColorBoostEvent } from '../../beatmap/core/colorBoostEvent.ts';
import { IndexFilter } from '../../beatmap/core/indexFilter.ts';
import { LightColorEvent } from '../../beatmap/core/lightColorEvent.ts';
import { LightColorEventBox } from '../../beatmap/core/lightColorEventBox.ts';
import { LightColorEventBoxGroup } from '../../beatmap/core/lightColorEventBoxGroup.ts';
import { LightRotationEvent } from '../../beatmap/core/lightRotationEvent.ts';
import { LightRotationEventBox } from '../../beatmap/core/lightRotationEventBox.ts';
import { LightRotationEventBoxGroup } from '../../beatmap/core/lightRotationEventBoxGroup.ts';
import { LightTranslationEvent } from '../../beatmap/core/lightTranslationEvent.ts';
import { LightTranslationEventBox } from '../../beatmap/core/lightTranslationEventBox.ts';
import { LightTranslationEventBoxGroup } from '../../beatmap/core/lightTranslationEventBoxGroup.ts';
import type { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import type { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import type { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IFxEventBox } from '../../types/beatmap/v3/fxEventBox.ts';
import { fixCustomDataEvent } from './customDataEvent.ts';
import { fixCustomDataObject } from './customDataObject.ts';
import { EventLaneRotationValue } from '../../beatmap/shared/constants.ts';
import { FxEventFloat } from '../../beatmap/core/fxEventFloat.ts';
import { FxEventInt } from '../../beatmap/core/fxEventInt.ts';
import { FxEventBox } from '../../beatmap/core/fxEventBox.ts';
import { FxEventBoxGroup } from '../../beatmap/core/fxEventBoxGroup.ts';
import type { IWrapFxEventBoxGroupAttribute } from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import type { IWrapFxEventFloatAttribute } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import type { IWrapFxEventBoxAttribute } from '../../types/beatmap/wrapper/fxEventBox.ts';

function fixBpmEvent(obj: IWrapBPMEventAttribute): void {
   obj.time = fixFloat(obj.time, BPMEvent.defaultValue.time);
   obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: IWrapRotationEventAttribute): void {
   obj.time = fixFloat(obj.time, RotationEvent.defaultValue.time);
   obj.executionTime = fixInt(
      obj.executionTime,
      RotationEvent.defaultValue.executionTime,
      [0, 1],
   );
   obj.rotation = fixFloat(obj.rotation, RotationEvent.defaultValue.rotation);
}

function fixColorNote(obj: IWrapColorNoteAttribute): void {
   obj.time = fixFloat(obj.time, ColorNote.defaultValue.time);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, ColorNote.defaultValue.posX);
   obj.posY = fixInt(obj.posY, ColorNote.defaultValue.posY);
   obj.direction = fixInt(obj.direction, ColorNote.defaultValue.direction);
   obj.angleOffset = fixInt(
      obj.angleOffset,
      ColorNote.defaultValue.angleOffset,
   );
   fixCustomDataObject(obj.customData);
}

function fixFakeColorNote(obj: IColorNote): void {
   obj.b = fixFloat(obj.b, ColorNote.defaultValue.time);
   obj.x = fixInt(obj.x, ColorNote.defaultValue.posX);
   obj.y = fixInt(obj.y, ColorNote.defaultValue.posY);
   obj.c = fixInt<Required<IColorNote>['c']>(obj.c, [0, 1], [0, 1]);
   obj.d = fixInt(obj.d, ColorNote.defaultValue.direction);
   obj.a = fixInt(obj.a, ColorNote.defaultValue.angleOffset);
   fixCustomDataObject(obj.customData);
}

function fixBombNote(obj: IWrapBombNoteAttribute): void {
   obj.time = fixFloat(obj.time, BombNote.defaultValue.time);
   obj.posX = fixInt(obj.posX, BombNote.defaultValue.posX);
   obj.posY = fixInt(obj.posY, BombNote.defaultValue.posY);
   fixCustomDataObject(obj.customData);
}

function fixFakeBombNote(obj: IBombNote): void {
   obj.b = fixFloat(obj.b, BombNote.defaultValue.time);
   obj.x = fixInt(obj.x, BombNote.defaultValue.posX);
   obj.y = fixInt(obj.y, BombNote.defaultValue.posY);
   fixCustomDataObject(obj.customData);
}

function fixObstacle(obj: IWrapObstacleAttribute): void {
   obj.time = fixFloat(obj.time, Obstacle.defaultValue.time);
   obj.posX = fixInt(obj.posX, Obstacle.defaultValue.posX);
   obj.posY = fixInt(obj.posY, Obstacle.defaultValue.posY);
   obj.duration = fixFloat(obj.duration, Obstacle.defaultValue.duration);
   obj.width = fixInt(obj.width, Obstacle.defaultValue.width);
   obj.height = fixInt(obj.height, Obstacle.defaultValue.height);
   fixCustomDataObject(obj.customData);
}

function fixFakeObstacle(obj: IObstacle): void {
   obj.b = fixFloat(obj.b, Obstacle.defaultValue.time);
   obj.x = fixInt(obj.x, Obstacle.defaultValue.posX);
   obj.y = fixInt(obj.y, Obstacle.defaultValue.posY);
   obj.d = fixFloat(obj.d, Obstacle.defaultValue.duration);
   obj.w = fixInt(obj.w, Obstacle.defaultValue.width);
   obj.h = fixInt(obj.h, Obstacle.defaultValue.height);
   fixCustomDataObject(obj.customData);
}

function fixSlider(obj: IWrapArcAttribute): void {
   obj.time = fixFloat(obj.time, Arc.defaultValue.time);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, Arc.defaultValue.posX);
   obj.posY = fixInt(obj.posY, Arc.defaultValue.posY);
   obj.direction = fixInt(obj.direction, Arc.defaultValue.direction);
   obj.lengthMultiplier = fixFloat(
      obj.lengthMultiplier,
      Arc.defaultValue.lengthMultiplier,
   );
   obj.tailTime = fixFloat(obj.tailTime, Arc.defaultValue.tailTime);
   obj.tailPosX = fixInt(obj.tailPosX, Arc.defaultValue.tailPosX);
   obj.tailPosY = fixInt(obj.tailPosY, Arc.defaultValue.tailPosY);
   obj.tailDirection = fixInt(
      obj.tailDirection,
      Arc.defaultValue.tailDirection,
   );
   obj.tailLengthMultiplier = fixFloat(
      obj.tailLengthMultiplier,
      Arc.defaultValue.tailLengthMultiplier,
   );
   obj.midAnchor = fixInt(obj.midAnchor, Arc.defaultValue.midAnchor);
   fixCustomDataObject(obj.customData);
}

function fixChain(obj: IWrapChainAttribute): void {
   obj.time = fixFloat(obj.time, Chain.defaultValue.time);
   obj.color = fixInt(obj.color, [0, 1], [0, 1]);
   obj.posX = fixInt(obj.posX, Chain.defaultValue.posX);
   obj.posY = fixInt(obj.posY, Chain.defaultValue.posY);
   obj.direction = fixInt(obj.direction, Chain.defaultValue.direction);
   obj.tailTime = fixFloat(obj.tailTime, Chain.defaultValue.tailTime);
   obj.tailPosX = fixInt(obj.tailPosX, Chain.defaultValue.tailPosX);
   obj.tailPosY = fixInt(obj.tailPosY, Chain.defaultValue.tailPosY);
   obj.sliceCount = fixInt(obj.sliceCount, Chain.defaultValue.sliceCount) || 1;
   obj.squish = fixFloat(obj.squish, Chain.defaultValue.squish) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixFakeChain(obj: IChain): void {
   obj.b = fixFloat(obj.b, Chain.defaultValue.time);
   obj.c = fixInt<Required<IChain>['c']>(obj.c, [0, 1], [0, 1]);
   obj.x = fixInt(obj.x, Chain.defaultValue.posX);
   obj.y = fixInt(obj.y, Chain.defaultValue.posY);
   obj.d = fixInt(obj.d, Chain.defaultValue.direction);
   obj.tb = fixFloat(obj.tb, Chain.defaultValue.tailTime);
   obj.tx = fixInt(obj.tx, Chain.defaultValue.tailPosX);
   obj.ty = fixInt(obj.ty, Chain.defaultValue.tailPosY);
   obj.sc = fixInt(obj.sc, Chain.defaultValue.sliceCount) || 1;
   obj.s = fixFloat(obj.s, Chain.defaultValue.squish) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixWaypoint(obj: IWrapWaypointAttribute): void {
   obj.time = fixFloat(obj.time, Waypoint.defaultValue.time);
   obj.posX = fixInt(obj.posX, Waypoint.defaultValue.posX);
   obj.posY = fixInt(obj.posY, Waypoint.defaultValue.posY);
   obj.direction = fixInt(obj.direction, Waypoint.defaultValue.direction);
}

function fixBasicEvent(obj: IWrapEventAttribute): void {
   obj.time = fixFloat(obj.time, BasicEvent.defaultValue.time);
   obj.type = fixInt(obj.type, BasicEvent.defaultValue.type);
   obj.value = fixInt(obj.value, BasicEvent.defaultValue.value);
   obj.floatValue = fixFloat(
      obj.floatValue,
      BasicEvent.defaultValue.floatValue,
   );
   fixCustomDataEvent(obj.customData);
}

function fixColorBoostEvent(obj: IWrapColorBoostEventAttribute): void {
   obj.time = fixFloat(obj.time, ColorBoostEvent.defaultValue.time);
   obj.toggle = fixBoolean(obj.toggle, ColorBoostEvent.defaultValue.toggle);
}

function fixIndexFilter(obj: IWrapIndexFilterAttribute): void {
   obj.type = fixInt(obj.type, IndexFilter.defaultValue.type, [1, 2]);
   obj.p0 = fixInt(obj.p0, IndexFilter.defaultValue.p0);
   obj.p1 = fixInt(obj.p1, IndexFilter.defaultValue.p1);
   obj.reverse = fixInt(obj.reverse, IndexFilter.defaultValue.reverse, [0, 1]);
   obj.chunks = fixInt(obj.chunks, IndexFilter.defaultValue.chunks);
   obj.random = fixInt(
      obj.random,
      IndexFilter.defaultValue.random,
      [0, 1, 2, 3],
   );
   obj.seed = fixInt(obj.seed, IndexFilter.defaultValue.seed);
   obj.limit = fixFloat(obj.limit, IndexFilter.defaultValue.limit, 0, 1);
   obj.limitAffectsType = fixInt(
      obj.limitAffectsType,
      IndexFilter.defaultValue.limitAffectsType,
      [0, 1, 2, 3],
   );
}

function fixLightColorEvent(obj: IWrapLightColorEventAttribute): void {
   obj.time = fixFloat(obj.time, LightColorEvent.defaultValue.time);
   obj.frequency = fixInt(
      obj.frequency,
      LightColorEvent.defaultValue.frequency,
   );
   obj.color = obj.previous === 1
      ? fixInt(obj.color, -1, [-1, 0, 1, 2])
      : fixInt(obj.color, LightColorEvent.defaultValue.color, [0, 1, 2]);
   obj.easing = fixInt(
      obj.easing,
      LightColorEvent.defaultValue.easing,
      [0, 1, 2],
   );
   obj.previous = fixInt(
      obj.previous,
      LightColorEvent.defaultValue.previous,
      [0, 1],
   );
   obj.brightness = fixFloat(
      obj.brightness,
      LightColorEvent.defaultValue.brightness,
   );
   obj.strobeBrightness = fixFloat(
      obj.strobeBrightness,
      LightColorEvent.defaultValue.strobeBrightness,
   );
   obj.strobeFade = fixInt(
      obj.strobeFade,
      LightColorEvent.defaultValue.strobeFade,
      [0, 1],
   );
}

function fixLightColorEventBox(obj: IWrapLightColorEventBoxAttribute): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      LightColorEventBox.defaultValue.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      LightColorEventBox.defaultValue.beatDistributionType,
      [1, 2],
   );
   obj.brightnessDistribution = fixFloat(
      obj.brightnessDistribution,
      LightColorEventBox.defaultValue.brightnessDistribution,
   );
   obj.brightnessDistributionType = fixInt(
      obj.brightnessDistributionType,
      LightColorEventBox.defaultValue.brightnessDistributionType,
      [1, 2],
   );
   obj.affectFirst = fixInt<Required<ILightColorEventBox>['b']>(
      obj.affectFirst,
      LightColorEventBox.defaultValue.affectFirst,
      [0, 1],
   );
   obj.events.forEach(fixLightColorEvent);
}

function fixLightColorEventBoxGroup(
   obj: IWrapLightColorEventBoxGroupAttribute,
): void {
   obj.time = fixFloat(obj.time, LightColorEventBoxGroup.defaultValue.time);
   obj.id = fixInt(obj.id, LightColorEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightColorEventBox);
}

function fixLightRotationEvent(obj: IWrapLightRotationEventAttribute): void {
   obj.time = fixFloat(obj.time, LightRotationEvent.defaultValue.time);
   obj.easing = fixInt(obj.easing, LightRotationEvent.defaultValue.easing);
   obj.loop = fixInt(obj.loop, LightRotationEvent.defaultValue.loop);
   obj.direction = fixInt(
      obj.direction,
      LightRotationEvent.defaultValue.direction,
      [0, 1, 2],
   );
   obj.previous = fixInt(
      obj.previous,
      LightRotationEvent.defaultValue.previous,
      [0, 1],
   );
   obj.rotation = fixFloat(
      obj.rotation,
      LightRotationEvent.defaultValue.rotation,
   );
}

function fixLightRotationEventBox(
   obj: IWrapLightRotationEventBoxAttribute,
): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      LightRotationEventBox.defaultValue.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      LightRotationEventBox.defaultValue.beatDistributionType,
      [1, 2],
   );
   obj.rotationDistribution = fixFloat(
      obj.rotationDistribution,
      LightRotationEventBox.defaultValue.rotationDistribution,
   );
   obj.rotationDistributionType = fixInt(
      obj.rotationDistributionType,
      LightRotationEventBox.defaultValue.rotationDistributionType,
      [1, 2],
   );
   obj.axis = fixInt(
      obj.axis,
      LightRotationEventBox.defaultValue.axis,
      [0, 1, 2],
   );
   obj.flip = fixInt<Required<ILightRotationEventBox>['r']>(
      obj.flip,
      LightRotationEventBox.defaultValue.flip,
      [0, 1],
   );
   obj.affectFirst = fixInt<Required<ILightRotationEventBox>['b']>(
      obj.affectFirst,
      LightRotationEventBox.defaultValue.affectFirst,
      [0, 1],
   );
   obj.events.forEach(fixLightRotationEvent);
}

function fixLightRotationEventBoxGroup(
   obj: IWrapLightRotationEventBoxGroupAttribute,
): void {
   obj.time = fixFloat(obj.time, LightRotationEventBoxGroup.defaultValue.time);
   obj.id = fixInt(obj.id, LightRotationEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightRotationEventBox);
}

function fixLightTranslationEvent(
   obj: IWrapLightTranslationEventAttribute,
): void {
   obj.time = fixFloat(obj.time, LightTranslationEvent.defaultValue.time);
   obj.easing = fixInt(obj.easing, LightTranslationEvent.defaultValue.easing);
   obj.previous = fixInt(
      obj.previous,
      LightTranslationEvent.defaultValue.previous,
      [0, 1],
   );
   obj.translation = fixFloat(
      obj.translation,
      LightTranslationEvent.defaultValue.translation,
   );
}

function fixLightTranslationEventBox(
   obj: IWrapLightTranslationEventBoxAttribute,
): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      LightTranslationEventBox.defaultValue.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      LightTranslationEventBox.defaultValue.beatDistributionType,
      [1, 2],
   );
   obj.gapDistribution = fixFloat(
      obj.gapDistribution,
      LightTranslationEventBox.defaultValue.gapDistribution,
   );
   obj.gapDistributionType = fixInt(
      obj.gapDistributionType,
      LightTranslationEventBox.defaultValue.gapDistributionType,
      [1, 2],
   );
   obj.axis = fixInt(
      obj.axis,
      LightTranslationEventBox.defaultValue.axis,
      [0, 1, 2],
   );
   obj.flip = fixInt<Required<ILightTranslationEventBox>['r']>(
      obj.flip,
      LightTranslationEventBox.defaultValue.flip,
      [0, 1],
   );
   obj.affectFirst = fixInt<Required<ILightTranslationEventBox>['b']>(
      obj.affectFirst,
      LightTranslationEventBox.defaultValue.affectFirst,
      [0, 1],
   );
   obj.events.forEach(fixLightTranslationEvent);
}

function fixLightTranslationEventBoxGroup(
   obj: IWrapLightTranslationEventBoxGroupAttribute,
): void {
   obj.time = fixFloat(
      obj.time,
      LightTranslationEventBoxGroup.defaultValue.time,
   );
   obj.id = fixInt(obj.id, LightTranslationEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightTranslationEventBox);
}

function fixFxEventBox(obj: IWrapFxEventBoxAttribute): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      FxEventBox.defaultValue.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      FxEventBox.defaultValue.beatDistributionType,
      [1, 2],
   );
   obj.fxDistribution = fixFloat(
      obj.fxDistribution,
      FxEventBox.defaultValue.fxDistribution,
   );
   obj.fxDistributionType = fixInt(
      obj.fxDistributionType,
      FxEventBox.defaultValue.fxDistributionType,
      [1, 2],
   );
   obj.affectFirst = fixInt<Required<IFxEventBox>['b']>(
      obj.affectFirst,
      FxEventBox.defaultValue.affectFirst,
      [0, 1],
   );
   obj.events.forEach(fixFxEventFloat);
}

function fixFxEventBoxGroup(obj: IWrapFxEventBoxGroupAttribute): void {
   obj.time = fixFloat(obj.time, FxEventBoxGroup.defaultValue.time);
   obj.id = fixInt(obj.id, FxEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixFxEventBox);
}

// FIXME: prolly never gonna be used
function _fixFxEventInt(obj: FxEventInt): void {
   obj.time = fixFloat(obj.time, FxEventInt.defaultValue.time);
   obj.previous = fixInt(
      obj.previous,
      FxEventInt.defaultValue.previous,
      [0, 1],
   );
   obj.value = fixFloat(obj.value, FxEventInt.defaultValue.value);
}

function fixFxEventFloat(obj: IWrapFxEventFloatAttribute): void {
   obj.time = fixFloat(obj.time, FxEventFloat.defaultValue.time);
   obj.easing = fixInt(obj.easing, FxEventFloat.defaultValue.easing);
   obj.previous = fixInt(
      obj.previous,
      FxEventFloat.defaultValue.previous,
      [0, 1],
   );
   obj.value = fixFloat(obj.value, FxEventFloat.defaultValue.value);
}

export function main(data: IWrapBeatmap): void {
   logger.tInfo(
      ['patch', 'dataCorrection', 'beatmap', 'main'],
      'Verifying and correcting data type...',
   );

   data.bpmEvents.forEach(fixBpmEvent);
   data.rotationEvents.forEach(fixRotationEvent);
   data.colorNotes.forEach(fixColorNote);
   data.bombNotes.forEach(fixBombNote);
   data.obstacles.forEach(fixObstacle);
   data.arcs.forEach(fixSlider);
   data.chains.forEach(fixChain);
   data.waypoints.forEach(fixWaypoint);
   data.difficulty.customData.fakeColorNotes?.forEach(fixFakeColorNote);
   data.difficulty.customData.fakeBombNotes?.forEach(fixFakeBombNote);
   data.difficulty.customData.fakeObstacles?.forEach(fixFakeObstacle);
   data.difficulty.customData.fakeChains?.forEach(fixFakeChain);
   data.basicEvents.forEach(fixBasicEvent);
   data.colorBoostEvents.forEach(fixColorBoostEvent);
   data.lightColorEventBoxGroups.forEach(fixLightColorEventBoxGroup);
   data.lightRotationEventBoxGroups.forEach(fixLightRotationEventBoxGroup);
   data.lightTranslationEventBoxGroups.forEach(
      fixLightTranslationEventBoxGroup,
   );
   data.fxEventBoxGroups.forEach(fixFxEventBoxGroup);
   data.lightshow.useNormalEventsAsCompatibleEvents = fixBoolean(
      data.lightshow.useNormalEventsAsCompatibleEvents,
   );

   const boost = data.basicEvents.filter((ev) => ev.isLaneRotationEvent());
   const laneRotation = data.basicEvents.filter((ev) => ev.isColorBoost());
   data.basicEvents = data.basicEvents.filter(
      (ev) => !(ev.isColorBoost() || ev.isLaneRotationEvent()),
   );
   data.colorBoostEvents.push(
      ...boost.map(
         (ev) =>
            new ColorBoostEvent({
               time: ev.time,
               toggle: ev.value ? true : false,
            }),
      ),
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

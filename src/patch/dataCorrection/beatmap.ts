import { Arc } from '../../beatmap/core/arc.ts';
import { BasicEvent } from '../../beatmap/core/basicEvent.ts';
import { BombNote } from '../../beatmap/core/bombNote.ts';
import { BPMEvent } from '../../beatmap/core/bpmEvent.ts';
import { Chain } from '../../beatmap/core/chain.ts';
import { ColorBoostEvent } from '../../beatmap/core/colorBoostEvent.ts';
import { ColorNote } from '../../beatmap/core/colorNote.ts';
import { FxEventBox } from '../../beatmap/core/fxEventBox.ts';
import { FxEventBoxGroup } from '../../beatmap/core/fxEventBoxGroup.ts';
import { FxEventFloat } from '../../beatmap/core/fxEventFloat.ts';
import { FxEventInt } from '../../beatmap/core/fxEventInt.ts';
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
import { Obstacle } from '../../beatmap/core/obstacle.ts';
import { RotationEvent } from '../../beatmap/core/rotationEvent.ts';
import { Waypoint } from '../../beatmap/core/waypoint.ts';
import {
   isColorBoostEventType,
   isLaneRotationEventType,
} from '../../beatmap/helpers/core/basicEvent.ts';
import { EventLaneRotationValue } from '../../beatmap/misc/remaps.ts';
import { ExecutionTime } from '../../beatmap/schema/shared/types/constants.ts';
import { logger } from '../../logger.ts';
import type { IBombNote } from '../../beatmap/schema/v3/types/bombNote.ts';
import type { IChain } from '../../beatmap/schema/v3/types/chain.ts';
import type { IColorNote } from '../../beatmap/schema/v3/types/colorNote.ts';
import type { IFxEventBox } from '../../beatmap/schema/v3/types/fxEventBox.ts';
import type { ILightColorEventBox } from '../../beatmap/schema/v3/types/lightColorEventBox.ts';
import type { ILightRotationEventBox } from '../../beatmap/schema/v3/types/lightRotationEventBox.ts';
import type { ILightTranslationEventBox } from '../../beatmap/schema/v3/types/lightTranslationEventBox.ts';
import type { IObstacle } from '../../beatmap/schema/v3/types/obstacle.ts';
import type { IWrapArc } from '../../beatmap/core/types/arc.ts';
import type { IWrapBasicEvent } from '../../beatmap/core/types/basicEvent.ts';
import type { IWrapBeatmap } from '../../beatmap/core/types/beatmap.ts';
import type { IWrapBombNote } from '../../beatmap/core/types/bombNote.ts';
import type { IWrapBPMEvent } from '../../beatmap/core/types/bpmEvent.ts';
import type { IWrapChain } from '../../beatmap/core/types/chain.ts';
import type { IWrapColorBoostEvent } from '../../beatmap/core/types/colorBoostEvent.ts';
import type { IWrapColorNote } from '../../beatmap/core/types/colorNote.ts';
import type { IWrapFxEventBox } from '../../beatmap/core/types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../../beatmap/core/types/fxEventBoxGroup.ts';
import type { IWrapFxEventFloat } from '../../beatmap/core/types/fxEventFloat.ts';
import type { IWrapIndexFilter } from '../../beatmap/core/types/indexFilter.ts';
import type { IWrapLightColorEvent } from '../../beatmap/core/types/lightColorEvent.ts';
import type { IWrapLightColorEventBox } from '../../beatmap/core/types/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxGroup } from '../../beatmap/core/types/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEvent } from '../../beatmap/core/types/lightRotationEvent.ts';
import type { IWrapLightRotationEventBox } from '../../beatmap/core/types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxGroup } from '../../beatmap/core/types/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEvent } from '../../beatmap/core/types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventBox } from '../../beatmap/core/types/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../../beatmap/core/types/lightTranslationEventBoxGroup.ts';
import type { IWrapObstacle } from '../../beatmap/core/types/obstacle.ts';
import type { IWrapRotationEvent } from '../../beatmap/core/types/rotationEvent.ts';
import type { IWrapWaypoint } from '../../beatmap/core/types/waypoint.ts';
import { fixCustomDataEvent } from './customDataEvent.ts';
import { fixCustomDataObject } from './customDataObject.ts';
import { fixBoolean, fixFloat, fixInt } from './helpers.ts';

function fixBpmEvent(obj: IWrapBPMEvent): void {
   obj.time = fixFloat(obj.time, BPMEvent.defaultValue.time);
   obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: IWrapRotationEvent): void {
   obj.time = fixFloat(obj.time, RotationEvent.defaultValue.time);
   obj.executionTime = fixInt(
      obj.executionTime,
      RotationEvent.defaultValue.executionTime,
      [0, 1],
   );
   obj.rotation = fixFloat(obj.rotation, RotationEvent.defaultValue.rotation);
}

function fixColorNote(obj: IWrapColorNote): void {
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

function fixBombNote(obj: IWrapBombNote): void {
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

function fixObstacle(obj: IWrapObstacle): void {
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

function fixSlider(obj: IWrapArc): void {
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

function fixChain(obj: IWrapChain): void {
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

function fixWaypoint(obj: IWrapWaypoint): void {
   obj.time = fixFloat(obj.time, Waypoint.defaultValue.time);
   obj.posX = fixInt(obj.posX, Waypoint.defaultValue.posX);
   obj.posY = fixInt(obj.posY, Waypoint.defaultValue.posY);
   obj.direction = fixInt(obj.direction, Waypoint.defaultValue.direction);
}

function fixBasicEvent(obj: IWrapBasicEvent): void {
   obj.time = fixFloat(obj.time, BasicEvent.defaultValue.time);
   obj.type = fixInt(obj.type, BasicEvent.defaultValue.type);
   obj.value = fixInt(obj.value, BasicEvent.defaultValue.value);
   obj.floatValue = fixFloat(
      obj.floatValue,
      BasicEvent.defaultValue.floatValue,
   );
   fixCustomDataEvent(obj.customData);
}

function fixColorBoostEvent(obj: IWrapColorBoostEvent): void {
   obj.time = fixFloat(obj.time, ColorBoostEvent.defaultValue.time);
   obj.toggle = fixBoolean(obj.toggle, ColorBoostEvent.defaultValue.toggle);
}

function fixIndexFilter(obj: IWrapIndexFilter): void {
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

function fixLightColorEvent(obj: IWrapLightColorEvent): void {
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

function fixLightColorEventBox(obj: IWrapLightColorEventBox): void {
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

function fixLightColorEventBoxGroup(obj: IWrapLightColorEventBoxGroup): void {
   obj.time = fixFloat(obj.time, LightColorEventBoxGroup.defaultValue.time);
   obj.id = fixInt(obj.id, LightColorEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightColorEventBox);
}

function fixLightRotationEvent(obj: IWrapLightRotationEvent): void {
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

function fixLightRotationEventBox(obj: IWrapLightRotationEventBox): void {
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
   obj: IWrapLightRotationEventBoxGroup,
): void {
   obj.time = fixFloat(obj.time, LightRotationEventBoxGroup.defaultValue.time);
   obj.id = fixInt(obj.id, LightRotationEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightRotationEventBox);
}

function fixLightTranslationEvent(obj: IWrapLightTranslationEvent): void {
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

function fixLightTranslationEventBox(obj: IWrapLightTranslationEventBox): void {
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
   obj: IWrapLightTranslationEventBoxGroup,
): void {
   obj.time = fixFloat(
      obj.time,
      LightTranslationEventBoxGroup.defaultValue.time,
   );
   obj.id = fixInt(obj.id, LightTranslationEventBoxGroup.defaultValue.id);
   obj.boxes.forEach(fixLightTranslationEventBox);
}

function fixFxEventBox(obj: IWrapFxEventBox): void {
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

function fixFxEventBoxGroup(obj: IWrapFxEventBoxGroup): void {
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

function fixFxEventFloat(obj: IWrapFxEventFloat): void {
   obj.time = fixFloat(obj.time, FxEventFloat.defaultValue.time);
   obj.easing = fixInt(obj.easing, FxEventFloat.defaultValue.easing);
   obj.previous = fixInt(
      obj.previous,
      FxEventFloat.defaultValue.previous,
      [0, 1],
   );
   obj.value = fixFloat(obj.value, FxEventFloat.defaultValue.value);
}

/**
 * Verifies and corrects data type for beatmap data.
 */
export function beatmap<T extends IWrapBeatmap>(data: T): void {
   logger.tInfo(
      ['patch', 'dataCorrection', 'beatmap', 'main'],
      'Verifying and correcting data type...',
   );

   data.difficulty.bpmEvents.forEach(fixBpmEvent);
   data.difficulty.rotationEvents.forEach(fixRotationEvent);
   data.difficulty.colorNotes.forEach(fixColorNote);
   data.difficulty.bombNotes.forEach(fixBombNote);
   data.difficulty.obstacles.forEach(fixObstacle);
   data.difficulty.arcs.forEach(fixSlider);
   data.difficulty.chains.forEach(fixChain);
   data.lightshow.waypoints.forEach(fixWaypoint);
   data.difficulty.customData.fakeColorNotes?.forEach(fixFakeColorNote);
   data.difficulty.customData.fakeBombNotes?.forEach(fixFakeBombNote);
   data.difficulty.customData.fakeObstacles?.forEach(fixFakeObstacle);
   data.difficulty.customData.fakeChains?.forEach(fixFakeChain);
   data.lightshow.basicEvents.forEach(fixBasicEvent);
   data.lightshow.colorBoostEvents.forEach(fixColorBoostEvent);
   data.lightshow.lightColorEventBoxGroups.forEach(fixLightColorEventBoxGroup);
   data.lightshow.lightRotationEventBoxGroups.forEach(
      fixLightRotationEventBoxGroup,
   );
   data.lightshow.lightTranslationEventBoxGroups.forEach(
      fixLightTranslationEventBoxGroup,
   );
   data.lightshow.fxEventBoxGroups.forEach(fixFxEventBoxGroup);
   data.lightshow.useNormalEventsAsCompatibleEvents = fixBoolean(
      data.lightshow.useNormalEventsAsCompatibleEvents,
   );

   const boost = data.lightshow.basicEvents.filter((ev) => isColorBoostEventType(ev.type));
   const laneRotation = data.lightshow.basicEvents.filter((ev) => isLaneRotationEventType(ev.type));
   data.lightshow.basicEvents = data.lightshow.basicEvents.filter(
      (ev) => !(isColorBoostEventType(ev.type) || isLaneRotationEventType(ev.type)),
   );
   data.lightshow.colorBoostEvents.push(
      ...boost.map((ev) => ({
         time: ev.time,
         toggle: ev.value ? true : false,
         customData: {},
      })),
   );
   data.difficulty.rotationEvents.push(
      ...laneRotation.map((ev) => ({
         time: ev.time,
         executionTime: ev.type == 15 ? ExecutionTime.LATE : ExecutionTime.EARLY,
         rotation: ev.customData._rotation ??
            (ev.value >= 1000 && ev.value <= 1720
               ? ev.value - 1360
               : ev.value >= 0 && ev.value <= 7
               ? EventLaneRotationValue[ev.value]
               : 0),
         customData: {},
      })),
   );
}

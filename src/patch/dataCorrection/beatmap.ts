import {
   isColorBoostEventType,
   isLaneRotationEventType,
} from '../../beatmap/helpers/core/basicEvent.ts';
import { EventLaneRotationValue } from '../../beatmap/misc/remaps.ts';
import { ExecutionTime } from '../../beatmap/schema/shared/types/constants.ts';
import { createArc } from '../../beatmap/schema/wrapper/arc.ts';
import { createBasicEvent } from '../../beatmap/schema/wrapper/basicEvent.ts';
import { createBombNote } from '../../beatmap/schema/wrapper/bombNote.ts';
import { createBPMEvent } from '../../beatmap/schema/wrapper/bpmEvent.ts';
import { createChain } from '../../beatmap/schema/wrapper/chain.ts';
import { createColorBoostEvent } from '../../beatmap/schema/wrapper/colorBoostEvent.ts';
import { createColorNote } from '../../beatmap/schema/wrapper/colorNote.ts';
import { createFxEventBox } from '../../beatmap/schema/wrapper/fxEventBox.ts';
import { createFxEventBoxGroup } from '../../beatmap/schema/wrapper/fxEventBoxGroup.ts';
import { createFxEventFloat } from '../../beatmap/schema/wrapper/fxEventFloat.ts';
import { createFxEventInt } from '../../beatmap/schema/wrapper/fxEventInt.ts';
import { createIndexFilter } from '../../beatmap/schema/wrapper/indexFilter.ts';
import { createLightColorEvent } from '../../beatmap/schema/wrapper/lightColorEvent.ts';
import { createLightColorEventBox } from '../../beatmap/schema/wrapper/lightColorEventBox.ts';
import { createLightColorEventBoxGroup } from '../../beatmap/schema/wrapper/lightColorEventBoxGroup.ts';
import { createLightRotationEvent } from '../../beatmap/schema/wrapper/lightRotationEvent.ts';
import { createLightRotationEventBox } from '../../beatmap/schema/wrapper/lightRotationEventBox.ts';
import { createLightRotationEventBoxGroup } from '../../beatmap/schema/wrapper/lightRotationEventBoxGroup.ts';
import { createLightTranslationEvent } from '../../beatmap/schema/wrapper/lightTranslationEvent.ts';
import { createLightTranslationEventBox } from '../../beatmap/schema/wrapper/lightTranslationEventBox.ts';
import { createLightTranslationEventBoxGroup } from '../../beatmap/schema/wrapper/lightTranslationEventBoxGroup.ts';
import { createObstacle } from '../../beatmap/schema/wrapper/obstacle.ts';
import { createRotationEvent } from '../../beatmap/schema/wrapper/rotationEvent.ts';
import { createWaypoint } from '../../beatmap/schema/wrapper/waypoint.ts';
import type { IBombNote } from '../../beatmap/schema/v3/types/bombNote.ts';
import type { IChain } from '../../beatmap/schema/v3/types/chain.ts';
import type { IColorNote } from '../../beatmap/schema/v3/types/colorNote.ts';
import type { IFxEventBox } from '../../beatmap/schema/v3/types/fxEventBox.ts';
import type { ILightColorEventBox } from '../../beatmap/schema/v3/types/lightColorEventBox.ts';
import type { ILightRotationEventBox } from '../../beatmap/schema/v3/types/lightRotationEventBox.ts';
import type { ILightTranslationEventBox } from '../../beatmap/schema/v3/types/lightTranslationEventBox.ts';
import type { IObstacle } from '../../beatmap/schema/v3/types/obstacle.ts';
import type { IWrapArc } from '../../beatmap/schema/wrapper/types/arc.ts';
import type { IWrapBasicEvent } from '../../beatmap/schema/wrapper/types/basicEvent.ts';
import type { IWrapBeatmap } from '../../beatmap/schema/wrapper/types/beatmap.ts';
import type { IWrapBombNote } from '../../beatmap/schema/wrapper/types/bombNote.ts';
import type { IWrapBPMEvent } from '../../beatmap/schema/wrapper/types/bpmEvent.ts';
import type { IWrapChain } from '../../beatmap/schema/wrapper/types/chain.ts';
import type { IWrapColorBoostEvent } from '../../beatmap/schema/wrapper/types/colorBoostEvent.ts';
import type { IWrapColorNote } from '../../beatmap/schema/wrapper/types/colorNote.ts';
import type { IWrapFxEventBox } from '../../beatmap/schema/wrapper/types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../../beatmap/schema/wrapper/types/fxEventBoxGroup.ts';
import type { IWrapFxEventFloat } from '../../beatmap/schema/wrapper/types/fxEventFloat.ts';
import type { IWrapFxEventInt } from '../../beatmap/schema/wrapper/types/fxEventInt.ts';
import type { IWrapIndexFilter } from '../../beatmap/schema/wrapper/types/indexFilter.ts';
import type { IWrapLightColorEvent } from '../../beatmap/schema/wrapper/types/lightColorEvent.ts';
import type { IWrapLightColorEventBox } from '../../beatmap/schema/wrapper/types/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxGroup } from '../../beatmap/schema/wrapper/types/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEvent } from '../../beatmap/schema/wrapper/types/lightRotationEvent.ts';
import type { IWrapLightRotationEventBox } from '../../beatmap/schema/wrapper/types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxGroup } from '../../beatmap/schema/wrapper/types/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEvent } from '../../beatmap/schema/wrapper/types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventBox } from '../../beatmap/schema/wrapper/types/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../../beatmap/schema/wrapper/types/lightTranslationEventBoxGroup.ts';
import type { IWrapObstacle } from '../../beatmap/schema/wrapper/types/obstacle.ts';
import type { IWrapRotationEvent } from '../../beatmap/schema/wrapper/types/rotationEvent.ts';
import type { IWrapWaypoint } from '../../beatmap/schema/wrapper/types/waypoint.ts';
import { getLogger } from '../../logger.ts';
import { fixCustomDataEvent } from './customDataEvent.ts';
import { fixCustomDataObject } from './customDataObject.ts';
import { fixBoolean, fixFloat, fixInt } from './helpers.ts';

const zeroOneRange = [0, 1] as [0, 1];
const oneTwoRange = [1, 2] as [1, 2];
const zeroOneTwoRange = [0, 1, 2] as [0, 1, 2];
const zeroOneTwoThreeRange = [0, 1, 2, 3] as [0, 1, 2, 3];
const minusOneZeroOneTwoRange = [-1, 0, 1, 2] as [-1, 0, 1, 2];

const arcDefault = Object.freeze(createArc());
const basicEventDefault = Object.freeze(createBasicEvent());
const bombNoteDefault = Object.freeze(createBombNote());
const bpmEventDefault = Object.freeze(createBPMEvent());
const chainDefault = Object.freeze(createChain());
const colorBoostEventDefault = Object.freeze(createColorBoostEvent());
const colorNoteDefault = Object.freeze(createColorNote());
const fxEventBoxDefault = Object.freeze(createFxEventBox());
const fxEventBoxGroupDefault = Object.freeze(createFxEventBoxGroup());
const fxEventFloatDefault = Object.freeze(createFxEventFloat());
const fxEventIntDefault = Object.freeze(createFxEventInt());
const indexFilterDefault = Object.freeze(createIndexFilter());
const lightColorEventDefault = Object.freeze(createLightColorEvent());
const lightColorEventBoxDefault = Object.freeze(createLightColorEventBox());
const lightColorEventBoxGroupDefault = Object.freeze(createLightColorEventBoxGroup());
const lightRotationEventDefault = Object.freeze(createLightRotationEvent());
const lightRotationEventBoxDefault = Object.freeze(createLightRotationEventBox());
const lightRotationEventBoxGroupDefault = Object.freeze(createLightRotationEventBoxGroup());
const lightTranslationEventDefault = Object.freeze(createLightTranslationEvent());
const lightTranslationEventBoxDefault = Object.freeze(createLightTranslationEventBox());
const lightTranslationEventBoxGroupDefault = Object.freeze(createLightTranslationEventBoxGroup());
const obstacleDefault = Object.freeze(createObstacle());
const rotationEventDefault = Object.freeze(createRotationEvent());
const waypointDefault = Object.freeze(createWaypoint());

function fixBpmEvent(obj: IWrapBPMEvent): void {
   obj.time = fixFloat(obj.time, bpmEventDefault.time);
   obj.bpm = fixFloat(obj.bpm);
}

function fixRotationEvent(obj: IWrapRotationEvent): void {
   obj.time = fixFloat(obj.time, rotationEventDefault.time);
   obj.executionTime = fixInt(
      obj.executionTime,
      rotationEventDefault.executionTime,
      zeroOneRange,
   );
   obj.rotation = fixFloat(obj.rotation, rotationEventDefault.rotation);
}

function fixColorNote(obj: IWrapColorNote): void {
   obj.time = fixFloat(obj.time, colorNoteDefault.time);
   obj.color = fixInt(obj.color, zeroOneRange, zeroOneRange);
   obj.posX = fixInt(obj.posX, colorNoteDefault.posX);
   obj.posY = fixInt(obj.posY, colorNoteDefault.posY);
   obj.direction = fixInt(obj.direction, colorNoteDefault.direction);
   obj.angleOffset = fixInt(
      obj.angleOffset,
      colorNoteDefault.angleOffset,
   );
   fixCustomDataObject(obj.customData);
}

function fixFakeColorNote(obj: IColorNote): void {
   obj.b = fixFloat(obj.b, colorNoteDefault.time);
   obj.x = fixInt(obj.x, colorNoteDefault.posX);
   obj.y = fixInt(obj.y, colorNoteDefault.posY);
   obj.c = fixInt<Required<IColorNote>['c']>(obj.c, zeroOneRange, zeroOneRange);
   obj.d = fixInt(obj.d, colorNoteDefault.direction);
   obj.a = fixInt(obj.a, colorNoteDefault.angleOffset);
   fixCustomDataObject(obj.customData);
}

function fixBombNote(obj: IWrapBombNote): void {
   obj.time = fixFloat(obj.time, bombNoteDefault.time);
   obj.posX = fixInt(obj.posX, bombNoteDefault.posX);
   obj.posY = fixInt(obj.posY, bombNoteDefault.posY);
   fixCustomDataObject(obj.customData);
}

function fixFakeBombNote(obj: IBombNote): void {
   obj.b = fixFloat(obj.b, bombNoteDefault.time);
   obj.x = fixInt(obj.x, bombNoteDefault.posX);
   obj.y = fixInt(obj.y, bombNoteDefault.posY);
   fixCustomDataObject(obj.customData);
}

function fixObstacle(obj: IWrapObstacle): void {
   obj.time = fixFloat(obj.time, obstacleDefault.time);
   obj.posX = fixInt(obj.posX, obstacleDefault.posX);
   obj.posY = fixInt(obj.posY, obstacleDefault.posY);
   obj.duration = fixFloat(obj.duration, obstacleDefault.duration);
   obj.width = fixInt(obj.width, obstacleDefault.width);
   obj.height = fixInt(obj.height, obstacleDefault.height);
   fixCustomDataObject(obj.customData);
}

function fixFakeObstacle(obj: IObstacle): void {
   obj.b = fixFloat(obj.b, obstacleDefault.time);
   obj.x = fixInt(obj.x, obstacleDefault.posX);
   obj.y = fixInt(obj.y, obstacleDefault.posY);
   obj.d = fixFloat(obj.d, obstacleDefault.duration);
   obj.w = fixInt(obj.w, obstacleDefault.width);
   obj.h = fixInt(obj.h, obstacleDefault.height);
   fixCustomDataObject(obj.customData);
}

function fixSlider(obj: IWrapArc): void {
   obj.time = fixFloat(obj.time, arcDefault.time);
   obj.color = fixInt(obj.color, zeroOneRange, zeroOneRange);
   obj.posX = fixInt(obj.posX, arcDefault.posX);
   obj.posY = fixInt(obj.posY, arcDefault.posY);
   obj.direction = fixInt(obj.direction, arcDefault.direction);
   obj.lengthMultiplier = fixFloat(
      obj.lengthMultiplier,
      arcDefault.lengthMultiplier,
   );
   obj.tailTime = fixFloat(obj.tailTime, arcDefault.tailTime);
   obj.tailPosX = fixInt(obj.tailPosX, arcDefault.tailPosX);
   obj.tailPosY = fixInt(obj.tailPosY, arcDefault.tailPosY);
   obj.tailDirection = fixInt(
      obj.tailDirection,
      arcDefault.tailDirection,
   );
   obj.tailLengthMultiplier = fixFloat(
      obj.tailLengthMultiplier,
      arcDefault.tailLengthMultiplier,
   );
   obj.midAnchor = fixInt(obj.midAnchor, arcDefault.midAnchor);
   fixCustomDataObject(obj.customData);
}

function fixChain(obj: IWrapChain): void {
   obj.time = fixFloat(obj.time, chainDefault.time);
   obj.color = fixInt(obj.color, zeroOneRange, zeroOneRange);
   obj.posX = fixInt(obj.posX, chainDefault.posX);
   obj.posY = fixInt(obj.posY, chainDefault.posY);
   obj.direction = fixInt(obj.direction, chainDefault.direction);
   obj.tailTime = fixFloat(obj.tailTime, chainDefault.tailTime);
   obj.tailPosX = fixInt(obj.tailPosX, chainDefault.tailPosX);
   obj.tailPosY = fixInt(obj.tailPosY, chainDefault.tailPosY);
   obj.sliceCount = fixInt(obj.sliceCount, chainDefault.sliceCount) || 1;
   obj.squish = fixFloat(obj.squish, chainDefault.squish) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixFakeChain(obj: IChain): void {
   obj.b = fixFloat(obj.b, chainDefault.time);
   obj.c = fixInt<Required<IChain>['c']>(obj.c, zeroOneRange, zeroOneRange);
   obj.x = fixInt(obj.x, chainDefault.posX);
   obj.y = fixInt(obj.y, chainDefault.posY);
   obj.d = fixInt(obj.d, chainDefault.direction);
   obj.tb = fixFloat(obj.tb, chainDefault.tailTime);
   obj.tx = fixInt(obj.tx, chainDefault.tailPosX);
   obj.ty = fixInt(obj.ty, chainDefault.tailPosY);
   obj.sc = fixInt(obj.sc, chainDefault.sliceCount) || 1;
   obj.s = fixFloat(obj.s, chainDefault.squish) || 0.001;
   fixCustomDataObject(obj.customData);
}

function fixWaypoint(obj: IWrapWaypoint): void {
   obj.time = fixFloat(obj.time, waypointDefault.time);
   obj.posX = fixInt(obj.posX, waypointDefault.posX);
   obj.posY = fixInt(obj.posY, waypointDefault.posY);
   obj.direction = fixInt(obj.direction, waypointDefault.direction);
}

function fixBasicEvent(obj: IWrapBasicEvent): void {
   obj.time = fixFloat(obj.time, basicEventDefault.time);
   obj.type = fixInt(obj.type, basicEventDefault.type);
   obj.value = fixInt(obj.value, basicEventDefault.value);
   obj.floatValue = fixFloat(
      obj.floatValue,
      basicEventDefault.floatValue,
   );
   fixCustomDataEvent(obj.customData);
}

function fixColorBoostEvent(obj: IWrapColorBoostEvent): void {
   obj.time = fixFloat(obj.time, colorBoostEventDefault.time);
   obj.toggle = fixBoolean(obj.toggle, colorBoostEventDefault.toggle);
}

function fixIndexFilter(obj: IWrapIndexFilter): void {
   obj.type = fixInt(obj.type, indexFilterDefault.type, oneTwoRange);
   obj.p0 = fixInt(obj.p0, indexFilterDefault.p0);
   obj.p1 = fixInt(obj.p1, indexFilterDefault.p1);
   obj.reverse = fixInt(obj.reverse, indexFilterDefault.reverse, zeroOneRange);
   obj.chunks = fixInt(obj.chunks, indexFilterDefault.chunks);
   obj.random = fixInt(
      obj.random,
      indexFilterDefault.random,
      zeroOneTwoThreeRange,
   );
   obj.seed = fixInt(obj.seed, indexFilterDefault.seed);
   obj.limit = fixFloat(obj.limit, indexFilterDefault.limit, 0, 1);
   obj.limitAffectsType = fixInt(
      obj.limitAffectsType,
      indexFilterDefault.limitAffectsType,
      zeroOneTwoThreeRange,
   );
}

function fixLightColorEvent(obj: IWrapLightColorEvent): void {
   obj.time = fixFloat(obj.time, lightColorEventDefault.time);
   obj.frequency = fixInt(
      obj.frequency,
      lightColorEventDefault.frequency,
   );
   obj.color = obj.previous === 1
      ? fixInt(obj.color, -1, minusOneZeroOneTwoRange)
      : fixInt(obj.color, lightColorEventDefault.color, zeroOneTwoRange);
   obj.easing = fixInt(
      obj.easing,
      lightColorEventDefault.easing,
      zeroOneTwoRange,
   );
   obj.previous = fixInt(
      obj.previous,
      lightColorEventDefault.previous,
      zeroOneRange,
   );
   obj.brightness = fixFloat(
      obj.brightness,
      lightColorEventDefault.brightness,
   );
   obj.strobeBrightness = fixFloat(
      obj.strobeBrightness,
      lightColorEventDefault.strobeBrightness,
   );
   obj.strobeFade = fixInt(
      obj.strobeFade,
      lightColorEventDefault.strobeFade,
      zeroOneRange,
   );
}

function fixLightColorEventBox(obj: IWrapLightColorEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      lightColorEventBoxDefault.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      lightColorEventBoxDefault.beatDistributionType,
      oneTwoRange,
   );
   obj.brightnessDistribution = fixFloat(
      obj.brightnessDistribution,
      lightColorEventBoxDefault.brightnessDistribution,
   );
   obj.brightnessDistributionType = fixInt(
      obj.brightnessDistributionType,
      lightColorEventBoxDefault.brightnessDistributionType,
      oneTwoRange,
   );
   obj.affectFirst = fixInt<Required<ILightColorEventBox>['b']>(
      obj.affectFirst,
      lightColorEventBoxDefault.affectFirst,
      zeroOneRange,
   );
   obj.events.forEach(fixLightColorEvent);
}

function fixLightColorEventBoxGroup(obj: IWrapLightColorEventBoxGroup): void {
   obj.time = fixFloat(obj.time, lightColorEventBoxGroupDefault.time);
   obj.id = fixInt(obj.id, lightColorEventBoxGroupDefault.id);
   obj.boxes.forEach(fixLightColorEventBox);
}

function fixLightRotationEvent(obj: IWrapLightRotationEvent): void {
   obj.time = fixFloat(obj.time, lightRotationEventDefault.time);
   obj.easing = fixInt(obj.easing, lightRotationEventDefault.easing);
   obj.loop = fixInt(obj.loop, lightRotationEventDefault.loop);
   obj.direction = fixInt(
      obj.direction,
      lightRotationEventDefault.direction,
      zeroOneTwoRange,
   );
   obj.previous = fixInt(
      obj.previous,
      lightRotationEventDefault.previous,
      zeroOneRange,
   );
   obj.rotation = fixFloat(
      obj.rotation,
      lightRotationEventDefault.rotation,
   );
}

function fixLightRotationEventBox(obj: IWrapLightRotationEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      lightRotationEventBoxDefault.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      lightRotationEventBoxDefault.beatDistributionType,
      oneTwoRange,
   );
   obj.rotationDistribution = fixFloat(
      obj.rotationDistribution,
      lightRotationEventBoxDefault.rotationDistribution,
   );
   obj.rotationDistributionType = fixInt(
      obj.rotationDistributionType,
      lightRotationEventBoxDefault.rotationDistributionType,
      oneTwoRange,
   );
   obj.axis = fixInt(
      obj.axis,
      lightRotationEventBoxDefault.axis,
      zeroOneTwoRange,
   );
   obj.flip = fixInt<Required<ILightRotationEventBox>['r']>(
      obj.flip,
      lightRotationEventBoxDefault.flip,
      zeroOneRange,
   );
   obj.affectFirst = fixInt<Required<ILightRotationEventBox>['b']>(
      obj.affectFirst,
      lightRotationEventBoxDefault.affectFirst,
      zeroOneRange,
   );
   obj.events.forEach(fixLightRotationEvent);
}

function fixLightRotationEventBoxGroup(
   obj: IWrapLightRotationEventBoxGroup,
): void {
   obj.time = fixFloat(obj.time, lightRotationEventBoxGroupDefault.time);
   obj.id = fixInt(obj.id, lightRotationEventBoxGroupDefault.id);
   obj.boxes.forEach(fixLightRotationEventBox);
}

function fixLightTranslationEvent(obj: IWrapLightTranslationEvent): void {
   obj.time = fixFloat(obj.time, lightTranslationEventDefault.time);
   obj.easing = fixInt(obj.easing, lightTranslationEventDefault.easing);
   obj.previous = fixInt(
      obj.previous,
      lightTranslationEventDefault.previous,
      zeroOneRange,
   );
   obj.translation = fixFloat(
      obj.translation,
      lightTranslationEventDefault.translation,
   );
}

function fixLightTranslationEventBox(obj: IWrapLightTranslationEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      lightTranslationEventBoxDefault.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      lightTranslationEventBoxDefault.beatDistributionType,
      oneTwoRange,
   );
   obj.gapDistribution = fixFloat(
      obj.gapDistribution,
      lightTranslationEventBoxDefault.gapDistribution,
   );
   obj.gapDistributionType = fixInt(
      obj.gapDistributionType,
      lightTranslationEventBoxDefault.gapDistributionType,
      oneTwoRange,
   );
   obj.axis = fixInt(
      obj.axis,
      lightTranslationEventBoxDefault.axis,
      zeroOneTwoRange,
   );
   obj.flip = fixInt<Required<ILightTranslationEventBox>['r']>(
      obj.flip,
      lightTranslationEventBoxDefault.flip,
      zeroOneRange,
   );
   obj.affectFirst = fixInt<Required<ILightTranslationEventBox>['b']>(
      obj.affectFirst,
      lightTranslationEventBoxDefault.affectFirst,
      zeroOneRange,
   );
   obj.events.forEach(fixLightTranslationEvent);
}

function fixLightTranslationEventBoxGroup(
   obj: IWrapLightTranslationEventBoxGroup,
): void {
   obj.time = fixFloat(
      obj.time,
      lightTranslationEventBoxGroupDefault.time,
   );
   obj.id = fixInt(obj.id, lightTranslationEventBoxGroupDefault.id);
   obj.boxes.forEach(fixLightTranslationEventBox);
}

function fixFxEventBox(obj: IWrapFxEventBox): void {
   fixIndexFilter(obj.filter);
   obj.beatDistribution = fixFloat(
      obj.beatDistribution,
      fxEventBoxDefault.beatDistribution,
   );
   obj.beatDistributionType = fixInt(
      obj.beatDistributionType,
      fxEventBoxDefault.beatDistributionType,
      oneTwoRange,
   );
   obj.fxDistribution = fixFloat(
      obj.fxDistribution,
      fxEventBoxDefault.fxDistribution,
   );
   obj.fxDistributionType = fixInt(
      obj.fxDistributionType,
      fxEventBoxDefault.fxDistributionType,
      oneTwoRange,
   );
   obj.affectFirst = fixInt<Required<IFxEventBox>['b']>(
      obj.affectFirst,
      fxEventBoxDefault.affectFirst,
      zeroOneRange,
   );
   obj.events.forEach(fixFxEventFloat);
}

function fixFxEventBoxGroup(obj: IWrapFxEventBoxGroup): void {
   obj.time = fixFloat(obj.time, fxEventBoxGroupDefault.time);
   obj.id = fixInt(obj.id, fxEventBoxGroupDefault.id);
   obj.boxes.forEach(fixFxEventBox);
}

// FIXME: prolly never gonna be used
function _fixFxEventInt(obj: IWrapFxEventInt): void {
   obj.time = fixFloat(obj.time, fxEventIntDefault.time);
   obj.previous = fixInt(
      obj.previous,
      fxEventIntDefault.previous,
      zeroOneRange,
   );
   obj.value = fixFloat(obj.value, fxEventIntDefault.value);
}

function fixFxEventFloat(obj: IWrapFxEventFloat): void {
   obj.time = fixFloat(obj.time, fxEventFloatDefault.time);
   obj.easing = fixInt(obj.easing, fxEventFloatDefault.easing);
   obj.previous = fixInt(
      obj.previous,
      fxEventFloatDefault.previous,
      zeroOneRange,
   );
   obj.value = fixFloat(obj.value, fxEventFloatDefault.value);
}

/**
 * Verifies and corrects data type for beatmap data.
 */
export function patchBeatmap<T extends IWrapBeatmap>(data: T): void {
   const logger = getLogger();

   logger?.tInfo(
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

   const basicEvents = data.lightshow.basicEvents;
   const basicEventsWithoutSpecial = [] as IWrapBasicEvent[];
   const colorBoostEvents = data.lightshow.colorBoostEvents;
   const rotationEvents = data.difficulty.rotationEvents;
   const keepConvertedEventsSeparate = colorBoostEvents as unknown === rotationEvents;
   const boostEvents = keepConvertedEventsSeparate ? [] as IWrapColorBoostEvent[] : undefined;
   const laneRotationEvents = keepConvertedEventsSeparate ? [] as IWrapRotationEvent[] : undefined;
   for (let i = 0, length = basicEvents.length; i < length; i++) {
      if (!(i in basicEvents)) continue;
      const ev = basicEvents[i];
      const isBoost = isColorBoostEventType(ev.type);
      const isLaneRotation = isLaneRotationEventType(ev.type);
      if (isBoost) {
         const boostEvent = {
            time: ev.time,
            toggle: ev.value ? true : false,
            customData: {},
         };
         if (boostEvents) boostEvents.push(boostEvent);
         else colorBoostEvents.push(boostEvent);
      }
      if (isLaneRotation) {
         const laneRotationEvent = {
            time: ev.time,
            executionTime: ev.type == 15 ? ExecutionTime.LATE : ExecutionTime.EARLY,
            rotation: ev.customData._rotation ??
               (ev.value >= 1000 && ev.value <= 1720
                  ? ev.value - 1360
                  : ev.value >= 0 && ev.value <= 7
                  ? EventLaneRotationValue[ev.value]
                  : 0),
            customData: {},
         };
         if (laneRotationEvents) laneRotationEvents.push(laneRotationEvent);
         else rotationEvents.push(laneRotationEvent);
      }
      if (!isBoost && !isLaneRotation) basicEventsWithoutSpecial.push(ev);
   }
   data.lightshow.basicEvents = basicEventsWithoutSpecial;
   if (boostEvents) data.lightshow.colorBoostEvents.push(...boostEvents);
   if (laneRotationEvents) data.difficulty.rotationEvents.push(...laneRotationEvents);
}

//FIXME: i feel like it's better to just check key instead of type of it
import type { IWrapArcAttribute } from '../../../types/beatmap/wrapper/arc.ts';
import type { IWrapBaseItemAttribute } from '../../../types/beatmap/wrapper/baseItem.ts';
import type { IWrapBaseNoteAttribute } from '../../../types/beatmap/wrapper/baseNote.ts';
import type { IWrapBombNoteAttribute } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapChainAttribute } from '../../../types/beatmap/wrapper/chain.ts';
import type { IWrapObstacleAttribute } from '../../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEventAttribute } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { RotationValueEventValue } from '../../shared/constants.ts';

/**
 * Checks if basic event has Chroma in beatmap v2.
 */
export function hasChromaEventV2(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData._color) ||
      typeof data.customData._lightID === 'number' ||
      Array.isArray(data.customData._lightID) ||
      typeof data.customData._propID === 'number' ||
      typeof data.customData._lightGradient === 'object' ||
      typeof data.customData._easing === 'string' ||
      typeof data.customData._lerpType === 'string' ||
      typeof data.customData._nameFilter === 'string' ||
      typeof data.customData._reset === 'boolean' ||
      typeof data.customData._rotation === 'number' ||
      typeof data.customData._step === 'number' ||
      typeof data.customData._prop === 'number' ||
      typeof data.customData._speed === 'number' ||
      typeof data.customData._direction === 'number' ||
      typeof data.customData._counterSpin === 'boolean' ||
      typeof data.customData._stepMult === 'number' ||
      typeof data.customData._propMult === 'number' ||
      typeof data.customData._speedMult === 'number' ||
      typeof data.customData._lockPosition === 'boolean' ||
      typeof data.customData._speed === 'number' ||
      typeof data.customData._preciseSpeed === 'number' ||
      typeof data.customData._direction === 'number'
   );
}

/**
 * Checks if note has Chroma in beatmap v2.
 */
export function hasChromaNoteV2(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData._color) ||
      typeof data.customData._disableSpawnEffect === 'boolean'
   );
}

/**
 * Checks if note has Noodle Extensions in beatmap v2.
 */
export function hasNoodleExtensionsNoteV2(
   data: IWrapBaseItemAttribute,
): boolean {
   return (
      Array.isArray(data.customData._animation) ||
      typeof data.customData._cutDirection === 'number' ||
      typeof data.customData._disableNoteGravity === 'boolean' ||
      typeof data.customData._disableNoteLook === 'boolean' ||
      typeof data.customData._fake === 'boolean' ||
      Array.isArray(data.customData._flip) ||
      typeof data.customData._interactable === 'boolean' ||
      Array.isArray(data.customData._localRotation) ||
      typeof data.customData._noteJumpMovementSpeed === 'number' ||
      typeof data.customData._noteJumpStartBeatOffset === 'number' ||
      Array.isArray(data.customData._position) ||
      Array.isArray(data.customData._rotation)
   );
}

/**
 * Checks if obstacle has Chroma in beatmap v2
 */
export function hasChromaObstacleV2(data: IWrapBaseItemAttribute): boolean {
   return Array.isArray(data.customData._color);
}

/**
 * Checks if obstacle has Noodle Extensions in beatmap v2.
 */
export function hasNoodleExtensionsObstacleV2(
   data: IWrapBaseItemAttribute,
): boolean {
   return (
      Array.isArray(data.customData._animation) ||
      typeof data.customData._fake === 'boolean' ||
      typeof data.customData._interactable === 'boolean' ||
      Array.isArray(data.customData._localRotation) ||
      typeof data.customData._noteJumpMovementSpeed === 'number' ||
      typeof data.customData._noteJumpStartBeatOffset === 'number' ||
      Array.isArray(data.customData._position) ||
      Array.isArray(data.customData._rotation) ||
      Array.isArray(data.customData._scale)
   );
}

/**
 * Checks if obstacle has Mapping Extensions in beatmap v2.
 */
export function hasMappingExtensionsObstacleV2(
   data: IWrapObstacleAttribute,
): boolean {
   return (
      data.posX < 0 ||
      data.posX > 3 ||
      data.width < 0 ||
      data.width > 4 ||
      data.posY < 0 ||
      data.posY > 2 ||
      data.posY === 1 ||
      (data.posY === 0 && data.height !== 5) ||
      (data.posY === 2 && data.height !== 3)
   );
}

/**
 * Checks if rotation event has Noodle Extensions in beatmap v2.
 */
export function hasNoodleExtensionsRotationV2(
   data: IWrapRotationEventAttribute,
): boolean {
   return typeof data.customData._rotation === 'number';
}

/**
 * Checks if rotation event has Mapping Extensions in beatmap v2.
 */
export function hasMappingExtensionsRotationV2(
   data: IWrapRotationEventAttribute,
): boolean {
   return !RotationValueEventValue[data.rotation];
}

/**
 * Checks if basic event has Chroma in beatmap v3.
 */
export function hasChromaEventV3(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData.color) ||
      typeof data.customData.lightID === 'number' ||
      Array.isArray(data.customData.lightID) ||
      typeof data.customData.easing === 'string' ||
      typeof data.customData.lerpType === 'string' ||
      typeof data.customData.nameFilter === 'string' ||
      typeof data.customData.rotation === 'number' ||
      typeof data.customData.step === 'number' ||
      typeof data.customData.prop === 'number' ||
      typeof data.customData.speed === 'number' ||
      typeof data.customData.direction === 'number' ||
      typeof data.customData.lockRotation === 'boolean' ||
      typeof data.customData.speed === 'number' ||
      typeof data.customData.direction === 'number'
   );
}

/**
 * Checks if note has Chroma in beatmap v3.
 */
export function hasChromaNoteV3(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData.color) ||
      typeof data.customData.spawnEffect === 'boolean' ||
      typeof data.customData.disableDebris === 'boolean'
   );
}

/**
 * Checks if note has Noodle Extensions in beatmap v3.
 */
export function hasNoodleExtensionsNoteV3(
   data: IWrapBaseItemAttribute,
): boolean {
   return (
      Array.isArray(data.customData.animation) ||
      typeof data.customData.disableNoteGravity === 'boolean' ||
      typeof data.customData.disableNoteLook === 'boolean' ||
      typeof data.customData.disableBadCutDirection === 'boolean' ||
      typeof data.customData.disableBadCutSaberType === 'boolean' ||
      typeof data.customData.disableBadCutSpeed === 'boolean' ||
      Array.isArray(data.customData.flip) ||
      typeof data.customData.uninteractable === 'boolean' ||
      Array.isArray(data.customData.localRotation) ||
      typeof data.customData.noteJumpMovementSpeed === 'number' ||
      typeof data.customData.noteJumpStartBeatOffset === 'number' ||
      Array.isArray(data.customData.coordinates) ||
      Array.isArray(data.customData.worldRotation) ||
      typeof data.customData.worldRotation === 'number' ||
      typeof data.customData.link === 'string'
   );
}

/**
 * Checks if slider has Noodle Extensions in beatmap v3.
 */
export function hasNoodleExtensionsSliderV3(
   data: IWrapBaseItemAttribute,
): boolean {
   return (
      Array.isArray(data.customData.animation) ||
      typeof data.customData.disableNoteGravity === 'boolean' ||
      typeof data.customData.disableNoteLook === 'boolean' ||
      typeof data.customData.disableBadCutDirection === 'boolean' ||
      typeof data.customData.disableBadCutSaberType === 'boolean' ||
      typeof data.customData.disableBadCutSpeed === 'boolean' ||
      Array.isArray(data.customData.flip) ||
      typeof data.customData.uninteractable === 'boolean' ||
      Array.isArray(data.customData.localRotation) ||
      typeof data.customData.noteJumpMovementSpeed === 'number' ||
      typeof data.customData.noteJumpStartBeatOffset === 'number' ||
      Array.isArray(data.customData.coordinates) ||
      Array.isArray(data.customData.tailCoordinates) ||
      Array.isArray(data.customData.worldRotation) ||
      typeof data.customData.worldRotation === 'number' ||
      typeof data.customData.link === 'string'
   );
}

/**
 * Checks if obstacle has Chroma in beatmap v3.
 */
export function hasChromaObstacleV3(data: IWrapBaseItemAttribute): boolean {
   return Array.isArray(data.customData.color);
}

/**
 * Checks if obstacle has Noodle Extensions in beatmap v3.
 */
export function hasNoodleExtensionsObstacleV3(
   data: IWrapBaseItemAttribute,
): boolean {
   return (
      Array.isArray(data.customData.animation) ||
      typeof data.customData.uninteractable === 'boolean' ||
      Array.isArray(data.customData.localRotation) ||
      typeof data.customData.noteJumpMovementSpeed === 'number' ||
      typeof data.customData.noteJumpStartBeatOffset === 'number' ||
      Array.isArray(data.customData.coordinates) ||
      Array.isArray(data.customData.worldRotation) ||
      Array.isArray(data.customData.size)
   );
}

/**
 * Checks if obstacle has Mapping Extensions in beatmap v3.
 */
export function hasMappingExtensionsObstacleV3(
   data: IWrapObstacleAttribute,
): boolean {
   return (
      data.posY < 0 ||
      data.posY > 2 ||
      data.posX <= -1000 ||
      data.posX >= 1000 ||
      data.width <= -1000 ||
      data.width >= 1000 ||
      data.height <= -1000 ||
      data.height >= 1000
   );
}

/**
 * Checks if arc has Mapping Extensions in beatmap v3.
 */
export function hasMappingExtensionsArc(data: IWrapArcAttribute): boolean {
   return (
      data.posY > 2 ||
      data.posY < 0 ||
      data.posX <= -1000 ||
      data.posX >= 1000 ||
      (data.direction >= 1000 && data.direction <= 1360) ||
      (data.tailDirection >= 1000 && data.tailDirection <= 1360)
   );
}

/**
 * Checks if bomb note has Mapping Extensions in beatmap v3.
 */
export function hasMappingExtensionsBombNote(
   data: IWrapBombNoteAttribute,
): boolean {
   return data.posX > 3 || data.posX < 0 || data.posY > 2 || data.posY < 0;
}

/**
 * Checks if chain has Mapping Extensions in beatmap v3.
 */
export function hasMappingExtensionsChain(data: IWrapChainAttribute): boolean {
   return (
      data.posY > 2 ||
      data.posY < 0 ||
      data.posX <= -1000 ||
      data.posX >= 1000 ||
      (data.direction >= 1000 && data.direction <= 1360)
   );
}

/**
 * Checks if note has Mapping Extensions.
 */
export function hasMappingExtensionsNote(
   data: IWrapBaseNoteAttribute,
): boolean {
   return (
      data.posX > 3 ||
      data.posX < 0 ||
      data.posY > 2 ||
      data.posY < 0 ||
      (data.direction >= 1000 && data.direction <= 1360) ||
      (data.direction >= 2000 && data.direction <= 2360)
   );
}

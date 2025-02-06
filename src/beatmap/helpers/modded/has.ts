//FIXME: i feel like it's better to just check key instead of type of it
import type { IWrapArc } from '../../../types/beatmap/wrapper/arc.ts';
import type { IWrapBasicEvent } from '../../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBombNote } from '../../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapChain } from '../../../types/beatmap/wrapper/chain.ts';
import type { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapObstacle } from '../../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEvent } from '../../../types/beatmap/wrapper/rotationEvent.ts';
import { RotationValueEventValue } from '../../shared/constants.ts';

/**
 * Checks if basic event has Chroma in beatmap v2.
 */
export function hasChromaEventV2<
   T extends Pick<IWrapBasicEvent, 'customData'>,
>(data: T): boolean {
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
export function hasChromaNoteV2<
   T extends Pick<IWrapColorNote | IWrapBombNote, 'customData'>,
>(data: T): boolean {
   return (
      Array.isArray(data.customData._color) ||
      typeof data.customData._disableSpawnEffect === 'boolean'
   );
}

/**
 * Checks if note has Noodle Extensions in beatmap v2.
 */
export function hasNoodleExtensionsNoteV2<
   T extends Pick<IWrapColorNote | IWrapBombNote, 'customData'>,
>(data: T): boolean {
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
export function hasChromaObstacleV2<
   T extends Pick<IWrapObstacle, 'customData'>,
>(data: T): boolean {
   return Array.isArray(data.customData._color);
}

/**
 * Checks if obstacle has Noodle Extensions in beatmap v2.
 */
export function hasNoodleExtensionsObstacleV2<
   T extends Pick<IWrapObstacle, 'customData'>,
>(data: T): boolean {
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
export function hasMappingExtensionsObstacleV2<
   T extends Pick<IWrapObstacle, 'posX' | 'posY' | 'width' | 'height'>,
>(data: T): boolean {
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
export function hasNoodleExtensionsRotationV2<
   T extends Pick<IWrapRotationEvent, 'customData'>,
>(data: T): boolean {
   return typeof data.customData._rotation === 'number';
}

/**
 * Checks if rotation event has Mapping Extensions in beatmap v2.
 */
export function hasMappingExtensionsRotationV2<
   T extends Pick<IWrapRotationEvent, 'rotation'>,
>(data: T): boolean {
   return !RotationValueEventValue[data.rotation];
}

/**
 * Checks if basic event has Chroma in beatmap v3.
 */
export function hasChromaEventV3<
   T extends Pick<IWrapBasicEvent, 'customData'>,
>(data: T): boolean {
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
export function hasChromaNoteV3<
   T extends Pick<IWrapColorNote | IWrapBombNote, 'customData'>,
>(data: T): boolean {
   return (
      Array.isArray(data.customData.color) ||
      typeof data.customData.spawnEffect === 'boolean' ||
      typeof data.customData.disableDebris === 'boolean'
   );
}

/**
 * Checks if note has Noodle Extensions in beatmap v3.
 */
export function hasNoodleExtensionsNoteV3<
   T extends Pick<IWrapColorNote | IWrapBombNote, 'customData'>,
>(data: T): boolean {
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
export function hasNoodleExtensionsSliderV3<
   T extends Pick<IWrapArc | IWrapChain, 'customData'>,
>(data: T): boolean {
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
export function hasChromaObstacleV3<
   T extends Pick<IWrapObstacle, 'customData'>,
>(data: T): boolean {
   return Array.isArray(data.customData.color);
}

/**
 * Checks if obstacle has Noodle Extensions in beatmap v3.
 */
export function hasNoodleExtensionsObstacleV3<
   T extends Pick<IWrapObstacle, 'customData'>,
>(data: T): boolean {
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
export function hasMappingExtensionsObstacleV3<
   T extends Pick<IWrapObstacle, 'posX' | 'posY' | 'width' | 'height'>,
>(data: T): boolean {
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
export function hasMappingExtensionsArc<
   T extends Pick<IWrapArc, 'posX' | 'posY' | 'direction' | 'tailDirection'>,
>(data: T): boolean {
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
export function hasMappingExtensionsBombNote<
   T extends Pick<IWrapBombNote, 'posX' | 'posY'>,
>(data: T): boolean {
   return data.posX > 3 || data.posX < 0 || data.posY > 2 || data.posY < 0;
}

/**
 * Checks if chain has Mapping Extensions in beatmap v3.
 */
export function hasMappingExtensionsChain<
   T extends Pick<IWrapChain, 'posX' | 'posY' | 'direction'>,
>(data: T): boolean {
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
export function hasMappingExtensionsNote<
   T extends Pick<IWrapColorNote, 'posX' | 'posY' | 'direction'>,
>(data: T): boolean {
   return (
      data.posX > 3 ||
      data.posX < 0 ||
      data.posY > 2 ||
      data.posY < 0 ||
      (data.direction >= 1000 && data.direction <= 1360) ||
      (data.direction >= 2000 && data.direction <= 2360)
   );
}

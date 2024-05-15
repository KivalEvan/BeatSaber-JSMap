//FIXME: i feel like it's better to just check key instead of type of it
import type { IWrapBaseItemAttribute } from '../../types/beatmap/wrapper/baseItem.ts';
import type { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';

export function hasChromaEventV2(data: IWrapBaseItemAttribute) {
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

export function hasChromaNoteV2(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData._color) ||
      typeof data.customData._disableSpawnEffect === 'boolean'
   );
}

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

export function hassChromaObstacleV2(data: IWrapBaseItemAttribute): boolean {
   return Array.isArray(data.customData._color);
}

export function hassNoodleExtensionsObstacleV2(
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

export function hasMappingExtensionsObstacleV2(
   data: IWrapObstacleAttribute,
): boolean {
   return data.posX < 0 || data.posX > 3 || data.width < 0 || data.width > 3;
}

export function hasNoodleExtensionsRotationV2(
   data: IWrapRotationEventAttribute,
): boolean {
   return typeof data.customData._rotation === 'number';
}

export function hasMappingExtensionsRotationV2(
   data: IWrapRotationEventAttribute,
): boolean {
   return data.rotation >= 1000 && data.rotation <= 1720;
}

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

export function hasChromaNoteV3(data: IWrapBaseItemAttribute): boolean {
   return (
      Array.isArray(data.customData.color) ||
      typeof data.customData.spawnEffect === 'boolean' ||
      typeof data.customData.disableDebris === 'boolean'
   );
}

export function hasNoodleExtensionsNoteV3(data: IWrapBaseItemAttribute): boolean {
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

export function hasNoodleExtensionsSliderV3(data: IWrapBaseItemAttribute): boolean {
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

export function hasChromaObstacleV3(data: IWrapBaseItemAttribute): boolean {
   return Array.isArray(data.customData.color);
}

export function hasNoodleExtensionsObstacleV3(data: IWrapBaseItemAttribute): boolean {
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

export function hasMappingExtensionsObstacleV3(data: IWrapObstacleAttribute): boolean {
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

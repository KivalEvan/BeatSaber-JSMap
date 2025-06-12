import type { ICustomDataNote as IV2CustomDataNote } from '../../types/beatmap/v2/custom/note.ts';
import type { ICustomDataObstacle as IV2CustomDataObstacle } from '../../types/beatmap/v2/custom/obstacle.ts';
import type { ICustomDataNote as IV3CustomDataNote } from '../../types/beatmap/v3/custom/note.ts';
import type { ICustomDataObstacle as IV3CustomDataObstacle } from '../../types/beatmap/v3/custom/obstacle.ts';
import type { ICustomDataSlider } from '../../types/beatmap/v3/custom/slider.ts';
import type { Vector3 } from '../../types/vector.ts';
import {
   fixBoolean,
   fixColor,
   fixFloat,
   fixPointDefinition1Base,
   fixPointDefinition3Base,
   fixPointDefinition4Base,
   fixString,
   fixStringAry,
   fixVector2,
   fixVector3,
} from './helpers.ts';

/**
 * Fix custom data for beatmap object.
 */
export function fixCustomDataObject(
   cd?:
      & IV2CustomDataNote
      & IV2CustomDataObstacle
      & IV3CustomDataNote
      & IV3CustomDataObstacle
      & ICustomDataSlider,
) {
   if (!cd) {
      return;
   }

   if (cd._color != null) cd._color = fixColor(cd._color, [0, 0, 0, 1]);
   if (cd._position != null) cd._position = fixVector2(cd._position, [0, 0]);
   if (cd._disableNoteGravity != null) {
      cd._disableNoteGravity = fixBoolean(cd._disableNoteGravity, false);
   }
   if (cd._disableNoteLook != null) {
      cd._disableNoteLook = fixBoolean(cd._disableNoteLook, false);
   }
   if (cd._flip != null) cd._flip = fixVector2(cd._flip, [0, 0]);
   if (cd._localRotation != null) {
      cd._localRotation = fixVector3(cd._localRotation, [0, 0, 0]);
   }
   if (cd._noteJumpMovementSpeed != null) {
      cd._noteJumpMovementSpeed = fixFloat(cd._noteJumpMovementSpeed, 10);
   }
   if (cd._noteJumpStartBeatOffset != null) {
      cd._noteJumpStartBeatOffset = fixFloat(cd._noteJumpStartBeatOffset, 0);
   }
   if (cd._disableSpawnEffect != null) {
      cd._disableSpawnEffect = fixBoolean(cd._disableSpawnEffect, false);
   }
   if (cd._scale != null) cd._scale = fixVector3(cd._scale, [1, 1, 1]);
   if (cd._track != null) {
      cd._track = Array.isArray(cd._track)
         ? fixStringAry(cd._track, 'unknownTrack')
         : fixString(cd._track, 'unknownTrack');
   }
   if (cd._interactable != null) {
      cd._interactable = fixBoolean(cd._interactable, false);
   }
   if (cd._fake != null) cd._fake = fixBoolean(cd._interactable, false);
   if (cd._rotation != null) {
      cd._rotation = Array.isArray(cd._rotation)
         ? fixVector3(cd._rotation, [0, 0, 0])
         : fixFloat(cd._rotation, 0);
   }
   if (cd._animation != null) {
      if (cd._animation._color != null) {
         cd._animation._color = Array.isArray(cd._animation._color)
            ? fixPointDefinition4Base(cd._animation._color, [0, 0, 0, 1])
            : fixString(cd._animation._color, 'unknownTrack');
      }
      if (cd._animation._definitePosition != null) {
         cd._animation._definitePosition = Array.isArray(cd._animation._definitePosition)
            ? fixPointDefinition3Base(cd._animation._definitePosition, [0, 0, 0])
            : fixString(cd._animation._definitePosition, 'unknownTrack');
      }
      if (cd._animation._dissolve != null) {
         cd._animation._dissolve = Array.isArray(cd._animation._dissolve)
            ? fixPointDefinition1Base(cd._animation._dissolve, 0)
            : fixString(cd._animation._dissolve, 'unknownTrack');
      }
      if (cd._animation._dissolveArrow != null) {
         cd._animation._dissolveArrow = Array.isArray(cd._animation._dissolveArrow)
            ? fixPointDefinition1Base(cd._animation._dissolveArrow, 0)
            : fixString(cd._animation._dissolveArrow, 'unknownTrack');
      }
      if (cd._animation._interactable != null) {
         cd._animation._interactable = Array.isArray(cd._animation._interactable)
            ? fixPointDefinition1Base(cd._animation._interactable, 0)
            : fixString(cd._animation._interactable, 'unknownTrack');
      }
      if (cd._animation._localRotation != null) {
         cd._animation._localRotation = Array.isArray(cd._animation._localRotation)
            ? fixPointDefinition3Base(cd._animation._localRotation, [0, 0, 0])
            : fixString(cd._animation._localRotation, 'unknownTrack');
      }
      if (cd._animation._position != null) {
         cd._animation._position = Array.isArray(cd._animation._position)
            ? fixPointDefinition3Base(cd._animation._position, [0, 0, 0])
            : fixString(cd._animation._position, 'unknownTrack');
      }
      if (cd._animation._rotation != null) {
         cd._animation._rotation = Array.isArray(cd._animation._rotation)
            ? fixPointDefinition3Base(cd._animation._rotation, [0, 0, 0])
            : fixString(cd._animation._rotation, 'unknownTrack');
      }
      if (cd._animation._scale != null) {
         cd._animation._scale = Array.isArray(cd._animation._scale)
            ? fixPointDefinition3Base(cd._animation._scale, [0, 0, 0])
            : fixString(cd._animation._scale, 'unknownTrack');
      }
      if (cd._animation._time != null) {
         cd._animation._time = Array.isArray(cd._animation._time)
            ? fixPointDefinition1Base(cd._animation._time, 0)
            : fixString(cd._animation._time, 'unknownTrack');
      }
   }

   if (cd.color != null) cd.color = fixColor(cd.color, [0, 0, 0, 1]);
   if (cd.coordinates != null) {
      cd.coordinates = fixVector2(cd.coordinates, [0, 0]);
   }
   if (cd.tailCoordinates != null) {
      cd.tailCoordinates = fixVector2(cd.tailCoordinates, [0, 0]);
   }
   if (cd.disableDebris != null) {
      cd.disableDebris = fixBoolean(cd.disableDebris);
   }
   if (cd.disableNoteGravity != null) {
      cd.disableNoteGravity = fixBoolean(cd.disableNoteGravity);
   }
   if (cd.disableNoteLook != null) {
      cd.disableNoteLook = fixBoolean(cd.disableNoteLook);
   }
   if (cd.flip != null) cd.flip = fixVector2(cd.flip, [0, 0]);
   if (cd.localRotation != null) {
      cd.localRotation = fixVector3(cd.localRotation, [0, 0, 0]);
   }
   if (cd.noteJumpMovementSpeed != null) {
      cd.noteJumpMovementSpeed = fixFloat(cd.noteJumpMovementSpeed);
   }
   if (cd.noteJumpStartBeatOffset != null) {
      cd.noteJumpStartBeatOffset = fixFloat(cd.noteJumpStartBeatOffset);
   }
   if (cd.size != null) {
      if (!Array.isArray(cd.size)) cd.size = [null, null, null];
      cd.size.length = 3;
      cd.size = cd.size.map((s) => (typeof s === 'number' ? s : null)) as Vector3;
   }
   if (cd.spawnEffect != null) cd.spawnEffect = fixBoolean(cd.spawnEffect);
   if (cd.track != null) {
      cd.track = Array.isArray(cd.track)
         ? fixStringAry(cd.track, 'unknownTrack')
         : fixString(cd.track, 'unknownTrack');
   }
   if (cd.link != null) {
      cd.link = fixString(cd.track, 'unknownLink');
   }
   if (cd.uninteractable != null) {
      cd.uninteractable = fixBoolean(cd.uninteractable);
   }
   if (cd.worldRotation != null) {
      cd.worldRotation = Array.isArray(cd.worldRotation)
         ? fixVector3(cd.worldRotation, [0, 0, 0])
         : fixFloat(cd.worldRotation, 0);
   }
   if (cd.animation != null) {
      if (cd.animation.color != null) {
         cd.animation.color = Array.isArray(cd.animation.color)
            ? fixPointDefinition4Base(cd.animation.color, [0, 0, 0, 1])
            : fixString(cd.animation.color);
      }
      if (cd.animation.definitePosition != null) {
         cd.animation.definitePosition = Array.isArray(cd.animation.definitePosition)
            ? fixPointDefinition3Base(cd.animation.definitePosition, [0, 0, 0])
            : fixString(cd.animation.definitePosition);
      }
      if (cd.animation.dissolve != null) {
         cd.animation.dissolve = Array.isArray(cd.animation.dissolve)
            ? fixPointDefinition1Base(cd.animation.dissolve, 0)
            : fixString(cd.animation.dissolve);
      }
      if (cd.animation.dissolveArrow != null) {
         cd.animation.dissolveArrow = Array.isArray(cd.animation.dissolveArrow)
            ? fixPointDefinition1Base(cd.animation.dissolveArrow, 0)
            : fixString(cd.animation.dissolveArrow);
      }
      if (cd.animation.interactable != null) {
         cd.animation.interactable = Array.isArray(cd.animation.interactable)
            ? fixPointDefinition1Base(cd.animation.interactable, 1)
            : fixString(cd.animation.interactable);
      }
      if (cd.animation.localRotation != null) {
         cd.animation.localRotation = Array.isArray(cd.animation.localRotation)
            ? fixPointDefinition3Base(cd.animation.localRotation, [0, 0, 0])
            : fixString(cd.animation.localRotation);
      }
      if (cd.animation.offsetPosition != null) {
         cd.animation.offsetPosition = Array.isArray(cd.animation.offsetPosition)
            ? fixPointDefinition3Base(cd.animation.offsetPosition, [0, 0, 0])
            : fixString(cd.animation.offsetPosition);
      }
      if (cd.animation.offsetRotation != null) {
         cd.animation.offsetRotation = Array.isArray(cd.animation.offsetRotation)
            ? fixPointDefinition3Base(cd.animation.offsetRotation, [0, 0, 0])
            : fixString(cd.animation.offsetRotation);
      }
      if (cd.animation.scale != null) {
         cd.animation.scale = Array.isArray(cd.animation.scale)
            ? fixPointDefinition3Base(cd.animation.scale, [0, 0, 0])
            : fixString(cd.animation.scale);
      }
      if (cd.animation.time != null) {
         cd.animation.time = Array.isArray(cd.animation.time)
            ? fixPointDefinition1Base(cd.animation.time, 0)
            : fixString(cd.animation.time);
      }
   }
}

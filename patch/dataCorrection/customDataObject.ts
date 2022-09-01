import {
    ICustomDataNote as ICustomDataNoteV2,
    ICustomDataObstacle as ICustomDataObstacleV2,
} from '../../types/beatmap/v2/customData.ts';
import {
    ICustomDataNote as ICustomDataNoteV3,
    ICustomDataObstacle as ICustomDataObstacleV3,
} from '../../types/beatmap/v3/customData.ts';
import {
    fixBoolean,
    fixColor,
    fixColorPointDefinition,
    fixFloat,
    fixPercentPointDefinition,
    fixString,
    fixStringAry,
    fixVector2,
    fixVector3,
    fixVector3PointDefinition,
} from './helpers.ts';

export function fixCustomDataObject(
    cd?: ICustomDataNoteV2 & ICustomDataObstacleV2 & ICustomDataNoteV3 & ICustomDataObstacleV3,
) {
    if (!cd) {
        return;
    }

    if (cd._color != null) cd._color = fixColor(cd._color, [0, 0, 0, 1]);
    if (cd._position != null) cd._position = fixVector2(cd._position, [0, 0]);
    if (cd._disableNoteGravity != null) cd._disableNoteGravity = fixBoolean(cd._disableNoteGravity, false);
    if (cd._disableNoteLook != null) cd._disableNoteLook = fixBoolean(cd._disableNoteLook, false);
    if (cd._flip != null) cd._flip = fixVector2(cd._flip, [0, 0]);
    if (cd._localRotation != null) cd._localRotation = fixVector3(cd._localRotation, [0, 0, 0]);
    if (cd._noteJumpMovementSpeed != null) cd._noteJumpMovementSpeed = fixFloat(cd._noteJumpMovementSpeed, 10);
    if (cd._noteJumpStartBeatOffset != null) cd._noteJumpStartBeatOffset = fixFloat(cd._noteJumpStartBeatOffset, 0);
    if (cd._disableSpawnEffect != null) cd._disableSpawnEffect = fixBoolean(cd._disableSpawnEffect, false);
    if (cd._scale != null) cd._scale = fixVector3(cd._scale, [1, 1, 1]);
    if (cd._track != null) {
        cd._track = Array.isArray(cd._track)
            ? fixStringAry(cd._track, 'unknownTrack')
            : fixString(cd._track, 'unknownTrack');
    }
    if (cd._interactable != null) cd._interactable = fixBoolean(cd._interactable, false);
    if (cd._fake != null) cd._fake = fixBoolean(cd._interactable, false);
    if (cd._rotation != null) {
        cd._rotation = Array.isArray(cd._rotation) ? fixVector3(cd._rotation, [0, 0, 0]) : fixFloat(cd._rotation, 0);
    }
    if (cd._animation != null) {
        if (cd._animation._color != null) {
            cd._animation._color = Array.isArray(cd._animation._color)
                ? fixColorPointDefinition(cd._animation._color, [0, 0, 0, 1])
                : fixString(cd._animation._color, 'unknownTrack');
        }
        if (cd._animation._definitePosition != null) {
            cd._animation._definitePosition = Array.isArray(cd._animation._definitePosition)
                ? fixVector3PointDefinition(cd._animation._definitePosition, [0, 0, 0])
                : fixString(cd._animation._definitePosition, 'unknownTrack');
        }
        if (cd._animation._dissolve != null) {
            cd._animation._dissolve = Array.isArray(cd._animation._dissolve)
                ? fixPercentPointDefinition(cd._animation._dissolve, 0)
                : fixString(cd._animation._dissolve, 'unknownTrack');
        }
        if (cd._animation._dissolveArrow != null) {
            cd._animation._dissolveArrow = Array.isArray(cd._animation._dissolveArrow)
                ? fixPercentPointDefinition(cd._animation._dissolveArrow, 0)
                : fixString(cd._animation._dissolveArrow, 'unknownTrack');
        }
        if (cd._animation._interactable != null) {
            cd._animation._interactable = Array.isArray(cd._animation._interactable)
                ? fixPercentPointDefinition(cd._animation._interactable, 0)
                : fixString(cd._animation._interactable, 'unknownTrack');
        }
        if (cd._animation._localRotation != null) {
            cd._animation._localRotation = Array.isArray(cd._animation._localRotation)
                ? fixVector3PointDefinition(cd._animation._localRotation, [0, 0, 0])
                : fixString(cd._animation._localRotation, 'unknownTrack');
        }
        if (cd._animation._position != null) {
            cd._animation._position = Array.isArray(cd._animation._position)
                ? fixVector3PointDefinition(cd._animation._position, [0, 0, 0])
                : fixString(cd._animation._position, 'unknownTrack');
        }
        if (cd._animation._rotation != null) {
            cd._animation._rotation = Array.isArray(cd._animation._rotation)
                ? fixVector3PointDefinition(cd._animation._rotation, [0, 0, 0])
                : fixString(cd._animation._rotation, 'unknownTrack');
        }
        if (cd._animation._scale != null) {
            cd._animation._scale = Array.isArray(cd._animation._scale)
                ? fixVector3PointDefinition(cd._animation._scale, [0, 0, 0])
                : fixString(cd._animation._scale, 'unknownTrack');
        }
        if (cd._animation._time != null) {
            cd._animation._time = Array.isArray(cd._animation._time)
                ? fixPercentPointDefinition(cd._animation._time, 0)
                : fixString(cd._animation._time, 'unknownTrack');
        }
    }

    if (cd.color != null) cd.color = fixColor(cd.color, [0, 0, 0, 1]);
    if (cd.coordinates != null) cd.coordinates = fixVector2(cd.coordinates, [0, 0]);
    if (cd.disableDebris != null) cd.disableDebris = fixBoolean(cd.disableDebris);
    if (cd.disableNoteGravity != null) cd.disableNoteGravity = fixBoolean(cd.disableNoteGravity);
    if (cd.disableNoteLook != null) cd.disableNoteLook = fixBoolean(cd.disableNoteLook);
    if (cd.flip != null) cd.flip = fixVector2(cd.flip, [0, 0]);
    if (cd.localRotation != null) cd.localRotation = fixVector3(cd.localRotation, [0, 0, 0]);
    if (cd.noteJumpMovementSpeed != null) cd.noteJumpMovementSpeed = fixFloat(cd.noteJumpMovementSpeed);
    if (cd.noteJumpStartBeatOffset != null) cd.noteJumpStartBeatOffset = fixFloat(cd.noteJumpStartBeatOffset);
    if (cd.size != null) cd.size = fixVector3(cd.size, [1, 1, 1]);
    if (cd.spawnEffect != null) cd.spawnEffect = fixBoolean(cd.spawnEffect);
    if (cd.track != null) {
        cd.track = Array.isArray(cd.track)
            ? fixStringAry(cd.track, 'unknownTrack')
            : fixString(cd.track, 'unknownTrack');
    }
    if (cd.uninteractable != null) cd.uninteractable = fixBoolean(cd.uninteractable);
    if (cd.worldRotation != null) {
        cd.worldRotation = Array.isArray(cd.worldRotation)
            ? fixVector3(cd.worldRotation, [0, 0, 0])
            : fixFloat(cd.worldRotation, 0);
    }
    if (cd.animation != null) {
        if (cd.animation.color != null) {
            cd.animation.color = Array.isArray(cd.animation.color)
                ? fixColorPointDefinition(cd.animation.color, [0, 0, 0, 1])
                : fixString(cd.animation.color);
        }
        if (cd.animation.definitePosition != null) {
            cd.animation.definitePosition = Array.isArray(cd.animation.definitePosition)
                ? fixVector3PointDefinition(cd.animation.definitePosition, [0, 0, 0])
                : fixString(cd.animation.definitePosition);
        }
        if (cd.animation.dissolve != null) {
            cd.animation.dissolve = Array.isArray(cd.animation.dissolve)
                ? fixPercentPointDefinition(cd.animation.dissolve, 0)
                : fixString(cd.animation.dissolve);
        }
        if (cd.animation.dissolveArrow != null) {
            cd.animation.dissolveArrow = Array.isArray(cd.animation.dissolveArrow)
                ? fixPercentPointDefinition(cd.animation.dissolveArrow, 0)
                : fixString(cd.animation.dissolveArrow);
        }
        if (cd.animation.interactable != null) {
            cd.animation.interactable = Array.isArray(cd.animation.interactable)
                ? fixPercentPointDefinition(cd.animation.interactable, 1)
                : fixString(cd.animation.interactable);
        }
        if (cd.animation.localRotation != null) {
            cd.animation.localRotation = Array.isArray(cd.animation.localRotation)
                ? fixVector3PointDefinition(cd.animation.localRotation, [0, 0, 0])
                : fixString(cd.animation.localRotation);
        }
        if (cd.animation.offsetPosition != null) {
            cd.animation.offsetPosition = Array.isArray(cd.animation.offsetPosition)
                ? fixVector3PointDefinition(cd.animation.offsetPosition, [0, 0, 0])
                : fixString(cd.animation.offsetPosition);
        }
        if (cd.animation.offsetRotation != null) {
            cd.animation.offsetRotation = Array.isArray(cd.animation.offsetRotation)
                ? fixVector3PointDefinition(cd.animation.offsetRotation, [0, 0, 0])
                : fixString(cd.animation.offsetRotation);
        }
        if (cd.animation.scale != null) {
            cd.animation.scale = Array.isArray(cd.animation.scale)
                ? fixVector3PointDefinition(cd.animation.scale, [0, 0, 0])
                : fixString(cd.animation.scale);
        }
        if (cd.animation.time != null) {
            cd.animation.time = Array.isArray(cd.animation.time)
                ? fixPercentPointDefinition(cd.animation.time, 0)
                : fixString(cd.animation.time);
        }
    }
}

import { ICustomDataBase } from '../../types/beatmap/shared/customData.ts';
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

export function fixCustomDataObject(cd: ICustomDataBase) {
    if (cd._color != null) cd._color = fixColor(cd._color);
    if (cd._position != null) cd._position = fixVector2(cd._position);
    if (cd._disableNoteGravity != null) cd._disableNoteGravity = fixBoolean(cd._disableNoteGravity);
    if (cd._disableNoteLook != null) cd._disableNoteLook = fixBoolean(cd._disableNoteLook);
    if (cd._flip != null) cd._flip = fixVector2(cd._flip);
    if (cd._localRotation != null) cd._localRotation = fixVector3(cd._localRotation);
    if (cd._noteJumpMovementSpeed != null) cd._noteJumpMovementSpeed = fixFloat(cd._noteJumpMovementSpeed);
    if (cd._noteJumpStartBeatOffset != null) cd._noteJumpStartBeatOffset = fixFloat(cd._noteJumpStartBeatOffset);
    if (cd._disableSpawnEffect != null) cd._disableSpawnEffect = fixBoolean(cd._disableSpawnEffect);
    if (cd._scale != null) cd._scale = fixVector3(cd._scale);
    if (cd._track != null) cd._track = Array.isArray(cd._track) ? fixStringAry(cd._track) : fixString(cd._track);
    if (cd._interactable != null) cd._interactable = fixBoolean(cd._interactable);
    if (cd._rotation != null) {
        cd._rotation = Array.isArray(cd._rotation) ? fixVector3(cd._rotation) : fixFloat(cd._rotation);
    }
    if (cd._animation != null) {
        if (cd._animation._color != null) {
            cd._animation._color = Array.isArray(cd._animation._color)
                ? fixColorPointDefinition(cd._animation._color)
                : fixString(cd._animation._color);
        }
        if (cd._animation._definitePosition != null) {
            cd._animation._definitePosition = Array.isArray(cd._animation._definitePosition)
                ? fixVector3PointDefinition(cd._animation._definitePosition)
                : fixString(cd._animation._definitePosition);
        }
        if (cd._animation._dissolve != null) {
            cd._animation._dissolve = Array.isArray(cd._animation._dissolve)
                ? fixPercentPointDefinition(cd._animation._dissolve)
                : fixString(cd._animation._dissolve);
        }
        if (cd._animation._dissolveArrow != null) {
            cd._animation._dissolveArrow = Array.isArray(cd._animation._dissolveArrow)
                ? fixPercentPointDefinition(cd._animation._dissolveArrow)
                : fixString(cd._animation._dissolveArrow);
        }
        if (cd._animation._interactable != null) {
            cd._animation._interactable = Array.isArray(cd._animation._interactable)
                ? fixPercentPointDefinition(cd._animation._interactable)
                : fixString(cd._animation._interactable);
        }
        if (cd._animation._localRotation != null) {
            cd._animation._localRotation = Array.isArray(cd._animation._localRotation)
                ? fixVector3PointDefinition(cd._animation._localRotation)
                : fixString(cd._animation._localRotation);
        }
        if (cd._animation._position != null) {
            cd._animation._position = Array.isArray(cd._animation._position)
                ? fixVector3PointDefinition(cd._animation._position)
                : fixString(cd._animation._position);
        }
        if (cd._animation._rotation != null) {
            cd._animation._rotation = Array.isArray(cd._animation._rotation)
                ? fixVector3PointDefinition(cd._animation._rotation)
                : fixString(cd._animation._rotation);
        }
        if (cd._animation._scale != null) {
            cd._animation._scale = Array.isArray(cd._animation._scale)
                ? fixVector3PointDefinition(cd._animation._scale)
                : fixString(cd._animation._scale);
        }
        if (cd._animation._time != null) {
            cd._animation._time = Array.isArray(cd._animation._time)
                ? fixPercentPointDefinition(cd._animation._time)
                : fixString(cd._animation._time);
        }
    }
}

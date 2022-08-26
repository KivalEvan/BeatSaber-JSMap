import { ICustomDataBase } from '../../types/beatmap/shared/customData.ts';
import { fixBoolean, fixColor, fixFloat, fixInt, fixString } from './helpers.ts';

export function fixCustomDataEvent(cd: ICustomDataBase) {
    if (cd._color != null) cd._color = fixColor(cd._color);
    if (cd._lightID != null) cd._lightID = fixInt(cd._lightID);
    if (cd._easing != null) cd._easing = fixString(cd._easing);
    if (cd._lerpType != null) cd._lerpType = fixString(cd._lerpType);
    if (cd._nameFilter != null) cd._nameFilter = fixString(cd._nameFilter);
    if (cd._rotation != null) cd._rotation = fixFloat(cd._rotation);
    if (cd._step != null) cd._step = fixFloat(cd._step);
    if (cd._prop != null) cd._prop = fixFloat(cd._prop);
    if (cd._speed != null) cd._speed = fixFloat(cd._speed);
    if (cd._direction != null) cd._direction = fixInt(cd._direction);
    if (cd._lockPosition != null) cd._lockPosition = fixBoolean(cd._lockPosition);
    if (cd._preciseSpeed != null) cd._preciseSpeed = fixFloat(cd._preciseSpeed);
    if (cd._reset != null) cd._reset = fixBoolean(cd._reset);
    if (cd._counterSpin != null) cd._counterSpin = fixBoolean(cd._counterSpin);
    if (cd._stepMult != null) cd._stepMult = fixFloat(cd._stepMult);
    if (cd._propMult != null) cd._propMult = fixFloat(cd._propMult);
    if (cd._speedMult != null) cd._speedMult = fixFloat(cd._speedMult);
}

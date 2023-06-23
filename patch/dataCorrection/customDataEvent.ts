import { IEvent } from '../../types/beatmap/v2/event.ts';
import { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import { fixBoolean, fixColor, fixFloat, fixInt, fixString } from './helpers.ts';

export function fixCustomDataEvent(
   cd?: IEvent['_customData'] & IBasicEvent['customData'],
) {
   if (!cd) {
      return;
   }

   if (cd._color != null) cd._color = fixColor(cd._color, [0, 0, 0, 1]);
   if (cd._lightID != null) {
      cd._lightID = Array.isArray(cd._lightID)
         ? cd._lightID
            .filter((id) => typeof id === 'number')
            .map((id) => fixInt(id))
            .filter(function (x, i, ary) {
               return !i || x !== ary[i - 1];
            })
            .sort((a, b) => a - b)
         : fixInt(cd._lightID, 1);
   }
   if (cd._propID != null) cd._propID = fixInt(cd._propID, 1);
   if (cd._easing != null) cd._easing = fixString(cd._easing, 'easeLinear');
   if (cd._lerpType != null) cd._lerpType = fixString(cd._lerpType, 'RGB');
   if (cd._nameFilter != null) cd._nameFilter = fixString(cd._nameFilter, '');
   if (cd._rotation != null) cd._rotation = fixFloat(cd._rotation, 0);
   if (cd._step != null) cd._step = fixFloat(cd._step, 0);
   if (cd._prop != null) cd._prop = fixFloat(cd._prop, 1);
   if (cd._speed != null) cd._speed = fixFloat(cd._speed, 1);
   if (cd._direction != null) cd._direction = fixInt(cd._direction, 0);
   if (cd._lockPosition != null) {
      cd._lockPosition = fixBoolean(cd._lockPosition, false);
   }
   if (cd._preciseSpeed != null) {
      cd._preciseSpeed = fixFloat(cd._preciseSpeed, 0);
   }
   if (cd._reset != null) cd._reset = fixBoolean(cd._reset, false);
   if (cd._counterSpin != null) {
      cd._counterSpin = fixBoolean(cd._counterSpin, false);
   }
   if (cd._stepMult != null) cd._stepMult = fixFloat(cd._stepMult, 1);
   if (cd._propMult != null) cd._propMult = fixFloat(cd._propMult, 1);
   if (cd._speedMult != null) cd._speedMult = fixFloat(cd._speedMult, 1);

   if (cd.color != null) cd.color = fixColor(cd.color, [0, 0, 0, 1]);
   if (cd.lightID != null) {
      cd.lightID = Array.isArray(cd.lightID)
         ? cd.lightID
            .filter((id) => id != null)
            .map((id) => fixInt(id, 1))
            .filter(function (x, i, ary) {
               return !i || x !== ary[i - 1];
            })
            .sort((a, b) => a - b)
         : fixInt(cd.lightID, 1);
   }
   if (cd.easing != null) cd.easing = fixString(cd.easing, 'easeLinear');
   if (cd.lerpType != null) cd.lerpType = fixString(cd.lerpType, 'RGB');
   if (cd.nameFilter != null) cd.nameFilter = fixString(cd.nameFilter, '');
   if (cd.rotation != null) cd.rotation = fixInt(cd.rotation, 0);
   if (cd.step != null) cd.step = fixInt(cd.step, 0);
   if (cd.prop != null) cd.prop = fixInt(cd.prop, 1);
   if (cd.speed != null) cd.speed = fixInt(cd.speed, 1);
   if (cd.direction != null) cd.direction = fixInt(cd.direction, 0);
   if (cd.lockRotation != null) {
      cd.lockRotation = fixBoolean(cd.lockRotation, false);
   }
}

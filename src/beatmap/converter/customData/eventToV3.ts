import type { IEvent } from '../../schema/v2/types/event.ts';
import type { IBasicEvent } from '../../schema/v3/types/basicEvent.ts';
import { isEmpty } from '../../../utils/misc/json.ts';
import { renameKey } from './_helpers.ts';

export default function (
   customData?: IEvent['_customData'],
): NonNullable<IBasicEvent['customData']> {
   if (!customData) {
      return {};
   }
   const cd = { ...customData };
   if (isEmpty(cd)) {
      return {};
   }

   renameKey(cd, '_color', 'color');
   renameKey(cd, '_lightID', 'lightID');
   renameKey(cd, '_easing', 'easing');
   renameKey(cd, '_lerpType', 'lerpType');
   renameKey(cd, '_nameFilter', 'nameFilter');
   renameKey(cd, '_rotation', 'rotation');
   renameKey(cd, '_step', 'step');
   renameKey(cd, '_prop', 'prop');
   renameKey(cd, '_direction', 'direction');
   renameKey(cd, '_lockPosition', 'lockRotation');

   // special case
   if (typeof cd._preciseSpeed === 'number') cd.speed = cd._preciseSpeed;
   else cd.speed ??= cd._speed;
   delete cd._speed;
   delete cd._preciseSpeed;

   delete cd._propID;
   delete cd._lightGradient;
   delete cd._reset;
   delete cd._counterSpin;
   delete cd._stepMult;
   delete cd._propMult;
   delete cd._speedMult;

   return cd;
}

import type { ICustomDataBase } from '../../schema/shared/types/custom/customData.ts';
import type { ICustomDataNote } from '../../schema/v3/types/custom/note.ts';
import type { ICustomDataObstacle } from '../../schema/v3/types/custom/obstacle.ts';
import { isEmpty } from '../../../utils/misc/json.ts';
import { renameKey } from './_helpers.ts';

export default function <T extends ICustomDataBase>(
   customData?: ICustomDataNote & ICustomDataObstacle,
): T {
   if (!customData) {
      return {} as T;
   }
   const cd = { ...customData };
   if (isEmpty(cd)) {
      return {} as T;
   }

   renameKey(cd, 'color', '_color');
   renameKey(cd, 'coordinates', '_position');
   renameKey(cd, 'disableNoteGravity', '_disableNoteGravity');
   renameKey(cd, 'disableNoteLook', '_disableNoteLook');
   renameKey(cd, 'flip', '_flip');
   renameKey(cd, 'localRotation', '_localRotation');
   renameKey(cd, 'noteJumpMovementSpeed', '_noteJumpMovementSpeed');
   renameKey(cd, 'noteJumpStartBeatOffset', '_noteJumpStartBeatOffset');
   renameKey(cd, 'size', '_scale');
   renameKey(cd, 'track', '_track');
   renameKey(cd, 'worldRotation', '_rotation');

   // special case
   cd._disableSpawnEffect ??= typeof cd.spawnEffect === 'boolean' ? !cd.spawnEffect : undefined;
   delete cd.spawnEffect;

   cd._interactable ??= typeof cd.uninteractable === 'boolean' ? !cd.uninteractable : undefined;
   delete cd.uninteractable;

   if (cd.animation) {
      cd._animation ??= {
         _color: cd.animation.color,
         _definitePosition: cd.animation.definitePosition,
         _dissolve: cd.animation.dissolve,
         _dissolveArrow: cd.animation.dissolveArrow,
         _interactable: cd.animation.interactable,
         _localRotation: cd.animation.localRotation,
         _position: cd.animation.offsetPosition,
         _rotation: cd.animation.offsetWorldRotation,
         _scale: cd.animation.scale,
         _time: cd.animation.time,
      };
   }
   delete cd.animation;

   return cd as T;
}

import { ICustomDataBase } from '../../types/beatmap/shared/customData.ts';
import { ICustomDataNote, ICustomDataObstacle } from '../../types/beatmap/v3/customData.ts';
import { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import { deepCopy } from '../../utils/misc.ts';

export default function <T extends ICustomDataBase>(
    customData?: ICustomDataNote & ICustomDataObstacle & IBasicEvent['customData'],
): T {
    if (!customData) {
        return {} as T;
    }
    const cd: ICustomDataBase = deepCopy(customData);
    if (!Object.keys(cd).length) {
        return {} as T;
    }

    // notes & obstacles
    cd._color ??= cd.color;
    cd._position ??= cd.coordinates;
    cd._disableNoteGravity ??= cd.disableNoteGravity;
    cd._disableNoteLook ??= cd.disableNoteLook;
    cd._flip ??= cd.flip;
    cd._localRotation ??= cd.localRotation;
    cd._noteJumpMovementSpeed ??= cd.noteJumpMovementSpeed;
    cd._noteJumpStartBeatOffset ??= cd.noteJumpStartBeatOffset;
    cd._disableSpawnEffect ??= typeof cd.spawnEffect === 'boolean' ? !cd.spawnEffect : undefined;
    cd._scale ??= cd.size;
    cd._track ??= cd.track;
    cd._interactable ??= typeof cd.uninteractable === 'boolean' ? !cd.uninteractable : undefined;
    cd._rotation ??= cd.worldRotation;
    if (cd.animation) {
        cd._animation ??= {
            _color: cd.animation.color,
            _definitePosition: cd.animation.definitePosition,
            _dissolve: cd.animation.dissolve,
            _dissolveArrow: cd.animation.dissolveArrow,
            _interactable: cd.animation.interactable,
            _localRotation: cd.animation.localRotation,
            _position: cd.animation.offsetPosition,
            _rotation: cd.animation.offsetRotation,
            _scale: cd.animation.scale,
            _time: cd.animation.time,
        };
    }

    // events
    cd._lightID ??= cd.lightID;
    cd._easing ??= cd.easing;
    cd._lerpType ??= cd.lerpType;
    cd._nameFilter ??= cd.nameFilter;
    cd._rotation ??= cd.rotation;
    cd._step ??= cd.step;
    cd._prop ??= cd.prop;
    cd._speed ??= cd.speed;
    cd._direction ??= cd.direction;
    cd._lockPosition ??= cd.lockRotation;
    cd._direction ??= cd.direction;
    cd._preciseSpeed ??= cd.speed;

    // delete converted customData
    delete cd.color;
    delete cd.coordinates;
    delete cd.disableNoteGravity;
    delete cd.disableNoteLook;
    delete cd.flip;
    delete cd.localRotation;
    delete cd.noteJumpMovementSpeed;
    delete cd.noteJumpStartBeatOffset;
    delete cd.spawnEffect;
    delete cd.size;
    delete cd.track;
    delete cd.uninteractable;
    delete cd.worldRotation;
    delete cd.animation;
    delete cd.lightID;
    delete cd.easing;
    delete cd.lerpType;
    delete cd.nameFilter;
    delete cd.rotation;
    delete cd.step;
    delete cd.prop;
    delete cd.speed;
    delete cd.direction;
    delete cd.lockRotation;
    delete cd.direction;
    delete cd.speed;

    return cd as T;
}

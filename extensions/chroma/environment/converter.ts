import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';
import { IChromaEnvironment as IChromaEnvironmentV2 } from '../../../types/beatmap/v2/chroma.ts';
import { Vector3 } from '../../../types/beatmap/shared/heck.ts';

export function envV2toV3(env: IChromaEnvironmentV2[]): IChromaEnvironment[] {
    return env.map((e) => {
        return {
            id: e._id,
            lookupMethod: e._lookupMethod,
            track: e._track,
            duplicate: e._duplicate,
            active: e._active,
            scale: e._scale,
            position: e._position?.map((n) => n * 0.6) as Vector3,
            rotation: e._rotation,
            localPosition: e._localPosition?.map((n) => n * 0.6) as Vector3,
            localRotation: e._localRotation,
            lightID: e._lightID,
        };
    });
}

export function envV3toV2(env: IChromaEnvironment[]): IChromaEnvironmentV2[] {
    return env.map((e) => {
        return {
            _id: e.id,
            _lookupMethod: e.lookupMethod,
            _track: e.track,
            _duplicate: e.duplicate,
            _active: e.active,
            _scale: e.scale,
            _position: e.position?.map((n) => n / 0.6) as Vector3,
            _rotation: e.rotation,
            _localPosition: e.localPosition?.map((n) => n / 0.6) as Vector3,
            _localRotation: e.localRotation,
            _lightID: e.lightID,
        };
    });
}

export function unityUnitToNoodleUnit(env: IChromaEnvironmentV2[]): void {
    env.forEach((e) => {
        e._position = e._position?.map((n) => n / 0.6) as Vector3;
        e._localPosition = e._localPosition?.map((n) => n / 0.6) as Vector3;
    });
}

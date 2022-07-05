import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';
import { IChromaEnvironment as IChromaEnvironmentV2 } from '../../../types/beatmap/v2/chroma.ts';
import { Vector3 } from '../../../types/beatmap/shared/heck.ts';

export function envV2toV3(env: IChromaEnvironmentV2[]): IChromaEnvironment[] {
    return env.map((e) => {
        let components = {};
        if (e._lightID) components = { ILightWithId: { lightID: e._lightID } };
        if (e._id && e._lookupMethod) {
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
                components,
            } as IChromaEnvironment;
        }
        if (e._geometry) {
            return {
                geometry: e._geometry.map((g) => {
                    return {
                        type: g._type,
                        material: g._material,
                        spawnCount: g._spawnCount,
                        track: g._track,
                        collision: g._collision,
                        color: g._color,
                    };
                }),
                track: e._track,
                duplicate: e._duplicate,
                active: e._active,
                scale: e._scale,
                position: e._position?.map((n) => n * 0.6) as Vector3,
                rotation: e._rotation,
                localPosition: e._localPosition?.map((n) => n * 0.6) as Vector3,
                localRotation: e._localRotation,
                components,
            } as IChromaEnvironment;
        }
        throw new Error('Error converting environment v2 to v3');
    });
}

export function envV3toV2(env: IChromaEnvironment[]): IChromaEnvironmentV2[] {
    return env.map((e) => {
        if (e.id && e.lookupMethod) {
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
                _lightID: e.components?.ILightWithId?.lightID,
            } as IChromaEnvironmentV2;
        }
        if (e.geometry) {
            return {
                _geometry: e.geometry.map((g) => {
                    return {
                        _type: g.type,
                        _material: g.material,
                        _spawnCount: g.spawnCount,
                        _track: g.track,
                        _collision: g.collision,
                        _color: g.color,
                    };
                }),
                _track: e.track,
                _duplicate: e.duplicate,
                _active: e.active,
                _scale: e.scale,
                _position: e.position?.map((n) => n / 0.6) as Vector3,
                _rotation: e.rotation,
                _localPosition: e.localPosition?.map((n) => n / 0.6) as Vector3,
                _localRotation: e.localRotation,
                _lightID: e.components?.ILightWithId?.lightID,
            } as IChromaEnvironmentV2;
        }
        throw new Error('Error converting environment v3 to v2');
    });
}

export function unityUnitToNoodleUnit(env: IChromaEnvironmentV2[]): void {
    env.forEach((e) => {
        e._position = e._position?.map((n) => n / 0.6) as Vector3;
        e._localPosition = e._localPosition?.map((n) => n / 0.6) as Vector3;
    });
}

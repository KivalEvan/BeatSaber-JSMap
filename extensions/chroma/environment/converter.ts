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
                geometry: {
                    type: e._geometry._type,
                    material:
                        typeof e._geometry._material === 'string'
                            ? e._geometry._material
                            : {
                                  shaderPreset: e._geometry._material._shaderPreset,
                                  shaderKeywords: e._geometry._material._shaderKeywords,
                                  track: e._geometry._material._track,
                                  color: e._geometry._material._color,
                              },
                    spawnCount: e._geometry._spawnCount,
                    track: e._geometry._track,
                    collision: e._geometry._collision,
                },
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
            };
        }
        if (e.geometry) {
            return {
                _geometry: {
                    _type: e.geometry.type,
                    _material:
                        typeof e.geometry.material === 'string'
                            ? e.geometry.material
                            : {
                                  shaderPreset: e.geometry.material.shaderPreset,
                                  shaderKeywords: e.geometry.material.shaderKeywords,
                                  track: e.geometry.material.track,
                                  color: e.geometry.material.color,
                              },
                    _spawnCount: e.geometry.spawnCount,
                    _track: e.geometry.track,
                    _collision: e.geometry.collision,
                },
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

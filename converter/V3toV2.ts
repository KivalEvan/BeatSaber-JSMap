import logger from '../logger.ts';
import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { Difficulty as DifficultyV3 } from '../beatmap/v3/difficulty.ts';
import { clamp } from '../utils/math.ts';
import { Vector3PointDefinition } from '../types/beatmap/shared/custom/heck.ts';
import { ICustomDataNote, ICustomDataObstacle } from '../types/beatmap/v2/custom/customData.ts';
import { IChromaMaterial } from '../types/beatmap/v2/custom/chroma.ts';
import objectToV2 from './customData/objectToV2.ts';
import eventToV2 from './customData/eventToV2.ts';
import { Note } from '../beatmap/v2/note.ts';
import { Event } from '../beatmap/v2/event.ts';
import { Obstacle } from '../beatmap/v2/obstacle.ts';
import { Slider } from '../beatmap/v2/slider.ts';
import { SpecialEventsKeywordFilters } from '../beatmap/v2/specialEventsKeywordFilters.ts';
import { Waypoint } from '../beatmap/v2/waypoint.ts';
import { vectorScale } from '../utils/vector.ts';

const tag = (name: string) => {
    return `[convert::${name}]`;
};

/** In case you need to go back, who knows why.
 * ```ts
 * const oldData = convert.V3toV2(newData);
 * ```
 * ---
 * **WARNING:** Burst slider and other new stuff will be gone!
 *
 * This feature won't be supported in the near future.
 */
export function V3toV2(data: DifficultyV3, skipPrompt?: boolean): DifficultyV2 {
    if (!skipPrompt) {
        logger.warn(tag('V3toV2'), 'Converting beatmap v3 to v2 may lose certain data!');
        const confirmation = prompt('Proceed with conversion? (y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v2 denied.');
        }
        logger.info(tag('V3toV2'), 'Converting beatmap v3 to v2');
    } else {
        logger.warn(tag('V3toV2'), 'Converting beatmap v3 to v2 may lose certain data!');
    }
    const template = DifficultyV2.create();
    template.fileName = data.fileName;

    data.colorNotes.forEach((n) => {
        const _customData: ICustomDataNote = objectToV2(n.customData);
        template.colorNotes.push(
            Note.create({
                _time: n.time,
                _lineIndex: n.posX,
                _lineLayer: n.posY,
                _type: n.color,
                _cutDirection: n.direction,
                _customData,
            })[0],
        );
    });

    data.customData.fakeColorNotes?.forEach((n) => {
        const _customData: ICustomDataNote = objectToV2(n.customData);
        template.colorNotes.push(
            Note.create({
                _time: n.b,
                _lineIndex: n.x,
                _lineLayer: n.y,
                _type: n.c,
                _cutDirection: n.d,
                _customData,
            })[0],
        );
    });

    data.bombNotes.forEach((b) => {
        const _customData: ICustomDataNote = objectToV2(b.customData);
        template.colorNotes.push(
            Note.create({
                _time: b.time,
                _lineIndex: b.posX,
                _lineLayer: b.posY,
                _type: 3,
                _cutDirection: 0,
                _customData,
            })[0],
        );
    });

    data.customData.fakeBombNotes?.forEach((b) => {
        const _customData: ICustomDataNote = objectToV2(b.customData);
        template.colorNotes.push(
            Note.create({
                _time: b.b,
                _lineIndex: b.x,
                _lineLayer: b.y,
                _type: 3,
                _cutDirection: 0,
                _customData,
            })[0],
        );
    });

    data.obstacles.forEach((o) => {
        const _customData: ICustomDataObstacle = objectToV2(o.customData);
        if (o.posY === 0 && o.height === 5) {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 0,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                })[0],
            );
        } else if (o.posY === 2 && o.height === 3) {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 1,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                })[0],
            );
        } else {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: o.posY,
                    _type: 2,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                })[0],
            );
        }
    });

    data.customData.fakeObstacles?.forEach((o) => {
        const _customData: ICustomDataObstacle = objectToV2(o.customData);
        if (o.y === 0 && o.h === 5) {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.b,
                    _lineIndex: o.x,
                    _lineLayer: 0,
                    _type: 0,
                    _duration: o.d,
                    _width: o.w,
                    _height: o.h,
                    _customData,
                })[0],
            );
        } else if (o.y === 2 && o.h === 3) {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.b,
                    _lineIndex: o.x,
                    _lineLayer: 0,
                    _type: 1,
                    _duration: o.d,
                    _width: o.w,
                    _height: o.h,
                    _customData,
                })[0],
            );
        } else {
            template.obstacles.push(
                Obstacle.create({
                    _time: o.b,
                    _lineIndex: o.x,
                    _lineLayer: o.y,
                    _type: 2,
                    _duration: o.d,
                    _width: o.w,
                    _height: o.h,
                    _customData,
                })[0],
            );
        }
    });

    data.basicEvents.forEach((e) => {
        const _customData = eventToV2(e.customData);
        if (e.isLaserRotationEvent()) {
            delete _customData?._speed;
        } else {
            delete _customData?._preciseSpeed;
        }
        template.basicEvents.push(
            Event.create({
                _time: e.time,
                _type: e.type,
                _value: e.value,
                _floatValue: e.floatValue,
                _customData,
            })[0],
        );
    });

    data.colorBoostEvents.forEach((b) =>
        template.basicEvents.push(
            Event.create({
                _time: b.time,
                _type: 5,
                _value: b.toggle ? 1 : 0,
                _floatValue: 1,
            })[0],
        )
    );

    data.rotationEvents.forEach((lr) =>
        template.basicEvents.push(
            Event.create({
                _time: lr.time,
                _type: lr.executionTime ? 14 : 15,
                _value: Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) < 6
                    ? Math.max(Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15), 3)
                    : Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) - 2,
                _floatValue: 1,
            })[0],
        )
    );

    data.bpmEvents.forEach((bpm) =>
        template.basicEvents.push(
            Event.create({
                _time: bpm.time,
                _type: 100,
                _value: 1,
                _floatValue: bpm.bpm,
            })[0],
        )
    );

    data.sliders.forEach((s) =>
        template.sliders.push(
            Slider.create({
                _colorType: s.color,
                _headTime: s.time,
                _headLineIndex: s.posX,
                _headLineLayer: s.posY,
                _headControlPointLengthMultiplier: s.lengthMultiplier,
                _headCutDirection: s.direction as 0,
                _tailTime: s.tailTime,
                _tailLineIndex: s.tailPosX,
                _tailLineLayer: s.tailPosY,
                _tailControlPointLengthMultiplier: s.tailLengthMultiplier,
                _tailCutDirection: s.tailDirection as 0,
                _sliderMidAnchorMode: s.midAnchor,
            })[0],
        )
    );

    data.waypoints.forEach((w) =>
        template.waypoints.push(
            Waypoint.create({
                _time: w.time,
                _lineIndex: w.posX,
                _lineLayer: w.posY,
                _offsetDirection: w.direction,
            })[0],
        )
    );

    template.eventTypesWithKeywords = SpecialEventsKeywordFilters.create({
        _keywords: data.eventTypesWithKeywords.list.map((d) => {
            return { _keyword: d.keyword, _specialEvents: d.events };
        }) ?? [],
    });

    if (data.customData) {
        for (const k in data.customData) {
            if (k === 'customEvents') {
                template.customData._customEvents = [];
                for (const ce of data.customData.customEvents!) {
                    if (ce.t === 'AnimateTrack') {
                        for (let i = 0, repeat = ce.d.repeat ?? 0; i <= repeat; i++) {
                            template.customData._customEvents.push({
                                _time: ce.b + (ce.d.duration ?? 0) * i,
                                _type: 'AnimateTrack',
                                _data: {
                                    _track: ce.d.track,
                                    _duration: ce.d.duration,
                                    _easing: ce.d.easing,
                                    _position: typeof ce.d.position === 'string'
                                        ? ce.d.position
                                        : ce.d.position?.map((p) => {
                                            p[0] = p[0] / 0.6;
                                            p[1] = p[1] / 0.6;
                                            p[2] = p[2] / 0.6;
                                            return p as Vector3PointDefinition;
                                        }),
                                    _rotation: ce.d.rotation,
                                    _localRotation: ce.d.localRotation,
                                    _scale: ce.d.scale,
                                    _dissolve: ce.d.dissolve,
                                    _dissolveArrow: ce.d.dissolveArrow,
                                    _color: ce.d.color,
                                    _interactable: ce.d.interactable,
                                    _time: ce.d.time,
                                },
                            });
                        }
                    }
                    if (ce.t === 'AssignPathAnimation') {
                        template.customData._customEvents.push({
                            _time: ce.b,
                            _type: 'AssignPathAnimation',
                            _data: {
                                _track: ce.d.track,
                                _easing: ce.d.easing,
                                _position: ce.d.position,
                                _rotation: ce.d.rotation,
                                _localRotation: ce.d.localRotation,
                                _scale: ce.d.scale,
                                _dissolve: ce.d.dissolve,
                                _dissolveArrow: ce.d.dissolveArrow,
                                _color: ce.d.color,
                                _interactable: ce.d.interactable,
                                _definitePosition: ce.d.definitePosition,
                            },
                        });
                    }
                    if (ce.t === 'AssignTrackParent') {
                        template.customData._customEvents.push({
                            _time: ce.b,
                            _type: 'AssignTrackParent',
                            _data: {
                                _childrenTracks: ce.d.childrenTracks,
                                _parentTrack: ce.d.parentTrack,
                                _worldPositionStays: ce.d.worldPositionStays,
                            },
                        });
                    }
                    if (ce.t === 'AssignPlayerToTrack') {
                        template.customData._customEvents.push({
                            _time: ce.b,
                            _type: 'AssignPlayerToTrack',
                            _data: {
                                _track: ce.d.track,
                                _playerTrackObject: ce.d.playerTrackObject,
                            },
                        });
                    }
                    if (ce.t === 'AnimateComponent' && ce.d.BloomFogEnvironment) {
                        template.customData._customEvents.push({
                            _time: ce.b,
                            _type: 'AssignFogTrack',
                            _data: {
                                _track: ce.d.track,
                                _duration: ce.d.duration,
                                _attenuation: ce.d.BloomFogEnvironment.attenuation,
                                _height: ce.d.BloomFogEnvironment.height,
                                _offset: ce.d.BloomFogEnvironment.offset,
                                _startY: ce.d.BloomFogEnvironment.startY,
                            },
                        });
                    }
                }
                continue;
            }
            if (k === 'environment') {
                template.customData._environment = data.customData.environment!.map((e) => {
                    if (e.id && e.lookupMethod) {
                        return {
                            _id: e.id,
                            _lookupMethod: e.lookupMethod,
                            _track: e.track,
                            _duplicate: e.duplicate,
                            _active: e.active,
                            _scale: e.scale,
                            _position: vectorScale(e.position, 1 / 0.6),
                            _rotation: e.rotation,
                            _localPosition: vectorScale(e.localPosition, 1 / 0.6),
                            _localRotation: e.localRotation,
                            _lightID: e.components?.ILightWithId?.lightID,
                        };
                    }
                    if (e.geometry) {
                        if (e.components?.ILightWithId?.type || e.components?.ILightWithId?.lightID) {
                            logger.warn(tag('V3toV2'), 'v2 geometry cannot be made assignable light to specific type');
                        }
                        return {
                            _geometry: e.geometry.type === 'CUSTOM'
                                ? {
                                    _type: e.geometry.type,
                                    _mesh: {
                                        _vertices: e.geometry.mesh.vertices,
                                        _uv: e.geometry.mesh.uv,
                                        _triangles: e.geometry.mesh.triangles,
                                    },
                                    _material: typeof e.geometry.material === 'string' ? e.geometry.material : {
                                        _shader: e.geometry.material.shader,
                                        _shaderKeywords: e.geometry.material.shaderKeywords,
                                        _collision: e.geometry.material.collision,
                                        _track: e.geometry.material.track,
                                        _color: e.geometry.material.color,
                                    },
                                    _collision: e.geometry.collision,
                                }
                                : {
                                    _type: e.geometry.type,
                                    _material: typeof e.geometry.material === 'string' ? e.geometry.material : {
                                        _shader: e.geometry.material.shader,
                                        _shaderKeywords: e.geometry.material.shaderKeywords,
                                        _collision: e.geometry.material.collision,
                                        _track: e.geometry.material.track,
                                        _color: e.geometry.material.color,
                                    },
                                    _collision: e.geometry.collision,
                                },
                            _track: e.track,
                            _duplicate: e.duplicate,
                            _active: e.active,
                            _scale: e.scale,
                            _position: vectorScale(e.position, 1 / 0.6),
                            _rotation: e.rotation,
                            _localPosition: vectorScale(e.localPosition, 1 / 0.6),
                            _localRotation: e.localRotation,
                            _lightID: e.components?.ILightWithId?.lightID,
                        };
                    }
                    throw new Error('Error converting environment v3 to v2');
                });
                continue;
            }
            if (k === 'materials') {
                template.customData._materials = {};
                for (const m in data.customData.materials) {
                    template.customData._materials[m] = {
                        _shader: data.customData.materials[m].shader,
                        _shaderKeywords: data.customData.materials[m].shaderKeywords,
                        _collision: data.customData.materials[m].collision,
                        _track: data.customData.materials[m].track,
                        _color: data.customData.materials[m].color,
                    } as IChromaMaterial;
                }
                continue;
            }
            if (k === 'pointDefinitions') {
                template.customData._pointDefinitions = [];
                for (const p in data.customData.pointDefinitions!) {
                    template.customData._pointDefinitions.push({
                        _name: p,
                        _points: data.customData.pointDefinitions[p],
                    });
                }
                continue;
            }
            if (k === 'time') {
                template.customData._time = data.customData[k];
                continue;
            }
            if (k === 'BPMChanges') {
                template.customData._BPMChanges = data.customData[k]?.map((bpmc) => {
                    return {
                        _time: bpmc.b,
                        _BPM: bpmc.m,
                        _beatsPerBar: bpmc.p,
                        _metronomeOffset: bpmc.o,
                    };
                });
                continue;
            }
            if (k === 'bookmarks') {
                template.customData._bookmarks = data.customData[k]?.map((b) => {
                    return { _time: b.b, _name: b.n, _color: b.c };
                });
                continue;
            }
            template.customData[k] = data.customData[k];
        }
    }

    if (template.customData._environment) {
        const envTracks: string[] = [];
        for (const env of template.customData._environment) {
            if (env._track) {
                envTracks.push(env._track);
            }
        }
        const customEvents = [];
        if (template.customData._customEvents) {
            for (const ce of template.customData._customEvents) {
                if (ce._type === 'AnimateTrack') {
                    if (typeof ce._data._track === 'string' && envTracks.includes(ce._data._track)) {
                        customEvents.push(ce);
                    } else if (Array.isArray(ce._data._track)) {
                        for (const t of ce._data._track) {
                            if (envTracks.includes(t)) {
                                customEvents.push(ce);
                                break;
                            }
                        }
                    }
                }
            }
        }
        for (const ce of customEvents) {
            if (typeof ce._data._track === 'string') {
                if (typeof ce._data._position === 'string') {
                    logger.warn(tag('V3toV2'), 'Cannot convert point definitions, unknown use.');
                } else if (Array.isArray(ce._data._position)) {
                    ce._data._position.forEach((n) => {
                        n[0] /= 0.6;
                        n[1] /= 0.6;
                        n[2] /= 0.6;
                    });
                }
            } else {
                logger.warn(tag('V3toV2'), 'Environment animate track array conversion not yet implemented.');
            }
        }
    }
    return template;
}

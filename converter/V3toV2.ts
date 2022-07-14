import * as v2 from '../beatmap/v2/mod.ts';
import logger from '../logger.ts';
import { DifficultyData as DifficultyDataV2 } from '../beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from '../beatmap/v3/difficulty.ts';
import { clamp } from '../utils/math.ts';
import { Vector3, Vector3PointDefinition } from '../types/beatmap/shared/heck.ts';
import { IEvent } from '../types/beatmap/v2/event.ts';
import { ICustomDataNote, ICustomDataObstacle } from '../types/beatmap/v2/customData.ts';
import { IChromaEnvironment, IChromaMaterial } from '../types/beatmap/v2/chroma.ts';

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
 *
 * This is severely outdated for customData.
 */
export function V3toV2(data: DifficultyDataV3, skipPrompt?: boolean): DifficultyDataV2 {
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
    const template = DifficultyDataV2.create();
    template.fileName = data.fileName;

    data.colorNotes.forEach((n) => {
        const _customData: ICustomDataNote = {
            _color: n.customData.color,
            _position: n.customData.coordinates,
            _disableNoteGravity: n.customData.disableNoteGravity,
            _disableNoteLook: n.customData.disableNoteLook,
            _flip: n.customData.flip,
            _localRotation: n.customData.localRotation,
            _noteJumpMovementSpeed: n.customData.noteJumpMovementSpeed,
            _noteJumpStartBeatOffset: n.customData.noteJumpStartBeatOffset,
            _disableSpawnEffect: typeof n.customData.spawnEffect === 'boolean' ? !n.customData.spawnEffect : undefined,
            _track: n.customData.track,
            _fake: n.customData.NE_fake,
            _interactable: typeof n.customData.uninteractable === 'boolean' ? !n.customData.uninteractable : undefined,
            _rotation: n.customData.worldRotation,
        };
        if (n.customData.animation) {
            _customData._animation = {
                _color: n.customData.animation.color,
                _definitePosition: n.customData.animation.definitePosition,
                _dissolve: n.customData.animation.dissolve,
                _dissolveArrow: n.customData.animation.dissolveArrow,
                _interactable: n.customData.animation.interactable,
                _localRotation: n.customData.animation.localRotation,
                _position: n.customData.animation.offsetPosition,
                _rotation: n.customData.animation.offsetRotation,
                _scale: n.customData.animation.scale,
                _time: n.customData.animation.time,
            };
        }
        template.notes.push(
            v2.Note.create({
                _time: n.time,
                _lineIndex: n.posX,
                _lineLayer: n.posY,
                _type: n.color,
                _cutDirection: n.direction,
                _customData,
            }),
        );
    });

    data.bombNotes.forEach((b) => {
        const customData: ICustomDataNote = {
            _color: b.customData.color,
            _position: b.customData.coordinates,
            _disableNoteGravity: b.customData.disableNoteGravity,
            _disableNoteLook: b.customData.disableNoteLook,
            _flip: b.customData.flip,
            _localRotation: b.customData.localRotation,
            _noteJumpMovementSpeed: b.customData.noteJumpMovementSpeed,
            _noteJumpStartBeatOffset: b.customData.noteJumpStartBeatOffset,
            _disableSpawnEffect: typeof b.customData.spawnEffect === 'boolean' ? !b.customData.spawnEffect : undefined,
            _track: b.customData.track,
            _fake: b.customData.NE_fake,
            _interactable: typeof b.customData.uninteractable === 'boolean' ? !b.customData.uninteractable : undefined,
            _rotation: b.customData.worldRotation,
        };
        if (b.customData.animation) {
            customData._animation = {
                _color: b.customData.animation.color,
                _definitePosition: b.customData.animation.definitePosition,
                _dissolve: b.customData.animation.dissolve,
                _dissolveArrow: b.customData.animation.dissolveArrow,
                _interactable: b.customData.animation.interactable,
                _localRotation: b.customData.animation.localRotation,
                _position: b.customData.animation.offsetPosition,
                _rotation: b.customData.animation.offsetRotation,
                _scale: b.customData.animation.scale,
                _time: b.customData.animation.time,
            };
        }
        template.notes.push(
            v2.Note.create({
                _time: b.time,
                _lineIndex: b.posX,
                _lineLayer: b.posY,
                _type: 3,
                _cutDirection: 0,
                _customData: customData,
            }),
        );
    });

    data.obstacles.forEach((o) => {
        const _customData: ICustomDataObstacle = {
            _color: o.customData.color,
            _position: o.customData.coordinates,
            _localRotation: o.customData.localRotation,
            _noteJumpMovementSpeed: o.customData.noteJumpMovementSpeed,
            _noteJumpStartBeatOffset: o.customData.noteJumpStartBeatOffset,
            _scale: o.customData.size,
            _track: o.customData.track,
            _fake: o.customData.NE_fake,
            _interactable: typeof o.customData.uninteractable === 'boolean' ? !o.customData.uninteractable : undefined,
            _rotation: o.customData.worldRotation,
        };
        if (o.customData.animation) {
            _customData._animation = {
                _color: o.customData.animation.color,
                _definitePosition: o.customData.animation.definitePosition,
                _dissolve: o.customData.animation.dissolve,
                _dissolveArrow: o.customData.animation.dissolveArrow,
                _interactable: o.customData.animation.interactable,
                _localRotation: o.customData.animation.localRotation,
                _position: o.customData.animation.offsetPosition,
                _rotation: o.customData.animation.offsetRotation,
                _scale: o.customData.animation.scale,
                _time: o.customData.animation.time,
            };
        }
        if (o.posY === 0 && o.height === 5) {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 0,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                }),
            );
        } else if (o.posY === 2 && o.height === 3) {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 1,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                }),
            );
        } else {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: o.posY,
                    _type: 2,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData,
                }),
            );
        }
    });

    data.basicBeatmapEvents.forEach((e) => {
        let _customData!: IEvent['_customData'];
        if (e.customData) {
            if (e.isLightEvent()) {
                _customData = {
                    _color: e.customData.color,
                    _lightID: e.customData.lightID,
                    _easing: e.customData.easing,
                    _lerpType: e.customData.lerpType,
                };
            }
            if (e.isRingEvent()) {
                _customData = {
                    _nameFilter: e.customData.nameFilter,
                    _rotation: e.customData.rotation,
                    _step: e.customData.step,
                    _prop: e.customData.prop,
                    _speed: e.customData.speed,
                    _direction: e.customData.direction,
                };
            }
            if (e.isLaserRotationEvent()) {
                _customData = {
                    _lockPosition: e.customData.lockRotation,
                    _direction: e.customData.direction,
                    _preciseSpeed: e.customData.speed,
                };
            }
        }
        template.events.push(
            v2.Event.create({
                _time: e.time,
                _type: e.type,
                _value: e.value,
                _floatValue: e.floatValue,
                _customData,
            }),
        );
    });

    data.colorBoostBeatmapEvents.forEach((b) =>
        template.events.push(
            v2.Event.create({
                _time: b.time,
                _type: 5,
                _value: b.toggle ? 1 : 0,
                _floatValue: 1,
            }),
        )
    );

    data.rotationEvents.forEach((lr) =>
        template.events.push(
            v2.Event.create({
                _time: lr.time,
                _type: lr.executionTime ? 14 : 15,
                _value: Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) < 6
                    ? Math.max(Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15), 3)
                    : Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) - 2,
                _floatValue: 1,
            }),
        )
    );

    data.bpmEvents.forEach((bpm) =>
        template.events.push(
            v2.Event.create({
                _time: bpm.time,
                _type: 100,
                _value: 1,
                _floatValue: bpm.bpm,
            }),
        )
    );

    data.sliders.forEach((s) =>
        template.sliders.push(
            v2.Slider.create({
                _colorType: s.color,
                _headTime: s.time,
                _headLineIndex: s.posX,
                _headLineLayer: s.posY,
                _headControlPointlengthMultiplier: s.lengthMultiplier,
                _headCutDirection: s.color,
                _tailTime: s.tailTime,
                _tailLineIndex: s.tailPosX,
                _tailLineLayer: s.tailPosY,
                _tailControlPointLengthMultiplier: s.tailLengthMultiplier,
                _tailCutDirection: s.color,
                _sliderMidAnchorMode: s.midAnchor,
            }),
        )
    );

    data.waypoints.forEach((w) =>
        template.waypoints.push(
            v2.Waypoint.create({
                _time: w.time,
                _lineIndex: w.posX,
                _lineLayer: w.posY,
                _offsetDirection: w.direction,
            }),
        )
    );

    template.specialEventsKeywordFilters = v2.SpecialEventsKeywordFilters.create({
        _keywords: data.basicEventTypesWithKeywords.list.map((d) => {
            return { _keyword: d.keyword, _specialEvents: d.events };
        }) ?? [],
    });

    if (data.customData) {
        for (const k in data.customData) {
            if (k === 'customEvents') {
                template.customData._customEvents = data.customData
                    .customEvents!.filter((ce) => ce.t !== 'AnimateComponent')
                    .map((ce) => {
                        if (ce.t === 'AnimateTrack') {
                            return {
                                _time: ce.b,
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
                            };
                        }
                        if (ce.t === 'AssignPathAnimation') {
                            return {
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
                            };
                        }
                        if (ce.t === 'AssignTrackParent') {
                            return {
                                _time: ce.b,
                                _type: 'AssignTrackParent',
                                _data: {
                                    _childrenTracks: ce.d.childrenTracks,
                                    _parentTrack: ce.d.parentTrack,
                                    _worldPositionStays: ce.d.worldPositionStays,
                                },
                            };
                        }
                        if (ce.t === 'AssignFogTrack') {
                            return {
                                _time: ce.b,
                                _type: 'AssignFogTrack',
                                _data: {
                                    _track: ce.d.track,
                                    _attenuation: ce.d.attenuation,
                                    _offset: ce.d.offset,
                                    _startY: ce.d.startY,
                                    _height: ce.d.height,
                                },
                            };
                        }
                        return {
                            _time: ce.b,
                            _type: 'AssignPlayerToTrack',
                            _data: {
                                _track: ce.d.track,
                            },
                        };
                    });
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
                                _material: typeof e.geometry.material === 'string' ? e.geometry.material : {
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
                        } as IChromaEnvironment;
                    }
                    throw new Error('Error converting environment v3 to v2');
                });
                continue;
            }
            if (k === 'materials') {
                template.customData._materials = {};
                for (const m in data.customData.materials) {
                    template.customData._materials[m] = {
                        _shaderPreset: data.customData.materials[m].shaderPreset,
                        _shaderKeywords: data.customData.materials[m].shaderKeywords,
                        _track: data.customData.materials[m].track,
                        _color: data.customData.materials[m].color,
                    } as IChromaMaterial;
                }
                continue;
            }
            if (k === 'pointDefinitions') {
                template.customData._pointDefinitions = data.customData.pointDefinitions!.map((e) => {
                    return {
                        _name: e.name,
                        _points: e.points,
                    };
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
                    } else {
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

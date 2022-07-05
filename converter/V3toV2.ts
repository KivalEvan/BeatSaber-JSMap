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
                    .customEvents!.filter((ce) => ce.type !== 'AnimateComponent')
                    .map((ce) => {
                        if (ce.type === 'AnimateTrack') {
                            return {
                                _time: ce.beat,
                                _type: 'AnimateTrack',
                                _data: {
                                    _track: ce.data.track,
                                    _duration: ce.data.duration,
                                    _easing: ce.data.easing,
                                    _position: typeof ce.data.position === 'string'
                                        ? ce.data.position
                                        : ce.data.position?.map((p) => {
                                            p[0] = p[0] / 0.6;
                                            p[1] = p[1] / 0.6;
                                            p[2] = p[2] / 0.6;
                                            return p as Vector3PointDefinition;
                                        }),
                                    _rotation: ce.data.rotation,
                                    _localRotation: ce.data.localRotation,
                                    _scale: ce.data.scale,
                                    _dissolve: ce.data.dissolve,
                                    _dissolveArrow: ce.data.dissolveArrow,
                                    _color: ce.data.color,
                                    _interactable: ce.data.interactable,
                                    _time: ce.data.time,
                                },
                            };
                        }
                        if (ce.type === 'AssignPathAnimation') {
                            return {
                                _time: ce.beat,
                                _type: 'AssignPathAnimation',
                                _data: {
                                    _track: ce.data.track,
                                    _duration: ce.data.duration,
                                    _easing: ce.data.easing,
                                    _position: ce.data.position,
                                    _rotation: ce.data.rotation,
                                    _localRotation: ce.data.localRotation,
                                    _scale: ce.data.scale,
                                    _dissolve: ce.data.dissolve,
                                    _dissolveArrow: ce.data.dissolveArrow,
                                    _color: ce.data.color,
                                    _interactable: ce.data.interactable,
                                    _definitePosition: ce.data.definitePosition,
                                },
                            };
                        }
                        if (ce.type === 'AssignTrackParent') {
                            return {
                                _time: ce.beat,
                                _type: 'AssignTrackParent',
                                _data: {
                                    _childrenTracks: ce.data.childrenTracks,
                                    _parentTrack: ce.data.parentTrack,
                                    _worldPositionStays: ce.data.worldPositionStays,
                                },
                            };
                        }
                        if (ce.type === 'AssignFogTrack') {
                            return {
                                _time: ce.beat,
                                _type: 'AssignFogTrack',
                                _data: {
                                    _track: ce.data.track,
                                    _attenuation: ce.data.attenuation,
                                    _offset: ce.data.offset,
                                    _startY: ce.data.startY,
                                    _height: ce.data.height,
                                },
                            };
                        }
                        return {
                            _time: ce.beat,
                            _type: 'AssignPlayerToTrack',
                            _data: {
                                _track: ce.data.track,
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
                        } as IChromaEnvironment;
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

    return template;
}

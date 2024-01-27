import logger from '../../logger.ts';
import { Difficulty as V1Difficulty } from '../../beatmap/v1/difficulty.ts';
import { Difficulty as V2Difficulty } from '../../beatmap/v2/difficulty.ts';
import { Difficulty as V3Difficulty } from '../../beatmap/v3/difficulty.ts';
import { Difficulty as V4Difficulty } from '../../beatmap/v4/difficulty.ts';
import { Lightshow as V3Lightshow } from '../../beatmap/v3/lightshow.ts';
import { Lightshow as V4Lightshow } from '../../beatmap/v4/lightshow.ts';
import { clamp } from '../../utils/math.ts';
import { ICustomDataNote } from '../../types/beatmap/v2/custom/note.ts';
import { ICustomDataObstacle } from '../../types/beatmap/v2/custom/obstacle.ts';
import { IChromaMaterial } from '../../types/beatmap/v2/custom/chroma.ts';
import objectToV2 from '../customData/objectToV2.ts';
import eventToV2 from '../customData/eventToV2.ts';
import { isVector3, vectorMul } from '../../utils/vector.ts';
import { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty.ts';
import { IBPMChangeOld } from '../../types/beatmap/v2/custom/bpmChange.ts';
import { IWrapLightshow } from '../../types/beatmap/wrapper/lightshow.ts';
import { deepCopy } from '../../utils/misc.ts';

function tag(name: string): string[] {
   return ['convert', 'toV2Difficulty', name];
}

/**
 * In case you need to go back for rankability or something.
 * ```ts
 * const converted = convert.toV2Difficulty(data);
 * ```
 *
 * **WARNING:** Chain and other new stuff will be gone!
 */
export function toV2Difficulty(
   data: IWrapDifficulty | IWrapLightshow,
): V2Difficulty {
   logger.tWarn(tag('main'), 'Converting to beatmap v2 may lose certain data!');

   let template = new V2Difficulty();
   switch (true) {
      case data instanceof V1Difficulty:
         fromV1Difficulty(template, data);
         break;
      case data instanceof V2Difficulty:
         template = new V2Difficulty(data.toJSON());
         break;
      case data instanceof V3Difficulty:
         fromV3Difficulty(template, data);
         break;
      case data instanceof V4Difficulty:
         fromV4Difficulty(template, data);
         break;
      case data instanceof V3Lightshow:
         fromV3Lightshow(template, data);
         break;
      case data instanceof V4Lightshow:
         fromV4Lightshow(template, data);
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown beatmap data, returning empty template',
         );
   }
   template.filename = data.filename;

   return template;
}

function fromV1Difficulty(template: V2Difficulty, data: V1Difficulty) {
   template.addColorNotes(...data.colorNotes);
   template.addObstacles(...data.obstacles);
   template.addBasicEvents(...data.basicEvents);

   template.customData._time = data.time;
   template.customData._bpmChanges = data.BPMChanges as IBPMChangeOld[];
   template.customData._bookmarks = data.bookmarks;
}

function fromV3Difficulty(template: V2Difficulty, data: V3Difficulty) {
   template.customData = deepCopy(data.customData);
   data.colorNotes.forEach((n) => {
      const _customData: ICustomDataNote = objectToV2(n.customData);
      template.addColorNotes({
         _time: n.time,
         _lineIndex: n.posX,
         _lineLayer: n.posY,
         _type: n.color,
         _cutDirection: n.direction,
         _customData,
      });
   });

   data.customData.fakeColorNotes?.forEach((n) => {
      const _customData: ICustomDataNote = objectToV2(n.customData);
      template.addColorNotes({
         _time: n.b,
         _lineIndex: n.x,
         _lineLayer: n.y,
         _type: n.c,
         _cutDirection: n.d,
         _customData,
      });
   });

   data.bombNotes.forEach((b) => {
      const _customData: ICustomDataNote = objectToV2(b.customData);
      template.addColorNotes({
         _time: b.time,
         _lineIndex: b.posX,
         _lineLayer: b.posY,
         _type: 3,
         _cutDirection: 0,
         _customData,
      });
   });

   data.customData.fakeBombNotes?.forEach((b) => {
      const _customData: ICustomDataNote = objectToV2(b.customData);
      template.addColorNotes({
         _time: b.b,
         _lineIndex: b.x,
         _lineLayer: b.y,
         _type: 3,
         _cutDirection: 0,
         _customData,
      });
   });

   data.obstacles.forEach((o) => {
      const _customData: ICustomDataObstacle = objectToV2(o.customData);
      if (o.posY === 2 && o.height === 3) {
         template.addObstacles({
            _time: o.time,
            _lineIndex: o.posX,
            _type: 1,
            _duration: o.duration,
            _width: o.width,
            _customData,
         });
      } else {
         template.addObstacles({
            _time: o.time,
            _lineIndex: o.posX,
            _type: 0,
            _duration: o.duration,
            _width: o.width,
            _customData,
         });
      }
   });

   data.customData.fakeObstacles?.forEach((o) => {
      const _customData: ICustomDataObstacle = objectToV2(o.customData);
      if (o.y === 2 && o.h === 3) {
         template.addObstacles({
            _time: o.b,
            _lineIndex: o.x,
            _type: 1,
            _duration: o.d,
            _width: o.w,
            _customData,
         });
      } else {
         template.addObstacles({
            _time: o.b,
            _lineIndex: o.x,
            _type: 0,
            _duration: o.d,
            _width: o.w,
            _customData,
         });
      }
   });

   data.basicEvents.forEach((e) => {
      const _customData = eventToV2(e.customData);
      if (e.isLaserRotationEvent()) {
         delete _customData?._speed;
      } else {
         delete _customData?._preciseSpeed;
      }
      template.addBasicEvents({
         _time: e.time,
         _type: e.type,
         _value: e.value,
         _floatValue: e.floatValue,
         _customData,
      });
   });

   data.colorBoostEvents.forEach((b) =>
      template.addBasicEvents({
         _time: b.time,
         _type: 5,
         _value: b.toggle ? 1 : 0,
         _floatValue: 1,
      })
   );

   data.rotationEvents.forEach((lr) =>
      template.addBasicEvents({
         _time: lr.time,
         _type: lr.executionTime ? 14 : 15,
         _value: Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) < 6
            ? Math.max(
               Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15),
               3,
            )
            : Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) - 2,
         _floatValue: 1,
      })
   );

   data.bpmEvents.forEach((bpm) =>
      template.addBasicEvents({
         _time: bpm.time,
         _type: 100,
         _value: 1,
         _floatValue: bpm.bpm,
      })
   );

   data.arcs.forEach((s) =>
      template.addArcs({
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
      })
   );

   data.waypoints.forEach((w) =>
      template.addWaypoints({
         _time: w.time,
         _lineIndex: w.posX,
         _lineLayer: w.posY,
         _offsetDirection: w.direction,
      })
   );

   template.eventTypesWithKeywords = template.eventTypesWithKeywords.constructor({
      _keywords: data.eventTypesWithKeywords.list.map((d) => {
         return { _keyword: d.keyword, _specialEvents: d.events };
      }) ?? [],
   });

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
                        _position: ce.d.position,
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
                     _target: ce.d.target,
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
         delete template.customData.customEvents;
         continue;
      }
      if (k === 'environment') {
         template.customData._environment = data.customData.environment!.map(
            (e) => {
               if (e.id && e.lookupMethod) {
                  return {
                     _id: e.id,
                     _lookupMethod: e.lookupMethod,
                     _track: e.track,
                     _duplicate: e.duplicate,
                     _active: e.active,
                     _scale: e.scale,
                     _position: vectorMul(e.position, 1 / 0.6),
                     _rotation: e.rotation,
                     _localPosition: vectorMul(e.localPosition, 1 / 0.6),
                     _localRotation: e.localRotation,
                     _lightID: e.components?.ILightWithId?.lightID,
                  };
               }
               if (e.geometry) {
                  if (
                     e.components?.ILightWithId?.type ||
                     e.components?.ILightWithId?.lightID
                  ) {
                     logger.tWarn(
                        tag('fromV2Difficulty'),
                        'v2 geometry cannot be made assignable light to specific type',
                     );
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
                           _material: typeof e.geometry.material === 'string'
                              ? e.geometry.material
                              : {
                                 _shader: e.geometry.material.shader,
                                 _shaderKeywords: e.geometry.material
                                    .shaderKeywords,
                                 _collision: e.geometry.material.collision,
                                 _track: e.geometry.material.track,
                                 _color: e.geometry.material.color,
                              },
                           _collision: e.geometry.collision,
                        }
                        : {
                           _type: e.geometry.type,
                           _material: typeof e.geometry.material === 'string'
                              ? e.geometry.material
                              : {
                                 _shader: e.geometry.material.shader,
                                 _shaderKeywords: e.geometry.material
                                    .shaderKeywords,
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
                     _position: vectorMul(e.position, 1 / 0.6),
                     _rotation: e.rotation,
                     _localPosition: vectorMul(e.localPosition, 1 / 0.6),
                     _localRotation: e.localRotation,
                     _lightID: e.components?.ILightWithId?.lightID,
                  };
               }
               throw new Error('Error converting environment v3 to v2');
            },
         );
         delete template.customData.environment;
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
         delete template.customData.materials;
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
         delete template.customData.pointDefinitions;
         continue;
      }
      if (k === 'time') {
         template.customData._time = data.customData[k];
         delete template.customData.time;
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
         delete template.customData.BPMChanges;
         continue;
      }
      if (k === 'bookmarks') {
         template.customData._bookmarks = data.customData[k]?.map((b) => {
            return { _time: b.b, _name: b.n, _color: b.c };
         });
         delete template.customData.bookmarks;
         continue;
      }
      template.customData[k] = data.customData[k];
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
               if (
                  typeof ce._data._track === 'string' &&
                  envTracks.includes(ce._data._track)
               ) {
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
               logger.tWarn(
                  tag('fromV2Difficulty'),
                  'Cannot convert point definitions, unknown use.',
               );
            } else if (Array.isArray(ce._data._position)) {
               isVector3(ce._data._position)
                  ? vectorMul(ce._data._position, 0.6)
                  // deno-lint-ignore no-explicit-any
                  : ce._data._position.forEach((point: any) => {
                     point[0] *= 0.6;
                     point[1] *= 0.6;
                     point[2] *= 0.6;
                  });
            }
         } else {
            logger.tWarn(
               tag('fromV2Difficulty'),
               'Environment animate track array conversion not yet implemented.',
            );
         }
      }
   }
}

function fromV4Difficulty(template: V2Difficulty, data: V4Difficulty) {
   template.addColorNotes(...data.colorNotes);
   template.addBombNotes(...data.bombNotes);
   template.addObstacles(...data.obstacles);
   template.addArcs(...data.arcs);
   template.addWaypoints(...data.waypoints);
   template.customData = deepCopy(data.customData);
}

function fromV3Lightshow(template: V2Difficulty, data: V3Lightshow) {
   data.basicEvents.forEach((e) => {
      const _customData = eventToV2(e.customData);
      if (e.isLaserRotationEvent()) {
         delete _customData?._speed;
      } else {
         delete _customData?._preciseSpeed;
      }
      template.addBasicEvents({
         _time: e.time,
         _type: e.type,
         _value: e.value,
         _floatValue: e.floatValue,
         _customData,
      });
   });
   data.colorBoostEvents.forEach((b) =>
      template.addBasicEvents({
         _time: b.time,
         _type: 5,
         _value: b.toggle ? 1 : 0,
         _floatValue: 1,
      })
   );
   template.eventTypesWithKeywords = template.eventTypesWithKeywords.constructor(
      data.eventTypesWithKeywords,
   );
   template.customData = deepCopy(data.customData);
}

function fromV4Lightshow(template: V2Difficulty, data: V4Lightshow) {
   template.addWaypoints(...data.waypoints);
   data.basicEvents.forEach((e) => {
      const _customData = eventToV2(e.customData);
      if (e.isLaserRotationEvent()) {
         delete _customData?._speed;
      } else {
         delete _customData?._preciseSpeed;
      }
      template.addBasicEvents({
         _time: e.time,
         _type: e.type,
         _value: e.value,
         _floatValue: e.floatValue,
         _customData,
      });
   });
   data.colorBoostEvents.forEach((b) =>
      template.addBasicEvents({
         _time: b.time,
         _type: 5,
         _value: b.toggle ? 1 : 0,
         _floatValue: 1,
      })
   );
   template.eventTypesWithKeywords = template.eventTypesWithKeywords.constructor(
      data.eventTypesWithKeywords,
   );
   template.customData = deepCopy(data.customData);
}

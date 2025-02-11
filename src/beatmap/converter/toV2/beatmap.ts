import { logger } from '../../../logger.ts';
import type { IChromaMaterial } from '../../../types/beatmap/v2/custom/chroma.ts';
import type { ICustomDataNote } from '../../../types/beatmap/v2/custom/note.ts';
import type { ICustomDataObstacle } from '../../../types/beatmap/v2/custom/obstacle.ts';
import type { IWrapBeatmap } from '../../../types/beatmap/wrapper/beatmap.ts';
import { isVector3, vectorMul } from '../../../utils/vector.ts';
import { isLaserRotationEventType } from '../../helpers/core/basicEvent.ts';
import { sortObjectFn } from '../../helpers/sort.ts';
import eventToV2 from '../customData/eventToV2.ts';
import objectToV2 from '../customData/objectToV2.ts';

function tag(name: string): string[] {
   return ['convert', 'toV2Beatmap', name];
}

/**
 * Convert to beatmap v2.
 * ```ts
 * const converted = toV2Beatmap(data);
 * ```
 *
 * **WARNING:** Chain and other new stuff will be gone!
 */
export function toV2Beatmap<T extends IWrapBeatmap>(
   data: T,
   fromVersion = data.version,
): T {
   logger.tWarn(tag('main'), 'Converting to beatmap v2 may lose certain data!');

   switch (fromVersion) {
      case 1:
      case 2:
         data.version = 2;
         break;
      case 3:
         data.version = 2;
         fromV3(data);
         break;
      case 4:
         data.version = 2;
         fromV3(data); // because they're the same anyway
         fromV4(data);
         break;
      default:
         logger.tWarn(
            tag('main'),
            'Unknown version: version not supported; misinput? Returning original data.',
         );
   }

   return data;
}

function fromV3<T extends IWrapBeatmap>(bm: T) {
   bm.difficulty.colorNotes.forEach((n) => {
      n.customData = objectToV2(n.customData);
   });
   bm.difficulty.customData.fakeColorNotes?.forEach((n) => {
      const customData: ICustomDataNote = objectToV2(n.customData);
      bm.difficulty.colorNotes.push({
         time: n.b ?? 0,
         posX: n.x ?? 0,
         posY: n.y ?? 0,
         color: n.c ?? 0,
         direction: n.d ?? 0,
         angleOffset: 0,
         laneRotation: 0,
         customData,
      });
   });
   delete bm.difficulty.customData.fakeColorNotes;

   bm.difficulty.bombNotes.forEach((b) => {
      b.customData = objectToV2(b.customData);
   });
   bm.difficulty.customData.fakeBombNotes?.forEach((b) => {
      const customData: ICustomDataNote = objectToV2(b.customData);
      bm.difficulty.bombNotes.push({
         time: b.b ?? 0,
         posX: b.x ?? 0,
         posY: b.y ?? 0,
         color: -1,
         direction: 0,
         laneRotation: 0,
         customData,
      });
   });

   bm.difficulty.obstacles.forEach((o) => {
      o.customData = objectToV2(o.customData);
   });
   bm.difficulty.customData.fakeObstacles?.forEach((o) => {
      const customData: ICustomDataObstacle = objectToV2(o.customData);
      bm.difficulty.obstacles.push({
         time: o.b ?? 0,
         posX: o.x ?? 0,
         posY: o.y ?? 0,
         duration: o.d ?? 0,
         width: o.w ?? 0,
         height: o.h ?? 0,
         laneRotation: 0,
         customData,
      });
   });

   bm.lightshow.basicEvents.forEach((e) => {
      e.customData = eventToV2(e.customData);
      if (isLaserRotationEventType(e.type)) {
         delete e.customData._speed;
      } else {
         delete e.customData._preciseSpeed;
      }
   });

   for (const k in bm.difficulty.customData) {
      if (k === 'customEvents') {
         bm.difficulty.customData._customEvents = [];
         for (const ce of bm.difficulty.customData.customEvents!) {
            if (ce.t === 'AnimateTrack') {
               for (let i = 0, repeat = ce.d.repeat ?? 0; i <= repeat; i++) {
                  bm.difficulty.customData._customEvents.push({
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
               bm.difficulty.customData._customEvents.push({
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
               bm.difficulty.customData._customEvents.push({
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
               bm.difficulty.customData._customEvents.push({
                  _time: ce.b,
                  _type: 'AssignPlayerToTrack',
                  _data: {
                     _track: ce.d.track,
                     _target: ce.d.target,
                  },
               });
            }
            if (ce.t === 'AnimateComponent' && ce.d.BloomFogEnvironment) {
               bm.difficulty.customData._customEvents.push({
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
         delete bm.difficulty.customData.customEvents;
         continue;
      }
      if (k === 'environment') {
         bm.difficulty.customData._environment = bm.difficulty.customData.environment!.map((e) => {
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
                     tag('fromV2'),
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
                        _material: typeof e.geometry.material === 'string' ? e.geometry.material : {
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
                        _material: typeof e.geometry.material === 'string' ? e.geometry.material : {
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
         });
         delete bm.difficulty.customData.environment;
         continue;
      }
      if (k === 'materials') {
         bm.difficulty.customData._materials = {};
         for (const m in bm.difficulty.customData.materials) {
            bm.difficulty.customData._materials[m] = {
               _shader: bm.difficulty.customData.materials[m].shader,
               _shaderKeywords: bm.difficulty.customData.materials[m].shaderKeywords,
               _collision: bm.difficulty.customData.materials[m].collision,
               _track: bm.difficulty.customData.materials[m].track,
               _color: bm.difficulty.customData.materials[m].color,
            } as IChromaMaterial;
         }
         delete bm.difficulty.customData.materials;
         continue;
      }
      if (k === 'pointDefinitions') {
         bm.difficulty.customData._pointDefinitions = [];
         for (const p in bm.difficulty.customData.pointDefinitions!) {
            bm.difficulty.customData._pointDefinitions.push({
               _name: p,
               _points: bm.difficulty.customData.pointDefinitions[p],
            });
         }
         delete bm.difficulty.customData.pointDefinitions;
         continue;
      }
      if (k === 'time') {
         bm.difficulty.customData._time = bm.difficulty.customData[k];
         delete bm.difficulty.customData.time;
         continue;
      }
      if (k === 'BPMChanges') {
         bm.difficulty.customData._BPMChanges = bm.difficulty.customData[
            k
         ]?.map((bpmc) => {
            return {
               _time: bpmc.b,
               _BPM: bpmc.m,
               _beatsPerBar: bpmc.p,
               _metronomeOffset: bpmc.o,
            };
         });
         delete bm.difficulty.customData.BPMChanges;
         continue;
      }
      if (k === 'bookmarks') {
         bm.difficulty.customData._bookmarks = bm.difficulty.customData[k]?.map(
            (b) => {
               return { _time: b.b, _name: b.n, _color: b.c };
            },
         );
         delete bm.difficulty.customData.bookmarks;
         continue;
      }
   }

   if (bm.difficulty.customData._environment) {
      const envTracks: string[] = [];
      for (const env of bm.difficulty.customData._environment) {
         if (env._track) {
            envTracks.push(env._track);
         }
      }
      const customEvents = [];
      if (bm.difficulty.customData._customEvents) {
         for (const ce of bm.difficulty.customData._customEvents) {
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
                  tag('fromV2'),
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
               tag('fromV2'),
               'Environment animate track array conversion not yet implemented.',
            );
         }
      }
   }
}

function fromV4<T extends IWrapBeatmap>(bm: T) {
   let impossibleRotationEvt = false;
   const mapTime: Record<number, number> = {};

   const objects = [
      bm.difficulty.arcs,
      bm.difficulty.bombNotes,
      bm.difficulty.chains,
      bm.difficulty.colorNotes,
      bm.difficulty.obstacles,
      bm.lightshow.waypoints,
   ]
      .flat()
      .sort(sortObjectFn);

   for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      if (!(obj.time in mapTime)) {
         mapTime[obj.time] = obj.laneRotation;
      } else if (mapTime[obj.time] !== obj.laneRotation) {
         impossibleRotationEvt = true;
         break;
      }
   }

   if (impossibleRotationEvt) {
      for (let i = 0; i < objects.length; i++) {
         const obj = objects[i];
         if (obj.laneRotation) obj.customData._rotation = obj.laneRotation;
      }
   } else {
      bm.difficulty.rotationEvents = [];
      let currentRotation = 0;
      for (const time in mapTime) {
         const t = +time;
         const r = mapTime[time];
         const difference = r - currentRotation;
         if (difference === 0) continue;
         currentRotation = r;
         bm.difficulty.rotationEvents.push({
            time: t,
            rotation: difference,
            executionTime: 0,
            customData: {},
         });
      }
   }
   for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      obj.laneRotation = 0;
      if ('tailLaneRotation' in obj) obj.tailLaneRotation = 0;
   }
}

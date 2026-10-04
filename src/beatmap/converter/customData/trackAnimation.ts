import type { ICustomEventDataAnimateTrack as V2TrackData } from '../../schema/v2/types/custom/customEvent.ts';
import type { ICustomEventDataAnimateTrack as V3TrackData } from '../../schema/v3/types/custom/customEvent.ts';
import { animationV2Names, animationV3Names, renameKeys } from './_helpers.ts';

// TransformController positions changed from lane units to meters in v3.
// Noodle's offsetPosition did not. Resolve only this property's reference and
// create new points: the definition may also be used by an unscaled property.
function scalePosition(
   value: unknown,
   factor: number,
   definitions: Record<string, unknown>,
): unknown {
   if (value === undefined || value === null) return value;
   if (typeof value === 'string') {
      if (!(value in definitions)) {
         throw new Error(`Cannot convert position: unknown point definition "${value}"`);
      }
      value = definitions[value];
   }
   if (!Array.isArray(value)) throw new Error('Cannot convert non-array track position');
   const scalePoint = (point: unknown): unknown[] => {
      if (
         !Array.isArray(point) || point.length < 3 ||
         !point.slice(0, 3).every((n) => typeof n === 'number') ||
         point.slice(3).some((n) => typeof n !== 'number' && typeof n !== 'string')
      ) {
         throw new Error('Cannot convert dynamic track position or point modifiers between units');
      }
      return point.map((n, i) => i < 3 ? n * factor : n);
   };
   return Array.isArray(value[0]) ? value.map(scalePoint) : scalePoint(value);
}

export function trackAnimationToV3(
   data: V2TrackData,
   transformTracks: ReadonlySet<string>,
   definitions: Record<string, unknown>,
   path = false,
): V3TrackData {
   const tracks = Array.isArray(data._track) ? data._track : [data._track];
   const transform = !path && tracks.some((track) => transformTracks.has(track));
   if (
      transform && tracks.some((track) => !transformTracks.has(track)) &&
      (data._position !== undefined || data._rotation !== undefined)
   ) {
      throw new Error('Cannot convert position/rotation on mixed Noodle and transform tracks');
   }
   const result = renameKeys(data, {
      ...animationV3Names,
      _track: 'track',
      _duration: 'duration',
      _easing: 'easing',
      ...(transform ? { _position: 'position', _rotation: 'rotation' } : {}),
   });
   if (transform) {
      result.position = (data as V2TrackData & { position?: unknown }).position ??
         scalePosition(data._position, 0.6, definitions);
   }
   // Keep the established serialized property order; opaque keys follow it.
   return {
      track: result.track as string | string[],
      duration: result.duration as number | undefined,
      easing: result.easing as V3TrackData['easing'],
      [transform ? 'position' : 'offsetPosition']:
         result[transform ? 'position' : 'offsetPosition'],
      [transform ? 'rotation' : 'offsetWorldRotation']:
         result[transform ? 'rotation' : 'offsetWorldRotation'],
      localRotation: result.localRotation as V3TrackData['localRotation'],
      scale: result.scale as V3TrackData['scale'],
      dissolve: result.dissolve as V3TrackData['dissolve'],
      dissolveArrow: result.dissolveArrow as V3TrackData['dissolveArrow'],
      color: result.color as V3TrackData['color'],
      interactable: result.interactable as V3TrackData['interactable'],
      ...(path
         ? { definitePosition: result.definitePosition }
         : { time: result.time as V3TrackData['time'] }),
      ...result,
   };
}

export function trackAnimationToV2(
   data: V3TrackData,
   definitions: Record<string, unknown>,
   path = false,
): V2TrackData {
   const result = renameKeys(data, {
      ...animationV2Names,
      track: '_track',
      duration: '_duration',
      easing: '_easing',
   });
   if (!path) {
      delete result.repeat; // AnimateTrack repeats are expanded by the caller.
      if (data.position !== undefined) {
         if (data.offsetPosition !== undefined) {
            throw new Error('Cannot represent independent position and offsetPosition in v2');
         }
         result._position ??= scalePosition(data.position, 1 / 0.6, definitions);
         delete result.position;
      }
      if (data.rotation !== undefined) {
         if (data.offsetWorldRotation !== undefined) {
            throw new Error('Cannot represent independent rotation and offsetWorldRotation in v2');
         }
         result._rotation ??= data.rotation;
         delete result.rotation;
      }
   }
   return {
      _track: result._track as string | string[],
      _duration: result._duration as number | undefined,
      _easing: result._easing as V2TrackData['_easing'],
      _position: result._position as V2TrackData['_position'],
      _rotation: result._rotation as V2TrackData['_rotation'],
      _localRotation: result._localRotation as V2TrackData['_localRotation'],
      _scale: result._scale as V2TrackData['_scale'],
      _dissolve: result._dissolve as V2TrackData['_dissolve'],
      _dissolveArrow: result._dissolveArrow as V2TrackData['_dissolveArrow'],
      _color: result._color as V2TrackData['_color'],
      _interactable: result._interactable as V2TrackData['_interactable'],
      ...(path
         ? { _definitePosition: result._definitePosition }
         : { _time: result._time as V2TrackData['_time'] }),
      ...result,
   };
}

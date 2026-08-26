import type { ILightColorEvent } from './types/lightColorEvent.ts';
import type { IWrapLightColorEvent } from '../wrapper/types/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEvent } from '../wrapper/lightColorEvent.ts';
import { EaseType, TransitionType } from '../shared/types/constants.ts';

/** Serialize beatmap v3 `Light Color Event` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightColorEvent(data: IWrapLightColorEvent): ILightColorEvent {
   return {
      b: data.time,
      c: data.color,
      f: data.frequency,
      i: data.previous
         ? TransitionType.EXTEND
         : data.easing === EaseType.NONE
         ? TransitionType.INSTANT
         : TransitionType.INTERPOLATE,
      s: data.brightness,
      sb: data.strobeBrightness,
      sf: data.strobeFade,
      customData: deepCopy(data.customData),
   };
}

/** Deserialize schema object into beatmap v3 `Light Color Event` object.
 * @param data The serialized schema object.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightColorEvent(data: ILightColorEvent): IWrapLightColorEvent {
   return createLightColorEvent({
      time: data.b,
      color: data.c,
      frequency: data.f,
      previous: data.i === TransitionType.EXTEND ? 1 : 0,
      easing: data.i === TransitionType.INTERPOLATE ? EaseType.LINEAR : EaseType.NONE,
      brightness: data.s,
      strobeBrightness: data.sb,
      strobeFade: data.sf,
      customData: data.customData,
   });
}

import type { ISchemaContainer } from '../../../types/beatmap/shared/schema.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v3/lightColorEvent.ts';
import type { IWrapLightColorEventAttribute } from '../../../types/beatmap/wrapper/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { EaseType, TransitionType } from '../../shared/constants.ts';

/**
 * Schema serialization for v3 `Light Color Event`.
 */
export const lightColorEvent: ISchemaContainer<IWrapLightColorEventAttribute, ILightColorEvent> = {
   serialize(data) {
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
   },
   deserialize(data) {
      return {
         time: data.b ?? 0,
         color: data.c ?? 0,
         frequency: data.f ?? 0,
         previous: data.i === TransitionType.EXTEND ? 1 : 0,
         easing: data.i === TransitionType.INTERPOLATE ? EaseType.LINEAR : EaseType.NONE,
         brightness: data.s ?? 0,
         strobeBrightness: data.sb ?? 0,
         strobeFade: data.sf ?? 0,
         customData: data.customData ?? {},
      };
   },
};

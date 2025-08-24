import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightColorEvent } from './types/lightColorEvent.ts';
import type { IWrapLightColorEvent } from '../../core/types/lightColorEvent.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createLightColorEvent } from '../../core/lightColorEvent.ts';
import { EaseType, TransitionType } from '../shared/types/constants.ts';

/**
 * Schema serialization for v3 `Light Color Event`.
 */
export const lightColorEvent: ISchemaContainer<IWrapLightColorEvent, ILightColorEvent> = {
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
   },
};

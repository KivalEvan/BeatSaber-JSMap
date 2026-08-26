import type { ILightshow } from './types/lightshow.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { FxType } from '../shared/types/constants.ts';
import { deserializeBasicEvent, serializeBasicEvent } from './basicEvent.ts';
import { deserializeColorBoostEvent, serializeColorBoostEvent } from './colorBoostEvent.ts';
import { deserializeFxEventBoxGroup, serializeFxEventBoxGroup } from './fxEventBoxGroup.ts';
import { resolveIndexed } from '../shared/lookup.ts';
import {
   deserializeLightColorEventBoxGroup,
   serializeLightColorEventBoxGroup,
} from './lightColorEventBoxGroup.ts';
import {
   deserializeLightRotationEventBoxGroup,
   serializeLightRotationEventBoxGroup,
} from './lightRotationEventBoxGroup.ts';
import type { DeepPartial } from '../../../types/utils.ts';
import {
   deserializeLightTranslationEventBoxGroup,
   serializeLightTranslationEventBoxGroup,
} from './lightTranslationEventBoxGroup.ts';

type LightshowDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/** Serialize beatmap v3 `Lightshow` object into schema object.
 * @param data The unwrapped beatmap object.
 * @returns The serialized schema object.
 */
export function serializeLightshow(data: IWrapBeatmap): ILightshow {
   const json: Required<ILightshow> = {
      basicBeatmapEvents: data.lightshow.basicEvents.map((x) => {
         return serializeBasicEvent(x);
      }),
      colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map((x) => {
         return serializeColorBoostEvent(x);
      }),
      lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map((x) => {
         return serializeLightColorEventBoxGroup(x);
      }),
      lightRotationEventBoxGroups: data.lightshow.lightRotationEventBoxGroups.map((x) => {
         return serializeLightRotationEventBoxGroup(x);
      }),
      lightTranslationEventBoxGroups: data.lightshow.lightTranslationEventBoxGroups.map((x) => {
         return serializeLightTranslationEventBoxGroup(x);
      }),
      vfxEventBoxGroups: [],
      _fxEventsCollection: {
         _fl: [],
         _il: [],
      },
      customData: deepCopy(data.lightshow.customData),
   };
   for (
      const obj of data.lightshow.fxEventBoxGroups.map((x) => {
         return serializeFxEventBoxGroup(x);
      })
   ) {
      json.vfxEventBoxGroups!.push(obj.object);
      for (const box of obj.boxData) {
         obj.object.e!.push(box.data);
         for (const evt of box.eventData) {
            box.data.l!.push(json._fxEventsCollection!._fl!.length);
            json._fxEventsCollection!._fl!.push(evt);
         }
      }
   }
   return json;
}

/** Deserialize schema object into beatmap v3 `Lightshow` object.
 * @param data The serialized schema object.
 * @param options Deserialization polyfills.
 * @returns The unwrapped beatmap object.
 */
export function deserializeLightshow(
   data: ILightshow,
   options?: DeepPartial<LightshowDeserializationPolyfills>,
): IWrapBeatmap {
   const fx = data._fxEventsCollection?._fl;
   return createBeatmap({
      version: 3,
      filename: options?.filename,
      lightshowFilename: options?.lightshowFilename,
      difficulty: {},
      lightshow: {
         basicEvents: data.basicBeatmapEvents?.map((x) => {
            return deserializeBasicEvent(x);
         }),
         colorBoostEvents: data.colorBoostBeatmapEvents?.map((x) => {
            return deserializeColorBoostEvent(x);
         }),
         lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map((x) => {
            return deserializeLightColorEventBoxGroup(x);
         }),
         lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map((x) => {
            return deserializeLightRotationEventBoxGroup(x);
         }),
         lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
            (x) => {
               return deserializeLightTranslationEventBoxGroup(x);
            },
         ),
         fxEventBoxGroups: data.vfxEventBoxGroups?.map((obj) =>
            deserializeFxEventBoxGroup({
               object: { ...obj, t: FxType.FLOAT },
               boxData: obj.e?.map((box) => ({
                  data: box,
                  eventData: box.l?.map((idx) => {
                     return resolveIndexed(fx, idx, '_fxEventsCollection._fl');
                  }) ?? [],
               })) ?? [],
            })
         ),
         customData: data.customData,
      },
   });
}

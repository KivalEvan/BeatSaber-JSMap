// deno-lint-ignore-file no-explicit-any
import type { ISchemaContainer } from '../shared/types/schema.ts';
import type { ILightshow } from './types/lightshow.ts';
import type { IWrapBeatmap } from '../wrapper/types/beatmap.ts';
import { deepCopy } from '../../../utils/misc/json.ts';
import { createBeatmap } from '../wrapper/beatmap.ts';
import { createDifficulty } from '../wrapper/difficulty.ts';
import { createLightshow } from '../wrapper/lightshow.ts';
import { FxType } from '../shared/types/constants.ts';
import { basicEvent } from './basicEvent.ts';
import { colorBoostEvent } from './colorBoostEvent.ts';
import { fxEventBoxGroup } from './fxEventBoxGroup.ts';
import { lightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { lightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { lightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';

type LightshowDeserializationPolyfills = Pick<
   IWrapBeatmap,
   'filename' | 'lightshowFilename'
>;

/**
 * Schema serialization for v3 `Lightshow`.
 */
export const lightshow: ISchemaContainer<
   IWrapBeatmap,
   ILightshow,
   Record<string, any>,
   LightshowDeserializationPolyfills
> = {
   serialize(data) {
      const json: Required<ILightshow> = {
         basicBeatmapEvents: data.lightshow.basicEvents.map((x) => {
            return basicEvent.serialize(x);
         }),
         colorBoostBeatmapEvents: data.lightshow.colorBoostEvents.map((x) => {
            return colorBoostEvent.serialize(x);
         }),
         lightColorEventBoxGroups: data.lightshow.lightColorEventBoxGroups.map((x) => {
            return lightColorEventBoxGroup.serialize(x);
         }),
         lightRotationEventBoxGroups: data.lightshow.lightRotationEventBoxGroups.map((x) => {
            return lightRotationEventBoxGroup.serialize(x);
         }),
         lightTranslationEventBoxGroups: data.lightshow.lightTranslationEventBoxGroups.map((x) => {
            return lightTranslationEventBoxGroup.serialize(x);
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
            return fxEventBoxGroup.serialize(x);
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
   },
   deserialize(data, options) {
      const fx = data._fxEventsCollection?._fl;
      return createBeatmap({
         version: 3,
         filename: options?.filename,
         lightshowFilename: options?.lightshowFilename,
         difficulty: createDifficulty(),
         lightshow: createLightshow({
            basicEvents: data.basicBeatmapEvents?.map((x) => {
               return basicEvent.deserialize(x);
            }),
            colorBoostEvents: data.colorBoostBeatmapEvents?.map((x) => {
               return colorBoostEvent.deserialize(x);
            }),
            lightColorEventBoxGroups: data.lightColorEventBoxGroups?.map((x) => {
               return lightColorEventBoxGroup.deserialize(x);
            }),
            lightRotationEventBoxGroups: data.lightRotationEventBoxGroups?.map((x) => {
               return lightRotationEventBoxGroup.deserialize(x);
            }),
            lightTranslationEventBoxGroups: data.lightTranslationEventBoxGroups?.map(
               (x) => {
                  return lightTranslationEventBoxGroup.deserialize(x);
               },
            ),
            fxEventBoxGroups: data.vfxEventBoxGroups?.map((obj) =>
               fxEventBoxGroup.deserialize({
                  object: { ...obj, t: FxType.FLOAT },
                  boxData: obj.e?.map((box) => ({
                     data: box,
                     eventData: box.l?.map((idx) => fx![idx]) ?? [],
                  })) ?? [],
               })
            ),
            customData: data.customData,
         }),
      });
   },
};

import { copyCustomData } from '../wrapper/copyCustomData.ts';
import type { IWrapFxEventBox } from '../wrapper/types/fxEventBox.ts';
import type { IWrapFxEventBoxGroup } from '../wrapper/types/fxEventBoxGroup.ts';
import type { IWrapFxEventFloat } from '../wrapper/types/fxEventFloat.ts';
import type { IWrapIndexFilter } from '../wrapper/types/indexFilter.ts';
import type { IWrapLightColorEvent } from '../wrapper/types/lightColorEvent.ts';
import type { IWrapLightColorEventBox } from '../wrapper/types/lightColorEventBox.ts';
import type { IWrapLightColorEventBoxGroup } from '../wrapper/types/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEvent } from '../wrapper/types/lightRotationEvent.ts';
import type { IWrapLightRotationEventBox } from '../wrapper/types/lightRotationEventBox.ts';
import type { IWrapLightRotationEventBoxGroup } from '../wrapper/types/lightRotationEventBoxGroup.ts';
import type { IWrapLightTranslationEvent } from '../wrapper/types/lightTranslationEvent.ts';
import type { IWrapLightTranslationEventBox } from '../wrapper/types/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxGroup } from '../wrapper/types/lightTranslationEventBoxGroup.ts';
import { resolveIndexed } from '../shared/lookup.ts';
import { EaseType, TransitionType } from '../shared/types/constants.ts';
import type { DeserializationOptions } from '../shared/types/schema.ts';
import type { IFxEventBox } from './types/fxEventBox.ts';
import type { IFxEventBoxGroup } from './types/fxEventBoxGroup.ts';
import type { IFxEventFloat } from './types/fxEventFloat.ts';
import type { IIndexFilter } from './types/indexFilter.ts';
import type { ILightColorEvent } from './types/lightColorEvent.ts';
import type { ILightColorEventBox } from './types/lightColorEventBox.ts';
import type { ILightColorEventBoxGroup } from './types/lightColorEventBoxGroup.ts';
import type { ILightRotationEvent } from './types/lightRotationEvent.ts';
import type { ILightRotationEventBox } from './types/lightRotationEventBox.ts';
import type { ILightRotationEventBoxGroup } from './types/lightRotationEventBoxGroup.ts';
import type { ILightTranslationEvent } from './types/lightTranslationEvent.ts';
import type { ILightTranslationEventBox } from './types/lightTranslationEventBox.ts';
import type { ILightTranslationEventBoxGroup } from './types/lightTranslationEventBoxGroup.ts';

function copyCustomDataTwice<T extends object>(
   value: T | null | undefined,
   options?: DeserializationOptions,
): T {
   return copyCustomData(copyCustomData(value, options), options);
}

function copyCustomDataThrice<T extends object>(
   value: T | null | undefined,
   options?: DeserializationOptions,
): T {
   return copyCustomData(copyCustomDataTwice(value, options), options);
}

function deserializeDirectIndexFilter(
   data: IIndexFilter,
   options?: DeserializationOptions,
): IWrapIndexFilter {
   return {
      type: data.f ?? 1,
      p0: data.p ?? 0,
      p1: data.t ?? 0,
      reverse: data.r ?? 0,
      chunks: data.c ?? 0,
      random: data.n ?? 0,
      seed: data.s ?? 0,
      limit: data.l ?? 0,
      limitAffectsType: data.d ?? 0,
      customData: copyCustomDataThrice(data.customData, options),
   };
}

function deserializeDirectLightColorEvent(
   data: ILightColorEvent,
   options?: DeserializationOptions,
): IWrapLightColorEvent {
   const time = data.b;
   const color = data.c;
   const frequency = data.f;
   const previousTransition = data.i;
   const easingTransition = data.i;
   const brightness = data.s;
   const strobeBrightness = data.sb;
   const strobeFade = data.sf;
   const customData = data.customData;
   return {
      time: time ?? 0,
      previous: previousTransition === TransitionType.EXTEND ? 1 : 0,
      color: color ?? 0,
      frequency: frequency ?? 0,
      brightness: brightness ?? 0,
      strobeBrightness: strobeBrightness ?? 0,
      strobeFade: strobeFade ?? 0,
      easing: easingTransition === TransitionType.INTERPOLATE ? EaseType.LINEAR : EaseType.NONE,
      customData: copyCustomDataThrice(customData, options),
   };
}

function deserializeDirectLightRotationEvent(
   data: ILightRotationEvent,
   options?: DeserializationOptions,
): IWrapLightRotationEvent {
   return {
      time: data.b ?? 0,
      easing: data.e ?? 0,
      loop: data.l ?? 0,
      direction: data.o ?? 0,
      previous: data.p ?? 0,
      rotation: data.r ?? 0,
      customData: copyCustomDataThrice(data.customData, options),
   };
}

function deserializeDirectLightTranslationEvent(
   data: ILightTranslationEvent,
   options?: DeserializationOptions,
): IWrapLightTranslationEvent {
   return {
      time: data.b ?? 0,
      easing: data.e ?? 0,
      previous: data.p ?? 0,
      translation: data.t ?? 0,
      customData: copyCustomDataThrice(data.customData, options),
   };
}

function deserializeDirectFxEventFloat(
   data: IFxEventFloat,
   options?: DeserializationOptions,
): IWrapFxEventFloat {
   return {
      time: data.b ?? 0,
      easing: data.i ?? 0,
      previous: data.p ?? 0,
      value: data.v ?? 0,
      customData: copyCustomDataThrice(data.customData, options),
   };
}

function deserializeDirectLightColorEventBox(
   data: ILightColorEventBox,
   options?: DeserializationOptions,
): IWrapLightColorEventBox {
   return {
      filter: deserializeDirectIndexFilter(data.f ?? {}, options),
      beatDistribution: data.w ?? 0,
      beatDistributionType: data.d ?? 1,
      brightnessDistribution: data.r ?? 0,
      brightnessDistributionType: data.t ?? 1,
      affectFirst: data.b ?? 0,
      easing: data.i ?? 0,
      events: data.e?.map((event) => deserializeDirectLightColorEvent(event, options)) ?? [],
      customData: copyCustomDataTwice(data.customData, options),
   };
}

function deserializeDirectLightRotationEventBox(
   data: ILightRotationEventBox,
   options?: DeserializationOptions,
): IWrapLightRotationEventBox {
   const filter = deserializeDirectIndexFilter(data.f ?? {}, options);
   const beatDistribution = data.w;
   const beatDistributionType = data.d;
   const rotationDistribution = data.s;
   const rotationDistributionType = data.t;
   const axis = data.a;
   const flip = data.r;
   const affectFirst = data.b;
   const easing = data.i;
   const events = data.l?.map((event) => deserializeDirectLightRotationEvent(event, options));
   const customData = data.customData;
   return {
      filter,
      axis: axis ?? 0,
      flip: flip ?? 0,
      beatDistribution: beatDistribution ?? 0,
      beatDistributionType: beatDistributionType ?? 1,
      rotationDistribution: rotationDistribution ?? 0,
      rotationDistributionType: rotationDistributionType ?? 1,
      affectFirst: affectFirst ?? 0,
      easing: easing ?? 0,
      events: events ?? [],
      customData: copyCustomDataTwice(customData, options),
   };
}

function deserializeDirectLightTranslationEventBox(
   data: ILightTranslationEventBox,
   options?: DeserializationOptions,
): IWrapLightTranslationEventBox {
   const filter = deserializeDirectIndexFilter(data.f ?? {}, options);
   const beatDistribution = data.w;
   const beatDistributionType = data.d;
   const gapDistribution = data.s;
   const gapDistributionType = data.t;
   const axis = data.a;
   const flip = data.r;
   const affectFirst = data.b;
   const easing = data.i;
   const events = data.l?.map((event) => deserializeDirectLightTranslationEvent(event, options));
   const customData = data.customData;
   return {
      filter,
      axis: axis ?? 0,
      flip: flip ?? 0,
      beatDistribution: beatDistribution ?? 0,
      beatDistributionType: beatDistributionType ?? 1,
      gapDistribution: gapDistribution ?? 0,
      gapDistributionType: gapDistributionType ?? 1,
      affectFirst: affectFirst ?? 0,
      easing: easing ?? 0,
      events: events ?? [],
      customData: copyCustomDataTwice(customData, options),
   };
}

function deserializeDirectFxEventBox(
   data: IFxEventBox,
   events: IFxEventFloat[],
   options?: DeserializationOptions,
): IWrapFxEventBox {
   return {
      filter: deserializeDirectIndexFilter(data.f ?? {}, options),
      beatDistribution: data.w ?? 0,
      beatDistributionType: data.d ?? 1,
      fxDistribution: data.s ?? 0,
      fxDistributionType: data.t ?? 1,
      affectFirst: data.b ?? 0,
      easing: data.i ?? 0,
      events: events.map((event) => deserializeDirectFxEventFloat(event, options)),
      customData: copyCustomDataTwice(data.customData, options),
   };
}

export function deserializeDirectLightColorEventBoxGroup(
   data: ILightColorEventBoxGroup,
   options?: DeserializationOptions,
): IWrapLightColorEventBoxGroup {
   return {
      time: data.b ?? 0,
      id: data.g ?? 0,
      boxes: data.e?.map((box) => deserializeDirectLightColorEventBox(box, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}

export function deserializeDirectLightRotationEventBoxGroup(
   data: ILightRotationEventBoxGroup,
   options?: DeserializationOptions,
): IWrapLightRotationEventBoxGroup {
   return {
      time: data.b ?? 0,
      id: data.g ?? 0,
      boxes: data.e?.map((box) => deserializeDirectLightRotationEventBox(box, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}

export function deserializeDirectLightTranslationEventBoxGroup(
   data: ILightTranslationEventBoxGroup,
   options?: DeserializationOptions,
): IWrapLightTranslationEventBoxGroup {
   return {
      time: data.b ?? 0,
      id: data.g ?? 0,
      boxes: data.e?.map((box) => deserializeDirectLightTranslationEventBox(box, options)) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}

export function deserializeDirectFxEventBoxGroup(
   data: IFxEventBoxGroup,
   fxEvents: IFxEventFloat[] | undefined,
   options?: DeserializationOptions,
): IWrapFxEventBoxGroup {
   return {
      time: data.b ?? 0,
      id: data.g ?? 0,
      boxes: data.e?.map((box) => {
         const events = box.l?.map((index) => {
            return resolveIndexed(fxEvents, index, '_fxEventsCollection._fl');
         }) ?? [];
         return deserializeDirectFxEventBox(box, events, options);
      }) ?? [],
      customData: copyCustomData(data.customData, options),
   };
}

import {
   isLightEventType,
   isRedEventValue,
   isWhiteEventValue,
} from '../../beatmap/helpers/core/basicEvent.ts';
import { ColorScheme, EnvironmentSchemeName } from '../../beatmap/shared/colorScheme.ts';
import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import type { IChromaEventRing, IChromaEventZoom } from '../../types/beatmap/v3/custom/chroma.ts';
import type { IWrapBasicEvent } from '../../types/beatmap/wrapper/basicEvent.ts';
import type { IWrapBeatmapSubset } from '../../types/beatmap/wrapper/beatmap.ts';
import type { IWrapColorBoostEvent } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { ColorArray } from '../../types/colors.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { colorFrom, hsvaToRgba, rgbaToHsva } from '../../utils/colors/convertor.ts';
import { EasingsFn } from '../../utils/math/easings.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { LightIDList } from './lightID.ts';
import type {
   EventBase,
   EventBox,
   EventBoxType,
   IndexFilterDivision,
} from './types/lightMapper.ts';

/**
 * This uses new lighting lighting syntax for v2 lighting including support for color and easing.
 * ```ts
 * const lightMapper = new LightMapper('FitbeatEnvironment');
 * lightMapper.light(8, 2, [eventBox]);
 * lightMapper.process(mapData);
 * ```
 * Not all functionality works here however, there are quirks that may not work too well.
 */
export class LightMapper {
   lightIDMapping: Record<number, number[]>;
   readonly environment: EnvironmentAllName;
   private queue: EventBoxType[] = [];
   private events: IWrapBasicEvent[] = [];
   private boosts: IWrapColorBoostEvent[] = [];

   constructor(environment: EnvironmentAllName) {
      this.lightIDMapping = deepCopy(LightIDList[environment], true);
      this.environment = environment;
   }

   light(
      time: number,
      type: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11,
      eventBox: DeepPartial<EventBox>[],
      lightID?: number[],
   ): this {
      this.queue.push({
         time,
         type,
         lightID: lightID ? lightID : this.lightIDMapping[type],
         eventBox: eventBox.map((eb) => {
            return {
               indexFilter: eb.indexFilter
                  ? eb.indexFilter.type === 'Step and Offset'
                     ? {
                        type: 'Step and Offset',
                        id: eb.indexFilter.id ?? 0,
                        step: eb.indexFilter.step ?? 1,
                        reverse: eb.indexFilter.reverse ?? false,
                     }
                     : {
                        type: 'Division',
                        divide: (eb.indexFilter as IndexFilterDivision).divide ??
                           1,
                        id: eb.indexFilter.id ?? 0,
                        reverse: eb.indexFilter.reverse ?? false,
                     }
                  : {
                     type: 'Division',
                     divide: 1,
                     id: 0,
                     reverse: false,
                  },
               beatDistribution: eb.beatDistribution ?? 0,
               beatDistributionType: eb.beatDistributionType ?? 'Division',
               beatDistributionEasing: eb.beatDistributionEasing ?? 'easeLinear',
               brightnessDistribution: eb.brightnessDistribution ?? 0,
               brightnessDistributionType: eb.brightnessDistributionType ?? 'Division',
               brightnessDistributionEasing: eb.brightnessDistributionEasing ?? 'easeLinear',
               hueDistribution: eb.hueDistribution ?? 0,
               hueDistributionType: eb.hueDistributionType ?? 'Division',
               hueDistributionEasing: eb.hueDistributionEasing ?? 'easeLinear',
               affectFirst: eb.affectFirst ?? false,
               events: eb.events
                  ? eb.events.map((ev) => {
                     return {
                        time: ev!.time ?? 0,
                        color: ev!.color ?? 0,
                        transition: ev!.transition ?? 0,
                        brightness: ev!.brightness ?? 1,
                        frequency: Math.max(ev!.frequency ?? 0, 0),
                        customData: ev!.customData ?? {},
                     };
                  })
                  : [],
            };
         }),
      });
      return this;
   }

   ring(time: number, type: 8 | 9, customData?: IChromaEventRing): this {
      this.events.push({ time, type, value: 0, floatValue: 0, customData: customData ?? {} });
      return this;
   }

   zoom(time: number, customData?: IChromaEventZoom): this {
      this.events.push({ time, type: 9, value: 0, floatValue: 0, customData: customData ?? {} });
      return this;
   }

   boost(time: number, toggle: boolean): this {
      this.boosts.push({ time, toggle: toggle, customData: {} });
      return this;
   }

   private internalEventValue(color: number, transition: number): number {
      const transitionValue: { [key: number]: number } = {
         0: 0,
         1: 3,
         3: 1,
         4: 2,
      };
      return 1 + color * 4 + transitionValue[transition];
   }

   process(mapData: IWrapBeatmapSubset<'basicEvents'>, overwrite = true): void {
      const events = [...this.events];
      this.queue.sort((a, b) => a.time - b.time);
      for (const q of this.queue) {
         q.eventBox.forEach((eb) => {
            let lid = [...q.lightID];
            if (eb.indexFilter.reverse) {
               lid.reverse();
            }
            if (eb.indexFilter.type === 'Division') {
               if (eb.indexFilter.divide > 1) {
                  lid = lid.slice(
                     Math.floor(lid.length / eb.indexFilter.divide) *
                        eb.indexFilter.id,
                     Math.ceil(lid.length / eb.indexFilter.divide) *
                        (eb.indexFilter.id + 1),
                  );
               }
            }
            if (eb.indexFilter.type === 'Step and Offset') {
               if (eb.indexFilter.id > 0) {
                  lid = lid.slice(eb.indexFilter.id);
               }
               const temp = [];
               for (let i = 0; i < lid.length; i += eb.indexFilter.step) {
                  temp.push(lid[i]);
               }
               lid = temp;
            }
            if (
               !eb.beatDistribution &&
               !eb.brightnessDistribution &&
               !eb.hueDistribution &&
               !eb.affectFirst
            ) {
               let previousEvent: IWrapBasicEvent;
               let previousBase: EventBase;
               eb.events.forEach((ev) => {
                  if (ev.transition === 2 && previousEvent) {
                     if (previousBase.frequency) {
                        for (
                           let t = previousBase.time + 1 / previousBase.frequency;
                           t < ev.time;
                           t += 1 / previousBase.frequency
                        ) {
                           events.push({
                              ...structuredClone(previousEvent),
                              time: t - 1 / (previousBase.frequency * 2),
                           }, {
                              ...structuredClone(previousEvent),
                              time: t,
                           });
                        }
                     }
                     events.push(previousEvent);
                     previousBase = ev;
                     return;
                  }
                  const event = {
                     time: q.time + ev.time,
                     type: q.type,
                     value: this.internalEventValue(ev.color, ev.transition),
                     floatValue: ev.brightness,
                     customData: { ...ev.customData, lightID: lid },
                  };
                  events.push(event);
                  previousEvent = event;
                  previousBase = ev;
               });
               return;
            }
            let previousEvent: IWrapBasicEvent;
            let previousBase: EventBase;
            let isFirst = !eb.affectFirst;
            const lastEventTime = eb.events.at(-1)?.time ?? 0;
            eb.events.forEach((ev) => {
               for (
                  let i = 0, x = 0;
                  i < lid.length;
                  i++,
                     x = eb.beatDistributionType === 'Division'
                        ? EasingsFn[
                           eb.beatDistributionEasing ?? 'easeLinear'
                        ](i / (lid.length - 1)) * eb.beatDistribution
                        : i * (lastEventTime + eb.beatDistribution)
               ) {
                  if (ev.transition === 2 && previousEvent) {
                     if (previousBase.frequency) {
                        for (
                           let t = previousBase.time + 1 / previousBase.frequency;
                           t < ev.time;
                           t += 1 / previousBase.frequency
                        ) {
                           events.push({
                              ...structuredClone(previousEvent),
                              time: t - 1 / (previousBase.frequency * 2) + x,
                           }, {
                              ...structuredClone(previousEvent),
                              time: t,
                           });
                        }
                     } else {
                        events.push(previousEvent);
                     }
                     previousBase = ev;
                     return;
                  }
                  if (previousBase?.frequency) {
                     for (
                        let t = previousBase.time + 1 / previousBase.frequency;
                        t < ev.time;
                        t += 1 / previousBase.frequency
                     ) {
                        events.push({
                           ...structuredClone(previousEvent),
                           time: t - 1 / (previousBase.frequency * 2),
                        }, {
                           ...structuredClone(previousEvent),
                           time: t,
                        });
                     }
                  }
                  const event = {
                     time: q.time + ev.time + x,
                     type: q.type,
                     value: this.internalEventValue(ev.color, ev.transition),
                     floatValue: Math.max(
                        isFirst
                           ? ev.brightness
                           : eb.brightnessDistributionType === 'Division'
                           ? ev.brightness +
                              EasingsFn[
                                    eb.brightnessDistributionEasing ?? 'easeLinear'
                                 ](i / (lid.length - 1)) *
                                 eb.brightnessDistribution
                           : ev.brightness + i * eb.brightnessDistribution,
                        0,
                     ),
                     customData: { ...ev.customData, lightID: lid[i] },
                  };
                  if (eb.hueDistribution && isLightEventType(event.type)) {
                     if (!event.customData.color) {
                        event.customData.color = isWhiteEventValue(event.value)
                           ? [1, 1, 1]
                           : colorFrom(
                              ColorScheme[EnvironmentSchemeName[this.environment]][
                                 isRedEventValue(event.value) ? '_envColorLeft' : '_envColorRight'
                              ]!,
                           );
                     }
                     if (!isFirst) {
                        event.customData.color = hsvaToRgba(
                           rgbaToHsva(event.customData.color).map((v, x) => {
                              if (!x) {
                                 v! += eb.hueDistributionType === 'Division'
                                    ? EasingsFn[
                                       eb.hueDistributionEasing ??
                                          'easeLinear'
                                    ](i / (lid.length - 1)) *
                                       eb.hueDistribution
                                    : i * eb.hueDistribution;
                              }
                              return v;
                           }) as ColorArray,
                        );
                     }
                  }
                  events.push(event);
                  previousEvent = event;
                  previousBase = ev;
               }
               isFirst = false;
            });
         });
      }

      if (overwrite) {
         mapData.lightshow.basicEvents = [];
      }
      mapData.lightshow.basicEvents.push(...events);
   }
}

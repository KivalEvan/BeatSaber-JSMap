import { Difficulty as DifficultyV2 } from '../../beatmap/v2/difficulty.ts';
import { BasicEvent } from '../../beatmap/v3/basicEvent.ts';
import { Event } from '../../beatmap/v2/event.ts';
import { ColorBoostEvent } from '../../beatmap/v3/colorBoostEvent.ts';
import { Difficulty as DifficultyV3 } from '../../beatmap/v3/difficulty.ts';
import { isV3 } from '../../beatmap/version.ts';
import { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import { IEvent } from '../../types/beatmap/v2/event.ts';
import { IChromaEventRing, IChromaEventZoom } from '../../types/beatmap/v3/custom/chroma.ts';
import { DeepPartial } from '../../types/utils.ts';
import { LightIDList } from './lightID.ts';
import { EventBase, EventBox, EventBoxType, IndexFilterDivision } from './types/lightMapper.ts';
import { easings } from '../../utils/easings.ts';
import { colorObjToAry, HsvaToRgba, RgbaToHsva } from '../../utils/colors.ts';
import { ColorScheme, EnvironmentSchemeName } from '../../beatmap/shared/colorScheme.ts';
import { ColorArray } from '../../types/colors.ts';

/** This uses new lighting lighting syntax for v2 lighting including support for color and easing.
 * ```ts
 * const lightMapper = new LightMapper('FitbeatEnvironment');
 * lightMapper.light(8, 2, [eventBox]);
 * lightMapper.process(mapData);
 * ```
 * Not all functionality works here however, there are quirks that may not work too well.
 */
export class LightMapper {
    lightIDMapping;
    readonly environment;
    private queue: EventBoxType[] = [];
    private events: BasicEvent[] = [];
    private boosts: ColorBoostEvent[] = [];

    constructor(environment: EnvironmentAllName) {
        this.lightIDMapping = <{ [key: number]: number[] }> structuredClone(
            LightIDList[environment],
        );
        this.environment = environment;
    }

    light(
        time: number,
        type: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 10 | 11,
        eventBox: DeepPartial<EventBox>[],
        lightID?: number[],
    ) {
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
                                divide: (eb.indexFilter as IndexFilterDivision)
                                    .divide ?? 1,
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
                    beatDistributionEasing: eb.beatDistributionEasing ??
                        'easeLinear',
                    brightnessDistribution: eb.brightnessDistribution ?? 0,
                    brightnessDistributionType: eb.brightnessDistributionType ??
                        'Division',
                    brightnessDistributionEasing: eb.brightnessDistributionEasing ??
                        'easeLinear',
                    hueDistribution: eb.hueDistribution ?? 0,
                    hueDistributionType: eb.hueDistributionType ?? 'Division',
                    hueDistributionEasing: eb.hueDistributionEasing ??
                        'easeLinear',
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

    ring(time: number, type: 8 | 9, customData?: IChromaEventRing) {
        this.events.push(
            BasicEvent.create({ b: time, et: type, customData })[0],
        );
        return this;
    }

    zoom(time: number, customData?: IChromaEventZoom) {
        this.events.push(BasicEvent.create({ b: time, et: 9, customData })[0]);
        return this;
    }

    boost(time: number, toggle: boolean) {
        this.boosts.push(ColorBoostEvent.create({ b: time, o: toggle })[0]);
        return this;
    }

    private internalEventValue(color: number, transition: number) {
        const transitionValue: { [key: number]: number } = {
            0: 0,
            1: 3,
            3: 1,
            4: 2,
        };
        return 1 + color * 4 + transitionValue[transition];
    }

    process(mapData: DifficultyV2 | DifficultyV3, overwrite = true) {
        const events: BasicEvent[] = [...this.events];
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
                    !eb.beatDistribution && !eb.brightnessDistribution &&
                    !eb.hueDistribution && !eb.affectFirst
                ) {
                    let previousEvent: BasicEvent;
                    let previousBase: EventBase;
                    eb.events.forEach((ev) => {
                        if (ev.transition === 2 && previousEvent) {
                            if (previousBase.frequency) {
                                for (
                                    let t = previousBase.time +
                                        1 / previousBase.frequency;
                                    t < ev.time;
                                    t += 1 / previousBase.frequency
                                ) {
                                    events.push(
                                        previousEvent
                                            .clone()
                                            .setTime(
                                                t -
                                                    1 /
                                                        (previousBase
                                                            .frequency * 2),
                                            )
                                            .setValue(0)
                                            .setFloatValue(0),
                                        previousEvent.clone().setTime(t),
                                    );
                                }
                            }
                            events.push(previousEvent);
                            previousBase = ev;
                            return;
                        }
                        const event = BasicEvent.create({
                            b: q.time + ev.time,
                            et: q.type,
                            i: this.internalEventValue(ev.color, ev.transition),
                            f: ev.brightness,
                            customData: { ...ev.customData, lightID: lid },
                        })[0];
                        events.push(event);
                        previousEvent = event;
                        previousBase = ev;
                    });
                    return;
                }
                let previousEvent: BasicEvent;
                let previousBase: EventBase;
                let isFirst = !eb.affectFirst;
                const lastEventTime = eb.events.at(-1)?.time ?? 0;
                eb.events.forEach((ev) => {
                    for (
                        let i = 0, x = 0;
                        i < lid.length;
                        i++,
                            x = eb.beatDistributionType === 'Division'
                                ? easings
                                    [eb.beatDistributionEasing ?? 'easeLinear'](
                                        i / (lid.length - 1),
                                    ) *
                                    eb.beatDistribution
                                : i * (lastEventTime + eb.beatDistribution)
                    ) {
                        if (ev.transition === 2 && previousEvent) {
                            if (previousBase.frequency) {
                                for (
                                    let t = previousBase.time +
                                        1 / previousBase.frequency;
                                    t < ev.time;
                                    t += 1 / previousBase.frequency
                                ) {
                                    events.push(
                                        previousEvent
                                            .clone()
                                            .setTime(
                                                t -
                                                    1 /
                                                        (previousBase
                                                            .frequency * 2) +
                                                    x,
                                            )
                                            .setValue(0)
                                            .setFloatValue(0),
                                        previousEvent.clone().setTime(t),
                                    );
                                }
                            } else {
                                events.push(previousEvent);
                            }
                            previousBase = ev;
                            return;
                        }
                        if (previousBase?.frequency) {
                            for (
                                let t = previousBase.time +
                                    1 / previousBase.frequency;
                                t < ev.time;
                                t += 1 / previousBase.frequency
                            ) {
                                events.push(
                                    previousEvent
                                        .clone()
                                        .setTime(
                                            t -
                                                1 /
                                                    (previousBase.frequency *
                                                        2),
                                        )
                                        .setValue(0)
                                        .setFloatValue(0),
                                    previousEvent.clone().setTime(t),
                                );
                            }
                        }
                        const event = BasicEvent.create({
                            b: q.time + ev.time + x,
                            et: q.type,
                            i: this.internalEventValue(ev.color, ev.transition),
                            f: Math.max(
                                isFirst ? ev.brightness : eb.brightnessDistributionType ===
                                        'Division'
                                    ? ev.brightness +
                                        easings
                                                [
                                                    eb.brightnessDistributionEasing ??
                                                        'easeLinear'
                                                ](i / (lid.length - 1)) *
                                            eb.brightnessDistribution
                                    : ev.brightness +
                                        i * eb.brightnessDistribution,
                                0,
                            ),
                            customData: { ...ev.customData, lightID: lid[i] },
                        })[0];
                        if (eb.hueDistribution && event.isLightEvent()) {
                            if (!event.customData.color) {
                                event.customData.color = event.isWhite()
                                    ? [1, 1, 1]
                                    : colorObjToAry(
                                        ColorScheme[
                                            EnvironmentSchemeName[
                                                this.environment
                                            ]
                                        ][
                                            event.isRed() ? '_envColorLeft' : '_envColorRight'
                                        ]!,
                                    );
                            }
                            if (!isFirst) {
                                event.customData.color = HsvaToRgba(
                                    ...(RgbaToHsva(...event.customData.color)
                                        .map((v, x) => {
                                            if (!x) {
                                                v! += eb.hueDistributionType ===
                                                        'Division'
                                                    ? easings
                                                        [
                                                            eb.hueDistributionEasing ??
                                                                'easeLinear'
                                                        ](
                                                            i /
                                                                (lid.length -
                                                                    1),
                                                        ) *
                                                        eb.hueDistribution
                                                    : i *
                                                        eb.hueDistribution;
                                            }
                                            return v;
                                        }) as ColorArray),
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

        if (isV3(mapData)) {
            if (overwrite) {
                mapData.basicEvents = [];
            }
            mapData.basicEvents.push(...events);
        } else {
            if (overwrite) {
                mapData.basicEvents = [];
            }
            events.forEach((e) => {
                let _customData!: IEvent['_customData'];
                if (e.customData) {
                    if (e.isLightEvent()) {
                        _customData = {
                            _color: e.customData.color,
                            _lightID: e.customData.lightID,
                            _easing: e.customData.easing,
                            _lerpType: e.customData.lerpType,
                        };
                    }
                    if (e.isRingEvent()) {
                        _customData = {
                            _nameFilter: e.customData.nameFilter,
                            _rotation: e.customData.rotation,
                            _step: e.customData.step,
                            _prop: e.customData.prop,
                            _speed: e.customData.speed,
                            _direction: e.customData.direction,
                        };
                    }
                    if (e.isLaserRotationEvent()) {
                        _customData = {
                            _lockPosition: e.customData.lockRotation,
                            _direction: e.customData.direction,
                            _preciseSpeed: e.customData.speed,
                        };
                    }
                }
                mapData.basicEvents.push(
                    Event.create({
                        _time: e.time,
                        _type: e.type,
                        _value: e.value,
                        _floatValue: e.floatValue,
                        _customData,
                    })[0],
                );
            });
        }
    }
}

import logger from '../logger.ts';
import { Event } from '../beatmap/v2/event.ts';
import { Difficulty as DifficultyV2 } from '../beatmap/v2/difficulty.ts';
import { easings } from '../utils/easings.ts';
import { interpolateColor } from '../utils/colors.ts';
import { normalize } from '../utils/math.ts';

const tag = (name: string) => {
    return `[convert::${name}]`;
};

/** Convert Chroma light gradient to transition event.
 * ```ts
 * const newData = convert.ogChromaToChromaV2(oldData);
 * ```
 */
export function chromaLightGradientToVanillaGradient(
    data: DifficultyV2,
    skipPrompt?: boolean,
): DifficultyV2 {
    if (!skipPrompt) {
        logger.warn(
            tag('chromaLightGradientToVanillaGradient'),
            'Converting chroma light gradient may break certain lightshow effect!',
        );
        const confirmation = prompt('Proceed with conversion? (y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Chroma light gradient conversion denied.');
        }
        logger.info(
            tag('chromaLightGradientToVanillaGradient'),
            'Converting chroma light gradient to vanilla chroma gradient',
        );
    } else {
        logger.warn(
            tag('chromaLightGradientToVanillaGradient'),
            'Converting chroma light gradient is not fully tested and may break certain lightshow effect!',
        );
    }
    const events = data.basicEvents;
    const newEvents = [] as typeof data.basicEvents;
    for (let curr = 0, len = events.length; curr < len; curr++) {
        const ev = events[curr];
        if (!ev.isLightEvent()) {
            newEvents.push(ev);
            continue;
        }
        if (ev.customData._lightGradient) {
            const eventInGradient = [] as typeof events;
            for (let next = curr + 1; next < len; next++) {
                if (ev.type !== events[next].type) {
                    continue;
                }
                if (
                    ev.time + ev.customData._lightGradient._duration >=
                        events[next].time
                ) {
                    eventInGradient.push(events[next]);
                }
            }
            if (eventInGradient.length) {
                ev.customData._color = ev.customData._lightGradient._startColor;
                ev.value = ev.value >= 1 && ev.value <= 4 ? 1 : ev.value >= 5 && ev.value <= 8 ? 5 : 9;
                const easing = easings[ev.customData._lightGradient._easing ?? 'easeLinear'];
                let hasOff = false;
                let previousEvent: Event = ev;
                for (const eig of eventInGradient) {
                    if (
                        !hasOff &&
                        eig.time >
                            ev.time + ev.customData._lightGradient._duration - 0.001
                    ) {
                        newEvents.push(
                            ...Event.create({
                                _time: ev.time +
                                    ev.customData._lightGradient._duration -
                                    0.001,
                                _type: ev.type,
                                _value: ev.value >= 1 && ev.value <= 4 ? 4 : ev.value >= 5 && ev.value <= 8 ? 8 : 12,
                                _floatValue: 1,
                                _customData: {
                                    _color: ev.customData._lightGradient._endColor,
                                    _easing: eventInGradient.length === 1
                                        ? ev.customData._lightGradient._easing
                                        : undefined,
                                },
                            }),
                        );
                    } else {
                        eig.value = hasOff
                            ? eig.value >= 1 && eig.value <= 4 ? 1 : eig.value >= 5 && eig.value <= 8 ? 5 : 9
                            : eig.value >= 1 && eig.value <= 4
                            ? 4
                            : eig.value >= 5 && eig.value <= 8
                            ? 8
                            : 12;
                        eig.customData!._color = interpolateColor(
                            ev.customData._lightGradient._startColor,
                            ev.customData._lightGradient._endColor,
                            normalize(
                                eig.time,
                                ev.time,
                                ev.time + ev.customData._lightGradient._duration,
                            ),
                            'rgba',
                            easing,
                        );
                        if (eig.value === 0) {
                            eig.removeCustomData('_color');
                            if (!hasOff) {
                                newEvents.push(
                                    ...Event.create({
                                        _time: eig.time - 0.001,
                                        _type: ev.type,
                                        _value: previousEvent.value >= 1 &&
                                                previousEvent.value <= 4
                                            ? 4
                                            : previousEvent.value >= 5 &&
                                                    previousEvent.value <= 8
                                            ? 8
                                            : 12,
                                        _floatValue: 1,
                                        _customData: {
                                            _color: interpolateColor(
                                                ev.customData._lightGradient
                                                    ._startColor,
                                                ev.customData._lightGradient._endColor,
                                                normalize(
                                                    eig.time - 0.001,
                                                    ev.time,
                                                    ev.time +
                                                        ev.customData._lightGradient
                                                            ._duration,
                                                ),
                                                'rgba',
                                                easing,
                                            ),
                                        },
                                    }),
                                );
                            }
                            hasOff = true;
                        } else {
                            hasOff = false;
                        }
                    }
                    previousEvent = eig;
                }
                ev.removeCustomData('_lightGradient');
            } else {
                ev.customData._color = ev.customData._lightGradient._startColor;
                ev.value = ev.value >= 1 && ev.value <= 4 ? 1 : ev.value >= 5 && ev.value <= 8 ? 5 : 9;
                newEvents.push(
                    ...Event.create({
                        _time: ev.time + ev.customData._lightGradient._duration,
                        _type: ev.type,
                        _value: ev.value >= 1 && ev.value <= 4 ? 4 : ev.value >= 5 && ev.value <= 8 ? 8 : 12,
                        _floatValue: 1,
                        _customData: {
                            _color: ev.customData._lightGradient._endColor,
                            _easing: ev.customData._lightGradient._easing,
                        },
                    }),
                );
                ev.removeCustomData('_lightGradient');
            }
        }
        newEvents.push(ev);
    }
    data.basicEvents = newEvents;
    return data;
}

import * as v2 from '../beatmap/v2/mod.ts';
import logger from '../logger.ts';
import { DifficultyData as DifficultyDataV2 } from '../beatmap/v2/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from '../beatmap/v3/difficulty.ts';
import { clamp } from '../utils/math.ts';

const tag = (name: string) => {
    return `[convert::${name}]`;
};

/** In case you need to go back, who knows why.
 * ```ts
 * const oldData = convert.V3toV2(newData);
 * ```
 * ---
 * **WARNING:** Burst slider and other new stuff will be gone!
 *
 * This feature won't be supported in the near future.
 *
 * This is severely outdated for customData.
 */
export const V3toV2 = (data: DifficultyDataV3, skipPrompt?: boolean): DifficultyDataV2 => {
    if (!skipPrompt) {
        logger.warn(tag('V3toV2'), 'Converting beatmap v3 to v2 may lose certain data!');
        const confirmation = prompt('Proceed with conversion? (y/N):', 'n');
        if (confirmation![0].toLowerCase() !== 'y') {
            throw Error('Conversion to beatmap v2 denied.');
        }
        logger.info(tag('V3toV2'), 'Converting beatmap v3 to v2');
    } else {
        logger.warn(tag('V3toV2'), 'Converting beatmap v3 to v2 may lose certain data!');
    }
    const template = DifficultyDataV2.create();
    template.fileName = data.fileName;

    data.colorNotes.forEach((n) =>
        template.notes.push(
            v2.Note.create({
                _time: n.time,
                _lineIndex: n.posX,
                _lineLayer: n.posY,
                _type: n.color,
                _cutDirection: n.direction,
                _customData: n.customData,
            }),
        )
    );

    data.bombNotes.forEach((b) =>
        template.notes.push(
            v2.Note.create({
                _time: b.time,
                _lineIndex: b.posX,
                _lineLayer: b.posY,
                _type: 3,
                _cutDirection: 0,
                _customData: b.customData,
            }),
        )
    );

    data.obstacles.forEach((o) => {
        if (o.posY === 0 && o.height === 5) {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 0,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData: o.customData,
                }),
            );
        } else if (o.posY === 2 && o.height === 3) {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: 0,
                    _type: 1,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData: o.customData,
                }),
            );
        } else {
            template.obstacles.push(
                v2.Obstacle.create({
                    _time: o.time,
                    _lineIndex: o.posX,
                    _lineLayer: o.posY,
                    _type: 2,
                    _duration: o.duration,
                    _width: o.width,
                    _height: o.height,
                    _customData: o.customData,
                }),
            );
        }
    });

    data.basicBeatmapEvents.forEach((be) => {
        template.events.push(
            v2.Event.create({
                _time: be.time,
                _type: be.type as 8, // hackish way to just accept any other event
                _value: be.value,
                _floatValue: be.floatValue,
                _customData: be.customData,
            }),
        );
    });

    data.colorBoostBeatmapEvents.forEach((b) =>
        template.events.push(
            v2.Event.create({
                _time: b.time,
                _type: 5,
                _value: b.toggle ? 1 : 0,
                _floatValue: 1,
            }),
        )
    );

    data.rotationEvents.forEach((lr) =>
        template.events.push(
            v2.Event.create({
                _time: lr.time,
                _type: lr.executionTime ? 14 : 15,
                _value: Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) < 6
                    ? Math.max(Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15), 3)
                    : Math.floor((clamp(lr.rotation, -60, 60) + 60) / 15) - 2,
                _floatValue: 1,
            }),
        )
    );

    data.bpmEvents.forEach((bpm) =>
        template.events.push(
            v2.Event.create({
                _time: bpm.time,
                _type: 100,
                _value: 1,
                _floatValue: bpm.bpm,
            }),
        )
    );

    data.sliders.forEach((s) =>
        template.sliders.push(
            v2.Slider.create({
                _colorType: s.color,
                _headTime: s.time,
                _headLineIndex: s.posX,
                _headLineLayer: s.posY,
                _headControlPointlengthMultiplier: s.lengthMultiplier,
                _headCutDirection: s.color,
                _tailTime: s.tailTime,
                _tailLineIndex: s.tailPosX,
                _tailLineLayer: s.tailPosY,
                _tailControlPointLengthMultiplier: s.tailLengthMultiplier,
                _tailCutDirection: s.color,
                _sliderMidAnchorMode: s.midAnchor,
            }),
        )
    );

    data.waypoints.forEach((w) =>
        template.waypoints.push(
            v2.Waypoint.create({
                _time: w.time,
                _lineIndex: w.posX,
                _lineLayer: w.posY,
                _offsetDirection: w.direction,
            }),
        )
    );

    template.specialEventsKeywordFilters = v2.SpecialEventsKeywordFilters.create({
        _keywords: data.basicEventTypesWithKeywords.list.map((d) => {
            return { _keyword: d.keyword, _specialEvents: d.events };
        }) ?? [],
    });

    if (data.customData) {
        for (const k in data.customData) {
            if (k === 'customEvents') {
                template.customData._customEvents = (data.customData.customEvents?.map((ce) => {
                    return { _time: ce.beat, _type: ce.time, _data: ce.data };
                    // deno-lint-ignore no-explicit-any
                }) as any) ?? [];
                continue;
            }
            template.customData[k] = data.customData[k];
        }
    }

    return template;
};

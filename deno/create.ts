import { InfoData } from './beatmap/shared/types/info.ts';
import { DifficultyData as DifficultyDataV2 } from './beatmap/v2/types/difficulty.ts';
import { IDifficultyData as IDifficultyDataV3 } from './beatmap/v3/types/difficulty.ts';
import { DifficultyData as DifficultyDataV3 } from './beatmap/v3/types/difficulty.ts';
import { info as parseInfo } from './beatmap/shared/parse.ts';
import { difficulty as parseDifficultyV2 } from './beatmap/v2/parse.ts';
import { difficulty as parseDifficultyV3 } from './beatmap/v3/parse.ts';
import { deepCopy } from './utils.ts';

export const info = (data: Partial<InfoData> = {}): InfoData => {
    const infoData: InfoData = {
        _version: data._version ?? '2.0.0',
        _songName: data._songName ?? 'Placeholder',
        _songSubName: data._songSubName ?? 'Placeholder',
        _songAuthorName: data._songAuthorName ?? '',
        _levelAuthorName: data._levelAuthorName ?? 'Placeholder',
        _beatsPerMinute: data._beatsPerMinute ?? 120,
        _shuffle: data._shuffle ?? 0,
        _shufflePeriod: data._shufflePeriod ?? 0,
        _previewStartTime: data._previewStartTime ?? 10,
        _previewDuration: data._previewDuration ?? 12,
        _songFilename: data._songFilename ?? 'song.ogg',
        _coverImageFilename: data._coverImageFilename ?? 'cover.jpg',
        _environmentName: data._environmentName ?? 'DefaultEnvironment',
        _allDirectionsEnvironmentName:
            data._allDirectionsEnvironmentName ?? 'GlassDesertEnvironment',
        _songTimeOffset: data._songTimeOffset ?? 0,
        _difficultyBeatmapSets: data._difficultyBeatmapSets
            ? deepCopy(data._difficultyBeatmapSets)
            : [],
    };
    if (data._customData) {
        infoData._customData = deepCopy(data._customData);
    }
    return parseInfo(infoData);
};

export const difficultyLegacy = (
    data: Partial<DifficultyDataV2> = {}
): DifficultyDataV2 => {
    const difficultyData: DifficultyDataV2 = {
        _version: '2.6.0',
        _notes: data._notes ? deepCopy(data._notes) : [],
        _sliders: data._sliders ? deepCopy(data._sliders) : [],
        _obstacles: data._obstacles ? deepCopy(data._obstacles) : [],
        _events: data._events ? deepCopy(data._events) : [],
        _waypoints: data._waypoints ? deepCopy(data._waypoints) : [],
    };
    if (data._customData) {
        difficultyData._customData = deepCopy(data._customData);
    }
    if (data._specialEventsKeywordFilters) {
        difficultyData._specialEventsKeywordFilters = data._specialEventsKeywordFilters;
    }
    return parseDifficultyV2(difficultyData);
};

export const difficulty = (data: Partial<IDifficultyDataV3> = {}): DifficultyDataV3 => {
    const difficultyData: IDifficultyDataV3 = {
        version: '3.0.0',
        bpmEvents: data.bpmEvents ? deepCopy(data.bpmEvents) : [],
        rotationEvents: data.rotationEvents ? deepCopy(data.rotationEvents) : [],
        colorNotes: data.colorNotes ? deepCopy(data.colorNotes) : [],
        bombNotes: data.bombNotes ? deepCopy(data.bombNotes) : [],
        obstacles: data.obstacles ? deepCopy(data.obstacles) : [],
        sliders: data.sliders ? deepCopy(data.sliders) : [],
        burstSliders: data.burstSliders ? deepCopy(data.burstSliders) : [],
        waypoints: data.waypoints ? deepCopy(data.waypoints) : [],
        basicBeatmapEvents: data.basicBeatmapEvents
            ? deepCopy(data.basicBeatmapEvents)
            : [],
        colorBoostBeatmapEvents: data.colorBoostBeatmapEvents
            ? deepCopy(data.colorBoostBeatmapEvents)
            : [],
        lightColorEventBoxGroups: data.lightColorEventBoxGroups
            ? deepCopy(data.lightColorEventBoxGroups)
            : [],
        lightRotationEventBoxGroups: data.lightRotationEventBoxGroups
            ? deepCopy(data.lightRotationEventBoxGroups)
            : [],
        basicEventTypesWithKeywords: data.basicEventTypesWithKeywords
            ? deepCopy(data.basicEventTypesWithKeywords)
            : { d: [] },
        useNormalEventsAsCompatibleEvents:
            data.useNormalEventsAsCompatibleEvents ?? false,
    };
    return parseDifficultyV3(difficultyData);
};

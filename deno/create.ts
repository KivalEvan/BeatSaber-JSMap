import { InfoData } from './beatmap/types/info.ts';
import { DifficultyData } from './beatmap/types/difficulty.ts';
import { difficulty as parseDifficulty, info as parseInfo } from './beatmap/parse.ts';
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

export const difficulty = (data: Partial<DifficultyData> = {}): DifficultyData => {
    const difficultyData: DifficultyData = {
        _version: data._version ?? '2.5.0',
        _notes: data._notes ? deepCopy(data._notes) : [],
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
    return parseDifficulty(difficultyData);
};

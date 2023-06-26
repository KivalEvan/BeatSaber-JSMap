import { DataCheck } from '../../types/beatmap/shared/dataCheck.ts';
import { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { IEvent } from '../../types/beatmap/v2/event.ts';
import { INote } from '../../types/beatmap/v2/note.ts';
import { IObstacle } from '../../types/beatmap/v2/obstacle.ts';
import { IArc } from '../../types/beatmap/v2/arc.ts';
import { ISpecialEventsKeywordFilters } from '../../types/beatmap/v2/specialEventsKeywordFilters.ts';
import { ISpecialEventsKeywordFiltersKeywords } from '../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import { IWaypoint } from '../../types/beatmap/v2/waypoint.ts';
import { IInfo, IInfoSet, IInfoSetDifficulty } from '../../types/beatmap/v2/info.ts';

export const NoteDataCheck: { readonly [key in keyof INote]: DataCheck } = {
   _time: {
      type: 'number',
      version: '2.0.0',
   },
   _type: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _lineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _cutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ArcDataCheck: { readonly [key in keyof IArc]: DataCheck } = {
   _colorType: {
      type: 'number',
      version: '2.0.0',
   },
   _headTime: {
      type: 'number',
      version: '2.0.0',
   },
   _headLineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _headLineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _headCutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
   },
   _headControlPointLengthMultiplier: {
      type: 'number',
      version: '2.0.0',
   },
   _tailTime: {
      type: 'number',
      version: '2.0.0',
   },
   _tailLineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _tailLineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _tailCutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
   },
   _tailControlPointLengthMultiplier: {
      type: 'number',
      version: '2.0.0',
   },
   _sliderMidAnchorMode: {
      type: 'number',
      version: '2.0.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObstacleDataCheck: { readonly [key in keyof IObstacle]: DataCheck } = {
   _time: {
      type: 'number',
      version: '2.0.0',
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _type: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
   },
   _duration: {
      type: 'number',
      version: '2.0.0',
   },
   _width: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const EventDataCheck: { readonly [key in keyof IEvent]: DataCheck } = {
   _time: {
      type: 'number',
      version: '2.0.0',
   },
   _type: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _value: {
      type: 'number',
      int: true,
      version: '2.0.0',
   },
   _floatValue: {
      type: 'number',
      version: '2.5.0',
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const WaypointDataCheck: { readonly [key in keyof IWaypoint]: DataCheck } = {
   _time: {
      type: 'number',
      version: '2.2.0',
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.2.0',
   },
   _lineLayer: {
      type: 'number',
      int: true,
      version: '2.2.0',
   },
   _offsetDirection: {
      type: 'number',
      int: true,
      version: '2.2.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const SpecialEventsKeywordFiltersKeywordsDataCheck: {
   readonly [key in keyof ISpecialEventsKeywordFiltersKeywords]: DataCheck;
} = {
   _keyword: {
      type: 'string',
      version: '2.4.0',
   },
   _specialEvents: {
      type: 'number',
      int: true,
      array: true,
      version: '2.4.0',
   },
} as const;

export const SpecialEventsKeywordFiltersDataCheck: {
   readonly [key in keyof ISpecialEventsKeywordFilters]: DataCheck;
} = {
   _keywords: {
      type: 'array',
      version: '2.4.0',
      check: SpecialEventsKeywordFiltersKeywordsDataCheck,
   },
} as const;

export const DifficultyCheck: { readonly [key in keyof IDifficulty]: DataCheck } = {
   _version: {
      type: 'string',
      version: '2.0.0',
   },
   _notes: {
      type: 'array',
      version: '2.0.0',
      check: NoteDataCheck,
   },
   _sliders: {
      type: 'array',
      version: '2.6.0',
      check: ArcDataCheck,
   },
   _obstacles: {
      type: 'array',
      version: '2.0.0',
      check: ObstacleDataCheck,
   },
   _events: {
      type: 'array',
      version: '2.0.0',
      check: EventDataCheck,
   },
   _waypoints: {
      type: 'array',
      version: '2.2.0',
      check: WaypointDataCheck,
      optional: true,
   },
   _specialEventsKeywordFilters: {
      type: 'object',
      version: '2.4.0',
      check: SpecialEventsKeywordFiltersDataCheck,
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const InfoSetDifficultyCheck: { readonly [key in keyof IInfoSetDifficulty]: DataCheck } = {
   _difficulty: {
      type: 'string',
      version: '2.0.0',
   },
   _difficultyRank: {
      type: 'number',
      version: '2.0.0',
   },
   _beatmapFilename: {
      type: 'string',
      version: '2.0.0',
   },
   _noteJumpMovementSpeed: {
      type: 'number',
      version: '2.0.0',
   },
   _noteJumpStartBeatOffset: {
      type: 'number',
      version: '2.0.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
};

export const InfoSetCheck: { readonly [key in keyof IInfoSet]: DataCheck } = {
   _beatmapCharacteristicName: {
      type: 'string',
      version: '2.0.0',
   },
   _difficultyBeatmaps: {
      type: 'array',
      version: '2.0.0',
      check: InfoSetDifficultyCheck,
   },
};

export const InfoCheck: { readonly [key in keyof IInfo]: DataCheck } = {
   _version: {
      type: 'string',
      version: '2.0.0',
      optional: true,
   },
   _songName: {
      type: 'string',
      version: '2.0.0',
   },
   _songSubName: {
      type: 'string',
      version: '2.0.0',
   },
   _songAuthorName: {
      type: 'string',
      version: '2.0.0',
   },
   _levelAuthorName: {
      type: 'string',
      version: '2.0.0',
   },
   _beatsPerMinute: {
      type: 'number',
      version: '2.0.0',
   },
   _shuffle: {
      type: 'number',
      version: '2.0.0',
   },
   _shufflePeriod: {
      type: 'number',
      version: '2.0.0',
   },
   _previewStartTime: {
      type: 'number',
      version: '2.0.0',
   },
   _previewDuration: {
      type: 'number',
      version: '2.0.0',
   },
   _songFilename: {
      type: 'string',
      version: '2.0.0',
   },
   _coverImageFilename: {
      type: 'string',
      version: '2.0.0',
   },
   _environmentName: {
      type: 'string',
      version: '2.0.0',
   },
   _allDirectionsEnvironmentName: {
      type: 'string',
      version: '2.2.0',
      optional: true,
   },
   _songTimeOffset: {
      type: 'number',
      version: '2.0.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
   _difficultyBeatmapSets: {
      type: 'array',
      version: '2.0.0',
      check: InfoSetCheck,
   },
};

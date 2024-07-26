import type { ISchemaDeclaration } from '../../../types/beatmap/shared/schema.ts';
import type { IDifficulty } from '../../../types/beatmap/v2/difficulty.ts';
import type { IEvent } from '../../../types/beatmap/v2/event.ts';
import type { INote } from '../../../types/beatmap/v2/note.ts';
import type { IObstacle } from '../../../types/beatmap/v2/obstacle.ts';
import type { IArc } from '../../../types/beatmap/v2/arc.ts';
import type { ISpecialEventsKeywordFilters } from '../../../types/beatmap/v2/specialEventsKeywordFilters.ts';
import type { ISpecialEventsKeywordFiltersKeywords } from '../../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import type { IWaypoint } from '../../../types/beatmap/v2/waypoint.ts';
import type {
   IInfo,
   IInfoColorScheme,
   IInfoColorSchemeData,
   IInfoDifficulty,
   IInfoSet,
} from '../../../types/beatmap/v2/info.ts';
import type { IColor } from '../../../types/colors.ts';
import type { IBPMInfo, IBPMInfoRegion } from '../../../types/beatmap/v2/bpmInfo.ts';

export const NoteSchema: { readonly [key in keyof INote]: ISchemaDeclaration } = {
   _time: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _type: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
      optional: true,
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _lineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _cutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ArcSchema: { readonly [key in keyof IArc]: ISchemaDeclaration } = {
   _colorType: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _headTime: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _headLineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _headLineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _headCutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
      optional: true,
   },
   _headControlPointLengthMultiplier: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _tailTime: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _tailLineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _tailLineLayer: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _tailCutDirection: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
      optional: true,
   },
   _tailControlPointLengthMultiplier: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _sliderMidAnchorMode: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObstacleSchema: {
   readonly [key in keyof IObstacle]: ISchemaDeclaration;
} = {
   _time: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _type: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '2.0.0',
      optional: true,
   },
   _duration: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _width: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const EventSchema: { readonly [key in keyof IEvent]: ISchemaDeclaration } = {
   _time: {
      type: 'number',
      version: '2.0.0',
      optional: true,
   },
   _type: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
   },
   _value: {
      type: 'number',
      int: true,
      version: '2.0.0',
      optional: true,
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

export const WaypointSchema: {
   readonly [key in keyof IWaypoint]: ISchemaDeclaration;
} = {
   _time: {
      type: 'number',
      version: '2.2.0',
      optional: true,
   },
   _lineIndex: {
      type: 'number',
      int: true,
      version: '2.2.0',
      optional: true,
   },
   _lineLayer: {
      type: 'number',
      int: true,
      version: '2.2.0',
      optional: true,
   },
   _offsetDirection: {
      type: 'number',
      int: true,
      version: '2.2.0',
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const SpecialEventsKeywordFiltersKeywordsSchema: {
   readonly [key in keyof ISpecialEventsKeywordFiltersKeywords]: ISchemaDeclaration;
} = {
   _keyword: {
      type: 'string',
      version: '2.4.0',
      optional: true,
   },
   _specialEvents: {
      type: 'number',
      int: true,
      array: true,
      version: '2.4.0',
      optional: true,
   },
} as const;

export const SpecialEventsKeywordFiltersSchema: {
   readonly [key in keyof ISpecialEventsKeywordFilters]: ISchemaDeclaration;
} = {
   _keywords: {
      type: 'array',
      version: '2.4.0',
      check: SpecialEventsKeywordFiltersKeywordsSchema,
      optional: true,
   },
} as const;

export const DifficultySchema: {
   readonly [key in keyof IDifficulty]: ISchemaDeclaration;
} = {
   _version: {
      type: 'string',
      version: '2.0.0',
      optional: true,
   },
   _notes: {
      type: 'array',
      version: '2.0.0',
      check: NoteSchema,
      optional: true,
   },
   _sliders: {
      type: 'array',
      version: '2.6.0',
      check: ArcSchema,
      optional: true,
   },
   _obstacles: {
      type: 'array',
      version: '2.0.0',
      check: ObstacleSchema,
      optional: true,
   },
   _events: {
      type: 'array',
      version: '2.0.0',
      check: EventSchema,
      optional: true,
   },
   _waypoints: {
      type: 'array',
      version: '2.2.0',
      check: WaypointSchema,
      optional: true,
   },
   _specialEventsKeywordFilters: {
      type: 'object',
      version: '2.4.0',
      check: SpecialEventsKeywordFiltersSchema,
      optional: true,
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
} as const;

export const InfoSetDifficultySchema: {
   readonly [key in keyof IInfoDifficulty]: ISchemaDeclaration;
} = {
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
   _beatmapColorSchemeIdx: {
      type: 'number',
      version: '2.1.0',
   },
   _environmentNameIdx: {
      type: 'number',
      version: '2.1.0',
   },
   _customData: {
      type: 'object',
      version: '2.0.0',
      check: {},
      optional: true,
   },
};

export const InfoSetSchema: { readonly [key in keyof IInfoSet]: ISchemaDeclaration } = {
   _beatmapCharacteristicName: {
      type: 'string',
      version: '2.0.0',
   },
   _difficultyBeatmaps: {
      type: 'array',
      version: '2.0.0',
      check: InfoSetDifficultySchema,
   },
};

export const ColorObjectSchema: {
   readonly [key in keyof IColor]: ISchemaDeclaration;
} = {
   r: {
      type: 'number',
      version: '2.1.0',
   },
   g: {
      type: 'number',
      version: '2.1.0',
   },
   b: {
      type: 'number',
      version: '2.1.0',
   },
   a: {
      type: 'number',
      version: '2.1.0',
   },
};

export const InfoColorSchemeDataSchema: {
   readonly [key in keyof IInfoColorSchemeData]: ISchemaDeclaration;
} = {
   colorSchemeId: {
      type: 'string',
      version: '2.1.0',
   },
   saberAColor: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   saberBColor: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   environmentColor0: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   environmentColor1: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   obstaclesColor: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   environmentColor0Boost: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
   environmentColor1Boost: {
      type: 'object',
      version: '2.1.0',
      check: ColorObjectSchema,
   },
};

export const InfoColorSchemeSchema: {
   readonly [key in keyof IInfoColorScheme]: ISchemaDeclaration;
} = {
   useOverride: {
      type: 'boolean',
      version: '2.1.0',
   },
   colorScheme: {
      type: 'object',
      version: '2.1.0',
      check: InfoColorSchemeDataSchema,
   },
};

export const InfoSchema: { readonly [key in keyof IInfo]: ISchemaDeclaration } = {
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
   _songTimeOffset: {
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
      version: '2.0.0',
      optional: true,
   },
   _environmentNames: {
      type: 'string',
      version: '2.1.0',
      array: true,
   },
   _colorSchemes: {
      type: 'array',
      version: '2.1.0',
      check: InfoColorSchemeSchema,
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
      check: InfoSetSchema,
   },
};

export const BPMInfoRegionSchema: { readonly [key in keyof IBPMInfoRegion]: ISchemaDeclaration } = {
   _startSampleIndex: {
      type: 'number',
      version: '2.0.0',
      int: true,
      unsigned: true,
   },
   _endSampleIndex: {
      type: 'number',
      version: '2.0.0',
      int: true,
      unsigned: true,
   },
   _startBeat: {
      type: 'number',
      version: '2.0.0',
   },
   _endBeat: {
      type: 'number',
      version: '2.0.0',
   },
};

export const BPMInfoSchema: { readonly [key in keyof IBPMInfo]: ISchemaDeclaration } = {
   _version: {
      type: 'string',
      version: '2.0.0',
   },
   _songSampleCount: {
      type: 'number',
      version: '2.0.0',
      int: true,
      unsigned: true,
   },
   _songFrequency: {
      type: 'number',
      version: '2.0.0',
      int: true,
      unsigned: true,
   },
   _regions: {
      type: 'object',
      version: '2.0.0',
      check: BPMInfoRegionSchema,
      array: true,
   },
};

import type { ISchemaDeclaration } from '../../../types/beatmap/shared/schema.ts';
import type { IArc } from '../../../types/beatmap/v4/arc.ts';
import type { IAudio, IAudioBPM, IAudioLUFS } from '../../../types/beatmap/v4/audioData.ts';
import type { IBasicEvent } from '../../../types/beatmap/v4/basicEvent.ts';
import type { IBombNote } from '../../../types/beatmap/v4/bombNote.ts';
import type { IChain } from '../../../types/beatmap/v4/chain.ts';
import type { IColorBoostEvent } from '../../../types/beatmap/v4/colorBoostEvent.ts';
import type { IColorNote } from '../../../types/beatmap/v4/colorNote.ts';
import type { IDifficulty } from '../../../types/beatmap/v4/difficulty.ts';
import type { IEventBox } from '../../../types/beatmap/v4/eventBox.ts';
import type { IEventBoxGroup } from '../../../types/beatmap/v4/eventBoxGroup.ts';
import type { IFxEventBox } from '../../../types/beatmap/v4/fxEventBox.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v4/fxEventFloat.ts';
import type { IIndexFilter } from '../../../types/beatmap/v4/indexFilter.ts';
import type {
   IInfo,
   IInfoAudio,
   IInfoBeatmapAuthors,
   IInfoColorScheme,
   IInfoDifficulty,
   IInfoSong,
} from '../../../types/beatmap/v4/info.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v4/lightColorEvent.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v4/lightColorEventBox.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v4/lightRotationEvent.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v4/lightRotationEventBox.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v4/lightTranslationEvent.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v4/lightTranslationEventBox.ts';
import type { ILightshow } from '../../../types/beatmap/v4/lightshow.ts';
import type {
   IObject,
   IObjectArc,
   IObjectChain,
   IObjectLane,
} from '../../../types/beatmap/v4/object.ts';
import type { IObstacle } from '../../../types/beatmap/v4/obstacle.ts';
import type { ISpawnRotation } from '../../../types/beatmap/v4/spawnRotation.ts';
import type { IWaypoint } from '../../../types/beatmap/v4/waypoint.ts';
import { BasicEventTypesWithKeywordsSchema } from '../v3/declaration.ts';

export const ObjectSchema: { readonly [key in keyof IObject]: ISchemaDeclaration } = {
   b: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObjectLaneSchema: {
   readonly [key in keyof IObjectLane]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObjectChainSchema: {
   readonly [key in keyof IObjectChain]: ISchemaDeclaration;
} = {
   hb: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   hr: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   tb: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   tr: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   ci: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const ObjectArcSchema: {
   readonly [key in keyof IObjectArc]: ISchemaDeclaration;
} = {
   hb: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   hi: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   hr: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   tb: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   ti: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   tr: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   ai: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const ColorNoteSchema: {
   readonly [key in keyof IColorNote]: ISchemaDeclaration;
} = {
   x: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const BombNoteSchema: {
   readonly [key in keyof IBombNote]: ISchemaDeclaration;
} = {
   x: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const ObstacleSchema: {
   readonly [key in keyof IObstacle]: ISchemaDeclaration;
} = {
   x: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   w: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   h: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const ChainSchema: {
   readonly [key in keyof IChain]: ISchemaDeclaration;
} = {
   tx: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   ty: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const ArcSchema: {
   readonly [key in keyof IArc]: ISchemaDeclaration;
} = {
   m: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   tm: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
};

export const SpawnRotationSchema: {
   readonly [key in keyof ISpawnRotation]: ISchemaDeclaration;
} = {
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const DifficultySchema: {
   readonly [key in keyof IDifficulty]: ISchemaDeclaration;
} = {
   version: {
      type: 'string',
      version: '4.0.0',
   },
   colorNotes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectLaneSchema,
      optional: true,
   },
   bombNotes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectLaneSchema,
      optional: true,
   },
   obstacles: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectLaneSchema,
      optional: true,
   },
   chains: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectChainSchema,
      optional: true,
   },
   arcs: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectArcSchema,
      optional: true,
   },
   spawnRotations: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectArcSchema,
      optional: true,
   },
   colorNotesData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ColorNoteSchema,
      optional: true,
   },
   bombNotesData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: BombNoteSchema,
      optional: true,
   },
   obstaclesData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObstacleSchema,
      optional: true,
   },
   chainsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ChainSchema,
      optional: true,
   },
   arcsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ArcSchema,
      optional: true,
   },
   spawnRotationsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: SpawnRotationSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const WaypointSchema: {
   readonly [key in keyof IWaypoint]: ISchemaDeclaration;
} = {
   x: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BasicEventSchema: {
   readonly [key in keyof IBasicEvent]: ISchemaDeclaration;
} = {
   t: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ColorBoostEventSchema: {
   readonly [key in keyof IColorBoostEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const EventBoxSchema: {
   readonly [key in keyof IEventBox]: ISchemaDeclaration;
} = {
   e: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   l: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const EventBoxGroupSchema: {
   readonly [key in keyof IEventBoxGroup]: ISchemaDeclaration;
} = {
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   g: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: EventBoxSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const IndexFilterSchema: {
   readonly [key in keyof IIndexFilter]: ISchemaDeclaration;
} = {
   f: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   p: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   n: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   l: {
      type: 'number',
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventBoxSchema: {
   readonly [key in keyof ILightColorEventBox]: ISchemaDeclaration;
} = {
   w: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventSchema: {
   readonly [key in keyof ILightColorEvent]: ISchemaDeclaration;
} = {
   p: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   sb: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   sf: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventBoxSchema: {
   readonly [key in keyof ILightRotationEventBox]: ISchemaDeclaration;
} = {
   w: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventSchema: {
   readonly [key in keyof ILightRotationEvent]: ISchemaDeclaration;
} = {
   p: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   l: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventBoxSchema: {
   readonly [key in keyof ILightTranslationEventBox]: ISchemaDeclaration;
} = {
   w: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventSchema: {
   readonly [key in keyof ILightTranslationEvent]: ISchemaDeclaration;
} = {
   p: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const FXEventBoxSchema: {
   readonly [key in keyof IFxEventBox]: ISchemaDeclaration;
} = {
   w: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const FXEventFloatSchema: {
   readonly [key in keyof IFxEventFloat]: ISchemaDeclaration;
} = {
   p: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   v: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightshowSchema: {
   readonly [key in keyof ILightshow]: ISchemaDeclaration;
} = {
   version: {
      type: 'string',
      version: '4.0.0',
   },
   waypoints: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectLaneSchema,
      optional: true,
   },
   waypointsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: WaypointSchema,
      optional: true,
   },
   basicEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectSchema,
      optional: true,
   },
   basicEventsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: BasicEventSchema,
      optional: true,
   },
   colorBoostEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ObjectSchema,
      optional: true,
   },
   colorBoostEventsData: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: ColorBoostEventSchema,
      optional: true,
   },
   eventBoxGroups: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: EventBoxGroupSchema,
      optional: true,
   },
   indexFilters: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: IndexFilterSchema,
      optional: true,
   },
   lightColorEventBoxes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightColorEventBoxSchema,
      optional: true,
   },
   lightColorEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightColorEventSchema,
      optional: true,
   },
   lightRotationEventBoxes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightRotationEventBoxSchema,
      optional: true,
   },
   lightRotationEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightRotationEventSchema,
      optional: true,
   },
   lightTranslationEventBoxes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightTranslationEventBoxSchema,
      optional: true,
   },
   lightTranslationEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: LightTranslationEventSchema,
      optional: true,
   },
   fxEventBoxes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: FXEventBoxSchema,
      optional: true,
   },
   floatFxEvents: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: FXEventFloatSchema,
      optional: true,
   },
   basicEventTypesWithKeywords: {
      type: 'object',
      version: '4.0.0',
      check: BasicEventTypesWithKeywordsSchema,
   },
   useNormalEventsAsCompatibleEvents: {
      type: 'boolean',
      version: '4.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const InfoSongSchema: {
   readonly [key in keyof IInfoSong]: ISchemaDeclaration;
} = {
   title: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   subTitle: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   author: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
} as const;

export const InfoAudioSchema: {
   readonly [key in keyof IInfoAudio]: ISchemaDeclaration;
} = {
   songFilename: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   songDuration: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   audioDataFilename: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   bpm: {
      type: 'number',
      version: '4.0.0',
   },
   lufs: {
      type: 'number',
      version: '4.0.0',
   },
   previewStartTime: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   previewDuration: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
} as const;

export const InfoColorSchemeSchema: {
   readonly [key in keyof IInfoColorScheme]: ISchemaDeclaration;
} = {
   colorSchemeName: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   saberAColor: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   saberBColor: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   obstaclesColor: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColor0: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColor1: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColorW: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColor0Boost: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColor1Boost: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentColorWBoost: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
} as const;

export const InfoBeatmapAuthorsSchema: {
   readonly [key in keyof IInfoBeatmapAuthors]: ISchemaDeclaration;
} = {
   mappers: {
      type: 'string',
      array: true,
      version: '4.0.0',
   },
   lighters: {
      type: 'string',
      array: true,
      version: '4.0.0',
   },
} as const;

export const InfoDifficultySchema: {
   readonly [key in keyof IInfoDifficulty]: ISchemaDeclaration;
} = {
   characteristic: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   difficulty: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   beatmapAuthors: {
      type: 'object',
      version: '4.0.0',
      check: InfoBeatmapAuthorsSchema,
   },
   environmentNameIdx: {
      type: 'number',
      int: true,
      unsigned: true,
      version: '4.0.0',
      optional: true,
   },
   beatmapColorSchemeIdx: {
      type: 'number',
      int: true,
      version: '4.0.0',
      optional: true,
   },
   noteJumpMovementSpeed: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   noteJumpStartBeatOffset: {
      type: 'number',
      version: '4.0.0',
      optional: true,
   },
   lightshowDataFilename: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   beatmapDataFilename: {
      type: 'string',
      version: '4.0.0',
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const InfoSchema: { readonly [key in keyof IInfo]: ISchemaDeclaration } = {
   version: {
      type: 'string',
      version: '4.0.0',
   },
   song: {
      type: 'object',
      version: '4.0.0',
      check: InfoSongSchema,
   },
   audio: {
      type: 'object',
      version: '4.0.0',
      check: InfoAudioSchema,
   },
   songPreviewFilename: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   coverImageFilename: {
      type: 'string',
      version: '4.0.0',
      optional: true,
   },
   environmentNames: {
      type: 'string',
      array: true,
      version: '4.0.0',
   },
   colorSchemes: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: InfoColorSchemeSchema,
   },
   difficultyBeatmaps: {
      type: 'object',
      array: true,
      version: '4.0.0',
      check: InfoDifficultySchema,
   },
   customData: {
      type: 'object',
      version: '4.0.0',
      check: {},
      optional: true,
   },
} as const;

export const AudioDataBPMSchema: {
   readonly [key in keyof IAudioBPM]: ISchemaDeclaration;
} = {
   si: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   ei: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   sb: {
      type: 'number',
      version: '4.0.0',
   },
   eb: {
      type: 'number',
      version: '4.0.0',
   },
};

export const AudioDataLUFSSchema: {
   readonly [key in keyof IAudioLUFS]: ISchemaDeclaration;
} = {
   si: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   ei: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   l: {
      type: 'number',
      version: '4.0.0',
   },
};

export const AudioSchema: { readonly [key in keyof IAudio]: ISchemaDeclaration } = {
   version: {
      type: 'string',
      version: '4.0.0',
   },
   songChecksum: {
      type: 'string',
      version: '4.0.0',
   },
   songSampleCount: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   songFrequency: {
      type: 'number',
      version: '4.0.0',
      int: true,
      unsigned: true,
   },
   bpmData: {
      type: 'object',
      version: '4.0.0',
      check: AudioDataBPMSchema,
      array: true,
   },
   lufsData: {
      type: 'object',
      version: '4.0.0',
      check: AudioDataLUFSSchema,
      array: true,
   },
};

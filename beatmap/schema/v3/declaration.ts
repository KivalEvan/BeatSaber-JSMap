import type { ISchemaDeclaration } from '../../../types/beatmap/shared/schema.ts';
import type { IBasicEvent } from '../../../types/beatmap/v3/basicEvent.ts';
import type { IBasicEventTypesForKeywords } from '../../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import type { IBasicEventTypesWithKeywords } from '../../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import type { IBombNote } from '../../../types/beatmap/v3/bombNote.ts';
import type { IBPMEvent } from '../../../types/beatmap/v3/bpmEvent.ts';
import type { IChain } from '../../../types/beatmap/v3/chain.ts';
import type { IColorBoostEvent } from '../../../types/beatmap/v3/colorBoostEvent.ts';
import type { IColorNote } from '../../../types/beatmap/v3/colorNote.ts';
import type { IDifficulty } from '../../../types/beatmap/v3/difficulty.ts';
import type { IIndexFilter } from '../../../types/beatmap/v3/indexFilter.ts';
import type { ILightColorEvent } from '../../../types/beatmap/v3/lightColorEvent.ts';
import type { ILightColorEventBox } from '../../../types/beatmap/v3/lightColorEventBox.ts';
import type { ILightColorEventBoxGroup } from '../../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import type { ILightRotationEvent } from '../../../types/beatmap/v3/lightRotationEvent.ts';
import type { ILightRotationEventBox } from '../../../types/beatmap/v3/lightRotationEventBox.ts';
import type { ILightRotationEventBoxGroup } from '../../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import type { ILightshow } from '../../../types/beatmap/v3/lightshow.ts';
import type { ILightTranslationEvent } from '../../../types/beatmap/v3/lightTranslationEvent.ts';
import type { ILightTranslationEventBox } from '../../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { ILightTranslationEventBoxGroup } from '../../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import type { IObstacle } from '../../../types/beatmap/v3/obstacle.ts';
import type { IRotationEvent } from '../../../types/beatmap/v3/rotationEvent.ts';
import type { IArc } from '../../../types/beatmap/v3/arc.ts';
import type { IWaypoint } from '../../../types/beatmap/v3/waypoint.ts';
import type { IFxEventBox } from '../../../types/beatmap/v3/fxEventBox.ts';
import type { IFxEventBoxGroup } from '../../../types/beatmap/v3/fxEventBoxGroup.ts';
import type { IFxEventsCollection } from '../../../types/beatmap/v3/fxEventsCollection.ts';
import type { IFxEventFloat } from '../../../types/beatmap/v3/fxEventFloat.ts';
import type { IFxEventInt } from '../../../types/beatmap/v3/fxEventInt.ts';

export const ColorNoteSchema: {
   readonly [key in keyof IColorNote]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BombSchema: { readonly [key in keyof IBombNote]: ISchemaDeclaration } = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ArcSchema: { readonly [key in keyof IArc]: ISchemaDeclaration } = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   mu: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   tb: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   tx: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   ty: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   tc: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   tmu: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   m: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ChainSchema: { readonly [key in keyof IChain]: ISchemaDeclaration } = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   tb: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   tx: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   ty: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   sc: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObstacleSchema: {
   readonly [key in keyof IObstacle]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   w: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   h: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BasicEventSchema: {
   readonly [key in keyof IBasicEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   et: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BPMChangeEventSchema: {
   readonly [key in keyof IBPMEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   m: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const RotationEventSchema: {
   readonly [key in keyof IRotationEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ColorBoostEventSchema: {
   readonly [key in keyof IColorBoostEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   o: {
      type: 'boolean',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
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
      version: '3.0.0',
      optional: true,
   },
   p: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '3.1.0',
      optional: true,
   },
   l: {
      type: 'number',
      version: '3.1.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.1.0',
      optional: true,
   },
   n: {
      type: 'number',
      int: true,
      version: '3.1.0',
      optional: true,
   },
   s: {
      type: 'number',
      int: true,
      version: '3.1.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorBaseSchema: {
   readonly [key in keyof ILightColorEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   f: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   sb: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   sf: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventBoxSchema: {
   readonly [key in keyof ILightColorEventBox]: ISchemaDeclaration;
} = {
   f: {
      type: 'object',
      version: '3.0.0',
      check: IndexFilterSchema,
      optional: true,
   },
   w: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightColorBaseSchema,
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventBoxGroupSchema: {
   readonly [key in keyof ILightColorEventBoxGroup]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   g: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightColorEventBoxSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationBaseSchema: {
   readonly [key in keyof ILightRotationEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   p: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   l: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   r: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   o: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventBoxSchema: {
   readonly [key in keyof ILightRotationEventBox]: ISchemaDeclaration;
} = {
   f: {
      type: 'object',
      version: '3.0.0',
      check: IndexFilterSchema,
      optional: true,
   },
   w: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   l: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationBaseSchema,
      optional: true,
   },
   r: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventBoxGroupSchema: {
   readonly [key in keyof ILightRotationEventBoxGroup]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   g: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationEventBoxSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationBaseSchema: {
   readonly [key in keyof ILightTranslationEvent]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.2.0',
      optional: true,
   },
   p: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   t: {
      type: 'number',
      version: '3.2.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventBoxSchema: {
   readonly [key in keyof ILightTranslationEventBox]: ISchemaDeclaration;
} = {
   f: {
      type: 'object',
      version: '3.2.0',
      check: IndexFilterSchema,
      optional: true,
   },
   w: {
      type: 'number',
      version: '3.2.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '3.2.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   a: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   l: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationBaseSchema,
      optional: true,
   },
   r: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventBoxGroupSchema: {
   readonly [key in keyof ILightTranslationEventBoxGroup]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.2.0',
      optional: true,
   },
   g: {
      type: 'number',
      int: true,
      version: '3.2.0',
      optional: true,
   },
   e: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationEventBoxSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.2.0',
      check: {},
      optional: true,
   },
} as const;

export const VfxEventBoxSchema: {
   readonly [key in keyof IFxEventBox]: ISchemaDeclaration;
} = {
   f: {
      type: 'object',
      version: '3.3.0',
      check: IndexFilterSchema,
      optional: true,
   },
   w: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   s: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   l: {
      type: 'number',
      int: true,
      array: true,
      version: '3.3.0',
      optional: true,
   },
   b: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const VfxEventBoxGroupSchema: {
   readonly [key in keyof IFxEventBoxGroup]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   g: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   e: {
      type: 'array',
      version: '3.3.0',
      check: VfxEventBoxSchema,
      optional: true,
   },
   t: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.3.0',
      check: {},
      optional: true,
   },
} as const;

export const BasicEventTypesForKeywordsSchema: {
   readonly [key in keyof IBasicEventTypesForKeywords]: ISchemaDeclaration;
} = {
   k: {
      type: 'string',
      version: '3.0.0',
      optional: true,
   },
   e: {
      type: 'number',
      int: true,
      array: true,
      version: '3.0.0',
      optional: true,
   },
} as const;

export const BasicEventTypesWithKeywordsSchema: {
   readonly [key in keyof IBasicEventTypesWithKeywords]: ISchemaDeclaration;
} = {
   d: {
      type: 'array',
      version: '3.0.0',
      check: BasicEventTypesForKeywordsSchema,
      optional: true,
   },
} as const;

export const FxEventFloatSchema: {
   readonly [key in keyof IFxEventFloat]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   i: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   p: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   v: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.3.0',
      check: {},
      optional: true,
   },
} as const;

export const FxEventIntSchema: {
   readonly [key in keyof IFxEventInt]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.3.0',
      optional: true,
   },
   p: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   v: {
      type: 'number',
      int: true,
      version: '3.3.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.3.0',
      check: {},
      optional: true,
   },
} as const;

export const FxEventsCollectionSchema: {
   readonly [key in keyof IFxEventsCollection]: ISchemaDeclaration;
} = {
   _fl: {
      type: 'array',
      version: '3.3.0',
      check: FxEventFloatSchema,
      optional: true,
   },
   _il: {
      type: 'array',
      version: '3.3.0',
      check: FxEventIntSchema,
      optional: true,
   },
} as const;

export const WaypointSchema: {
   readonly [key in keyof IWaypoint]: ISchemaDeclaration;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
      optional: true,
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const DifficultySchema: {
   readonly [key in keyof IDifficulty]: ISchemaDeclaration;
} = {
   version: {
      type: 'string',
      version: '3.0.0',
      optional: true,
   },
   bpmEvents: {
      type: 'array',
      version: '3.0.0',
      check: BPMChangeEventSchema,
      optional: true,
   },
   rotationEvents: {
      type: 'array',
      version: '3.0.0',
      check: RotationEventSchema,
      optional: true,
   },
   colorNotes: {
      type: 'array',
      version: '3.0.0',
      check: ColorNoteSchema,
      optional: true,
   },
   bombNotes: {
      type: 'array',
      version: '3.0.0',
      check: BombSchema,
      optional: true,
   },
   obstacles: {
      type: 'array',
      version: '3.0.0',
      check: ObstacleSchema,
      optional: true,
   },
   sliders: {
      type: 'array',
      version: '3.0.0',
      check: ArcSchema,
      optional: true,
   },
   burstSliders: {
      type: 'array',
      version: '3.0.0',
      check: ChainSchema,
      optional: true,
   },
   waypoints: {
      type: 'array',
      version: '3.0.0',
      check: WaypointSchema,
      optional: true,
   },
   basicBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: BasicEventSchema,
      optional: true,
   },
   colorBoostBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: ColorBoostEventSchema,
      optional: true,
   },
   lightColorEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightColorEventBoxGroupSchema,
      optional: true,
   },
   lightRotationEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationEventBoxGroupSchema,
      optional: true,
   },
   lightTranslationEventBoxGroups: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationEventBoxGroupSchema,
      optional: true,
   },
   vfxEventBoxGroups: {
      type: 'array',
      version: '3.3.0',
      check: VfxEventBoxGroupSchema,
      optional: true,
   },
   basicEventTypesWithKeywords: {
      type: 'object',
      version: '3.0.0',
      check: BasicEventTypesWithKeywordsSchema,
      optional: true,
   },
   _fxEventsCollection: {
      type: 'object',
      version: '3.3.0',
      check: FxEventsCollectionSchema,
      optional: true,
   },
   useNormalEventsAsCompatibleEvents: {
      type: 'boolean',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightshowSchema: {
   readonly [key in keyof ILightshow]: ISchemaDeclaration;
} = {
   basicBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: BasicEventSchema,
      optional: true,
   },
   colorBoostBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: ColorBoostEventSchema,
      optional: true,
   },
   lightColorEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightColorEventBoxGroupSchema,
      optional: true,
   },
   lightRotationEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationEventBoxGroupSchema,
      optional: true,
   },
   lightTranslationEventBoxGroups: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationEventBoxGroupSchema,
      optional: true,
   },
   vfxEventBoxGroups: {
      type: 'array',
      version: '3.3.0',
      check: VfxEventBoxGroupSchema,
      optional: true,
   },
   _fxEventsCollection: {
      type: 'object',
      version: '3.3.0',
      check: FxEventsCollectionSchema,
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

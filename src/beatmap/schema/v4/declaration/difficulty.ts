import {
   array,
   integer,
   minValue,
   number,
   object,
   type ObjectSchema as VObjectSchema,
   optional,
   picklist,
   pipe,
} from '@valibot/valibot';
import type {
   IArc,
   IBombNote,
   IChain,
   IColorNote,
   IDifficulty,
   INJSEvent,
   IObstacle,
   ISpawnRotation,
} from '../../../../types/beatmap/v4/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import {
   CustomDataSchema,
   EaseTypeSchema,
   ExecutionTimeSchema,
   NoteColorSchema,
   SliderMidAnchorModeSchema,
   VersionSchema,
} from '../../shared/declaration/mod.ts';
import { ObjectArcSchema, ObjectChainSchema, ObjectLaneSchema, ObjectSchema } from './common.ts';

/**
 * Schema declaration for v4 `Color Note`.
 */
export const ColorNoteSchema: VObjectSchema<
   InferObjectEntries<IColorNote>,
   undefined
> = object<InferObjectEntries<IColorNote>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   a: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   c: field(optional(NoteColorSchema), {
      version: '4.0.0',
   }),
   d: field(optional(pipe(number(), integer(), minValue(0))), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Bomb Note`.
 */
export const BombNoteSchema: VObjectSchema<
   InferObjectEntries<IBombNote>,
   undefined
> = object<InferObjectEntries<IBombNote>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Obstacle`.
 */
export const ObstacleSchema: VObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> = object<InferObjectEntries<IObstacle>>({
   x: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   y: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   d: field(optional(number()), {
      version: '4.0.0',
   }),
   w: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   h: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Chain`.
 */
export const ChainSchema: VObjectSchema<
   InferObjectEntries<IChain>,
   undefined
> = object<InferObjectEntries<IChain>>({
   tx: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   ty: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   c: field(optional(pipe(number(), integer())), {
      version: '4.0.0',
   }),
   s: field(optional(pipe(number())), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Arc`.
 */
export const ArcSchema: VObjectSchema<
   InferObjectEntries<IArc>,
   undefined
> = object<InferObjectEntries<IArc>>({
   m: field(optional(number()), {
      version: '4.0.0',
   }),
   tm: field(optional(number()), {
      version: '4.0.0',
   }),
   a: field(optional(SliderMidAnchorModeSchema), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Spawn Rotation`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export const SpawnRotationSchema: VObjectSchema<
   InferObjectEntries<ISpawnRotation>,
   undefined
> = object<InferObjectEntries<ISpawnRotation>>({
   e: field(optional(ExecutionTimeSchema), {
      version: '4.0.0',
   }),
   r: field(optional(number()), {
      version: '4.0.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `NJS Event`.
 */
export const NJSEventSchema: VObjectSchema<
   InferObjectEntries<INJSEvent>,
   undefined
> = object<InferObjectEntries<INJSEvent>>({
   d: field(optional(number()), {
      version: '4.1.0',
   }),
   p: field(optional(picklist([0, 1])), {
      version: '4.1.0',
   }),
   e: field(optional(EaseTypeSchema), {
      version: '4.1.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Difficulty`.
 */
export const DifficultySchema: VObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> = entity<InferObjectEntries<IDifficulty>>((x) => x.version, {
   version: field(mask<'4.0.0' | '4.1.0'>(VersionSchema), {
      version: '4.0.0',
   }),
   colorNotes: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   colorNotesData: field(optional(array(ColorNoteSchema)), {
      version: '4.0.0',
   }),
   bombNotes: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   bombNotesData: field(optional(array(BombNoteSchema)), {
      version: '4.0.0',
   }),
   obstacles: field(optional(array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   obstaclesData: field(optional(array(ObstacleSchema)), {
      version: '4.0.0',
   }),
   chains: field(optional(array(ObjectChainSchema)), {
      version: '4.0.0',
   }),
   chainsData: field(optional(array(ChainSchema)), {
      version: '4.0.0',
   }),
   arcs: field(optional(array(ObjectArcSchema)), {
      version: '4.0.0',
   }),
   arcsData: field(optional(array(ArcSchema)), {
      version: '4.0.0',
   }),
   spawnRotations: field(optional(array(ObjectSchema)), {
      version: '4.0.0',
   }),
   spawnRotationsData: field(optional(array(SpawnRotationSchema)), {
      version: '4.0.0',
   }),
   njsEvents: field(optional(array(ObjectSchema)), {
      version: '4.1.0',
   }),
   njsEventData: field(optional(array(NJSEventSchema)), {
      version: '4.1.0',
   }),
   customData: field(optional(CustomDataSchema)),
});

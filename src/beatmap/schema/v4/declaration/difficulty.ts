import { v } from '../../../../deps.ts';
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
export const ColorNoteSchema: v.ObjectSchema<
   InferObjectEntries<IColorNote>,
   undefined
> = v.object<InferObjectEntries<IColorNote>>({
   x: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   y: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   a: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   c: field(v.optional(NoteColorSchema), {
      version: '4.0.0',
   }),
   d: field(v.optional(v.pipe(v.number(), v.integer(), v.minValue(0))), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Bomb Note`.
 */
export const BombNoteSchema: v.ObjectSchema<
   InferObjectEntries<IBombNote>,
   undefined
> = v.object<InferObjectEntries<IBombNote>>({
   x: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   y: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Obstacle`.
 */
export const ObstacleSchema: v.ObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> = v.object<InferObjectEntries<IObstacle>>({
   x: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   y: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   d: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   w: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   h: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Chain`.
 */
export const ChainSchema: v.ObjectSchema<
   InferObjectEntries<IChain>,
   undefined
> = v.object<InferObjectEntries<IChain>>({
   tx: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   ty: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   c: field(v.optional(v.pipe(v.number(), v.integer())), {
      version: '4.0.0',
   }),
   s: field(v.optional(v.pipe(v.number())), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Arc`.
 */
export const ArcSchema: v.ObjectSchema<
   InferObjectEntries<IArc>,
   undefined
> = v.object<InferObjectEntries<IArc>>({
   m: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   tm: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   a: field(v.optional(SliderMidAnchorModeSchema), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Spawn Rotation`.
 *
 * @deprecated removed as of 1.39, convert to `r` in object lane
 */
export const SpawnRotationSchema: v.ObjectSchema<
   InferObjectEntries<ISpawnRotation>,
   undefined
> = v.object<InferObjectEntries<ISpawnRotation>>({
   e: field(v.optional(ExecutionTimeSchema), {
      version: '4.0.0',
   }),
   r: field(v.optional(v.number()), {
      version: '4.0.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `NJS Event`.
 */
export const NJSEventSchema: v.ObjectSchema<
   InferObjectEntries<INJSEvent>,
   undefined
> = v.object<InferObjectEntries<INJSEvent>>({
   d: field(v.optional(v.number()), {
      version: '4.1.0',
   }),
   p: field(v.optional(v.picklist([0, 1])), {
      version: '4.1.0',
   }),
   e: field(v.optional(EaseTypeSchema), {
      version: '4.1.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

/**
 * Schema declaration for v4 `Difficulty`.
 */
export const DifficultySchema: v.ObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> = entity<InferObjectEntries<IDifficulty>>((x) => x.version, {
   version: field(mask<'4.0.0' | '4.1.0'>(VersionSchema), {
      version: '4.0.0',
   }),
   colorNotes: field(v.optional(v.array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   colorNotesData: field(v.optional(v.array(ColorNoteSchema)), {
      version: '4.0.0',
   }),
   bombNotes: field(v.optional(v.array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   bombNotesData: field(v.optional(v.array(BombNoteSchema)), {
      version: '4.0.0',
   }),
   obstacles: field(v.optional(v.array(ObjectLaneSchema)), {
      version: '4.0.0',
   }),
   obstaclesData: field(v.optional(v.array(ObstacleSchema)), {
      version: '4.0.0',
   }),
   chains: field(v.optional(v.array(ObjectChainSchema)), {
      version: '4.0.0',
   }),
   chainsData: field(v.optional(v.array(ChainSchema)), {
      version: '4.0.0',
   }),
   arcs: field(v.optional(v.array(ObjectArcSchema)), {
      version: '4.0.0',
   }),
   arcsData: field(v.optional(v.array(ArcSchema)), {
      version: '4.0.0',
   }),
   spawnRotations: field(v.optional(v.array(ObjectSchema)), {
      version: '4.0.0',
   }),
   spawnRotationsData: field(v.optional(v.array(SpawnRotationSchema)), {
      version: '4.0.0',
   }),
   njsEvents: field(v.optional(v.array(ObjectSchema)), {
      version: '4.1.0',
   }),
   njsEventData: field(v.optional(v.array(NJSEventSchema)), {
      version: '4.1.0',
   }),
   customData: field(v.optional(CustomDataSchema)),
});

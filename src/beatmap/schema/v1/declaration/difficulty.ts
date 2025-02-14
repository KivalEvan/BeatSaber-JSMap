import { v } from '../../../../deps.ts';
import type { IDifficulty, IEvent, INote, IObstacle } from '../../../../types/beatmap/v1/mod.ts';
import type { IBookmark, IBPMChangeOld } from '../../../../types/beatmap/v2/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { NoteTypeSchema, ObstacleTypeSchema, VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v1 `Note`.
 */
export const NoteSchema: v.ObjectSchema<
   InferObjectEntries<INote>,
   undefined
> = v.object<InferObjectEntries<INote>>({
   _time: field(v.number(), {
      version: '1.5.0',
   }),
   _type: field(NoteTypeSchema, {
      version: '1.5.0',
   }),
   _lineIndex: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
   _lineLayer: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
   _cutDirection: field(v.pipe(v.number(), v.integer(), v.minValue(0)), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `Obstacle`.
 */
export const ObstacleSchema: v.ObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> = v.object<InferObjectEntries<IObstacle>>({
   _time: field(v.number(), {
      version: '1.5.0',
   }),
   _lineIndex: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
   _type: field(ObstacleTypeSchema, {
      version: '1.5.0',
   }),
   _duration: field(v.number(), {
      version: '1.5.0',
   }),
   _width: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `Event`.
 */
export const EventSchema: v.ObjectSchema<
   InferObjectEntries<IEvent>,
   undefined
> = v.object<InferObjectEntries<IEvent>>({
   _time: field(v.number(), {
      version: '1.5.0',
   }),
   _type: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
   _value: field(v.pipe(v.number(), v.integer()), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `BPM Change`.
 */
export const CustomBPMChangeOldSchema: v.ObjectSchema<
   InferObjectEntries<IBPMChangeOld>,
   undefined
> = v.object<InferObjectEntries<IBPMChangeOld>>({
   _time: field(v.number()),
   _bpm: field(v.number()),
   _BPM: field(v.never()),
   _beatsPerBar: field(v.number()),
   _metronomeOffset: field(v.number()),
});

/**
 * Schema declaration for v1 `Bookmark`.
 */
export const CustomBookmarkSchema: v.ObjectSchema<
   InferObjectEntries<Omit<IBookmark, '_color'>>,
   undefined
> = v.object<InferObjectEntries<Omit<IBookmark, '_color'>>>({
   _time: field(v.number()),
   _name: field(v.string()),
});

/**
 * Schema declaration for v1 `Difficulty`.
 */
export const DifficultySchema: v.ObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> = entity<InferObjectEntries<IDifficulty>>((x) => x._version, {
   _version: field(mask<'1.5.0'>(VersionSchema), {
      version: '1.5.0',
   }),
   _beatsPerMinute: field(v.number(), {
      version: '1.5.0',
   }),
   _beatsPerBar: field(v.number(), {
      version: '1.5.0',
   }),
   _shuffle: field(v.number(), {
      version: '1.5.0',
   }),
   _shufflePeriod: field(v.number(), {
      version: '1.5.0',
   }),
   _noteJumpSpeed: field(v.number(), {
      version: '1.5.0',
   }),
   _noteJumpStartBeatOffset: field(v.number(), {
      version: '1.5.0',
   }),
   _notes: field(v.array(NoteSchema), {
      version: '1.5.0',
   }),
   _obstacles: field(v.array(ObstacleSchema), {
      version: '1.5.0',
   }),
   _events: field(v.array(EventSchema), {
      version: '1.5.0',
   }),
   _time: field(v.optional(v.number())),
   _BPMChanges: field(v.optional(v.array(CustomBPMChangeOldSchema))),
   _bookmarks: field(v.optional(v.array(CustomBookmarkSchema))),
});

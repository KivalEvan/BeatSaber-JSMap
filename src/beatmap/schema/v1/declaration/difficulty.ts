import {
   array,
   integer,
   minValue,
   never,
   number,
   object,
   optional,
   pipe,
   string,
} from '@valibot/valibot';
import type { IDifficulty, IEvent, INote, IObstacle } from '../../../../types/beatmap/v1/mod.ts';
import type { IBookmark, IBPMChangeOld } from '../../../../types/beatmap/v2/mod.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { NoteTypeSchema, ObstacleTypeSchema, VersionSchema } from '../../shared/declaration/mod.ts';

/**
 * Schema declaration for v1 `Note`.
 */
export const NoteSchema = object<InferObjectEntries<INote>>({
   _time: field(number(), {
      version: '1.5.0',
   }),
   _type: field(NoteTypeSchema, {
      version: '1.5.0',
   }),
   _lineIndex: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
   _lineLayer: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
   _cutDirection: field(pipe(number(), integer(), minValue(0)), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `Obstacle`.
 */
export const ObstacleSchema = object<InferObjectEntries<IObstacle>>({
   _time: field(number(), {
      version: '1.5.0',
   }),
   _lineIndex: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
   _type: field(ObstacleTypeSchema, {
      version: '1.5.0',
   }),
   _duration: field(number(), {
      version: '1.5.0',
   }),
   _width: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `Event`.
 */
export const EventSchema = object<InferObjectEntries<IEvent>>({
   _time: field(number(), {
      version: '1.5.0',
   }),
   _type: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
   _value: field(pipe(number(), integer()), {
      version: '1.5.0',
   }),
});

/**
 * Schema declaration for v1 `BPMChangeOld`.
 */
export const BpmChangeOldSchema = object<InferObjectEntries<IBPMChangeOld>>({
   _time: field(number()),
   _bpm: field(number()),
   _BPM: field(never()),
   _beatsPerBar: field(number()),
   _metronomeOffset: field(number()),
});

/**
 * Schema declaration for v1 `Bookmark`.
 */
export const BookmarkSchema = object<InferObjectEntries<Omit<IBookmark, '_color'>>>({
   _time: field(number()),
   _name: field(string()),
});

/**
 * Schema declaration for v1 `Difficulty`.
 */
export const DifficultySchema = entity<
   InferObjectEntries<IDifficulty>
>((x) => x._version, {
   _version: field(mask(VersionSchema), {
      version: '1.5.0',
   }),
   _beatsPerMinute: field(number(), {
      version: '1.5.0',
   }),
   _beatsPerBar: field(number(), {
      version: '1.5.0',
   }),
   _shuffle: field(number(), {
      version: '1.5.0',
   }),
   _shufflePeriod: field(number(), {
      version: '1.5.0',
   }),
   _noteJumpSpeed: field(number(), {
      version: '1.5.0',
   }),
   _noteJumpStartBeatOffset: field(number(), {
      version: '1.5.0',
   }),
   _notes: field(array(NoteSchema), {
      version: '1.5.0',
   }),
   _obstacles: field(array(ObstacleSchema), {
      version: '1.5.0',
   }),
   _events: field(array(EventSchema), {
      version: '1.5.0',
   }),
   _time: field(optional(number())),
   _BPMChanges: field(optional(array(BpmChangeOldSchema))),
   _bookmarks: field(optional(array(BookmarkSchema))),
});

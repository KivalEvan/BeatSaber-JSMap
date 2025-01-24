import {
   array,
   boolean,
   integer,
   minValue,
   never,
   number,
   object,
   optional,
   picklist,
   pipe,
   string,
} from '@valibot/valibot';
import type {
   IDifficulty,
   IEvent,
   IInfo,
   IInfoDifficulty,
   INote,
   IObstacle,
} from '../../../types/beatmap/v1/mod.ts';
import type { IBookmark, IBPMChangeOld } from '../../../types/beatmap/v2/mod.ts';
import type { IColor, IContributor } from '../../../types/mod.ts';
import {
   CharacteristicNameSchema,
   DifficultyNameSchema,
   NoteTypeSchema,
   ObstacleTypeSchema,
   VersionSchema,
} from '../common/declaration.ts';
import { entity, field, type InferObjectEntries, mask } from '../helpers.ts';

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

/**
 * Schema declaration for v1 `Color`.
 */
export const ColorObjectSchema = object<InferObjectEntries<Omit<IColor, 'a'>>>({
   r: number(),
   g: number(),
   b: number(),
});

/**
 * Schema declaration for v1 `InfoDifficulty`.
 */
export const InfoDifficultySchema = object<InferObjectEntries<IInfoDifficulty>>({
   difficulty: field(DifficultyNameSchema, {
      version: '1.0.0',
   }),
   difficultyRank: field(picklist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), {
      version: '1.0.0',
   }),
   audioPath: field(string(), {
      version: '1.0.0',
   }),
   jsonPath: field(string(), {
      version: '1.0.0',
   }),
   characteristic: field(CharacteristicNameSchema, {
      version: '1.0.0',
   }),
   offset: field(optional(number())),
   oldOffset: field(optional(number())),
   chromaToggle: field(optional(string())),
   customColors: field(optional(boolean())),
   difficultyLabel: field(optional(string())),
   colorLeft: field(optional(ColorObjectSchema)),
   colorRight: field(optional(ColorObjectSchema)),
   envColorLeft: field(optional(ColorObjectSchema)),
   envColorRight: field(optional(ColorObjectSchema)),
   obstacleColor: field(optional(ColorObjectSchema)),
});

/** Schema declaration for `Contributor`. */
export const ContributorSchema = object<InferObjectEntries<IContributor>>({
   _role: field(string()),
   _name: field(string()),
   _iconPath: field(string()),
});

/**
 * Schema declaration for v1 `Info`.
 */
export const InfoSchema = entity<
   InferObjectEntries<IInfo>
>(() => '1.0.0', {
   songName: field(string(), {
      version: '1.0.0',
   }),
   songSubName: field(string(), {
      version: '1.0.0',
   }),
   authorName: field(string(), {
      version: '1.0.0',
   }),
   beatsPerMinute: field(number(), {
      version: '1.0.0',
   }),
   previewStartTime: field(number(), {
      version: '1.0.0',
   }),
   previewDuration: field(number(), {
      version: '1.0.0',
   }),
   coverImagePath: field(string(), {
      version: '1.0.0',
   }),
   environmentName: field(mask(string()), {
      version: '1.0.0',
   }),
   difficultyLevels: field(array(InfoDifficultySchema), {
      version: '1.0.0',
   }),
   oneSaber: field(boolean(), {
      version: '1.0.0',
   }),
   contributors: field(optional(array(ContributorSchema)), {
      version: '1.0.0',
   }),
   customEnvironment: field(optional(string()), {
      version: '1.0.0',
   }),
   customEnvironmentHash: field(optional(string()), {
      version: '1.0.0',
   }),
});

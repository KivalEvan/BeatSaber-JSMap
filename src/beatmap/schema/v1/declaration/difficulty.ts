import * as v from 'valibot';
import type { IDifficulty, IEvent, INote, IObstacle } from '../types/mod.ts';
import type { IBookmark } from '../../v2/types/custom/bookmark.ts';
import type { IBPMChangeOld } from '../../v2/types/custom/bpmChange.ts';
import { entity, field, type InferObjectEntries, mask } from '../../helpers.ts';
import { NoteTypeSchema, VersionSchema } from '../../shared/declaration/common.ts';

/** Schema declaration for v1 `Note`. */
export function NoteSchema(): v.ObjectSchema<
   InferObjectEntries<INote>,
   undefined
> {
   return v.object<InferObjectEntries<INote>>({
      _time: field(v.number(), {
         version: '1.5.0',
      }),
      _type: field(NoteTypeSchema(), {
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
}

/** Schema declaration for v1 `Obstacle`. */
export function ObstacleSchema(): v.ObjectSchema<
   InferObjectEntries<IObstacle>,
   undefined
> {
   return v.object<InferObjectEntries<IObstacle>>({
      _time: field(v.number(), {
         version: '1.5.0',
      }),
      _lineIndex: field(v.pipe(v.number(), v.integer()), {
         version: '1.5.0',
      }),
      _type: field(v.pipe(v.number(), v.integer()), {
         version: '1.5.0',
      }),
      _duration: field(v.number(), {
         version: '1.5.0',
      }),
      _width: field(v.pipe(v.number(), v.integer()), {
         version: '1.5.0',
      }),
   });
}

/** Schema declaration for v1 `Event`. */
export function EventSchema(): v.ObjectSchema<
   InferObjectEntries<IEvent>,
   undefined
> {
   return v.object<InferObjectEntries<IEvent>>({
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
}

/** Schema declaration for v1 `BPM Change`. */
export function CustomBPMChangeOldSchema(): v.ObjectSchema<
   InferObjectEntries<IBPMChangeOld>,
   undefined
> {
   return v.object<InferObjectEntries<IBPMChangeOld>>({
      _time: field(v.number()),
      _bpm: field(v.number()),
      _BPM: field(v.never()),
      _beatsPerBar: field(v.number()),
      _metronomeOffset: field(v.number()),
   });
}

/** Schema declaration for v1 `Bookmark`. */
export function CustomBookmarkSchema(): v.ObjectSchema<
   InferObjectEntries<Omit<IBookmark, '_color'>>,
   undefined
> {
   return v.object<InferObjectEntries<Omit<IBookmark, '_color'>>>({
      _time: field(v.number()),
      _name: field(v.string()),
   });
}

/** Schema declaration for v1 `Difficulty`. */
export function DifficultySchema(): v.ObjectSchema<
   InferObjectEntries<IDifficulty>,
   undefined
> {
   return entity<InferObjectEntries<IDifficulty>>((x) => x._version || '1.5.0', {
      _version: field(mask<'1.5.0'>(VersionSchema()), {
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
      _notes: field(v.array(NoteSchema()), {
         version: '1.5.0',
      }),
      _obstacles: field(v.array(ObstacleSchema()), {
         version: '1.5.0',
      }),
      _events: field(v.array(EventSchema()), {
         version: '1.5.0',
      }),
      _time: field(v.optional(v.number())),
      _BPMChanges: field(v.optional(v.array(CustomBPMChangeOldSchema()))),
      _bookmarks: field(v.optional(v.array(CustomBookmarkSchema()))),
   });
}

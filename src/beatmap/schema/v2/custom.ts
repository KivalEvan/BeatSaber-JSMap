import {
   type GenericSchema,
   looseObject,
   never,
   number,
   object,
   objectWithRest,
   optional,
   record,
   string,
   tuple,
   undefined,
   union,
} from '@valibot/valibot';
import type {
   IBookmark,
   IBPMChange,
   IBPMChangeOld,
   IColorScheme,
   IEditor,
   IEditorInfo,
} from '../../../types/beatmap/v2/mod.ts';
import type { IColor } from '../../../types/mod.ts';
import type { InferObjectEntries } from '../helpers.ts';

/** Schema declaration for v2 custom `Bookmark` */
export const CustomBookmarkSchema = object<InferObjectEntries<IBookmark>>({
   _time: number(),
   _name: string(),
   _color: optional(union([
      tuple([number(), number(), number()]),
      tuple([number(), number(), number(), number()]),
   ])),
});

/** Schema declaration for v2 custom `BPMChangeOld` */
export const CustomBpmChangeOldSchema = object<InferObjectEntries<IBPMChangeOld>>({
   _time: number(),
   _bpm: number(),
   _BPM: never(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});

/** Schema declaration for v2 custom `BPMChange` */
export const CustomBpmChangeSchema = object<InferObjectEntries<IBPMChange>>({
   _time: number(),
   _bpm: never(),
   _BPM: number(),
   _beatsPerBar: number(),
   _metronomeOffset: number(),
});

/** Schema declaration for v2 custom `Color` */
export const CustomColorObjectSchema = object<InferObjectEntries<IColor>>({
   r: number(),
   g: number(),
   b: number(),
   a: optional(number()),
});

/** Schema declaration for v2 custom `ColorScheme` */
export const CustomColorSchemeSchema = object<InferObjectEntries<IColorScheme>>({
   _colorLeft: optional(CustomColorObjectSchema),
   _colorRight: optional(CustomColorObjectSchema),
   _envColorLeft: optional(CustomColorObjectSchema),
   _envColorRight: optional(CustomColorObjectSchema),
   _envColorWhite: optional(CustomColorObjectSchema),
   _envColorLeftBoost: optional(CustomColorObjectSchema),
   _envColorRightBoost: optional(CustomColorObjectSchema),
   _envColorWhiteBoost: optional(CustomColorObjectSchema),
   _obstacleColor: optional(CustomColorObjectSchema),
});

/** Schema declaration for v2 custom `EditorInfo` */
export const CustomEditorInfoSchema = looseObject<InferObjectEntries<IEditorInfo>>({
   version: optional(string()),
});

/** Schema declaration for v2 custom `Editor` */
export const CustomEditorSchema = objectWithRest<
   InferObjectEntries<IEditor>,
   GenericSchema
>({
   _lastEditedBy: optional(string()),
}, record(string(), union([CustomEditorInfoSchema, string(), undefined()])));

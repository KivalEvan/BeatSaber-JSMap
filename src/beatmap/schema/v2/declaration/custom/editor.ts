import {
   type GenericSchema,
   looseObject,
   objectWithRest,
   optional,
   record,
   string,
   undefined,
   union,
} from '@valibot/valibot';
import type { IEditor, IEditorInfo } from '../../../../../types/beatmap/v2/custom/editor.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Editor Info`. */
export const CustomEditorInfoSchema = looseObject<InferObjectEntries<IEditorInfo>>({
   version: optional(string()),
});

/** Schema declaration for v2 custom `Editor`. */
export const CustomEditorSchema = objectWithRest<
   InferObjectEntries<IEditor>,
   GenericSchema
>({
   _lastEditedBy: optional(string()),
}, record(string(), union([CustomEditorInfoSchema, string(), undefined()])));

import {
   type GenericSchema,
   looseObject,
   type LooseObjectSchema as VLooseObjectSchema,
   objectWithRest,
   type ObjectWithRestSchema as VObjectWithRestSchema,
   optional,
   record,
   string,
   undefined,
   union,
} from '@valibot/valibot';
import type { IEditor, IEditorInfo } from '../../../../../types/beatmap/v2/custom/editor.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Editor Info`. */
export const CustomEditorInfoSchema: VLooseObjectSchema<
   InferObjectEntries<IEditorInfo>,
   undefined
> = looseObject<InferObjectEntries<IEditorInfo>>({
   version: optional(string()),
});

/** Schema declaration for v2 custom `Editor`. */
export const CustomEditorSchema: VObjectWithRestSchema<
   InferObjectEntries<IEditor>,
   GenericSchema,
   undefined
> = objectWithRest<InferObjectEntries<IEditor>, GenericSchema>(
   {
      _lastEditedBy: optional(string()),
   },
   record(string(), union([CustomEditorInfoSchema, string(), undefined()])),
);

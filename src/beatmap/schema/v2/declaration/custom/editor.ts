import * as v from 'valibot';
import type { IEditor, IEditorInfo } from '../../types/custom/editor.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for v2 custom `Editor Info`. */
export function CustomEditorInfoSchema(): v.LooseObjectSchema<
   InferObjectEntries<IEditorInfo>,
   undefined
> {
   return v.looseObject<InferObjectEntries<IEditorInfo>>({
      version: v.optional(v.string()),
   });
}

/** Schema declaration for v2 custom `Editor`. */
export function CustomEditorSchema(): v.ObjectWithRestSchema<
   InferObjectEntries<IEditor>,
   v.GenericSchema,
   undefined
> {
   return v.objectWithRest<InferObjectEntries<IEditor>, v.GenericSchema>(
      {
         _lastEditedBy: v.optional(v.string()),
      },
      v.record(
         v.string(),
         v.union([CustomEditorInfoSchema(), v.string(), v.undefined()]),
      ),
   );
}

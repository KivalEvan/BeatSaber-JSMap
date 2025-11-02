import * as v from 'valibot';
import type {
   ICustomCharacteristic,
   ICustomDataInfo,
   ICustomDataInfoBeatmap,
} from '../../types/custom/info.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CharacteristicNameSchema } from '../../../shared/declaration/common.ts';
import { CustomContributorSchema } from '../../../shared/declaration/custom/contributor.ts';
import { CustomEditorSchema } from '../../../v2/declaration/custom/editor.ts';
import { CustomColorSchemeSchema } from '../../../v2/declaration/custom/colorScheme.ts';

/** Schema declaration for v4 `Custom Characteristic`. */
export function CustomCharacteristicSchema(): v.ObjectSchema<
   InferObjectEntries<ICustomCharacteristic>,
   undefined
> {
   return v.object<InferObjectEntries<ICustomCharacteristic>>({
      characteristic: CharacteristicNameSchema(),
      label: v.string(),
      iconPath: v.optional(v.string()),
   });
}

/** Schema declaration for v4 `Info` custom data. */
export function CustomDataInfoSchema(): v.LooseObjectSchema<
   InferObjectEntries<ICustomDataInfo>,
   undefined
> {
   return v.looseObject<InferObjectEntries<ICustomDataInfo>>({
      _editors: v.optional(CustomEditorSchema()),
      _contributors: v.optional(v.array(CustomContributorSchema())),
      _customEnvironment: v.optional(v.string()),
      _customEnvironmentHash: v.optional(v.string()),
      _characteristics: v.optional(v.array(CustomCharacteristicSchema())),
   });
}

/** Schema declaration for v4 `Info Difficulty` custom data. */
export function CustomDataInfoBeatmapSchema(): v.LooseObjectSchema<
   InferObjectEntries<ICustomDataInfoBeatmap>,
   undefined
> {
   return v.looseObject<InferObjectEntries<ICustomDataInfoBeatmap>>({
      ...CustomColorSchemeSchema().entries,
      _difficultyLabel: v.optional(v.string()),
      _editorOffset: v.optional(v.number()),
      _editorOldOffset: v.optional(v.number()),
      _warnings: v.optional(v.array(v.string())),
      _information: v.optional(v.array(v.string())),
      _suggestions: v.optional(v.array(v.string())),
      _requirements: v.optional(v.array(v.string())),
      _tags: v.optional(v.array(v.string())),
      _oneSaber: v.optional(v.boolean()),
      _showRotationNoteSpawnLines: v.optional(v.boolean()),
   });
}

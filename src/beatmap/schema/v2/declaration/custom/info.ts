import { v } from '../../../../../deps.ts';
import type {
   ICustomDataInfo,
   ICustomDataInfoDifficulty,
   ICustomDataInfoSet,
} from '../../../../../types/beatmap/v2/custom/info.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CustomContributorSchema } from '../../../shared/declaration/custom/contributor.ts';
import { CustomColorSchemeSchema } from './colorScheme.ts';
import { CustomEditorSchema } from './editor.ts';

/** Schema declaration for v2 `Info` custom data. */
export const CustomDataInfoSchema: v.LooseObjectSchema<
   InferObjectEntries<ICustomDataInfo>,
   undefined
> = v.looseObject<InferObjectEntries<ICustomDataInfo>>({
   _editors: v.optional(CustomEditorSchema),
   _contributors: v.optional(v.array(CustomContributorSchema)),
   _customEnvironment: v.optional(v.string()),
   _customEnvironmentHash: v.optional(v.string()),
});

/** Schema declaration for v2 `Info Set` custom data. */
export const CustomDataInfoSetSchema: v.LooseObjectSchema<
   InferObjectEntries<ICustomDataInfoSet>,
   undefined
> = v.looseObject<InferObjectEntries<ICustomDataInfoSet>>({
   _characteristicLabel: v.optional(v.string()),
   _characteristicIconImageFilename: v.optional(v.string()),
});

/** Schema declaration for v2 `Info Set Difficulty` custom data. */
export const CustomDataInfoSetDifficultySchema: v.LooseObjectSchema<
   InferObjectEntries<ICustomDataInfoDifficulty>,
   undefined
> = v.looseObject<InferObjectEntries<ICustomDataInfoDifficulty>>({
   ...CustomColorSchemeSchema.entries,
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

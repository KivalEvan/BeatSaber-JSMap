import { array, boolean, looseObject, number, optional, string } from '@valibot/valibot';
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
export const CustomDataInfoSchema = looseObject<
   InferObjectEntries<ICustomDataInfo>
>({
   _editors: optional(CustomEditorSchema),
   _contributors: optional(array(CustomContributorSchema)),
   _customEnvironment: optional(string()),
   _customEnvironmentHash: optional(string()),
});

/** Schema declaration for v2 `Info Set` custom data. */
export const CustomDataInfoSetSchema = looseObject<
   InferObjectEntries<ICustomDataInfoSet>
>({
   _characteristicLabel: optional(string()),
   _characteristicIconImageFilename: optional(string()),
});

/** Schema declaration for v2 `Info Set Difficulty` custom data. */
export const CustomDataInfoSetDifficultySchema = looseObject<
   InferObjectEntries<ICustomDataInfoDifficulty>
>({
   ...CustomColorSchemeSchema.entries,
   _difficultyLabel: optional(string()),
   _editorOffset: optional(number()),
   _editorOldOffset: optional(number()),
   _warnings: optional(array(string())),
   _information: optional(array(string())),
   _suggestions: optional(array(string())),
   _requirements: optional(array(string())),
   _tags: optional(array(string())),
   _oneSaber: optional(boolean()),
   _showRotationNoteSpawnLines: optional(boolean()),
});

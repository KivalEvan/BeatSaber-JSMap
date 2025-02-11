import {
   array,
   boolean,
   looseObject,
   type LooseObjectSchema as VLooseObjectSchema,
   number,
   object,
   type ObjectSchema as VObjectSchema,
   optional,
   string,
} from '@valibot/valibot';
import type {
   ICustomCharacteristic,
   ICustomDataInfo,
   ICustomDataInfoBeatmap,
} from '../../../../../types/beatmap/v4/custom/info.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import {
   CharacteristicNameSchema,
   CustomContributorSchema,
} from '../../../shared/declaration/mod.ts';
import { CustomColorSchemeSchema, CustomEditorSchema } from '../../../v2/declaration/mod.ts';

/** Schema declaration for v4 `Custom Characteristic`. */
export const CustomCharacteristicSchema: VObjectSchema<
   InferObjectEntries<ICustomCharacteristic>,
   undefined
> = object<InferObjectEntries<ICustomCharacteristic>>({
   characteristic: CharacteristicNameSchema,
   label: string(),
   iconPath: optional(string()),
});

/** Schema declaration for v4 `Info` custom data. */
export const CustomDataInfoSchema: VLooseObjectSchema<
   InferObjectEntries<ICustomDataInfo>,
   undefined
> = looseObject<InferObjectEntries<ICustomDataInfo>>({
   _editors: optional(CustomEditorSchema),
   _contributors: optional(array(CustomContributorSchema)),
   _customEnvironment: optional(string()),
   _customEnvironmentHash: optional(string()),
   _characteristics: optional(array(CustomCharacteristicSchema)),
});

/** Schema declaration for v4 `Info Difficulty` custom data. */
export const CustomDataInfoBeatmapSchema: VLooseObjectSchema<
   InferObjectEntries<ICustomDataInfoBeatmap>,
   undefined
> = looseObject<InferObjectEntries<ICustomDataInfoBeatmap>>({
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

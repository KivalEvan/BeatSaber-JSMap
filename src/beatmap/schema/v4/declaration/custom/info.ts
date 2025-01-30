import { object, optional, string } from '@valibot/valibot';
import type { ICustomCharacteristic } from '../../../../../types/beatmap/v4/custom/info.ts';
import type { InferObjectEntries } from '../../../helpers.ts';
import { CharacteristicNameSchema } from '../../../shared/declaration/mod.ts';

export const CustomCharacteristicSchema = object<InferObjectEntries<ICustomCharacteristic>>({
   characteristic: CharacteristicNameSchema,
   label: string(),
   iconPath: optional(string()),
});

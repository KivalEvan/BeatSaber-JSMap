import { object, optional, string } from '@valibot/valibot';
import type { ICustomCharacteristic } from '../../../types/beatmap/v4/mod.ts';
import { CharacteristicNameSchema } from '../common/declaration.ts';
import type { InferObjectEntries } from '../helpers.ts';

export const CustomCharacteristicSchema = object<InferObjectEntries<ICustomCharacteristic>>({
   characteristic: CharacteristicNameSchema,
   label: string(),
   iconPath: optional(string()),
});

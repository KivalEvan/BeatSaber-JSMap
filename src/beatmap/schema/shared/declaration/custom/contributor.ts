import { object, type ObjectSchema, string } from '@valibot/valibot';
import type { IContributor } from '../../../../../types/beatmap/shared/custom/contributor.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for custom `Contributor`. */
export const CustomContributorSchema: ObjectSchema<
   InferObjectEntries<IContributor>,
   undefined
> = object<InferObjectEntries<IContributor>>({
   _role: string(),
   _name: string(),
   _iconPath: string(),
});

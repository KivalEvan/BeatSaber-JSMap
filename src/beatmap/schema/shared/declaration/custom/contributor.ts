import * as v from 'valibot';
import type { IContributor } from '../../types/custom/contributor.ts';
import type { InferObjectEntries } from '../../../helpers.ts';

/** Schema declaration for custom `Contributor`. */
export const CustomContributorSchema: v.ObjectSchema<
   InferObjectEntries<IContributor>,
   undefined
> = v.object<InferObjectEntries<IContributor>>({
   _role: v.string(),
   _name: v.string(),
   _iconPath: v.string(),
});

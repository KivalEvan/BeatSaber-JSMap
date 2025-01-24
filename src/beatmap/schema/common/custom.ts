import { object, string } from '@valibot/valibot';
import type { IContributor } from '../../../types/beatmap/shared/mod.ts';
import type { InferObjectEntries } from '../helpers.ts';

/** Schema declaration for shared custom `Contributor` */
export const ContributorSchema = object<InferObjectEntries<IContributor>>({
   _role: string(),
   _name: string(),
   _iconPath: string(),
});

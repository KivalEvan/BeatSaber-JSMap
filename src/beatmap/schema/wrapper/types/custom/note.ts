import type { ICustomDataNote as ICustomDataNoteV2 } from '../../../../schema/v2/types/custom/note.ts';
import type { ICustomDataNote as ICustomDataNoteV3 } from '../../../../schema/v3/types/custom/note.ts';

/**
 * Aggregated custom data for note.
 */
export type ICustomDataNote = ICustomDataNoteV3 & ICustomDataNoteV2;

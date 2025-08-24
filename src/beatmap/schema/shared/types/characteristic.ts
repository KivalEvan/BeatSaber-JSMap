import type { Member } from '../../../../types/utils.ts';

/** Available characteristic from both base game and modded. */
export const CharacteristicName = [
   'Standard',
   'NoArrows',
   'OneSaber',
   'Legacy',
   '360Degree',
   '90Degree',
   'Lightshow',
   'Lawless',
] as const;
export type CharacteristicName = Member<typeof CharacteristicName>;

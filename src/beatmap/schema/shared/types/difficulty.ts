import type { Member } from '../../../../types/utils.ts';

/** Available difficulty from base game. */
export const DifficultyName = [
   'Easy',
   'Normal',
   'Hard',
   'Expert',
   'ExpertPlus',
] as const;
export type DifficultyName = Member<typeof DifficultyName>;

/** Difficulty rename to human readable. */
export const DifficultyRank = [1, 3, 5, 7, 9] as const;
export type DifficultyRank = Member<typeof DifficultyRank>;

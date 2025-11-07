import type { CharacteristicName } from '../../shared/types/characteristic.ts';
import type { DifficultyName } from '../../shared/types/difficulty.ts';

export interface IBookmarkSet {
   name: string;
   characteristic: CharacteristicName | '';
   difficulty: DifficultyName | '';
   color: string;
   bookmarks: IBookmarkElement[];
}

export interface IBookmarkElement {
   beat: number;
   label: string;
   text: string;
}

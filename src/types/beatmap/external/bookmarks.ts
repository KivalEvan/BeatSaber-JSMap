import type { CharacteristicName } from '../shared/characteristic.ts';
import type { DifficultyName } from '../shared/difficulty.ts';

export interface IBookmarks {
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

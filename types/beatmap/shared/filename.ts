import { CharacteristicName } from './characteristic.ts';
import { DifficultyName } from './difficulty.ts';

export interface IFileInfo {
   filename: string;
}

export type GenericFilename =
   | `${DifficultyName}${CharacteristicName}.dat`
   | `${CharacteristicName}${DifficultyName}.dat`
   | `${DifficultyName}.dat`
   | 'Lightshow.dat';

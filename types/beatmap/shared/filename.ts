import type { CharacteristicName } from './characteristic.ts';
import type { DifficultyName } from './difficulty.ts';

export interface IFileInfo {
   filename: string;
}

export type GenericFilename =
   | `${DifficultyName}${CharacteristicName}.dat`
   | `${CharacteristicName}${DifficultyName}.dat`
   | `${DifficultyName}.dat`
   | `${CharacteristicName}${DifficultyName}.${'beatmap' | 'lightshow'}.dat`
   | `${DifficultyName}.${'beatmap' | 'lightshow'}.dat`
   | 'Common.lightshow.dat'
   | 'Lightshow.dat';

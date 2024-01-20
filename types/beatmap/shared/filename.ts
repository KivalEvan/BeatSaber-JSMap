import { CharacteristicName } from './characteristic.ts';
import { DifficultyName } from './difficulty.ts';

export type GenericFileName =
   | `${DifficultyName}${CharacteristicName}.dat`
   | `${CharacteristicName}${DifficultyName}.dat`
   | `${DifficultyName}.dat`
   | 'Lightshow.dat';

import type { CharacteristicName } from './characteristic.ts';
import type { DifficultyName } from './difficulty.ts';

// excluded here is official editor way of saving things, otherwise may be saved by 3rd party editor
type DifficultyNameExclude = Exclude<DifficultyName, 'Expert+'>;

/**
 * Generic filename for beatmap.
 */
export type GenericFilename =
   | 'Info.dat'
   | 'info.dat'
   | `${DifficultyNameExclude}${CharacteristicName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyNameExclude}.dat`
   | `${DifficultyNameExclude}.dat`
   | `${Exclude<
      CharacteristicName,
      'Lightshow' | 'Lawless'
   >}${DifficultyNameExclude}.${'beatmap' | 'lightshow'}.dat`
   | `${DifficultyNameExclude}.${'beatmap' | 'lightshow'}.dat`
   | 'Common.lightshow.dat'
   | 'Lightshow.dat';

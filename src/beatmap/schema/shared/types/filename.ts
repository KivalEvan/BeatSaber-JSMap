import type { CharacteristicName } from './characteristic.ts';
import type { DifficultyName } from './difficulty.ts';

// excluded here is official editor way of saving things, otherwise may be saved by 3rd party editor
type DifficultyNameExclude = Exclude<DifficultyName, 'Expert+'>;

/**
 * Generic filename for info.
 */
export type GenericInfoFilename =
   | 'Info.dat'
   | 'info.dat';

/**
 * Generic filename for audio data.
 */
export type GenericAudioDataFilename =
   | 'Audio.dat'
   | 'AudioData.dat'
   | 'BPMInfo.dat';

/**
 * Generic filename for beatmap.
 */
export type GenericBeatmapFilename =
   | `${DifficultyNameExclude}${CharacteristicName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyNameExclude}.dat`
   | `${DifficultyNameExclude}.dat`
   | `${Exclude<
      CharacteristicName,
      'Lightshow' | 'Lawless'
   >}${DifficultyNameExclude}.beatmap.dat`
   | `${DifficultyNameExclude}.beatmap'.dat`
   | 'Lightshow.dat';

/**
 * Generic filename for lightshow.
 */
export type GenericLightshowFilename =
   | `${DifficultyNameExclude}${CharacteristicName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyNameExclude}.dat`
   | `${DifficultyNameExclude}.dat`
   | `${Exclude<
      CharacteristicName,
      'Lightshow' | 'Lawless'
   >}${DifficultyNameExclude}.lightshow.dat`
   | `${DifficultyNameExclude}.lightshow.dat`
   | 'Common.lightshow.dat'
   | 'Lightshow.dat';

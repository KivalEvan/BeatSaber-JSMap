import type { CharacteristicName } from './characteristic.ts';
import type { DifficultyName } from './difficulty.ts';

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
   | `${DifficultyName}${CharacteristicName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyName}.dat`
   | `${DifficultyName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyName}.beatmap.dat`
   | `${DifficultyName}.beatmap'.dat`
   | 'Lightshow.dat';

/**
 * Generic filename for lightshow.
 */
export type GenericLightshowFilename =
   | `${DifficultyName}${CharacteristicName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyName}.dat`
   | `${DifficultyName}.dat`
   | `${Exclude<CharacteristicName, 'Lightshow' | 'Lawless'>}${DifficultyName}.lightshow.dat`
   | `${DifficultyName}.lightshow.dat`
   | 'Common.lightshow.dat'
   | 'Lightshow.dat';

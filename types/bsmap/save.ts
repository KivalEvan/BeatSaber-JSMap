// deno-lint-ignore-file no-explicit-any
import type { IDataCheckOption } from '../beatmap/shared/dataCheck.ts';
import type { IWrapAudio } from '../beatmap/wrapper/audioData.ts';
import type { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';
import type { IWrapInfo } from '../beatmap/wrapper/info.ts';
import type { IWrapLightshow } from '../beatmap/wrapper/lightshow.ts';
import type { IOptimizeOptionsAudioData, IOptimizeOptionsDifficulty } from './optimize.ts';
import type { IOptimizeOptionsInfo } from './optimize.ts';
import type { IOptimizeOptionsLightshow } from './optimize.ts';
import type { IOptimizeOptions } from './optimize.ts';
import type { IBaseOptions } from './options.ts';

export interface ISaveOptionsBase<T = Record<string, any>> extends IBaseOptions {
   /**
    * Prettify format JSON.
    *
    * @default 0
    */
   format?: number;
   /** Validate class object integrity when saving. */
   validate?: ISaveValidate;
   /** Optimization option when saving. */
   optimize?: IOptimizeOptions;
   /** Data check option when saving. */
   dataCheck?: IDataCheckOption;
   /**
    * Sort the objects in array with the correct order.
    *
    * @default true
    */
   sort?: boolean;
   /**
    * Write the output to file.
    *
    * @default true
    */
   write?: boolean;
   /**
    * Perform any preprocessing to object before transformed into JSON.
    *
    * **Warning**: This may result in side-effects.
    *
    * @default []
    */
   preprocess?: ((data: T) => T)[];
   /**
    * Perform any postprocessing after transformed into JSON.
    *
    * @default []
    */
   postprocess?: ((data: Record<string, any>) => Record<string, any>)[];
}

export interface ISaveValidate {
   /**
    * Enable class object validation check.
    *
    * @default true
    */
   enabled: boolean;
   /**
    * Allow class to reparse itself to contain valid class object.
    *
    * @default true
    */
   reparse?: boolean;
}

export interface ISaveOptionsInfo extends ISaveOptionsBase<IWrapInfo> {
   /**
    * Set info destination file path/name.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default 'Info.dat'
    */
   filePath?: string;
   optimize?: IOptimizeOptionsInfo;
}

export interface ISaveOptionsDifficulty extends ISaveOptionsBase<IWrapDifficulty> {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default ''
    */
   filePath?: string;
   optimize?: IOptimizeOptionsDifficulty;
}

export interface ISaveOptionsLightshow extends ISaveOptionsBase<IWrapLightshow> {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default ''
    */
   filePath?: string;
   optimize?: IOptimizeOptionsLightshow;
}

export interface ISaveOptionsAudioData extends ISaveOptionsBase<IWrapAudio> {
   /**
    * Set difficulty destination file path.
    *
    * **NOTE:** Overrides class file name.
    *
    * @default ''
    */
   filePath?: string;
   optimize?: IOptimizeOptionsAudioData;
}

export interface ISaveOptionsList extends ISaveOptionsDifficulty {}

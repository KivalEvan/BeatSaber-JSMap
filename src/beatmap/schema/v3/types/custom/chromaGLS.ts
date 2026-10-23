import type { ColorArray } from '../../../../../types/colors.ts';
import type { EaseType } from '../../../shared/types/constants.ts';
import type { ICustomDataBase } from '../../../shared/types/custom/customData.ts';

/** ChromaGLS spatial color distributions for color-event boxes and events. */
export interface IChromaGLSColorDistributions extends ICustomDataBase {
   /**
    * Ordered normal-color/alpha offsets, applied after the enclosing box's instructions.
    * Each string is `targets,offset,easing[,mode]`, for example `h,-0.7,L,l`.
    * Targets: `h`, `s`, `v`, `r`, `g`, `b`, and `f` (alpha). Offset is the finite
    * signed total across selected chunks (`c`, default) or selected lights (`l`).
    */
   colorDistributions?: string[];
   /**
    * Independent strobe-color/alpha offsets in the same format as `colorDistributions`.
    * Starts from `strobeColor`, or the undistributed normal color when omitted.
    */
   strobeColorDistributions?: string[];
}

/**
 * ChromaGLS custom data for an individual GLS light color event.
 *
 * @see https://github.com/EklipZgit/BeatSaberChromaGLS/blob/main/UsingChromaGLS.md
 */
export interface IChromaGLSLightColorEvent extends IChromaGLSColorDistributions {
   /**
    * Unclamped RGB or RGBA endpoint; omitted alpha is 1 and multiplies GLS brightness.
    * When omitted, the environment color is used.
    */
   color?: ColorArray;
   /**
    * Unclamped strobe RGB or RGBA endpoint; omitted alpha is 1 and multiplies `sb`.
    * When omitted, the undistributed normal color is used.
    */
   strobeColor?: ColorArray;
   /** Incoming transition easing, including brightness/alpha. Omitted uses native timing. */
   easing?: Exclude<EaseType, -1 | 0>;
   /** Incoming normal RGB easing. Omitted uses interval easing; 0 explicitly selects linear. */
   colorEasing?: Exclude<EaseType, -1>;
   /** Incoming strobe RGB easing. Omitted uses interval easing; 0 explicitly selects linear. */
   strobeColorEasing?: Exclude<EaseType, -1>;
   /** Incoming color interpolation model. Defaults to RGB; HSV uses the shortest hue path. */
   easingType?: 'HSV' | 'RGB';
   /**
    * Positive beats per strobe cycle, overriding native `f` at the event's starting BPM.
    * Zero or negative values leave native frequency unchanged.
    */
   strobeInterval?: number;
   /**
    * Fraction of a cycle spent in the normal phase (`sf: 0`), or reaching the strobe
    * endpoint (`sf: 1`). The runtime clamps to [0, 1]; omitted defaults to 0.5.
    * Interpolates in uneased time and does not enable strobing by itself.
    */
   strobePulseWidth?: number;
   /**
    * Active event's pulse fade curve when `sf: 1`; omitted defaults to InOutCubic (9).
    * Explicit 0 selects linear. Does not change the incoming transition easing.
    */
   strobeEasing?: Exclude<EaseType, -1>;
}

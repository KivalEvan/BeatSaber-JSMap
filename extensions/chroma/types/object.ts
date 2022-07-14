import { BombNote } from '../../../beatmap/v3/bombNote.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { BurstSlider } from '../../../beatmap/v3/burstSlider.ts';
import { Slider } from '../../../beatmap/v3/slider.ts';

export type IChromaNote = ColorNote | BombNote | BurstSlider | Slider;

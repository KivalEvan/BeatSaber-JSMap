import { BombNote } from '../../../beatmap/v3/bombNote.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { BurstSlider } from '../../../beatmap/v3/burstSlider.ts';
import { Slider } from '../../../beatmap/v3/slider.ts';
import { Obstacle } from '../../../beatmap/v3/obstacle.ts';

export type INEObject = ColorNote | Obstacle | BombNote | BurstSlider | Slider;

export type INENote = ColorNote | BombNote | BurstSlider | Slider;

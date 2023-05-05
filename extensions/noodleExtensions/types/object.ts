import { BombNote } from '../../../beatmap/v3/bombNote.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { Chain } from '../../../beatmap/v3/chain.ts';
import { Arc } from '../../../beatmap/v3/arc.ts';
import { Obstacle } from '../../../beatmap/v3/obstacle.ts';

export type INEObject = ColorNote | Obstacle | BombNote | Chain | Arc;

export type INENote = ColorNote | BombNote | Chain | Arc;

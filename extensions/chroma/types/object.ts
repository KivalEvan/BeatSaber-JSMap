import { BombNote } from '../../../beatmap/v3/bombNote.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { Chain } from '../../../beatmap/v3/chain.ts';
import { Arc } from '../../../beatmap/v3/arc.ts';

export type IChromaNote = ColorNote | BombNote | Chain | Arc;

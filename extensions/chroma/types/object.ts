import { IWrapBombNote } from '../../../types/beatmap/wrapper/bombNote.ts';
import { IWrapColorNote } from '../../../types/beatmap/wrapper/colorNote.ts';
import { IWrapChain } from '../../../types/beatmap/wrapper/chain.ts';
import { IWrapArc } from '../../../types/beatmap/wrapper/arc.ts';

export type IChromaNote = IWrapColorNote | IWrapBombNote | IWrapChain | IWrapArc;

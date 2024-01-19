import { IArc } from './arc.ts';
import { IBombNote } from './bombNote.ts';
import { IChain } from './chain.ts';
import { IColorNote } from './colorNote.ts';
import { IObjectArc, IObjectChain, IObjectLane } from './object.ts';
import { IObstacle } from './obstacle.ts';

export interface IDifficulty {
   colorNotes: IObjectLane[];
   bombNotes: IObjectLane[];
   obstacles: IObjectLane[];
   chains: IObjectChain[];
   arcs: IObjectArc[];
   colorNotesData: IColorNote[];
   bombNotesData: IBombNote[];
   obstaclesData: IObstacle[];
   chainsData: IChain[];
   arcsData: IArc[];
}

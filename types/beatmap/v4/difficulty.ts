import { IArc } from './arc.ts';
import { IBombNote } from './bombNote.ts';
import { IChain } from './chain.ts';
import { IColorNote } from './colorNote.ts';
import { IItem } from './item.ts';
import { IObject, IObjectArc, IObjectChain, IObjectLane } from './object.ts';
import { IObstacle } from './obstacle.ts';
import { ISpawnRotation } from './spawnRotation.ts';

export interface IDifficulty extends IItem {
   version: '4.0.0';
   colorNotes: IObjectLane[];
   bombNotes: IObjectLane[];
   obstacles: IObjectLane[];
   chains: IObjectChain[];
   arcs: IObjectArc[];
   spawnRotations: IObject[];
   colorNotesData: IColorNote[];
   bombNotesData: IBombNote[];
   obstaclesData: IObstacle[];
   chainsData: IChain[];
   arcsData: IArc[];
   spawnRotationsData: ISpawnRotation[];
}

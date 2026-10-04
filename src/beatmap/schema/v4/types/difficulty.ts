import type { IArc } from './arc.ts';
import type { IBombNote } from './bombNote.ts';
import type { IChain } from './chain.ts';
import type { IColorNote } from './colorNote.ts';
import type { IItem } from './item.ts';
import type { INJSEvent } from './njsEvent.ts';
import type { IObject, IObjectArc, IObjectChain, IObjectLane } from './object.ts';
import type { IObstacle } from './obstacle.ts';
import type { ISpawnRotation } from './spawnRotation.ts';

/**
 * Schema for v4 `Difficulty`.
 */
export interface IDifficulty extends IItem {
   version: '4.0.0' | '4.1.0';
   colorNotes?: IObjectLane[];
   colorNotesData?: IColorNote[];
   bombNotes?: IObjectLane[];
   bombNotesData?: IBombNote[];
   obstacles?: IObjectLane[];
   obstaclesData?: IObstacle[];
   chains?: IObjectChain[];
   chainsData?: IChain[];
   arcs?: IObjectArc[];
   arcsData?: IArc[];
   /** @deprecated Unsupported in v4. Kept only for optional cleanup of legacy data. */
   spawnRotations?: IObject[];
   /** @deprecated Unsupported in v4. Kept only for optional cleanup of legacy data. */
   spawnRotationsData?: ISpawnRotation[];
   njsEvents?: IObject[];
   njsEventData?: INJSEvent[];
}

import { IBookmark } from './bookmark.ts';
import { IBPMChange } from '../shared/bpm.ts';
import { IHeckCustomData } from './heck.ts';
import { IChromaCustomData, IChromaNote, IChromaObstacle } from './chroma.ts';
import { INENote, INEObstacle, INESlider } from './noodleExtensions.ts';
import { ICustomEvent } from './customEvent.ts';
import { ICustomDataBase } from '../shared/customData.ts';
import { IPointDefinition } from './pointDefinition.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { Slider } from '../../../beatmap/v3/slider.ts';
import { BurstSlider } from '../../../beatmap/v3/burstSlider.ts';
import { BombNote } from '../../../beatmap/v3/bombNote.ts';
import { Obstacle } from '../../../beatmap/v3/obstacle.ts';

/** Custom Data interface for difficulty file.
 * @extends CustomData
 * @extends CCustomData
 * @extends INECustomData
 */
export interface ICustomDataDifficulty extends ICustomDataBase, IHeckCustomData, IChromaCustomData {
    fakeColorNotes?: ColorNote[];
    fakeSliders?: Slider[];
    fakeBurstSliders?: BurstSlider[];
    fakeBombNotes?: BombNote[];
    fakeObstacles?: Obstacle[];
    customEvents?: ICustomEvent[];
    pointDefinitions?: IPointDefinition;
    time?: number;
    BPMChanges?: IBPMChange[];
    _bookmarks?: IBookmark[];
}

export type ICustomDataNote = ICustomDataBase & IChromaNote & INENote;
export type ICustomDataSlider = ICustomDataBase & IChromaNote & INESlider;
export type ICustomDataObstacle = ICustomDataBase & IChromaObstacle & INEObstacle;

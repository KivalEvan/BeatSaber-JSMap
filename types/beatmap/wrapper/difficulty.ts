import { IWrapBPMEvent } from './bpmEvent.ts';
import { IWrapRotationEvent } from './rotationEvent.ts';
import { IWrapColorNote } from './colorNote.ts';
import { IWrapBombNote } from './bombNote.ts';
import { IWrapObstacle } from './obstacle.ts';
import { IWrapSlider } from './slider.ts';
import { IWrapBurstSlider } from './burstSlider.ts';
import { IWrapWaypoint } from './waypoint.ts';
import { IWrapEvent } from './event.ts';
import { IWrapColorBoostEvent } from './colorBoostEvent.ts';
import { IWrapLightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { IWrapLightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { IWrapEventTypesWithKeywords } from './eventTypesWithKeywords.ts';
import { ICustomDataBase } from '../shared/customData.ts';
import { IWrapBaseItem } from './baseItem.ts';

export interface IDifficulty extends IWrapBaseItem {
    version: `3.${0 | 1}.0`;
    bpmEvents: IWrapBPMEvent[];
    rotationEvents: IWrapRotationEvent[];
    colorNotes: IWrapColorNote[];
    bombNotes: IWrapBombNote[];
    obstacles: IWrapObstacle[];
    sliders: IWrapSlider[];
    burstSliders: IWrapBurstSlider[];
    waypoints: IWrapWaypoint[];
    basicBeatmapEvents: IWrapEvent[];
    colorBoostBeatmapEvents: IWrapColorBoostEvent[];
    lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
    lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: IWrapEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents: boolean;
    customData?: ICustomDataBase;
}

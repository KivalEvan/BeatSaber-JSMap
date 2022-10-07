import { IBPMEvent } from './bpmEvent.ts';
import { IRotationEvent } from './rotationEvent.ts';
import { IColorNote } from './colorNote.ts';
import { IBombNote } from './bombNote.ts';
import { IObstacle } from './obstacle.ts';
import { ISlider } from './slider.ts';
import { IBurstSlider } from './burstSlider.ts';
import { IWaypoint } from './waypoint.ts';
import { IBasicEvent } from './basicEvent.ts';
import { IColorBoostEvent } from './colorBoostEvent.ts';
import { ILightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { ILightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { IBasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { ICustomDataDifficulty } from './customData.ts';

export interface IDifficulty {
    version: `3.${0 | 1}.0`;
    bpmEvents: IBPMEvent[];
    rotationEvents: IRotationEvent[];
    colorNotes: IColorNote[];
    bombNotes: IBombNote[];
    obstacles: IObstacle[];
    sliders: ISlider[];
    burstSliders: IBurstSlider[];
    waypoints: IWaypoint[];
    basicBeatmapEvents: IBasicEvent[];
    colorBoostBeatmapEvents: IColorBoostEvent[];
    lightColorEventBoxGroups: ILightColorEventBoxGroup[];
    lightRotationEventBoxGroups: ILightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: IBasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents: boolean;
    customData?: ICustomDataDifficulty;
}

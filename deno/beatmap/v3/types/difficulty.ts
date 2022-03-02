import { BPMChangeEvent } from './bpmChange.ts';
import { RotationEvent } from './rotationEvent.ts';
import { ColorNote } from './colorNote.ts';
import { BombNote } from './bombNote.ts';
import { Obstacle } from './obstacle.ts';
import { Slider } from './slider.ts';
import { BurstSlider } from './burstSlider.ts';
import { Waypoint } from './waypoint.ts';
import { BasicEvent } from './basicEvent.ts';
import { BoostEvent } from './boostEvent.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { CustomDataDifficulty } from './customData.ts';

export interface DifficultyData {
    version: '3.0.0';
    bpmEvents: BPMChangeEvent[];
    rotationEvents: RotationEvent[];
    colorNotes: ColorNote[];
    bombNotes: BombNote[];
    obstacles: Obstacle[];
    sliders: Slider[];
    burstSliders: BurstSlider[];
    waypoints: Waypoint[];
    basicBeatmapEvents: BasicEvent[];
    colorBoostBeatmapEvents: BoostEvent[];
    lightColorEventBoxGroups: LightColorEventBoxGroup[];
    lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
    basicEventTypesWithKeywords: BasicEventTypesWithKeywords;
    useNormalEventsAsCompatibleEvents: boolean;
    customData?: CustomDataDifficulty;
}

import { BasicEvent } from './basicEvent.ts';
import { BombNote } from './bombNote.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { BurstSlider } from './burstSlider.ts';
import { ColorNote } from './colorNote.ts';
import { Slider } from './slider.ts';

interface ContainerBase {
    type: string;
}

interface NoteContainerNote extends ContainerBase {
    type: 'note';
    data: ColorNote;
}

interface NoteContainerSlider extends ContainerBase {
    type: 'slider';
    data: Slider;
}

interface NoteContainerBurstSlider extends ContainerBase {
    type: 'burstSlider';
    data: BurstSlider;
}

interface NoteContainerBomb extends ContainerBase {
    type: 'bomb';
    data: BombNote;
}

export type NoteContainer = (
    | NoteContainerNote
    | NoteContainerSlider
    | NoteContainerBurstSlider
    | NoteContainerBomb
)[];

interface EventContainerBasic {
    type: 'basicEvent';
    data: BasicEvent;
}

interface EventContainerBoost {
    type: 'boost';
    data: ColorBoostEvent;
}

export type EventContainer = (EventContainerBasic | EventContainerBoost)[];

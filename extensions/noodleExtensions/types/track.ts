import { Note } from '../../../beatmap/v2/note.ts';
import { Obstacle as ObstacleV2 } from '../../../beatmap/v2/obstacle.ts';
import { ColorNote } from '../../../beatmap/v3/colorNote.ts';
import { Obstacle } from '../../../beatmap/v3/obstacle.ts';

export type INETrackObject = Note | ObstacleV2 | ColorNote | Obstacle;

export type INETrackOverload = {
    (objects: INETrackObject[], track: string): void;
    (objects: INETrackObject[], track: string, startTime: number, endTime: number): void;
    (objects: INETrackObject, track: string): void;
};

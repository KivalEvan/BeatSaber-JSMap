import { Note } from '../../../../beatmap/v2/note.ts';
import { Obstacle } from '../../../../beatmap/v2/obstacle.ts';
import { ColorNote } from '../../../../beatmap/v3/colorNote.ts';
import { Obstacle as ObstacleV3 } from '../../../../beatmap/v3/obstacle.ts';

export type INETrackObject = Note | Obstacle | ColorNote | ObstacleV3;

export type INETrackOverload = {
    (objects: INETrackObject[], track: string): void;
    (
        objects: INETrackObject[],
        track: string,
        startTime: number,
        endTime: number
    ): void;
    (objects: INETrackObject, track: string): void;
};

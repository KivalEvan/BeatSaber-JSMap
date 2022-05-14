import { INETrackObject, INETrackOverload } from './types/track.ts';

export const addTrack: INETrackOverload = (
    objects: INETrackObject | INETrackObject[],
    track: string,
    startTime?: number,
    endTime?: number
) => {
    if (!Array.isArray(objects)) {
        if (!objects.customData) {
            objects.customData = {};
        }

        if (!objects.customData._track) {
            objects.customData._track = track;
        } else if (Array.isArray(objects.customData._track)) {
            if (!objects.customData._track.includes(track)) {
                objects.customData._track.push(track);
            }
        } else if (objects.customData._track !== track) {
            objects.customData._track = [objects.customData._track, track];
        }
        return;
    }
    if (typeof startTime === 'number') {
        if (typeof endTime === 'number') {
            if (startTime > endTime) {
                throw new Error('Start time is larger than end time.');
            }
        }
    }
    objects
        .filter((obj) => {
            if (typeof startTime === 'number') {
                return obj.time >= startTime && obj.time <= endTime!;
            }
            return true;
        })
        .forEach((obj) => {
            addTrack(obj, track);
        });
};

export const removeTrack: INETrackOverload = (
    objects: INETrackObject | INETrackObject[],
    track: string,
    startTime?: number,
    endTime?: number
) => {
    if (!Array.isArray(objects)) {
        if (!objects.customData) {
            return;
        }

        if (!objects.customData._track) {
            return;
        } else if (Array.isArray(objects.customData._track)) {
            if (objects.customData._track.includes(track)) {
                objects.customData._track = objects.customData._track.filter(
                    (t) => t !== track
                );
                if (objects.customData._track.length === 1) {
                    objects.customData._track = objects.customData._track[0];
                }
            }
        } else if (objects.customData._track === track) {
            delete objects.customData._track;
        }
        return;
    }
    if (typeof startTime === 'number') {
        if (typeof endTime === 'number') {
            if (startTime > endTime) {
                throw new Error('Start time is larger than end time.');
            }
        }
    }
    objects
        .filter((obj) => {
            if (typeof startTime === 'number') {
                return obj.time >= startTime && obj.time <= endTime!;
            }
            return true;
        })
        .forEach((obj) => {
            removeTrack(obj, track);
        });
};

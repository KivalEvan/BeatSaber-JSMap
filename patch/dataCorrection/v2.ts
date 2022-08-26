import { Difficulty } from '../../beatmap/v2/difficulty.ts';
import { Note } from '../../beatmap/v2/note.ts';
import { Obstacle } from '../../beatmap/v2/obstacle.ts';
import { Event } from '../../beatmap/v2/event.ts';
import { Waypoint } from '../../beatmap/v2/waypoint.ts';
import { Slider } from '../../beatmap/v2/slider.ts';
import { fixFloat, fixInt } from './helpers.ts';

function fixNote(obj: Note) {
    obj.time = fixFloat(obj.time);
    obj.type = fixInt(obj.type);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
}

function fixObstacle(obj: Obstacle) {
    obj.time = fixFloat(obj.time);
    obj.type = fixInt(obj.type);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.duration = fixFloat(obj.duration);
    obj.width = fixInt(obj.width);
    obj.height = fixInt(obj.height);
}

function fixEvent(obj: Event) {
    obj.time = fixFloat(obj.time);
    obj.type = fixInt(obj.type);
    obj.value = fixInt(obj.value);
    obj.floatValue = fixFloat(obj.floatValue);
}

function fixWaypoint(obj: Waypoint) {
    obj.time = fixFloat(obj.time);
    obj.posX = fixInt(obj.posX);
    obj.posY = fixInt(obj.posY);
    obj.direction = fixInt(obj.direction);
}

function fixSlider(obj: Slider) {
    obj.colorType = fixInt(obj.colorType);
    obj.headTime = fixFloat(obj.headTime);
    obj.headPosX = fixInt(obj.headPosX);
    obj.headPosY = fixInt(obj.headPosY);
    obj.headDirection = fixInt(obj.headDirection);
    obj.headLengthMultiplier = fixFloat(obj.headLengthMultiplier);
    obj.tailTime = fixFloat(obj.tailTime);
    obj.tailPosX = fixInt(obj.tailPosX);
    obj.tailPosY = fixInt(obj.tailPosY);
    obj.tailDirection = fixInt(obj.tailDirection);
    obj.tailLengthMultiplier = fixFloat(obj.tailLengthMultiplier);
    obj.midAnchor = fixInt(obj.midAnchor);
}

export function patchV2(data: Difficulty) {
    data.notes.forEach(fixNote);
    data.obstacles.forEach(fixObstacle);
    data.events.forEach(fixEvent);
    data.waypoints.forEach(fixWaypoint);
    data.sliders.forEach(fixSlider);
}

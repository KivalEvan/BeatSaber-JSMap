const kvlCore = require('./_kivalCore.js');

// alter obj stuff to bundle so it's easier to delete
// or just delete them lol
function move(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const songDuration = global.params[0];
    const flagDelete = global.params[1] > 0;
    const count = {
        note: 0,
        event: 0,
        wall: 0,
    };

    for (const i in notes) {
        if (
            notes[i]._time >= 0 &&
            kvlCore.toRealTime(notes[i]._time, data.songBPM) < songDuration
        ) {
            continue;
        }
        count.note++;
        if (flagDelete) {
            delete notes[i];
            continue;
        }
        notes[i]._time = 0;
        notes[i]._lineIndex = 0;
        notes[i]._lineLayer = 0;
        addWarning(notes[i]);
    }
    for (const i in events) {
        if (
            events[i]._time >= 0 &&
            kvlCore.toRealTime(events[i]._time, data.songBPM) < songDuration
        ) {
            continue;
        }
        count.event++;
        if (flagDelete) {
            delete events[i];
            continue;
        }
        events[i]._time = 0;
    }
    for (const i in walls) {
        if (
            walls[i]._time >= 0 &&
            kvlCore.toRealTime(walls[i]._time, data.songBPM) < songDuration
        ) {
            continue;
        }
        count.wall++;
        if (flagDelete) {
            delete walls[i];
            continue;
        }
        walls[i]._time = 0;
        walls[i]._lineIndex = 0;
        walls[i]._width = 0;
        walls[i]._duration = 0.25;
    }
    // dont mind this
    const totalObj = Object.keys(count).reduce((sum, key) => sum + count[key], 0);
    if (flagDelete) {
        alert(
            `Deleted ${totalObj} object${pluralthing(totalObj)}...\n${count.note} note${pluralthing(
                count.note
            )}, ${count.wall} wall${pluralthing(count.wall)}, ${count.event} event${pluralthing(
                count.event
            )}`
        );
    } else {
        alert(
            `Moved ${totalObj} object${pluralthing(totalObj)} to beat 0...\n${
                count.note
            } note${pluralthing(count.note)}, ${count.wall} wall${pluralthing(count.wall)}, ${
                count.event
            } event${pluralthing(count.event)}`
        );
    }
}
function pluralthing(num) {
    return num > 1 ? 's' : '';
}

module.exports = {
    name: 'Remove Outside Playable',
    params: { 'Song Duration (s)': 999, Delete: 1 },
    run: move,
};

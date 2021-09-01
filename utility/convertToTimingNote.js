function convert(cursor, notes, events, walls, _, global, data) {
    let startTime = global.params[0];
    let endTime = global.params[1];
    const removeStack = global.params[2] > 0;

    const noteAtTime = {
        0: [],
        1: [],
        3: [],
    };

    let noteSelected = notes.filter((n) => n.selected).sort((a, b) => a._time - b._time);
    if (!noteSelected.length) {
        noteSelected = notes;
    } else {
        startTime = noteSelected[0]._time;
        endTime = noteSelected[noteSelected.length - 1]._time;
    }

    for (const i in noteSelected) {
        let layer = 0;
        if (noteSelected[i]._time < startTime) {
            continue;
        }
        if (noteSelected[i]._time > endTime) {
            break;
        }
        if (
            noteAtTime[noteSelected[i]._type].length > 0 &&
            checkNoteAtTime(noteAtTime[noteSelected[i]._type], noteSelected[i])
        ) {
            if (removeStack) {
                delete noteSelected[i];
                continue;
            }
            layer = Math.min(2, noteAtTime[noteSelected[i]._type].length);
        } else {
            noteAtTime[noteSelected[i]._type] = [];
        }
        noteSelected[i]._lineIndex = (noteSelected[i]._type + 1) % 4;
        noteSelected[i]._lineLayer = layer;
        noteSelected[i]._cutDirection = 8;
        noteAtTime[noteSelected[i]._type].push(noteSelected[i]);
    }
}

function checkNoteAtTime(noteArr, note) {
    for (const n of noteArr) {
        if (n._time + 0.001 >= note._time) {
            return true;
        }
    }
    return false;
}

module.exports = {
    name: 'Convert to Timing Note',
    params: { 'Start Time': 0, 'End Time': 999, 'Remove Stack': 0 },
    run: convert,
};

const kvlCore = require('./_kivalCore.js');

function check(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const beatPrec = [];
    for (const prec in global.params) {
        if (global.params[prec] > 0) {
            beatPrec.push(global.params[prec]);
        }
    }

    const bpmChangesTime = kvlCore.getBPMChangesTime(data.songBPM, bpmChanges);
    const lastNote = {
        0: null,
        1: null,
        3: null,
    };
    const swingNoteArray = {
        0: [],
        1: [],
        3: [],
    };

    for (const note of notes) {
        const noteTime = kvlCore.adjustTime(note._time, data.songBPM, bpmChangesTime);
        if (kvlCore.isNote(note) && lastNote[note._type]) {
            if (
                kvlCore.swingNext(
                    note,
                    lastNote[note._type],
                    data.songBPM,
                    swingNoteArray[note._type]
                )
            ) {
                if (checkPrec(noteTime, beatPrec)) {
                    addError(note, `Beat time is ${kvlCore.round(noteTime, 3)}`);
                }
                lastNote[note._type] = note;
                swingNoteArray[note._type] = [];
            }
        } else {
            if (kvlCore.isNote(note) && checkPrec(noteTime, beatPrec)) {
                addError(note, `Beat time is ${kvlCore.round(noteTime, 3)}`);
            }
            lastNote[note._type] = note;
        }
        swingNoteArray[note._type].push(note);
    }
}
function checkPrec(nt, beatPrec) {
    if (!beatPrec.length > 0) {
        return false;
    }
    for (let i = 0; i < beatPrec.length; i++) {
        if ((nt + 0.001) % (1 / beatPrec[i]) < 0.01) {
            return false;
        }
    }
    return true;
}

module.exports = {
    name: 'Off-beat Precision',
    params: { 'Valid Prec. 1': 4, 'Valid Prec. 2': 3, 'Valid Prec. 3': 0 },
    run: check,
};

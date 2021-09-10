const kvlCore = require('./_kivalCore.js');

function check(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const streamPrec = global.params[0];
    const epsilon = 0.001;

    const bpmChangesTime = kvlCore.getBPMChangesTime(data.songBPM, bpmChanges);
    const lastNote = {
        0: null,
        1: null,
        3: null,
    };
    const lastNotePause = {
        0: null,
        1: null,
        3: null,
    };
    const maybePause = {
        0: false,
        1: false,
        3: false,
    };
    const swingNoteArray = {
        0: [],
        1: [],
        3: [],
    };
    for (const note of notes) {
        if (kvlCore.isNote(note) && lastNote[note._type]) {
            if (
                kvlCore.swingNext(
                    note,
                    lastNote[note._type],
                    data.songBPM,
                    swingNoteArray[note._type]
                )
            ) {
                if (
                    kvlCore.adjustTime(note._time, data.songBPM, bpmChangesTime) -
                        kvlCore.adjustTime(
                            lastNote[note._type]._time,
                            data.songBPM,
                            bpmChangesTime
                        ) <=
                    (1 / streamPrec) * 2 + epsilon
                ) {
                    if (
                        maybePause[0] &&
                        maybePause[1] &&
                        kvlCore.adjustTime(
                            lastNote[note._type]._time,
                            data.songBPM,
                            bpmChangesTime
                        ) -
                            kvlCore.adjustTime(
                                lastNotePause[note._type]._time,
                                data.songBPM,
                                bpmChangesTime
                            ) <=
                            (1 / streamPrec) * 3 + epsilon
                    ) {
                        addError(lastNote[note._type]);
                    }
                    maybePause[note._type] = false;
                } else if (!maybePause[note._type]) {
                    maybePause[note._type] = true;
                    lastNotePause[note._type] = lastNote[note._type];
                }
                swingNoteArray[note._type] = [];
                lastNote[note._type] = note;
            }
        } else {
            lastNote[note._type] = note;
        }
        swingNoteArray[note._type].push(note);
    }
}

module.exports = {
    name: 'Speed Pause (EXPERIMENTAL)',
    params: { 'Stream Prec': 1 / kvlCore.toolValue.maxSpeedPause },
    run: check,
};

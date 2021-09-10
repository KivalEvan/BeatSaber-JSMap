const kvlCore = require('./_kivalCore.js');

function check(cursor, notes, events, walls, _, global, data, customEvents, bpmChanges) {
    const changeSpeed = parseFloat(global.params[0]) / 1000;
    const fastWindow = global.params[1] > 0;
    const epsilon = 0.001;
    const newNotes = [];
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
    for (let i = 0, len = notes.length; i < len; i++) {
        const note = JSON.parse(JSON.stringify(notes[i]));
        if (kvlCore.isNote(note) && lastNote[note._type]) {
            if (
                kvlCore.swingNext(
                    note,
                    lastNote[note._type],
                    data.songBPM,
                    swingNoteArray[note._type]
                )
            ) {
                changeSliderSpeed(swingNoteArray[note._type]);
                swingNoteArray[note._type] = [];
            }
        }
        // change right at the end if exist
        if (i === len) {
            changeSliderSpeed(swingNoteArray[0]);
            changeSliderSpeed(swingNoteArray[1]);
        }
        lastNote[note._type] = note;
        swingNoteArray[note._type].push(note);
        newNotes.push(note);
    }
    function changeSliderSpeed(noteArr) {
        if (noteArr.length < 1) {
            return;
        }
        let prevNote;
        let prevTime = null;
        let sliderSpeed;
        let sliderFlag = false;
        for (const n of noteArr) {
            if (prevNote) {
                sliderSpeed =
                    kvlCore.toRealTime(n._time - prevTime, data.songBPM) /
                    (kvlCore.swingWindow(n, prevNote) ? 2 : 1);
                if (sliderSpeed > epsilon) {
                    prevTime = n._time;
                    changeTime = kvlCore.toBeatTime(
                        changeSpeed * (!fastWindow && kvlCore.swingWindow(n, prevNote) ? 2 : 1),
                        data.songBPM
                    );
                    n._time = prevNote._time + changeTime;
                    if (!sliderFlag) {
                        addWarning(prevNote, `Slider note affected by changes.`);
                        sliderFlag = true;
                    }
                }
            }
            if (prevTime === null) {
                prevTime = n._time;
            }
            prevNote = n;
        }
    }
    return { notes: newNotes };
}

module.exports = {
    name: 'Slider Speed Change',
    params: {
        'Speed (ms)': 20,
        'Fast Window': 0,
    },
    run: check,
};

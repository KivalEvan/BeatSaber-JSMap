const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  getEffectiveBPMTime(notes, global, data);
  getEffectiveBPMSwingTime(notes, global, data);
}
function getEffectiveBPMTime(notes, global, data) {
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
    const note = notes[i];
    let EBPM = 0;
    if (kvlCore.isNote(note) && lastNote[note._type]) {
      if (
        kvlCore.swingNext(
          note,
          lastNote[note._type],
          data.songBPM,
          swingNoteArray[note._type]
        )
      ) {
        EBPM = data.songBPM / ((note._time - lastNote[note._type]._time) * 2);
        swingNoteArray[note._type] = [];
      }
    }
    if (EBPM > global.params[0]) {
      addWarning(note, `${kvlCore.round(EBPM, 3)} eBPM (Note)`);
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
  }
}
function getEffectiveBPMSwingTime(notes, global, data) {
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
    const note = notes[i];
    let EBPM = 0;
    if (kvlCore.isNote(note) && lastNote[note._type]) {
      if (
        kvlCore.swingNext(
          note,
          lastNote[note._type],
          data.songBPM,
          swingNoteArray[note._type]
        )
      ) {
        EBPM = data.songBPM / ((note._time - lastNote[note._type]._time) * 2);
        lastNote[note._type] = note;
        swingNoteArray[note._type] = [];
      }
    } else {
      lastNote[note._type] = note;
    }
    if (EBPM > global.params[1]) {
      addError(note, `${kvlCore.round(EBPM, 3)} eBPM (Swing)`);
    }
    swingNoteArray[note._type].push(note);
  }
}

module.exports = {
  name: "Effective BPM",
  params: {
    "Note Thres.": kvlCore.toolValue.ebpm.th,
    "Swing Thres.": kvlCore.toolValue.ebpm.thSwing,
  },
  run: check,
};

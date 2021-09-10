const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  const lastNote = {
    0: null,
    1: null,
    3: null,
  };
  const lastNoteDirection = {
    0: null,
    1: null,
    3: null,
  };
  const startNoteDot = {
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
    if (kvlCore.isNote(note) && lastNote[note._type]) {
      if (
        kvlCore.swingNext(
          note,
          lastNote[note._type],
          data.songBPM,
          swingNoteArray[note._type]
        )
      ) {
        if (startNoteDot[note._type]) {
          startNoteDot[note._type] = null;
          lastNoteDirection[note._type] =
            kvlCore.flipCutDir[lastNoteDirection[note._type]];
        }
        if (
          kvlCore.checkAngle(
            note._cutDirection,
            lastNoteDirection[note._type],
            45
          )
        ) {
          addError(note, "");
        }
        if (note._cutDirection === 8) {
          startNoteDot[note._type] = note;
        } else {
          lastNoteDirection[note._type] = note._cutDirection;
        }
        swingNoteArray[note._type] = [];
      } else {
        if (
          startNoteDot[note._type] &&
          kvlCore.checkAngle(
            note._cutDirection,
            lastNoteDirection[note._type],
            45
          )
        ) {
          addError(startNoteDot[note._type], "");
          startNoteDot[note._type] = null;
          lastNoteDirection[note._type] = note._cutDirection;
        }
        if (note._cutDirection !== 8) {
          startNoteDot[note._type] = null;
          lastNoteDirection[note._type] = note._cutDirection;
        }
      }
    } else {
      lastNoteDirection[note._type] = note._cutDirection;
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
    if (note._type === 3) {
      // on bottom row
      if (note._lineLayer === 0) {
        //on right center
        if (note._lineIndex === 1) {
          lastNoteDirection[0] = 0;
          startNoteDot[0] = null;
        }
        //on left center
        if (note._lineIndex === 2) {
          lastNoteDirection[1] = 0;
          startNoteDot[1] = null;
        }
        //on top row
      }
      if (note._lineLayer === 2) {
        //on right center
        if (note._lineIndex === 1) {
          lastNoteDirection[0] = 1;
          startNoteDot[0] = null;
        }
        //on left center
        if (note._lineIndex === 2) {
          lastNoteDirection[1] = 1;
          startNoteDot[1] = null;
        }
      }
    }
  }
}

module.exports = {
  name: "Double-directional",
  params: {},
  run: check,
};

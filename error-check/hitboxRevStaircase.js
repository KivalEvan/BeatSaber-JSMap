const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
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
    if (kvlCore.isNote(note) && lastNote[note._type]) {
      if (
        kvlCore.swingNext(
          note,
          lastNote[note._type],
          data.songBPM,
          swingNoteArray[note._type]
        )
      ) {
        swingNoteArray[note._type] = [];
      }
    }
    for (const other of swingNoteArray[(note._type + 1) % 2]) {
      if (other._cutDirection !== 8) {
        let noteOccupyLineIndex =
          other._lineIndex +
          kvlCore.swingCutDirectionSpace[
            kvlCore.flipCutDir[other._cutDirection]
          ][0];
        let noteOccupyLineLayer =
          other._lineLayer +
          kvlCore.swingCutDirectionSpace[
            kvlCore.flipCutDir[other._cutDirection]
          ][1];
        if (
          !(data.NJS > data.songBPM / (120 * (note._time - other._time))) &&
          note._lineIndex === noteOccupyLineIndex &&
          note._lineLayer === noteOccupyLineLayer
        ) {
          addWarning(note, "Note affected by the previous swing");
          addError(other, "Note causing the reverse staircase hit");
          break;
        }
      }
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
  }
}

module.exports = {
  name: "Reverse Staircase Hitbox",
  params: {},
  run: check,
};

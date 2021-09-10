const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  const lastNote = {
    0: null,
    1: null,
    3: null,
  };
  const lastNoteEnd = {
    0: null,
    1: null,
    3: null,
  };
  const lastNoteDirection = {
    0: null,
    1: null,
    3: null,
  };
  const lastSpeed = {
    0: null,
    1: null,
    3: null,
  };
  const swingNoteArray = {
    0: [],
    1: [],
    3: [],
  };
  const noteOccupy = {
    0: { _lineIndex: 0, _lineLayer: 0 },
    1: { _lineIndex: 0, _lineLayer: 0 },
    3: { _lineIndex: 0, _lineLayer: 0 },
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
        lastSpeed[note._type] = kvlCore.toRealTime(
          note._time - lastNote[note._type]._time,
          data.songBPM
        );
        if (note._cutDirection !== 8) {
          noteOccupy[note._type]._lineIndex =
            note._lineIndex +
            kvlCore.swingCutDirectionSpace[note._cutDirection][0];
          noteOccupy[note._type]._lineLayer =
            note._lineLayer +
            kvlCore.swingCutDirectionSpace[note._cutDirection][1];
        } else {
          noteOccupy[note._type]._lineIndex = -1;
          noteOccupy[note._type]._lineLayer = -1;
        }
        lastNoteEnd[note._type] = note;
        lastNoteDirection[note._type] = note._cutDirection;
        swingNoteArray[note._type] = [];
      } else if (
        kvlCore.swingNoteEnd(
          note,
          lastNote[note._type],
          lastNoteDirection[note._type]
        )
      ) {
        if (note._cutDirection !== 8) {
          noteOccupy[note._type]._lineIndex =
            note._lineIndex +
            kvlCore.swingCutDirectionSpace[note._cutDirection][0];
          noteOccupy[note._type]._lineLayer =
            note._lineLayer +
            kvlCore.swingCutDirectionSpace[note._cutDirection][1];
          lastNoteDirection[note._type] = note._cutDirection;
        } else {
          noteOccupy[note._type]._lineIndex =
            note._lineIndex +
            kvlCore.swingCutDirectionSpace[lastNoteDirection[note._type]][0];
          noteOccupy[note._type]._lineLayer =
            note._lineLayer +
            kvlCore.swingCutDirectionSpace[lastNoteDirection[note._type]][1];
        }
        lastNoteEnd[note._type] = note;
      }
      if (
        lastNote[(note._type + 1) % 2] &&
        note._time - lastNote[(note._type + 1) % 2]._time !== 0 &&
        kvlCore.isBelowThres(
          note._time - lastNote[(note._type + 1) % 2]._time,
          Math.min(
            kvlCore.toolValue.hitbox.staircase,
            lastSpeed[(note._type + 1) % 2]
          ),
          data.songBPM
        )
      ) {
        if (
          note._lineIndex === noteOccupy[(note._type + 1) % 2]._lineIndex &&
          note._lineLayer === noteOccupy[(note._type + 1) % 2]._lineLayer &&
          !kvlCore.swingNoteDouble(note, notes, i)
        ) {
          addWarning(
            lastNoteEnd[(note._type + 1) % 2],
            "Note causing the staircase hit"
          );
          addError(note, "Note affected by previous swing");
        }
      }
    } else {
      if (note._cutDirection !== 8) {
        noteOccupy[note._type]._lineIndex =
          note._lineIndex +
          kvlCore.swingCutDirectionSpace[note._cutDirection][0];
        noteOccupy[note._type]._lineLayer =
          note._lineLayer +
          kvlCore.swingCutDirectionSpace[note._cutDirection][1];
      } else {
        noteOccupy[note._type]._lineIndex = -1;
        noteOccupy[note._type]._lineLayer = -1;
      }
      lastNoteDirection[note._type] = note._cutDirection;
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
  }
}

module.exports = {
  name: "Staircase Hitbox",
  params: {},
  run: check,
};

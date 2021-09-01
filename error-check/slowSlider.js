const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  const sliderFlag = {
    0: false,
    1: false,
    3: false,
  };
  const lastNote = {
    0: null,
    1: null,
    3: null,
  };
  const lastNoteStart = {
    0: null,
    1: null,
    3: null,
  };
  const sliderSpeed = {
    0: 0,
    1: 0,
    3: 0,
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
        sliderSpeed[note._type] = 0;
        lastNoteStart[note._type] = note;
        sliderFlag[note._type] = false;
        swingNoteArray[note._type] = [];
      } else {
        sliderSpeed[note._type] = Math.max(
          sliderSpeed[note._type],
          kvlCore.toRealTime(
            note._time - lastNote[note._type]._time,
            data.songBPM
          ) / (kvlCore.swingWindow(note, lastNote[note._type]) ? 2 : 1)
        );
      }
      if (
        !sliderFlag[note._type] &&
        sliderSpeed[note._type] > parseFloat(global.params[0]) / 1000
      ) {
        addError(
          lastNoteStart[note._type],
          `Slider speed is ${kvlCore.round(
            sliderSpeed[note._type] * 1000,
            1
          )}ms`
        );
        sliderFlag[note._type] = true;
      }
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
  }
}

module.exports = {
  name: "Slow Slider",
  params: {
    "Min Speed (ms)": kvlCore.toolValue.minSliderSpeed * 1000,
  },
  run: check,
};

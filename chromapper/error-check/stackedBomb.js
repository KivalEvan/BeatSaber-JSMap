const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  let lastTime = -999;
  for (let i = 0, len = notes.length; i < len; i++) {
    if (
      kvlCore.toRealTime(notes[i]._time, data.songBPM) <
        lastTime + global.params[0] / 1000 ||
      notes[i]._type !== 3
    ) {
      continue;
    }
    for (let j = i + 1; j < len; j++) {
      if (
        kvlCore.toRealTime(notes[j]._time, data.songBPM) >
        kvlCore.toRealTime(notes[i]._time, data.songBPM) +
          global.params[0] / 1000
      ) {
        break;
      }
      if (
        notes[i]._lineLayer === notes[j]._lineLayer &&
        notes[i]._lineIndex === notes[j]._lineIndex
      ) {
        addError(notes[j], "");
        lastTime = kvlCore.toRealTime(notes[i]._time, data.songBPM);
      }
    }
  }
}

module.exports = {
  name: "Stacked Bomb",
  params: {
    "Max Time (ms)": 20,
  },
  run: check,
};

const kvlCore = require("./_kivalCore.js");

function move(cursor, notes, events, walls, _, global, data) {
  const startTime = global.params[0];
  for (obj of notes) {
    if (kvlCore.toRealTime(obj._time, data.songBPM) < startTime) {
      addError(
        obj,
        `Starts at ${kvlCore.round(
          kvlCore.toRealTime(obj._time, data.songBPM),
          2
        )}s`
      );
    } else {
      break;
    }
  }
}

module.exports = {
  name: "Hot Start",
  params: { "Start Time (s)": 1.5 },
  run: move,
};

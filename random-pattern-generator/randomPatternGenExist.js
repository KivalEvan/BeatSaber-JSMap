function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const noRot = global.params[2] > 0;
  const noPos = global.params[3] > 0;
  const noDot = global.params[4] > 0;
  const startTime = Math.floor(Math.abs(global.params[5]));
  const endTime = Math.floor(Math.abs(global.params[6]));

  const maxSize = row * lane;

  // store note at same time to prevent overlap
  let noteAtTime = [];
  for (let i in notes) {
    if (notes[i]._time < startTime) {
      continue;
    }
    if (notes[i]._time > endTime) {
      break;
    }

    for (let j in noteAtTime) {
      if (noteAtTime[j]._time + 0.001 < notes[i]._time) {
        noteAtTime = [];
        break;
      }
    }

    if (!noRot) {
      let randCD = Math.floor(Math.random() * (noDot ? 8 : 9));
      notes[i]._cutDirection = randCD;
    }

    if (!noPos) {
      const randIL = Math.floor(Math.random() * maxSize);
      let pos = randIL;
      let grid = new Set();
      for (let j in noteAtTime) {
        grid.add(noteAtTime[j]._lineLayer * lane + noteAtTime[j]._lineIndex);
      }
      for (let j = 0; grid.has(pos) && j < maxSize; j++) {
        pos = (randIL + j) % maxSize;
      }
      notes[i]._lineIndex = pos % lane;
      notes[i]._lineLayer = Math.floor(pos / lane);
    }
    noteAtTime.push(notes[i]);
  }
}

module.exports = {
  name: "Random Pattern Gen. (Existing)",
  params: {
    Row: 3,
    Lane: 4,
    "No Rotation": 0,
    "No Position": 0,
    "No Dot": 0,
    "Start Time": 4,
    "End Time": 16,
  },
  run: messItUp,
};

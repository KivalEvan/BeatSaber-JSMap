function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const redNote = Math.floor(Math.abs(global.params[2]));
  const blueNote = Math.floor(Math.abs(global.params[3]));
  const bombNote = Math.floor(Math.abs(global.params[4]));
  const noDot = global.params[5] > 0;

  const noteCount = [redNote, blueNote, bombNote];
  const maxSize = row * lane;
  const total = Math.min(
    noteCount.reduce((acc, cv) => acc + cv),
    maxSize
  );
  if (total === 0) {
    return;
  }

  const grid = new Array(maxSize).fill(null);
  let i = 0;
  while (i < total) {
    const randIL = Math.floor(Math.random() * maxSize);
    let randCD = Math.floor(Math.random() * (noDot ? 8 : 9));
    let randType = Math.floor(Math.random() * 3);
    for (let j = 0; j < 3; j++) {
      if (noteCount[randType] === 0) {
        randType = (randType + 1) % 3;
      }
    }
    if (noteCount[randType] === 0) {
      break;
    }
    for (let j = 0; j < maxSize; j++) {
      let pos = (randIL + j) % maxSize;
      if (grid[pos] === null) {
        grid[pos] = "not null";
        notes.push({
          _time: cursor,
          _lineIndex: pos % lane,
          _lineLayer: Math.floor(pos / lane),
          _type: randType === 2 ? 3 : randType,
          _cutDirection: randCD,
        });
        noteCount[randType]--;
        i++;
        break;
      }
    }
  }
}

module.exports = {
  name: "Random Pattern Gen.",
  params: {
    Row: 3,
    Lane: 4,
    "Red Note": 1,
    "Blue Note": 1,
    "Bomb Note": 0,
    "No Dot": 0,
  },
  run: messItUp,
};

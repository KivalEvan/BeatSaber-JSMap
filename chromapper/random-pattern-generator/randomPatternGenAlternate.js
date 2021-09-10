function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const noDot = global.params[2] > 0;
  const startType = Math.floor(Math.abs(global.params[3])) % 2;
  const duration = global.params[4];
  const interval = Math.abs(global.params[5]);

  const maxSize = row * lane;

  for (
    let startTime = cursor, i = startType;
    startTime <= cursor + duration;
    startTime += interval, i++
  ) {
    const randIL = Math.floor(Math.random() * maxSize);
    let randCD = Math.floor(Math.random() * (noDot ? 8 : 9));
    notes.push({
      _time: startTime,
      _lineIndex: randIL % lane,
      _lineLayer: Math.floor(randIL / lane),
      _type: i % 2,
      _cutDirection: randCD,
    });
  }
}

module.exports = {
  name: "Random Pattern Gen. (Alt.)",
  params: {
    Row: 3,
    Lane: 4,
    "No Dot": 0,
    "Start Type": 1,
    Duration: 8,
    Interval: 1,
  },
  run: messItUp,
};

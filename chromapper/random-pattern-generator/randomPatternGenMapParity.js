const kvlCore = require("./_kivalCore.js");

function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const redNote = Math.floor(Math.abs(global.params[2]));
  const blueNote = Math.floor(Math.abs(global.params[3]));
  const bombNote = Math.floor(Math.abs(global.params[4]));
  const noDot = global.params[5] > 0;
  const redParity = Math.floor(Math.abs(global.params[6])) % 2;
  const blueParity = Math.floor(Math.abs(global.params[7])) % 2;
  const extendedParity = Math.floor(Math.abs(global.params[8]));
  const maxAngle = global.params[9];
  const duration = global.params[10];
  const interval = Math.abs(global.params[11]);

  const parity = {
    0: redParity,
    1: blueParity,
  };
  const validRotation = kvlCore.createValidParity(extendedParity, !noDot);
  const prevRotation = {
    0: null,
    1: null,
  };

  const maxSize = row * lane;
  for (
    let startTime = cursor;
    startTime <= cursor + duration;
    startTime += interval
  ) {
    const noteCount = [redNote, blueNote, bombNote];
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
      let randType = Math.floor(Math.random() * 3);
      for (let j = 0; j < 3; j++) {
        if (noteCount[randType] === 0) {
          randType = (randType + 1) % 3;
        }
      }
      if (noteCount[randType] === 0) {
        break;
      }
      let randCD =
        validRotation[randType][parity[randType]][
          Math.floor(
            Math.random() * validRotation[randType][parity[randType]].length
          )
        ];
      if (prevRotation[randType] !== null) {
        let tempArr = validRotation[randType][parity[randType]].filter((cd) =>
          kvlCore.checkAngle(
            cd,
            prevRotation[randType],
            Math.abs(180 - maxAngle),
            true
          )
        );
        if (tempArr.length) {
          if (!noDot && Math.random() - 0.5) {
            tempArr.push(8);
          }
          kvlCore.shuffle(tempArr);
          randCD = tempArr.pop();
        }
      }
      for (let j = 0; j < maxSize; j++) {
        let pos = (randIL + j) % maxSize;
        if (grid[pos] === null) {
          grid[pos] = "not null";
          notes.push({
            _time: startTime,
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
      prevRotation[randType] = randCD;
    }
    parity[0] = (parity[0] + 1) % 2;
    parity[1] = (parity[1] + 1) % 2;
  }
}

module.exports = {
  name: "Random Pattern Gen. (Map Parity)",
  params: {
    Row: 3,
    Lane: 4,
    "Red Note": 1,
    "Blue Note": 1,
    "Bomb Note": 0,
    "No Dot": 1,
    "Red Parity": 0,
    "Blue Parity": 0,
    Extended: 0,
    "Max Angle": 45,
    Duration: 8,
    Interval: 1,
  },
  run: messItUp,
};

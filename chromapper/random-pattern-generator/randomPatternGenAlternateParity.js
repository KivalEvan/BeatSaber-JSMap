const kvlCore = require("./_kivalCore.js");

function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const noDot = global.params[2] > 0;
  const startType = Math.floor(Math.abs(global.params[3])) % 2;
  const redParity = Math.floor(Math.abs(global.params[4])) % 2;
  const blueParity = Math.floor(Math.abs(global.params[5])) % 2;
  const extendedParity = Math.floor(Math.abs(global.params[6]));
  const maxAngle = global.params[7];
  const duration = global.params[8];
  const interval = Math.abs(global.params[9]);

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
    let startTime = cursor, i = startType;
    startTime <= cursor + duration;
    startTime += interval
  ) {
    const randIL = Math.floor(Math.random() * maxSize);
    const noteType = i % 2;
    let randCD =
      validRotation[noteType][parity[noteType]][
        Math.floor(
          Math.random() * validRotation[noteType][parity[noteType]].length
        )
      ];
    if (prevRotation[noteType] !== null) {
      let tempArr = validRotation[noteType][parity[noteType]].filter((cd) =>
        kvlCore.checkAngle(
          cd,
          prevRotation[noteType],
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
    notes.push({
      _time: startTime,
      _lineIndex: randIL % lane,
      _lineLayer: Math.floor(randIL / lane),
      _type: noteType,
      _cutDirection: randCD,
    });
    parity[noteType] = (parity[noteType] + 1) % 2;
    prevRotation[noteType] = randCD;
    i++;
  }
}

module.exports = {
  name: "Random Pattern Gen. (Alt. Parity)",
  params: {
    Row: 3,
    Lane: 4,
    "No Dot": 1,
    "Start Type": 1,
    "Red Parity": 0,
    "Blue Parity": 0,
    Extended: 0,
    "Max Angle": 45,
    Duration: 8,
    Interval: 1,
  },
  run: messItUp,
};

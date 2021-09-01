const kvlCore = require("./_kivalCore.js");

// i cant and dont want to predict parity if user does not want to input it
function messItUp(cursor, notes, events, walls, _, global, data) {
  const row = Math.floor(Math.abs(global.params[0]));
  const lane = Math.floor(Math.abs(global.params[1]));
  const noRot = global.params[2] > 0;
  const noPos = global.params[3] > 0;
  const noDot = global.params[4] > 0;
  const redParity = Math.floor(Math.abs(global.params[5])) % 2;
  const blueParity = Math.floor(Math.abs(global.params[6])) % 2;
  const extendedParity = Math.floor(Math.abs(global.params[7]));
  const maxAngle = global.params[8];
  const startTime = Math.floor(Math.abs(global.params[9]));
  const endTime = Math.floor(Math.abs(global.params[10]));

  const parity = {
    0: redParity,
    1: blueParity,
    2: 0,
  };
  const validRotation = kvlCore.createValidParity(extendedParity, !noDot);
  const prevRotation = {
    0: null,
    1: null,
  };

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

  const maxSize = row * lane;

  let noteAtTime = [];
  let randCD = null;
  for (let i in notes) {
    if (notes[i]._time < startTime) {
      continue;
    }
    if (notes[i]._time > endTime) {
      break;
    }

    if (kvlCore.isNote(notes[i]) && lastNote[notes[i]._type]) {
      if (
        kvlCore.swingNext(
          notes[i],
          lastNote[notes[i]._type],
          data.songBPM,
          swingNoteArray[notes[i]._type]
        )
      ) {
        parity[notes[i]._type] = (parity[notes[i]._type] + 1) % 2;
        prevRotation[notes[i]._type] = lastNote[notes[i]._type]._cutDirection;
        lastNote[notes[i]._type] = notes[i];
        swingNoteArray[notes[i]._type] = [];
      }
    } else {
      lastNote[notes[i]._type] = notes[i];
    }
    swingNoteArray[notes[i]._type].push(notes[i]);

    for (let j in noteAtTime) {
      if (noteAtTime[j]._time + 0.001 < notes[i]._time) {
        noteAtTime = [];
        break;
      }
    }

    if (!noRot) {
      randCD =
        validRotation[notes[i]._type][parity[notes[i]._type]][
          Math.floor(
            Math.random() *
              validRotation[notes[i]._type][parity[notes[i]._type]].length
          )
        ];
      if (prevRotation[notes[i]._type] !== null) {
        let tempArr = validRotation[notes[i]._type][
          parity[notes[i]._type]
        ].filter((cd) =>
          kvlCore.checkAngle(
            cd,
            prevRotation[notes[i]._type],
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
  name: "Random Pattern Gen. (Existing Parity)",
  params: {
    Row: 3,
    Lane: 4,
    "No Rotation": 0,
    "No Position": 0,
    "No Dot": 1,
    "Red Parity": 0,
    "Blue Parity": 0,
    Extended: 0,
    "Max Angle": 45,
    "Start Time": 4,
    "End Time": 16,
  },
  run: messItUp,
};

import { EPSILON } from '../../constants.ts';
import { assertAlmostEquals, assertEquals, NoteJumpSpeed } from '../../deps.ts';

Deno.test('NJS create instance from constructor', () => {
   const njs0 = new NoteJumpSpeed(120);
   assertEquals(njs0.value, 10);
   assertEquals(njs0.offset, 0);
   assertEquals(njs0.hjd, 2);
   assertEquals(njs0.jd, 20);
   assertEquals(njs0.reactionTime, 1);
   assertEquals(njs0.bpm, 120);

   const njs2 = new NoteJumpSpeed(120, 16);
   assertEquals(njs2.value, 16);
   assertEquals(njs2.offset, 0);
   assertEquals(njs2.hjd, 2);
   assertEquals(njs2.jd, 32);
   assertEquals(njs2.reactionTime, 1);

   const njs3 = new NoteJumpSpeed(120, 16, -1);
   assertEquals(njs3.value, 16);
   assertEquals(njs3.offset, -1);
   assertEquals(njs3.hjd, 1);
   assertEquals(njs3.jd, 16);
   assertEquals(njs3.reactionTime, 0.5);
});

Deno.test('NJS create instance from static create', () => {
   const njs0 = NoteJumpSpeed.create(120);
   assertEquals(njs0.value, 10);
   assertEquals(njs0.offset, 0);
   assertEquals(njs0.hjd, 2);
   assertEquals(njs0.jd, 20);
   assertEquals(njs0.reactionTime, 1);
   assertEquals(njs0.bpm, 120);

   const njs2 = NoteJumpSpeed.create(120, 16);
   assertEquals(njs2.value, 16);
   assertEquals(njs2.offset, 0);
   assertEquals(njs2.hjd, 2);
   assertEquals(njs2.jd, 32);
   assertEquals(njs2.reactionTime, 1);

   const njs3 = NoteJumpSpeed.create(120, 16, -1);
   assertEquals(njs3.value, 16);
   assertEquals(njs3.offset, -1);
   assertEquals(njs3.hjd, 1);
   assertEquals(njs3.jd, 16);
   assertEquals(njs3.reactionTime, 0.5);
});

Deno.test('NJS getter/setter', () => {
   const njs = NoteJumpSpeed.create(120);
   assertEquals(njs.value, 10);
   assertEquals(njs.offset, 0);
   assertEquals(njs.hjd, 2);
   assertEquals(njs.jd, 20);
   assertEquals(njs.reactionTime, 1);
   assertEquals(njs.bpm, 120);

   njs.value = 16;
   assertEquals(njs.value, 16);
   assertEquals(njs.offset, 0);
   assertEquals(njs.hjd, 2);
   assertEquals(njs.jd, 32);
   assertEquals(njs.reactionTime, 1);

   njs.offset = -1;
   assertEquals(njs.value, 16);
   assertEquals(njs.offset, -1);
   assertEquals(njs.hjd, 1);
   assertEquals(njs.jd, 16);
   assertEquals(njs.reactionTime, 0.5);
});

Deno.test('NJS calculate HJD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcHjd(), 1, EPSILON);
   assertAlmostEquals(njs.calcHjd(-1), 1, EPSILON);
   assertAlmostEquals(njs.calcHjd(0), 2, EPSILON);
   assertAlmostEquals(njs.calcHjd(1), 3, EPSILON);
});

Deno.test('NJS calculate HJD from JD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcHjdFromJd(), 1, EPSILON);
   assertAlmostEquals(njs.calcHjdFromJd(18), 1.125, EPSILON);
   assertAlmostEquals(njs.calcHjdFromJd(32), 2, EPSILON);
   assertAlmostEquals(njs.calcHjdFromJd(24), 1.5, EPSILON);
});

Deno.test('NJS calculate HJD from Reaction Time', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcHjdFromRt(), 1, EPSILON);
});

Deno.test('NJS calculate JD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcJd(), 16, EPSILON);
   assertAlmostEquals(njs.calcJd(1), 16, EPSILON);
   assertAlmostEquals(njs.calcJd(2), 32, EPSILON);
   assertAlmostEquals(njs.calcJd(3), 48, EPSILON);
   assertAlmostEquals(njs.calcJd(0.25), 4, EPSILON);
});

Deno.test('NJS calculate optimal JD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcJdOptimal()[0], 16.941176, EPSILON);
   assertAlmostEquals(njs.calcJdOptimal()[1], 24.097223, EPSILON);
});

Deno.test('NJS calculate reaction time from HJD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcRtFromHjd(), 0.5, EPSILON);
});

Deno.test('NJS calculate reaction time from JD', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcRtFromJd(), 0.5, EPSILON);
});

Deno.test('NJS calculate distance', () => {
   const njs = NoteJumpSpeed.create(120, 16, -1);
   assertAlmostEquals(njs.calcDistance(1), 16, EPSILON);
   assertAlmostEquals(njs.calcDistance(2), 32, EPSILON);
   assertAlmostEquals(njs.calcDistance(3.5), 56, EPSILON);
});

import { EPSILON } from '../../constants.ts';
import { assertAlmostEquals, assertEquals, TimeProcessor, types } from '../../deps.ts';

Deno.test('BPM create instance from constructor', () => {
   const bpm0 = new TimeProcessor(128);
   assertEquals(bpm0.value, 128);
   assertEquals(bpm0.offset, 0);
   assertEquals(bpm0.timescale, []);
   assertEquals(bpm0.change, []);

   const bpm1 = new TimeProcessor(128, []);
   assertEquals(bpm1.value, 128);
   assertEquals(bpm1.offset, 0);
   assertEquals(bpm1.timescale, []);
   assertEquals(bpm1.change, []);

   const bpm2 = new TimeProcessor(
      128,
      [
         { b: 0, m: 64 },
         { b: 12, m: 128 },
      ],
      123,
   );
   assertEquals(bpm2.value, 128);
   assertAlmostEquals(bpm2.offset, 123, EPSILON);
   assertEquals(bpm2.timescale, [
      { time: 0, scale: 2 },
      { time: 12, scale: 1 },
   ]);
   assertEquals(bpm2.change, []);

   const bpm3 = new TimeProcessor(
      128,
      [
         { _time: 0, _BPM: 64, _beatsPerBar: 4, _metronomeOffset: 4 },
         { b: 12, m: 128, p: 4, o: 4 },
         {
            _time: 24,
            _bpm: 256,
            _beatsPerBar: 4,
            _metronomeOffset: 4,
         } as types.v2.IBPMChangeOld,
      ],
      123,
   );
   assertEquals(bpm3.value, 128);
   assertAlmostEquals(bpm3.offset, 123, EPSILON);
   assertEquals(bpm3.timescale, []);
   assertEquals(bpm3.change, [
      { time: 0, newTime: 0, BPM: 64, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 12, newTime: 6, BPM: 128, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 24, newTime: 18, BPM: 256, beatsPerBar: 4, metronomeOffset: 4 },
   ]);
});

Deno.test('BPM create instance from static create', () => {
   const bpm0 = TimeProcessor.create(128);
   assertEquals(bpm0.value, 128);
   assertEquals(bpm0.offset, 0);
   assertEquals(bpm0.timescale, []);
   assertEquals(bpm0.change, []);

   const bpm1 = TimeProcessor.create(128, []);
   assertEquals(bpm1.value, 128);
   assertEquals(bpm1.offset, 0);
   assertEquals(bpm1.timescale, []);
   assertEquals(bpm1.change, []);

   const bpm2 = TimeProcessor.create(
      128,
      [
         { b: 0, m: 64 },
         { time: 12, bpm: 128 },
      ],
      123,
   );
   assertEquals(bpm2.value, 128);
   assertAlmostEquals(bpm2.offset, 123, EPSILON);
   assertEquals(bpm2.timescale, [
      { time: 0, scale: 2 },
      { time: 12, scale: 1 },
   ]);
   assertEquals(bpm2.change, []);

   const bpm3 = TimeProcessor.create(
      128,
      [
         { _time: 0, _BPM: 64, _beatsPerBar: 4, _metronomeOffset: 4 },
         { b: 12, m: 128, p: 4, o: 4 },
         {
            _time: 24,
            _bpm: 256,
            _beatsPerBar: 4,
            _metronomeOffset: 4,
         } as types.v2.IBPMChangeOld,
      ],
      123,
   );
   assertEquals(bpm3.value, 128);
   assertAlmostEquals(bpm3.offset, 123, EPSILON);
   assertEquals(bpm3.timescale, []);
   assertEquals(bpm3.change, [
      { time: 0, newTime: 0, BPM: 64, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 12, newTime: 6, BPM: 128, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 24, newTime: 18, BPM: 256, beatsPerBar: 4, metronomeOffset: 4 },
   ]);
});

Deno.test('BPM getter/setter', () => {
   const bpm = TimeProcessor.create(
      128,
      [
         { _time: 0, _BPM: 64, _beatsPerBar: 4, _metronomeOffset: 4 },
         { b: 12, m: 128, p: 4, o: 4 },
         {
            _time: 24,
            _bpm: 256,
            _beatsPerBar: 4,
            _metronomeOffset: 4,
         } as types.v2.IBPMChangeOld,
      ],
      123,
   );

   bpm.value = 120;
   bpm.offset = 100;
   bpm.timescale = [
      { b: 0, m: 60 },
      { time: 12, bpm: 120 },
      { time: 24, scale: 0.5 },
   ];
   bpm.change = [
      { _time: 0, _BPM: 60, _beatsPerBar: 4, _metronomeOffset: 4 },
      { b: 12, m: 120, p: 4, o: 4 },
      {
         _time: 24,
         _bpm: 240,
         _beatsPerBar: 4,
         _metronomeOffset: 4,
      } as types.v2.IBPMChangeOld,
   ];

   assertEquals(bpm.value, 120);
   assertAlmostEquals(bpm.offset, 100, EPSILON);
   assertEquals(bpm.timescale, [
      { time: 0, scale: 2 },
      { time: 12, scale: 1 },
      { time: 24, scale: 0.5 },
   ]);
   assertEquals(bpm.change, [
      { time: 0, newTime: 0, BPM: 60, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 12, newTime: 6, BPM: 120, beatsPerBar: 4, metronomeOffset: 4 },
      { time: 24, newTime: 18, BPM: 240, beatsPerBar: 4, metronomeOffset: 4 },
   ]);
});

Deno.test('BPM adjust beat time', () => {
   const bpm = new TimeProcessor(
      120,
      [{ _time: 10, _BPM: 60, _beatsPerBar: 4, _metronomeOffset: 4 }],
      100,
   );

   assertAlmostEquals(bpm.adjustTime(1), 0.8, EPSILON);
   assertAlmostEquals(bpm.adjustTime(16), 13, EPSILON);
});

Deno.test('BPM to JSON time', () => {
   const bpm = new TimeProcessor(
      120,
      [{ _time: 10, _BPM: 60, _beatsPerBar: 4, _metronomeOffset: 4 }],
      100,
   );

   assertAlmostEquals(bpm.toJsonTime(0.8), 1, EPSILON);
   assertAlmostEquals(bpm.toJsonTime(13), 16, EPSILON);
});

Deno.test('BPM to beat time', () => {
   const bpm = TimeProcessor.create(
      128,
      [
         { _time: 0, _BPM: 64, _beatsPerBar: 4, _metronomeOffset: 4 },
         { b: 12, m: 128, p: 4, o: 4 },
         {
            _time: 24,
            _bpm: 256,
            _beatsPerBar: 4,
            _metronomeOffset: 4,
         } as types.v2.IBPMChangeOld,
      ],
      123,
   );

   bpm.value = 120;
   bpm.offset = 100;
   bpm.timescale = [
      { b: 0, m: 60 },
      { time: 12, bpm: 120 },
      { time: 24, scale: 0.5 },
   ];
   bpm.change = [
      { _time: 0, _BPM: 60, _beatsPerBar: 4, _metronomeOffset: 4 },
      { b: 12, m: 120, p: 4, o: 4 },
      {
         _time: 24,
         _bpm: 240,
         _beatsPerBar: 4,
         _metronomeOffset: 4,
      } as types.v2.IBPMChangeOld,
   ];

   assertAlmostEquals(bpm.toBeatTime(20, true), 32, EPSILON);
   assertAlmostEquals(bpm.toBeatTime(20, false), 40, EPSILON);
});

Deno.test('BPM to real time', () => {
   const bpm = TimeProcessor.create(
      128,
      [
         { _time: 0, _BPM: 64, _beatsPerBar: 4, _metronomeOffset: 4 },
         { b: 12, m: 128, p: 4, o: 4 },
         {
            _time: 24,
            _bpm: 256,
            _beatsPerBar: 4,
            _metronomeOffset: 4,
         } as types.v2.IBPMChangeOld,
      ],
      123,
   );

   bpm.value = 120;
   bpm.offset = 100;
   bpm.timescale = [
      { b: 0, m: 60 },
      { time: 12, bpm: 120 },
      { time: 24, scale: 0.5 },
   ];
   bpm.change = [
      { _time: 0, _BPM: 60, _beatsPerBar: 4, _metronomeOffset: 4 },
      { b: 12, m: 120, p: 4, o: 4 },
      {
         _time: 24,
         _bpm: 240,
         _beatsPerBar: 4,
         _metronomeOffset: 4,
      } as types.v2.IBPMChangeOld,
   ];

   assertAlmostEquals(bpm.toRealTime(20, true), 16, EPSILON);
   assertAlmostEquals(bpm.toRealTime(20, false), 10, EPSILON);
});

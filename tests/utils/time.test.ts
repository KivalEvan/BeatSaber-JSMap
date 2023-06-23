import * as time from '../../utils/time.ts';
import { assertEquals } from '../deps.ts';

Deno.test('Second to MMSS string', () => {
   assertEquals(time.toMmss(60), '1:00');
   assertEquals(time.toMmss(30.5), '0:30');
   assertEquals(time.toMmss(101), '1:41');
   assertEquals(time.toMmss(-0), '0:00');
   assertEquals(time.toMmss(-5), '-0:05');
   assertEquals(time.toMmss(-5.25), '-0:06');
});

Deno.test('Second to MMSSMS string', () => {
   assertEquals(time.toMmssms(60), '1:00.000');
   assertEquals(time.toMmssms(30.5153), '0:30.515');
   assertEquals(time.toMmssms(101), '1:41.000');
   assertEquals(time.toMmssms(-0), '0:00.000');
   assertEquals(time.toMmssms(-5), '-0:05.000');
   assertEquals(time.toMmssms(-5.25), '-0:05.250');
});

Deno.test('Minute to HHMMSS string', () => {
   assertEquals(time.toHhmmss(60), '1:00:00');
   assertEquals(time.toHhmmss(30.5), '0:30:30');
   assertEquals(time.toHhmmss(101), '1:41:00');
   assertEquals(time.toHhmmss(-0), '0:00:00');
   assertEquals(time.toHhmmss(-5), '-0:05:00');
   assertEquals(time.toHhmmss(-5.25), '-0:05:15');
});

Deno.test('MMSS string to Second', () => {
   assertEquals(time.mmssToFloat('1:00.000'), 60);
   assertEquals(time.mmssToFloat('0:30.515'), 30);
   assertEquals(time.mmssToFloat('  1:41.  000'), 101);
   assertEquals(time.mmssToFloat('0:00.000'), 0);
   assertEquals(time.mmssToFloat('-0:05.000'), -5);
   assertEquals(time.mmssToFloat('   -0:05.250  '), -5);
});

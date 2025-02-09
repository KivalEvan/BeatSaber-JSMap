import * as time from '../../src/utils/misc/time.ts';
import { assertEquals } from '../deps.ts';

Deno.test('Second to MMSS string', () => {
   assertEquals(time.secToMmss(60), '1:00');
   assertEquals(time.secToMmss(30.5), '0:30');
   assertEquals(time.secToMmss(101), '1:41');
   assertEquals(time.secToMmss(-0), '0:00');
   assertEquals(time.secToMmss(-5), '-0:05');
   assertEquals(time.secToMmss(-5.25), '-0:06');
});

Deno.test('Second to MMSSMS string', () => {
   assertEquals(time.secToMmssms(60), '1:00.000');
   assertEquals(time.secToMmssms(30.5153), '0:30.515');
   assertEquals(time.secToMmssms(101), '1:41.000');
   assertEquals(time.secToMmssms(-0), '0:00.000');
   assertEquals(time.secToMmssms(-5), '-0:05.000');
   assertEquals(time.secToMmssms(-5.25), '-0:05.250');
});

Deno.test('Minute to HHMMSS string', () => {
   assertEquals(time.minToHhmmss(60), '1:00:00');
   assertEquals(time.minToHhmmss(30.5), '0:30:30');
   assertEquals(time.minToHhmmss(101), '1:41:00');
   assertEquals(time.minToHhmmss(-0), '0:00:00');
   assertEquals(time.minToHhmmss(-5), '-0:05:00');
   assertEquals(time.minToHhmmss(-5.25), '-0:05:15');
});

Deno.test('MMSS string to Second', () => {
   assertEquals(time.mmssToSec('1:00.000'), 60);
   assertEquals(time.mmssToSec('0:30.515'), 30);
   assertEquals(time.mmssToSec('  1:41.  000'), 101);
   assertEquals(time.mmssToSec('0:00.000'), 0);
   assertEquals(time.mmssToSec('-0:05.000'), -5);
   assertEquals(time.mmssToSec('   -0:05.250  '), -5);
});

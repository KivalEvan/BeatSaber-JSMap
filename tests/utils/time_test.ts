import * as time from '../../utils/time.ts';
import { assertEquals } from '../deps.ts';

Deno.test('To MMSS string', () => {
    const time1 = time.toMmss(60);
    const time2 = time.toMmss(30.5);
    const time3 = time.toMmss(101);
    const time4 = time.toMmss(-0);
    const time5 = time.toMmss(-5);
    const time6 = time.toMmss(-5.25);

    assertEquals(time1, '1:00');
    assertEquals(time2, '0:30');
    assertEquals(time3, '1:41');
    assertEquals(time4, '0:00');
    assertEquals(time5, '-0:05');
    assertEquals(time6, '-0:06');
});

Deno.test('To MMSSMS string', () => {
    const time1 = time.toMmssms(60);
    const time2 = time.toMmssms(30.5153);
    const time3 = time.toMmssms(101);
    const time4 = time.toMmssms(-0);
    const time5 = time.toMmssms(-5);
    const time6 = time.toMmssms(-5.25);

    assertEquals(time1, '1:00.000');
    assertEquals(time2, '0:30.515');
    assertEquals(time3, '1:41.000');
    assertEquals(time4, '0:00.000');
    assertEquals(time5, '-0:05.000');
    assertEquals(time6, '-0:05.250');
});

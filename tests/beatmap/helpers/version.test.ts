import { assertEquals, compareVersion } from '../../deps.ts';

Deno.test('Compare version', () => {
   assertEquals(compareVersion('3.2.0', '3.0.0'), 1);
   assertEquals(compareVersion('2.6.0', '3.0.0'), -1);
   assertEquals(compareVersion('3.3.0', '3.3.0'), 0);
   assertEquals(compareVersion('3.0.0', '2.0.0'), 1);
});

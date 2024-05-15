import * as version from '../../../beatmap/helpers/version.ts';
import { assertEquals } from '../../deps.ts';

Deno.test('Compare version', () => {
   assertEquals(version.compareVersion('3.2.0', '3.0.0'), 1);
   assertEquals(version.compareVersion('2.6.0', '3.0.0'), -1);
   assertEquals(version.compareVersion('3.3.0', '3.3.0'), 0);
   assertEquals(version.compareVersion('3.0.0', '2.0.0'), 1);
});

import * as version from '../../../beatmap/shared/version.ts';
import { assertEquals } from '../../deps.ts';

Deno.test('Compare version', () => {
   assertEquals(version.compareVersion('3.2.0', '3.0.0'), 'new');
   assertEquals(version.compareVersion('2.6.0', '3.0.0'), 'old');
   assertEquals(version.compareVersion('3.3.0', '3.3.0'), 'current');
   assertEquals(version.compareVersion('3.0.0', '2.0.0'), 'new');
});

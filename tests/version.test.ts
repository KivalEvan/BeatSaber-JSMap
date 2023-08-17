import * as version from '../version.ts';
import { assertEquals } from './deps.ts';

Deno.test('Is latest test version', () => {
   assertEquals(version.string, '1.4.2');
});

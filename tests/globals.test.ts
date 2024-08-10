import { path } from '../src/shims/path.ts';
import { assertEquals, globals } from './deps.ts';

Deno.test('Set global directory', () => {
   globals.directory = '';
   assertEquals(globals.directory, path.resolve(''));

   globals.directory = './start';
   assertEquals(globals.directory, path.resolve('./start/'));
});

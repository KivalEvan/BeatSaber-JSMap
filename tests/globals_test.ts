import globals from '../globals.ts';
import { assertEquals } from './deps.ts';

Deno.test('Set global directory', () => {
    globals.directory = '';
    assertEquals(globals.directory, './');

    globals.directory = './start';
    assertEquals(globals.directory, './start/');
});

Deno.test('Set global log level', () => {
    globals.logLevel = 0;
    assertEquals(globals.logLevel, 0);

    globals.logLevel = 1;
    assertEquals(globals.logLevel, 1);

    globals.logLevel = 2;
    assertEquals(globals.logLevel, 2);

    globals.logLevel = 3;
    assertEquals(globals.logLevel, 3);

    globals.logLevel = 4;
    assertEquals(globals.logLevel, 4);

    globals.logLevel = 5;
    assertEquals(globals.logLevel, 5);

    globals.logLevel = -1;
    assertEquals(globals.logLevel, 0);

    globals.logLevel = 6;
    assertEquals(globals.logLevel, 5);
});

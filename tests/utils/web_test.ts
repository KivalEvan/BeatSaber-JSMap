import * as web from '../../utils/web.ts';
import { assertEquals, assertThrows } from '../deps.ts';

Deno.test('Sanitize URL', () => {
    assertEquals(
        web.sanitizeUrl('https://beatsaver.com/maps/2c663'),
        'https://beatsaver.com/maps/2c663',
    );
    assertEquals(
        web.sanitizeUrl('http://beatsaver.com/maps/2b298'),
        'https://beatsaver.com/maps/2b298',
    );
    assertThrows(() => web.sanitizeUrl(''));
    assertThrows(() => web.sanitizeUrl('not a url'));
    assertThrows(() => web.sanitizeUrl('file:///why/not/file'));
});

Deno.test('Sanitize BeatSaver ID', () => {
    assertEquals(web.sanitizeBeatSaverId('ff9'), 'ff9');
    assertEquals(web.sanitizeBeatSaverId('!bsr b4c'), 'b4c');
    assertEquals(web.sanitizeBeatSaverId('  AeF2 '), 'AeF2');
    assertThrows(() => web.sanitizeBeatSaverId(''));
    assertThrows(() => web.sanitizeBeatSaverId('abcdefa'));
    assertThrows(() => web.sanitizeBeatSaverId('XD'));
});

import { assertEquals, compareVersion, parseMajorVersion, retrieveVersion } from '../../deps.ts';

Deno.test('Compare version', () => {
   assertEquals(compareVersion('3.2.0', '3.0.0'), 1);
   assertEquals(compareVersion('2.6.0', '3.0.0'), -1);
   assertEquals(compareVersion('3.3.0', '3.3.0'), 0);
   assertEquals(compareVersion('3.0.0', '2.0.0'), 1);
});

Deno.test('Retrieve raw version', () => {
   assertEquals(retrieveVersion({}), undefined);
   assertEquals(retrieveVersion({ _version: null }), null);
   assertEquals(retrieveVersion({ version: '2.6.0' }), '2.6.0');
   assertEquals(retrieveVersion({ version: 2 }), 2);
   assertEquals(retrieveVersion({ _version: null, version: '2.6.0' }), null);
});

Deno.test('Parse major version', () => {
   assertEquals(parseMajorVersion('2.6.0'), 2);
   assertEquals(parseMajorVersion('00000000002.6.0'), 2);
   assertEquals(parseMajorVersion('2'), undefined);
   assertEquals(parseMajorVersion('2junk'), undefined);
});

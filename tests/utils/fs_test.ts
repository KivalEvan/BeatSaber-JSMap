import * as fs from '../../utils/fs.ts';
import { assert, assertEquals } from '../deps.ts';

Deno.test({
    name: 'Exist',
    permissions: { read: 'inherit' },
    fn: async () => {
        assert(await fs.exists('./tests/deps.ts'));
        assert(!(await fs.exists('./tests/mod.ts')));
    },
});

Deno.test({
    name: 'Exist Sync',
    permissions: { read: 'inherit' },
    fn: () => {
        assert(fs.existsSync('./tests/deps.ts'));
        assert(!fs.existsSync('./tests/mod.ts'));
    },
});

Deno.test({
    name: 'Sanitize Directory',
    fn: () => {
        assertEquals(fs.sanitizeDir(''), './');
        assertEquals(fs.sanitizeDir('    .  '), './');
        assertEquals(fs.sanitizeDir(' blazeit  '), 'blazeit/');
        assertEquals(fs.sanitizeDir('/home/kival'), '/home/kival/');
    },
});

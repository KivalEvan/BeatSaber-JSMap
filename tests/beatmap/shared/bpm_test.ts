import { assertEquals, BeatPerMinute } from '../../deps.ts';

Deno.test({
    name: 'Create BPM instance',
    fn() {
        const be = BeatPerMinute.create(128);
        assertEquals(be.value, 128);
    },
});

Deno.test({
    name: 'Create Basic Event from data',
    fn() {
        const be = bsmap.v3.BasicEvent.create({ b: 1, et: 5, i: 1, f: 0.5 })[0];
        assertEquals(be.time, 1);
        assertEquals(be.type, 5);
        assertEquals(be.value, 1);
        assertEquals(be.floatValue, 0.5);
    },
});

Deno.test({
    name: 'Create Basic Event from partial data',
    fn() {
        const be = bsmap.v3.BasicEvent.create({ b: 4, et: 2 })[0];
        assertEquals(be.time, 4);
        assertEquals(be.type, 2);
        assertEquals(be.value, 0);
        assertEquals(be.floatValue, 1);
    },
});

import { assert, assertEquals, type v4 } from './deps.ts';

type JsonRecord = Record<string, unknown>;

// Strict keys, array lengths/order and primitive values, with only the default
// save's eight-decimal numeric trim allowance. In particular, custom-data zero,
// false, empty strings and nested arrays are not treated as missing values.
export function assertFixtureJson(actual: unknown, expected: unknown, path = 'fixture'): void {
   if (typeof expected === 'number') {
      assert(typeof actual === 'number', `${path}: expected number`);
      assert(Math.abs(actual - expected) <= 1e-8, `${path}: ${actual} != ${expected}`);
      return;
   }
   if (Array.isArray(expected)) {
      assert(Array.isArray(actual), `${path}: expected array`);
      assertEquals(actual.length, expected.length, `${path}.length`);
      expected.forEach((value, i) => assertFixtureJson(actual[i], value, `${path}[${i}]`));
      return;
   }
   if (expected !== null && typeof expected === 'object') {
      assert(actual !== null && typeof actual === 'object' && !Array.isArray(actual), path);
      assertEquals(Object.keys(actual).sort(), Object.keys(expected).sort(), `${path}: keys`);
      for (const [key, value] of Object.entries(expected)) {
         assertFixtureJson((actual as JsonRecord)[key], value, `${path}.${key}`);
      }
      return;
   }
   assertEquals(actual, expected, path);
}

// Explicit v4 scalar defaults, restricted to the corresponding schema records.
// Unknown fields remain present and are compared, never silently discarded.
const noteDefaults = { x: 0, y: 0, c: 0, d: 0, a: 0 };
const filterDefaults = { f: 1, p: 0, t: 0, r: 0, c: 0, n: 0, s: 0, l: 0, d: 0 };
const boxDefaults = { w: 0, d: 1, s: 0, t: 1, b: 0, e: 0 };
const lightTables = [
   ['lightColorEventBoxes', 'lightColorEvents', boxDefaults, {
      e: 0,
      p: 0,
      c: 0,
      b: 0,
      f: 0,
      sb: 0,
      sf: 0,
   }],
   ['lightRotationEventBoxes', 'lightRotationEvents', { ...boxDefaults, a: 0, f: 0 }, {
      p: 0,
      e: 0,
      r: 0,
      d: 0,
      l: 0,
   }],
   ['lightTranslationEventBoxes', 'lightTranslationEvents', { ...boxDefaults, a: 0, f: 0 }, {
      p: 0,
      e: 0,
      t: 0,
   }],
   ['fxEventBoxes', 'floatFxEvents', boxDefaults, { p: 0, e: 0, v: 0 }],
] as const;

function record(value: unknown, path: string): JsonRecord {
   assert(value !== null && typeof value === 'object' && !Array.isArray(value), path);
   return value as JsonRecord;
}

function withDefaults(value: unknown, defaults: JsonRecord, path: string): JsonRecord {
   const result = { ...defaults, ...record(value, path) };
   // Only the optional schema customData container may be omitted when empty.
   // Nonempty customData is compared recursively without dropping any fields.
   if ('customData' in result) {
      const customData = record(result.customData, `${path}.customData`);
      if (Object.keys(customData).length === 0) delete result.customData;
   }
   return result;
}

// Resolve references while tracking table use. Both source and output must
// actually contain all arrays, valid indices and no unexamined table rows.
// Table order, duplicate rows and numeric indices are representation details.
class FixtureTables {
   readonly used = new Map<string, Set<number>>();

   constructor(readonly root: JsonRecord) {}

   array(key: string): unknown[] {
      const value = this.root[key];
      assert(Array.isArray(value), `${key}: required fixture array`);
      return value;
   }

   get(key: string, index: unknown): unknown {
      const table = this.array(key);
      const i = index === undefined ? 0 : index;
      assert(
         typeof i === 'number' && Number.isInteger(i) && i >= 0 && i < table.length,
         `${key}[${i}]: invalid fixture reference`,
      );
      if (!this.used.has(key)) this.used.set(key, new Set());
      this.used.get(key)!.add(i);
      return table[i];
   }

   indexed(objects: unknown, dataKey: string, defaults: JsonRecord, lane = false): JsonRecord[] {
      assert(Array.isArray(objects), `${dataKey}: required reference array`);
      return objects.map((value) => {
         const { i, ...placement } = record(value, dataKey);
         return {
            placement: withDefaults(placement, lane ? { b: 0, r: 0 } : { b: 0 }, dataKey),
            data: withDefaults(this.get(dataKey, i), defaults, dataKey),
         };
      });
   }

   finish(output: JsonRecord, tableKeys: string[]): JsonRecord {
      for (const key of tableKeys) {
         assertEquals(
            this.used.get(key)?.size ?? 0,
            this.array(key).length,
            `${key}: every source/output table row must be referenced`,
         );
         delete output[key];
      }
      return output;
   }
}

function resolvedDifficulty(data: v4.IDifficulty): JsonRecord {
   const output = withDefaults(data, {}, 'difficulty');
   const tables = new FixtureTables(output);
   const tableKeys = [
      'colorNotesData',
      'bombNotesData',
      'obstaclesData',
      'njsEventData',
      'arcsData',
      'chainsData',
   ];
   for (
      const [key, dataKey, defaults, lane] of [
         ['colorNotes', 'colorNotesData', noteDefaults, true],
         ['bombNotes', 'bombNotesData', { x: 0, y: 0 }, true],
         ['obstacles', 'obstaclesData', { x: 0, y: 0, d: 0, w: 0, h: 0 }, true],
         ['njsEvents', 'njsEventData', { p: 0, e: 0, d: 0 }, false],
      ] as const
   ) {
      output[key] = tables.indexed(tables.array(key), dataKey, defaults, lane);
   }
   output.arcs = tables.array('arcs').map((value) => {
      const { hi, ti, ai, ...placement } = record(value, 'arc');
      const head = withDefaults(tables.get('colorNotesData', hi), noteDefaults, 'arc.head');
      const tail = withDefaults(tables.get('colorNotesData', ti), noteDefaults, 'arc.tail');
      // Arc geometry has one color and no note angle-offset properties.
      // All other head/tail fields (including any custom data) remain protected.
      delete head.a;
      delete tail.a;
      delete tail.c;
      return {
         placement: withDefaults(placement, { hb: 0, tb: 0, hr: 0, tr: 0 }, 'arc'),
         head,
         tail,
         data: withDefaults(tables.get('arcsData', ai), { m: 0, tm: 0, a: 0 }, 'arc.data'),
      };
   });
   output.chains = tables.array('chains').map((value) => {
      const { i, ci, ...placement } = record(value, 'chain');
      const head = withDefaults(tables.get('colorNotesData', i), noteDefaults, 'chain.head');
      delete head.a; // Chains likewise do not have a note angle-offset property.
      return {
         placement: withDefaults(placement, { hb: 0, tb: 0, hr: 0, tr: 0 }, 'chain'),
         head,
         data: withDefaults(
            tables.get('chainsData', ci),
            { tx: 0, ty: 0, c: 0, s: 0 },
            'chain.data',
         ),
      };
   });
   // These 4.1 fixtures have no legacy spawn-rotation tables. Do not quietly
   // treat future populated tables as covered by this fixture-specific helper.
   assert(!('spawnRotations' in output) && !('spawnRotationsData' in output));
   return tables.finish(output, tableKeys);
}

export function assertV4DifficultyFidelity(saved: v4.IDifficulty, source: v4.IDifficulty): void {
   assertFixtureJson(resolvedDifficulty(saved), resolvedDifficulty(source), 'v4 difficulty');
}

function resolvedLightshow(data: v4.ILightshow): JsonRecord {
   const output = withDefaults(data, {}, 'lightshow');
   const tables = new FixtureTables(output);
   for (
      const [key, dataKey, defaults, lane] of [
         ['basicEvents', 'basicEventsData', { t: 0, i: 0, f: 0 }, false],
         ['colorBoostEvents', 'colorBoostEventsData', { b: 0 }, false],
         ['waypoints', 'waypointsData', { x: 0, y: 0, d: 0 }, true],
      ] as const
   ) {
      output[key] = tables.indexed(tables.array(key), dataKey, defaults, lane);
   }
   // Serialization can regroup by event-box kind. Preserve order within each
   // kind (including equal-beat groups), while checking all groups exactly once.
   const groups = tables.array('eventBoxGroups').map((g) => record(g, 'eventBoxGroup'));
   for (const group of groups) assert([1, 2, 3, 4].includes(group.t as number));
   output.eventBoxGroups = lightTables.map(([boxKey, eventKey, boxDefault, eventDefault], i) =>
      groups.filter((g) => g.t === i + 1).map(({ e, ...group }) => {
         assert(Array.isArray(e), 'group.e: required boxes');
         return {
            ...withDefaults(group, { b: 0, g: 0 }, 'group'),
            e: e.map((value) => {
               const { f, e: boxIndex, l, ...reference } = record(value, 'box reference');
               return {
                  reference: withDefaults(reference, {}, 'box reference'),
                  filter: withDefaults(tables.get('indexFilters', f), filterDefaults, 'filter'),
                  data: withDefaults(tables.get(boxKey, boxIndex), boxDefault, boxKey),
                  events: tables.indexed(l, eventKey, eventDefault),
               };
            }),
         };
      })
   );
   return tables.finish(output, [
      'basicEventsData',
      'colorBoostEventsData',
      'waypointsData',
      'indexFilters',
      ...lightTables.flatMap(([boxes, events]) => [boxes, events]),
   ]);
}

export function assertV4LightshowFidelity(saved: v4.ILightshow, source: v4.ILightshow): void {
   assertFixtureJson(resolvedLightshow(saved), resolvedLightshow(source), 'v4 lightshow');
}

// Used only by the explicitly modified-fixture ownership case. The payload is
// injected into real shared table records, not presented as authored map data.
export function assertNestedProbeOwnership(
   source: { values: number[] },
   copies: { values: number[] }[],
   transfers: { values: number[] }[],
   serialized: { values: number[] }[],
): void {
   assertEquals(source, { values: [1, 2] });
   for (const copy of [...copies, ...serialized]) {
      assertEquals(copy, source);
      assert(copy !== source);
      assert(copy.values !== source.values);
   }
   for (const transfer of transfers) {
      assert(transfer === source);
      assert(transfer.values === source.values);
   }
   serialized[0].values[0] = 3;
   assertEquals(source.values, [1, 2]);
   for (const copy of copies) assertEquals(copy.values, [1, 2]);
   for (const output of serialized.slice(1)) assertEquals(output.values, [1, 2]);
   copies[0].values[0] = 4;
   assertEquals(source.values, [1, 2]);
   for (const copy of copies.slice(1)) assertEquals(copy.values, [1, 2]);
   transfers[0].values[0] = 5;
   assertEquals(source.values, [5, 2]);
   for (const transfer of transfers) assertEquals(transfer.values, [5, 2]);
   assertEquals(serialized[0].values, [3, 2]);
   assertEquals(copies[0].values, [4, 2]);
}

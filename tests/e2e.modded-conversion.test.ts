import {
   assert,
   assertEquals,
   assertExists,
   assertThrows,
   loadDifficulty,
   loadLightshow,
   saveDifficulty,
   type v2,
   type v3,
   type v4,
} from './deps.ts';
import { assertFixtureJson } from './fixtureAssertions.ts';
import { hasMappingExtensionsObstacleV2 } from '../src/beatmap/helpers/modded/has.ts';
import { compatDifficulty as compatV1 } from '../src/beatmap/schema/v1/compat/difficulty.ts';
import { compatDifficulty as compatV2 } from '../src/beatmap/schema/v2/compat/difficulty.ts';
import {
   trackAnimationToV2,
   trackAnimationToV3,
} from '../src/beatmap/converter/customData/trackAnimation.ts';

Deno.test('E2E synthetic v4 arcs retain unequal endpoint rotations through v2.6', () => {
   const source: v4.IDifficulty = {
      version: '4.1.0',
      arcs: [
         { hb: 1, hr: 15, tb: 1.5, tr: 30, ti: 1 },
         { hb: 2, hr: 45, tb: 2.5, tr: -15, ti: 1 },
      ],
      arcsData: [{ m: 1, tm: 1, a: 0 }],
      colorNotesData: [{ x: 1, y: 0, c: 0, d: 1 }, { x: 2, y: 1, c: 0, d: 3 }],
   };
   const original = JSON.stringify(source);
   const loaded = loadDifficulty(source, 4);
   const expectedArcs = structuredClone(loaded.difficulty.arcs);
   const saved = JSON.parse(JSON.stringify(saveDifficulty(loaded, 2))) as v2.IDifficulty;
   assertEquals(saved._sliders?.length, 2);
   const intermediate = loadDifficulty(saved, 2);
   for (const arc of source.arcs!) {
      for (const [beat, expected] of [[arc.hb!, arc.hr!], [arc.tb!, arc.tr!]]) {
         const rotation = intermediate.difficulty.rotationEvents.reduce(
            (sum, event) => sum + (event.time <= beat ? event.rotation : 0),
            0,
         );
         assertEquals(rotation, expected, `v2 arc endpoint at beat ${beat}`);
      }
   }
   const returned = loadDifficulty(saved, 4);
   assertFixtureJson(returned.difficulty.arcs, expectedArcs);
   assertEquals(JSON.stringify(source), original);
});

Deno.test('v2 wall detection distinguishes full/crouch walls from Mapping Extensions', () => {
   const options = { enabled: true, throwOn: { mappingExtensions: true } };
   const cases = [[0, 0, 5], [1, 2, 3], [404201, 2000, 3000], [204001, 1000, 2000]];
   for (const [type, posY, height] of cases) {
      const beatmap = loadDifficulty({
         _version: '2.6.0',
         _obstacles: [{ _type: type, _lineIndex: 1, _width: 2 }],
      }, 2);
      const wall = beatmap.difficulty.obstacles[0];
      assertEquals([wall.posY, wall.height], [posY, height]);
      assertEquals(hasMappingExtensionsObstacleV2(wall), type !== 0 && type !== 1);
      if (type === 0 || type === 1) {
         compatV2(beatmap, options);
         compatV1(beatmap, options);
      } else {
         assertThrows(() => compatV2(beatmap, options), Error, 'Mapping Extensions');
         assertThrows(() => compatV1(beatmap, options), Error, 'Mapping Extensions');
      }
      for (
         const extension of [
            { posX: -1500 },
            { width: 2500 },
            { posY: 2500 },
            { height: 12500 },
            { posY: 0.5 },
            { height: 1.5 },
         ]
      ) {
         const extended = { ...wall, ...extension };
         assertEquals(hasMappingExtensionsObstacleV2(extended), true);
         beatmap.difficulty.obstacles = [extended];
         assertThrows(() => compatV2(beatmap, options), Error, 'Mapping Extensions');
      }
   }
});

Deno.test('E2E modified v2 wall dimensions retain Mapping Extensions fractional precision encoding', () => {
   const beatmap = loadDifficulty({
      _version: '2.6.0',
      _obstacles: [{ _type: 0, _lineIndex: 1, _width: 2 }],
   }, 2);
   beatmap.difficulty.obstacles[0].posY = 0.5;
   beatmap.difficulty.obstacles[0].height = 1.5;
   const saved = saveDifficulty(beatmap, 2);
   const wall = saved._obstacles![0];
   assertEquals(wall._type, 304101);
   assert(!('_lineLayer' in wall) && !('_height' in wall));
   const returned = loadDifficulty(saved, 2).difficulty.obstacles[0];
   assertEquals((returned.posY - 1000) / 1000, 0.5);
   assertEquals((returned.height - 1000) / 1000, 1.5);
});

Deno.test('track-animation conversion retains established key order and destination overrides', () => {
   const base: v2.ICustomEventDataAnimateTrack & { opaque: object } = {
      _track: 'note',
      _duration: 2,
      _easing: 'easeLinear' as const,
      _position: [[1, 2, 3, 0]],
      _rotation: [[10, 20, 30, 0]],
      _localRotation: [[0, 0, 0, 0]],
      _scale: [[1, 1, 1, 0]],
      _dissolve: [[1, 0]],
      _dissolveArrow: [[0, 0]],
      _color: [[1, 0, 0, 1, 0]],
      _interactable: [[1, 0]],
      opaque: { zero: 0, disabled: false },
   };
   for (const path of [false, true]) {
      const data = {
         ...base,
         ...(path ? { _definitePosition: [[4, 5, 6, 0]] } : { _time: [[0, 0]] }),
      } as v2.ICustomEventDataAnimateTrack;
      const modern = json(trackAnimationToV3(data, new Set(), {}, path));
      const keys = [
         'track',
         'duration',
         'easing',
         'offsetPosition',
         'offsetWorldRotation',
         'localRotation',
         'scale',
         'dissolve',
         'dissolveArrow',
         'color',
         'interactable',
         path ? 'definitePosition' : 'time',
         'opaque',
      ];
      assertEquals(Object.keys(modern), keys);
      const legacy = json(trackAnimationToV2(modern, {}, path));
      assertEquals(
         Object.keys(legacy),
         keys.map((key) =>
            key === 'opaque'
               ? key
               : key === 'offsetPosition'
               ? '_position'
               : key === 'offsetWorldRotation'
               ? '_rotation'
               : `_${key}`
         ),
      );
      assertFixtureJson(legacy, data);
   }
   const transform = { ...base, _track: 'environment' } as v2.ICustomEventDataAnimateTrack;
   const modern = json(trackAnimationToV3(transform, new Set(['environment']), {}));
   assertEquals(Object.keys(modern).slice(0, 5), [
      'track',
      'duration',
      'easing',
      'position',
      'rotation',
   ]);
   const overridden = {
      ...transform,
      track: 'preferred',
      position: [[9, 8, 7, 0]],
      rotation: [[6, 5, 4, 0]],
   };
   const result = trackAnimationToV3(overridden, new Set(['environment']), {});
   assertEquals(result.track, 'preferred');
   assertFixtureJson(result.position, overridden.position);
   assertFixtureJson(result.rotation, overridden.rotation);
   const legacyOverrides = {
      ...modern,
      _track: 'preferred',
      _position: [[9, 8, 7, 0]],
      _rotation: [[6, 5, 4, 0]],
   };
   const returned = trackAnimationToV2(legacyOverrides, {});
   assertEquals(returned._track, 'preferred');
   assertFixtureJson(returned._position, legacyOverrides._position);
   assertFixtureJson(returned._rotation, legacyOverrides._rotation);
});

const directory = './tests/resources/examples';
type RecordData = Record<string, unknown>;

function readFixture<T>(path: string): T {
   return JSON.parse(Deno.readTextFileSync(`${directory}/${path}`));
}

function json<T>(value: T): T {
   return JSON.parse(JSON.stringify(value));
}

function record(value: unknown): RecordData {
   assert(value !== null && typeof value === 'object' && !Array.isArray(value));
   return value as RecordData;
}

// Only declared protocol keys are renamed. In particular, authored typos and
// arbitrary nested metadata are retained, rather than silently normalizing loss.
function renamed(value: object, names: Record<string, string>): RecordData {
   return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [names[key] ?? key, child]),
   );
}

function unprefixed(names: string): Record<string, string> {
   return Object.fromEntries(names.split(' ').map((name) => [`_${name}`, name]));
}

const animationNames = {
   ...unprefixed(
      'color definitePosition dissolve dissolveArrow interactable localRotation scale time',
   ),
   _position: 'offsetPosition',
   _rotation: 'offsetWorldRotation',
};

function objectCustomData(value: RecordData = {}, wall = false): RecordData {
   const { _fake, _cutDirection, _disableSpawnEffect, _interactable, _animation, ...rest } = value;
   const result = renamed(rest, {
      ...unprefixed(
         'color disableNoteGravity disableNoteLook flip localRotation noteJumpMovementSpeed noteJumpStartBeatOffset track',
      ),
      _position: 'coordinates',
      _rotation: 'worldRotation',
      _scale: wall ? 'size' : 'scale',
   });
   if (_disableSpawnEffect !== undefined) result.spawnEffect = !_disableSpawnEffect;
   if (_interactable !== undefined) result.uninteractable = !_interactable;
   if (_animation !== undefined) result.animation = renamed(record(_animation), animationNames);
   return result;
}

function eventCustomData(value: RecordData = {}): RecordData {
   const { _preciseSpeed, _speed, ...rest } = value;
   const result = renamed(rest, {
      ...unprefixed('color lightID easing lerpType nameFilter rotation step prop direction'),
      _lockPosition: 'lockRotation',
   });
   if (_preciseSpeed !== undefined || _speed !== undefined) result.speed = _preciseSpeed ?? _speed;
   return result;
}

function scaledPosition(value: unknown, factor: number): unknown {
   assert(
      Array.isArray(value),
      'These fixtures use inline positions, not shared position references',
   );
   return value.map((part, i) =>
      Array.isArray(part)
         ? part.map((component, j) => j < 3 ? Number(component) * factor : component)
         : i < 3
         ? Number(part) * factor
         : part
   );
}

// Contracts: heck.aeroluna.dev/items/{objects,events}/ and animation/properties/.
// Heck's v2 property aliases feed BOTH Noodle offsets and TransformController
// transforms. These fixtures have disjoint note and transform tracks, so only
// the meaningful property is required. Transform positions use meters in v3,
// while v2 and Noodle offsetPosition use lane widths (0.6 m).
// See Heck/Animation/Transform/{TransformData,TransformController}.cs upstream.
function legacyRootCustomData(value: v2.IDifficulty['_customData']): RecordData {
   const { _environment, _pointDefinitions, _customEvents, ...rest } = value ?? {};
   const points = Object.fromEntries((_pointDefinitions ?? []).map((p) => [p._name, p._points]));
   const transforms = new Set<string>();
   for (const environment of _environment ?? []) {
      if (environment._track) transforms.add(environment._track);
   }
   for (const event of _customEvents ?? []) {
      if (event._type === 'AssignPlayerToTrack') transforms.add(event._data._track as string);
      if (event._type === 'AssignTrackParent') transforms.add(event._data._parentTrack);
   }
   const result: RecordData = { ...rest };
   if (_pointDefinitions) {
      result.pointDefinitions = Object.fromEntries(
         _pointDefinitions.map((p) => [p._name, p._points]),
      );
   }
   if (_environment) {
      result.environment = _environment.map((entry) => {
         const { _lightID, ...fields } = entry;
         const environment = renamed(
            fields,
            unprefixed(
               'id lookupMethod track duplicate active scale position rotation localPosition localRotation',
            ),
         );
         for (const key of ['position', 'localPosition']) {
            if (key in environment) environment[key] = scaledPosition(environment[key], 0.6);
         }
         if (_lightID !== undefined) {
            environment.components = { ILightWithId: { lightID: _lightID } };
         }
         return environment;
      });
   }
   if (_customEvents) {
      result.customEvents = _customEvents.map((event) => {
         const data = record(event._data);
         const tracks = Array.isArray(data._track) ? data._track : [data._track];
         const transform = event._type === 'AnimateTrack' && tracks.some((t) => transforms.has(t));
         assert(
            !transform || tracks.every((t) => transforms.has(t)),
            'No mixed track units in oracle',
         );
         const d = renamed(data, {
            ...unprefixed(
               'track duration easing localRotation scale dissolve dissolveArrow color interactable time definitePosition childrenTracks parentTrack worldPositionStays target',
            ),
            _position: transform ? 'position' : 'offsetPosition',
            _rotation: transform ? 'rotation' : 'offsetWorldRotation',
         });
         if (transform && d.position !== undefined) {
            d.position = scaledPosition(
               typeof d.position === 'string' ? points[d.position] : d.position,
               0.6,
            );
         }
         return { b: event._time, t: event._type, d };
      });
   }
   return result;
}

function echoModern(source: v2.IDifficulty): v3.IDifficulty {
   assertEquals(source._obstacles, []);
   assertEquals(source._sliders, []);
   assertEquals(source._waypoints, []);
   assertExists(source._notes);
   assert(source._notes.every((n) => (n._type ?? 0) === 0 || n._type === 1));
   function notes(fake: boolean): v3.IColorNote[] {
      return source._notes!.filter((n) => !!n._customData?._fake === fake).map((n) => ({
         b: n._time ?? 0,
         x: n._lineIndex ?? 0,
         y: n._lineLayer ?? 0,
         c: (n._type ?? 0) as 0 | 1,
         d: n._cutDirection ?? 0,
         a: 0,
         customData: objectCustomData(n._customData),
      }));
   }
   return {
      version: '3.3.0',
      colorNotes: notes(false),
      basicBeatmapEvents: source._events?.map((e) => ({
         b: e._time ?? 0,
         et: e._type ?? 0,
         i: e._value ?? 0,
         f: e._floatValue ?? 0,
         customData: eventCustomData(e._customData),
      })),
      customData: { ...legacyRootCustomData(source._customData), fakeColorNotes: notes(true) },
   };
}

function modernNote(note: v3.IColorNote, fake: boolean): RecordData {
   const customData = { ...note.customData };
   // A retained legacy flag is redundant, not a replacement for fakeColorNotes.
   if ('_fake' in customData) {
      assertEquals(customData._fake, fake);
      delete customData._fake;
   }
   return { b: 0, x: 0, y: 0, c: 0, d: 0, a: 0, ...note, customData };
}

function assertEchoPart(actual: v3.IDifficulty, expected: v3.IDifficulty, part: string): void {
   if (part === 'playable notes' || part === 'fake notes') {
      const fake = part === 'fake notes';
      const a = fake ? actual.customData?.fakeColorNotes : actual.colorNotes;
      const e = fake ? expected.customData?.fakeColorNotes : expected.colorNotes;
      assertExists(a);
      assertExists(e);
      assertFixtureJson(a.map((n) => modernNote(n, fake)), e.map((n) => modernNote(n, fake)), part);
   } else if (part === 'all lighting payloads') {
      const normalize = (data: v3.IDifficulty) =>
         data.basicBeatmapEvents?.map((e) => ({
            b: 0,
            et: 0,
            i: 0,
            f: 0,
            ...e,
            customData: e.customData ?? {},
         }));
      assertFixtureJson(normalize(actual), normalize(expected), part);
   } else {
      assertFixtureJson(actual.customData?.[part], expected.customData?.[part], part);
   }
}

Deno.test('E2E conversion: ECHO complete original mod payloads in both directions', async (t) => {
   const source = readFixture<v2.IDifficulty>('ECHO/ExpertPlusLawless.dat');
   const original = JSON.stringify(source);
   const expected = echoModern(source);
   const modernOriginal = JSON.stringify(expected);
   const upgraded = json(saveDifficulty(loadDifficulty(source, 3), 3));
   // The downgrade input comes from the authored oracle, NOT the converter's
   // output. A v2 shadow field must not be needed to recover modern fake notes.
   const downgraded = json(saveDifficulty(loadDifficulty(expected, 3), 2));
   for (
      const part of [
         'playable notes',
         'fake notes',
         'all lighting payloads',
         'pointDefinitions',
         'environment',
         'customEvents',
      ]
   ) {
      await t.step(`v2 → v3: ${part}`, () => assertEchoPart(upgraded, expected, part));
      await t.step(
         `v3 → v2: ${part}`,
         () => assertEchoPart(echoModern(downgraded), expected, part),
      );
   }
   await t.step('source JSON and all root/empty collections remain intact', () => {
      assertEquals(JSON.stringify(source), original);
      assertEquals(JSON.stringify(expected), modernOriginal);
      assertEquals(Object.keys(source._customData!).sort(), [
         '_customEvents',
         '_environment',
         '_pointDefinitions',
      ]);
      assertEquals(Object.keys(upgraded.customData!).sort(), [
         'customEvents',
         'environment',
         'fakeColorNotes',
         'pointDefinitions',
      ]);
      for (
         const key of [
            'bombNotes',
            'obstacles',
            'sliders',
            'burstSliders',
            'waypoints',
            'bpmEvents',
            'rotationEvents',
         ] as const
      ) assertEquals(upgraded[key], []);
   });
});

const permitV2Loss = {
   validate: { compatibility: { enabled: true, throwOn: { incompatibleObject: false } } },
} as const;

function schemaRecord(value: object, defaults: RecordData): RecordData {
   const result = { ...defaults, ...value };
   result.customData ??= {};
   return result;
}

function preciseLane(value: number): number {
   return Math.abs(value) < 1000 ? value : (value - Math.sign(value) * 1000) / 1000;
}

function legacyWall(wall: v2.IObstacle): RecordData {
   const { _type = 0, _customData, ...rest } = wall;
   const fields = renamed(rest, {
      _time: 'b',
      _lineIndex: 'x',
      _duration: 'd',
      _width: 'w',
   });
   if (_type === 0 || _type === 1) {
      fields.y = _type === 0 ? 0 : 2;
      fields.h = _type === 0 ? 5 : 3;
   } else {
      // Compare Mapping Extensions' packed wall dimensions in physical lane units.
      assert(_type >= 1000 && _type <= 4005000);
      fields.y = _type >= 4001 ? ((_type - 4001) % 1000) / 200 : 0;
      fields.h = (_type >= 4001 ? Math.floor((_type - 4001) / 1000) : _type - 1000) / 200;
   }
   fields.x = preciseLane(Number(fields.x ?? 0));
   fields.w = preciseLane(Number(fields.w ?? 0));
   return schemaRecord({ ...fields, customData: objectCustomData(_customData, true) }, {
      b: 0,
      x: 0,
      y: 0,
      d: 0,
      w: 0,
      h: 0,
   });
}

function modernAngle(note: v3.IColorNote): number {
   return ((clockwiseAngle({ _cutDirection: note.d }) - (note.a ?? 0)) % 360 + 360) % 360;
}

async function assertRetainedV2(
   t: Deno.TestContext,
   saved: v2.IDifficulty,
   source: v3.IDifficulty,
): Promise<void> {
   await t.step('every color-note placement, cut orientation and custom field', () => {
      const notes = saved._notes?.filter((n) => n._type !== 3) ?? [];
      assertEquals(notes.length, source.colorNotes?.length);
      for (const [i, original] of source.colorNotes!.entries()) {
         const actual = notes[i];
         const { _cutDirection, _customData, ...fields } = actual;
         const expected = { ...original } as RecordData;
         delete expected.a;
         delete expected.d;
         assertFixtureJson(
            schemaRecord({
               ...renamed(fields, { _time: 'b', _lineIndex: 'x', _lineLayer: 'y', _type: 'c' }),
               customData: objectCustomData(_customData),
            }, { b: 0, x: 0, y: 0, c: 0 }),
            schemaRecord(expected, { b: 0, x: 0, y: 0, c: 0 }),
            `note[${i}]`,
         );
         const anyDirection = _cutDirection === 8 ||
            (_cutDirection !== undefined && _cutDirection >= 2000 && _cutDirection <= 2360);
         assertEquals(anyDirection, original.d === 8, `note[${i}] dot/arrow status`);
         assertEquals(clockwiseAngle(actual), modernAngle(original), `note[${i}] cut orientation`);
      }
   });
   await t.step('every bomb and nested payload', () => {
      const actual = saved._notes?.filter((n) => n._type === 3).map(
         ({ _type, _cutDirection, _customData, ...fields }) => {
            assertEquals(_cutDirection ?? 0, 0);
            return schemaRecord({
               ...renamed(fields, { _time: 'b', _lineIndex: 'x', _lineLayer: 'y' }),
               customData: objectCustomData(_customData),
            }, { b: 0, x: 0, y: 0 });
         },
      );
      assertFixtureJson(
         actual,
         source.bombNotes?.map((n) => schemaRecord(n, { b: 0, x: 0, y: 0 })),
         'bombs',
      );
   });
   await t.step('all native/ME wall dimensions and nested payloads', () => {
      assertFixtureJson(
         saved._obstacles?.map(legacyWall),
         source.obstacles?.map((o) => schemaRecord(o, { b: 0, x: 0, y: 0, d: 0, w: 0, h: 0 })),
         'walls',
      );
   });
   await t.step('all v2.6 arc schema data survives serialization and reload', () => {
      const names = {
         _colorType: 'c',
         _headTime: 'b',
         _headLineIndex: 'x',
         _headLineLayer: 'y',
         _headCutDirection: 'd',
         _headControlPointLengthMultiplier: 'mu',
         _tailTime: 'tb',
         _tailLineIndex: 'tx',
         _tailLineLayer: 'ty',
         _tailCutDirection: 'tc',
         _tailControlPointLengthMultiplier: 'tmu',
         _sliderMidAnchorMode: 'm',
         _customData: 'customData',
      };
      const defaults = {
         c: 0,
         b: 0,
         x: 0,
         y: 0,
         d: 0,
         mu: 0,
         tb: 0,
         tx: 0,
         ty: 0,
         tc: 0,
         tmu: 0,
         m: 0,
      };
      assertFixtureJson(
         saved._sliders?.map((s) => schemaRecord(renamed(s, names), defaults)),
         source.sliders?.map((s) => schemaRecord(s, defaults)),
         'arcs',
      );
      assertEquals(
         loadDifficulty(saved, 2).difficulty.arcs.length,
         source.sliders?.length,
         'v2 reload must not silently drop stored arc data',
      );
   });
   await t.step('every basic light, color boost, keyword and waypoint', () => {
      assertEquals(source.bpmEvents ?? [], []);
      assertEquals(source.rotationEvents ?? [], []);
      const defaults = { b: 0, et: 0, i: 0, f: 0 };
      const basic = saved._events?.filter((e) => e._type !== 5).map(({ _customData, ...fields }) =>
         schemaRecord({
            ...renamed(fields, { _time: 'b', _type: 'et', _value: 'i', _floatValue: 'f' }),
            customData: eventCustomData(_customData),
         }, defaults)
      );
      assertFixtureJson(
         basic,
         source.basicBeatmapEvents?.map((e) => schemaRecord(e, defaults)),
         'basic lighting',
      );
      const boost = saved._events?.filter((e) => e._type === 5).map(
         ({ _type, _floatValue, _value, _customData, ...fields }) => {
            assertEquals(_floatValue ?? 0, 0);
            return schemaRecord({
               ...renamed(fields, { _time: 'b' }),
               o: !!_value,
               customData: _customData ?? {},
            }, { b: 0, o: false });
         },
      );
      assertFixtureJson(
         boost,
         source.colorBoostBeatmapEvents?.map((e) => schemaRecord(e, { b: 0, o: false })),
         'color boost',
      );
      assertFixtureJson(
         saved._specialEventsKeywordFilters?._keywords?.map((k) =>
            renamed(k, { _keyword: 'k', _specialEvents: 'e' })
         ),
         source.basicEventTypesWithKeywords?.d ?? [],
         'keywords',
      );
      assertFixtureJson(
         saved._waypoints?.map((w) =>
            schemaRecord(
               renamed(w, {
                  _time: 'b',
                  _lineIndex: 'x',
                  _lineLayer: 'y',
                  _offsetDirection: 'd',
                  _customData: 'customData',
               }),
               { b: 0, x: 0, y: 0, d: 0 },
            )
         ),
         source.waypoints?.map((w) => schemaRecord(w, { b: 0, x: 0, y: 0, d: 0 })) ?? [],
         'waypoints',
      );
   });
}

Deno.test('E2E downgrade: Bad Apple rich v3 → v2 rejects unsupported objects unless opted in', async (t) => {
   const source = readFixture<v3.IDifficulty>('Bad Apple!!/ExpertPlusStandard.dat');
   const original = JSON.stringify(source);
   await t.step(
      'loading retains unsupported wrapper objects; default save rejects their loss',
      () => {
         // ILoadOptions has schema validation, not save-time compatibility policy.
         // Conversion on load retains these wrapper collections until serialization.
         const loaded = loadDifficulty(source, 2);
         const originalWrapper = loadDifficulty(source, 3);
         assertEquals(loaded.version, 2);
         assertFixtureJson(
            loaded.difficulty.chains,
            originalWrapper.difficulty.chains,
            'loaded chains',
         );
         for (
            const key of [
               'lightColorEventBoxGroups',
               'lightRotationEventBoxGroups',
               'lightTranslationEventBoxGroups',
               'fxEventBoxGroups',
            ] as const
         ) {
            assertFixtureJson(loaded.lightshow[key], originalWrapper.lightshow[key], key);
         }
         assertThrows(() => saveDifficulty(loaded, 2), Error, 'not compatible with v2');
      },
   );
   await t.step('default cross-version save rejects chains/event boxes even with ME walls', () => {
      assertThrows(
         () => saveDifficulty(loadDifficulty(source, 3), 2),
         Error,
         'not compatible with v2',
      );
   });
   const saved = json(saveDifficulty(loadDifficulty(source, 3), 2, permitV2Loss));
   await assertRetainedV2(t, saved, source);
   await t.step('opt-in loss is limited to chains and the four unsupported event-box kinds', () => {
      assertEquals(source.burstSliders?.length, 148);
      assertEquals([
         source.lightColorEventBoxGroups?.length,
         source.lightRotationEventBoxGroups?.length,
         source.lightTranslationEventBoxGroups?.length,
         source.vfxEventBoxGroups?.length,
      ], [5562, 1800, 270, 12]);
      const reloaded = loadDifficulty(saved, 2);
      assertEquals(reloaded.difficulty.chains, []);
      for (
         const key of [
            'lightColorEventBoxGroups',
            'lightRotationEventBoxGroups',
            'lightTranslationEventBoxGroups',
            'fxEventBoxGroups',
         ] as const
      ) assertEquals(reloaded.lightshow[key], []);
      assertEquals(
         Object.keys(saved).sort(),
         [
            '_version',
            '_notes',
            '_obstacles',
            '_sliders',
            '_events',
            '_waypoints',
            '_specialEventsKeywordFilters',
            '_customData',
         ].sort(),
      );
   });
   await t.step(
      'all shared Chroma geometry/materials, tracks, points and editor metadata',
      async (t) => {
         assertExists(source.customData);
         assertExists(saved._customData);
         const expected = json(source.customData) as RecordData;
         const environments = source.customData.environment!;
         // v2 Chroma has no component overrides or light event-type assignment:
         // retain lightID, but explicitly account for all three unsupported fields.
         // See schema/v2/types/custom/chroma.ts and Heck environment documentation.
         assertEquals(environments.filter((e) => e.components?.TubeBloomPrePassLight).length, 1484);
         assertEquals(environments.filter((e) => e.components?.BloomFogEnvironment).length, 1);
         for (const { components } of environments) {
            assert(
               Object.keys(components ?? {}).every((key) =>
                  ['ILightWithId', 'TubeBloomPrePassLight', 'BloomFogEnvironment'].includes(key)
               ),
            );
            assert(
               Object.keys(components?.ILightWithId ?? {}).every((key) =>
                  ['lightID', 'type'].includes(key)
               ),
            );
         }
         expected.environment = environments.map(({ components, ...env }) => ({
            ...env,
            ...(components?.ILightWithId?.lightID === undefined
               ? {}
               : { components: { ILightWithId: { lightID: components.ILightWithId.lightID } } }),
         }));
         expected.customEvents = source.customData.customEvents!.map((event) => {
            assert(
               event.t === 'AnimateTrack',
               'Bad Apple uses only environment AnimateTrack events',
            );
            return {
               ...event,
               d: {
                  ...event.d,
                  ...(typeof event.d.position === 'string'
                     ? { position: source.customData!.pointDefinitions![event.d.position] }
                     : {}),
               },
            };
         });
         const actual = legacyRootCustomData(saved._customData);
         actual.environment = saved._customData._environment?.map((env, i) => {
            const base = (actual.environment as RecordData[])[i];
            if (env._geometry) {
               const geometry = renamed(env._geometry, unprefixed('type material collision mesh'));
               if (typeof geometry.material === 'object') {
                  geometry.material = renamed(
                     record(geometry.material),
                     unprefixed('shader shaderKeywords collision track color'),
                  );
               }
               delete base._geometry;
               base.geometry = geometry;
            }
            return base;
         });
         actual.materials = Object.fromEntries(
            Object.entries(saved._customData._materials ?? {}).map((
               [name, material],
            ) => [
               name,
               renamed(material, unprefixed('shader shaderKeywords collision track color')),
            ]),
         );
         actual.bookmarks = saved._customData._bookmarks?.map((b) =>
            renamed(b, { _time: 'b', _name: 'n', _color: 'c' })
         );
         actual.time = saved._customData._time;
         delete actual._materials;
         delete actual._bookmarks;
         delete actual._time;
         assertEquals(Object.keys(actual).sort(), Object.keys(expected).sort());
         for (const key of Object.keys(expected)) {
            await t.step(key, () => assertFixtureJson(actual[key], expected[key], key));
         }
      },
   );
   await t.step(
      'source JSON remains unchanged after rejection and opt-in retry',
      () => assertEquals(JSON.stringify(source), original),
   );
});

// Resolve original indexed records without calling a converter, serializer or
// round trip to build expectations. The existing deep v4 tests cover table reuse.
function angelVanilla(source: v4.IDifficulty, lightshow: v4.ILightshow): v3.IDifficulty {
   function row<T>(table: T[] | undefined, index: number | undefined): T {
      const value = table?.[index ?? 0];
      assertExists(value);
      return value;
   }
   function objects<T extends object>(
      refs: { b?: number; i?: number; r?: number }[] | undefined,
      table: T[] | undefined,
   ): (T & { b: number })[] {
      return (refs ?? []).map(({ i, r, b = 0, ...rest }) => {
         assertEquals(r ?? 0, 0, 'Lane rotations covered separately, not discarded here');
         assertEquals(rest, {});
         return { ...row(table, i), b };
      });
   }
   return {
      version: '3.3.0',
      colorNotes: objects(source.colorNotes, source.colorNotesData),
      bombNotes: objects(source.bombNotes, source.bombNotesData),
      obstacles: objects(source.obstacles, source.obstaclesData),
      sliders: source.arcs?.map(({ hb = 0, tb = 0, hi, ti, ai, hr, tr, ...rest }) => {
         assertEquals([hr ?? 0, tr ?? 0], [0, 0]);
         assertEquals(rest, {});
         const head = row(source.colorNotesData, hi);
         const tail = row(source.colorNotesData, ti);
         const data = row(source.arcsData, ai);
         return json({
            b: hb,
            tb,
            c: head.c,
            x: head.x,
            y: head.y,
            d: head.d,
            tx: tail.x,
            ty: tail.y,
            tc: tail.d,
            mu: data.m,
            tmu: data.tm,
            m: data.a,
            customData: data.customData,
         });
      }),
      basicBeatmapEvents: objects(lightshow.basicEvents, lightshow.basicEventsData).map((
         { t, ...event },
      ) => ({ ...event, et: t })),
      colorBoostBeatmapEvents: objects(lightshow.colorBoostEvents, lightshow.colorBoostEventsData)
         .map(({ b, ...event }, i) => ({
            b,
            o: !!row(lightshow.colorBoostEventsData, lightshow.colorBoostEvents![i].i).b,
            ...event,
         })),
      waypoints: objects(lightshow.waypoints, lightshow.waypointsData),
      basicEventTypesWithKeywords: lightshow.basicEventTypesWithKeywords,
   };
}

Deno.test('E2E downgrade: Angel Voices rich v4 → v2 retains original shared data with explicit losses', async (t) => {
   const source = readFixture<v4.IDifficulty>('Angel Voices/ExpertPlusStandard.dat');
   const lightshow = readFixture<v4.ILightshow>('Angel Voices/ExpertPlusStandard.lightshow.dat');
   const original = JSON.stringify([source, lightshow]);
   function load() {
      const beatmap = loadDifficulty(source, 4);
      beatmap.lightshow = loadLightshow(lightshow, 4).lightshow;
      return beatmap;
   }
   await t.step('default save rejects NJS, chains and advanced lighting', () => {
      assertThrows(() => saveDifficulty(load(), 2), Error, 'not compatible with v2');
   });
   const saved = json(saveDifficulty(load(), 2, permitV2Loss));
   await assertRetainedV2(t, saved, angelVanilla(source, lightshow));
   await t.step('opt-in cannot claim v2 representations for NJS/chains/event boxes', () => {
      assertEquals(source.njsEvents?.length, 240);
      assertEquals(source.chains?.length, 11);
      assert(lightshow.eventBoxGroups!.length > 0);
      const reloaded = loadDifficulty(saved, 2);
      assertEquals(reloaded.difficulty.njsEvents, []);
      assertEquals(reloaded.difficulty.chains, []);
      for (
         const key of [
            'lightColorEventBoxGroups',
            'lightRotationEventBoxGroups',
            'lightTranslationEventBoxGroups',
            'fxEventBoxGroups',
         ] as const
      ) assertEquals(reloaded.lightshow[key], []);
      assertEquals(JSON.stringify([source, lightshow]), original);
   });
});

// Explicit modified-fixture cases: ECHO has fake color notes but no bombs/walls.
// Only a few objects are injected into the real map. No authored-fixture claim.
for (const version of [2, 3] as const) {
   Deno.test(`E2E conversion: modified ECHO v${version} fake bombs/walls and boolean flags`, async (t) => {
      const source = readFixture<v2.IDifficulty>('ECHO/ExpertPlusLawless.dat');
      const modern = echoModern(source);
      const legacyCustom: NonNullable<v2.INote['_customData']> = {
         _track: 'conversion-probe',
         _position: [-1.25, 2.5],
         _rotation: [0, 30, 0],
         _localRotation: [10, 20, 30],
         _color: [0, 0.5, 1, 0],
         _disableSpawnEffect: false,
         _interactable: false,
         _animation: { _dissolve: [[0, 0], [1, 1]], _position: [[0, 1, 2, 0]] },
         extra: { zero: 0, disabled: false, nested: [{ values: [0, false, ''] }] },
      };
      const bombs: v3.IBombNote[] = [];
      const walls: v3.IObstacle[] = [];
      for (const fake of [false, true]) {
         const b = fake ? 9001 : 9000;
         source._notes!.push({
            _time: b,
            _type: 3,
            _lineIndex: 2,
            _lineLayer: 1,
            _cutDirection: 0,
            _customData: { ...legacyCustom, _fake: fake },
         });
         source._obstacles!.push({
            _time: b,
            _lineIndex: 1,
            _type: 1,
            _duration: 2,
            _width: 3,
            _customData: { ...legacyCustom, _fake: fake, _scale: [3, 2, 1] },
         });
         bombs.push({ b, x: 2, y: 1, customData: objectCustomData(legacyCustom) });
         walls.push({
            b,
            x: 1,
            y: 2,
            d: 2,
            w: 3,
            h: 3,
            customData: objectCustomData({ ...legacyCustom, _scale: [3, 2, 1] }, true),
         });
      }
      modern.bombNotes = bombs.slice(0, 1);
      modern.obstacles = walls.slice(0, 1);
      modern.customData!.fakeBombNotes = bombs.slice(1);
      modern.customData!.fakeObstacles = walls.slice(1);
      if (version === 3) modern.customData!.fakeColorNotes![0].a = 37;
      const input = version === 2 ? source : modern;
      const original = JSON.stringify(input);
      const output = version === 2
         ? json(saveDifficulty(loadDifficulty(source, 2), 3))
         : json(saveDifficulty(loadDifficulty(modern, 3), 2));
      if (version === 3) {
         await t.step(
            'modified fake color-note angle stays fake and retains its cut orientation',
            () => {
               const expected = modern.customData!.fakeColorNotes![0];
               const actual = (output as v2.IDifficulty)._notes!.find((n) =>
                  n._time === expected.b && n._lineIndex === expected.x &&
                  (n._lineLayer ?? 0) === (expected.y ?? 0) && n._type === expected.c
               );
               assertExists(actual);
               assertEquals(actual._customData?._fake, true);
               assertEquals(clockwiseAngle(actual), modernAngle(expected));
            },
         );
      }
      for (const fake of [false, true]) {
         await t.step(`${fake ? 'fake' : 'real'} bomb and wall retain every field`, () => {
            if (version === 2) {
               const data = output as v3.IDifficulty;
               const actualBomb = fake ? data.customData?.fakeBombNotes : data.bombNotes;
               const actualWall = fake ? data.customData?.fakeObstacles : data.obstacles;
               const normalize = (objects: { customData?: RecordData }[] | undefined) =>
                  objects?.map((o) => {
                     const customData = { ...o.customData };
                     if ('_fake' in customData) {
                        assertEquals(customData._fake, fake);
                        delete customData._fake;
                     }
                     return { ...o, customData };
                  });
               assertFixtureJson(normalize(actualBomb), [bombs[Number(fake)]], 'bomb');
               assertFixtureJson(normalize(actualWall), [walls[Number(fake)]], 'wall');
            } else {
               const data = output as v2.IDifficulty;
               const b = fake ? 9001 : 9000;
               const bomb = data._notes?.find((n) => n._time === b);
               const wall = data._obstacles?.find((n) => n._time === b);
               assertExists(bomb);
               assertExists(wall);
               assertEquals(bomb._customData?._fake ?? false, fake, 'bomb fake status');
               assertEquals(wall._customData?._fake ?? false, fake, 'wall fake status');
               assertFixtureJson(
                  objectCustomData(bomb._customData),
                  bombs[Number(fake)].customData,
                  'bomb custom data',
               );
               assertFixtureJson(
                  objectCustomData(wall._customData, true),
                  walls[Number(fake)].customData,
                  'wall custom data',
               );
               assertEquals([bomb._type, bomb._lineIndex, bomb._lineLayer], [3, 2, 1]);
               assertEquals([wall._type, wall._lineIndex, wall._duration, wall._width], [
                  1,
                  1,
                  2,
                  3,
               ]);
            }
         });
      }
      await t.step('conversion consumes modern fake arrays and does not mutate input', () => {
         assertEquals(JSON.stringify(input), original);
         if (version === 3) {
            for (const key of ['fakeColorNotes', 'fakeBombNotes', 'fakeObstacles']) {
               assert(!Object.hasOwn((output as v2.IDifficulty)._customData ?? {}, key), key);
            }
         }
      });
   });
}

// Mapping Extensions README-Beatmapv2.md defines clockwise angles from down
// and precise lanes: 1000→0, 2000→1, -2000→-1. v3's angle offset is CCW.
// github.com/Kylemc1413/MappingExtensions/{README.md,README-Beatmapv2.md}
function clockwiseAngle(note: v2.INote): number {
   const customAngle = note._customData?._cutDirection;
   if (typeof customAngle === 'number') return ((-customAngle % 360) + 360) % 360;
   const direction = note._cutDirection ?? 0;
   if (direction >= 1000) return (direction % 1000) % 360;
   const ccw = [180, 0, 270, 90, 225, 135, 315, 45, 0][direction];
   assertExists(ccw);
   return ((360 - ccw) % 360 + 360) % 360;
}

Deno.test('E2E conversion: modified ECHO v3 walls use Mapping Extensions in v2', () => {
   const source = json(saveDifficulty(
      loadDifficulty(
         readFixture<v2.IDifficulty>('ECHO/ExpertPlusLawless.dat'),
         2,
      ),
      3,
   ));
   (source.obstacles ??= []).push({ b: 9000, x: 1, y: 1, h: 2, d: 4, w: 2 });
   const original = JSON.stringify(source);
   assertThrows(
      () =>
         saveDifficulty(loadDifficulty(source, 3), 2, {
            validate: { compatibility: { enabled: true, throwOn: { mappingExtensions: true } } },
         }),
      Error,
      'Mapping Extensions',
   );
   const saved = json(saveDifficulty(loadDifficulty(source, 3), 2));
   assertFixtureJson(saved._obstacles, [{
      _time: 9000,
      _type: 404201,
      _lineIndex: 1,
      _duration: 4,
      _width: 2,
   }], 'Mapping Extensions wall downgrade');
   const returned = json(saveDifficulty(loadDifficulty(saved, 2), 3));
   assertFixtureJson(returned.obstacles, [{ b: 9000, x: 1, y: 2000, h: 3000, d: 4, w: 2 }]);
   assertFixtureJson(
      loadDifficulty(returned, 3).difficulty.obstacles.map((o) => [
         preciseLane(o.posY),
         preciseLane(o.height),
      ]),
      [[1, 2]],
      'Mapping Extensions wall reload in physical lane units',
   );
   assertEquals(JSON.stringify(source), original);
});

Deno.test('E2E conversion: modified Preserved Valkyria Mapping Extensions positions and arbitrary angles', async (t) => {
   const source = readFixture<v2.IDifficulty>('Preserved Valkyria/ExpertPlusStandard.dat');
   const cases: v2.INote[] = [
      { _time: 9000, _type: 0, _lineIndex: -2500, _lineLayer: 2250, _cutDirection: 1045 },
      { _time: 9001, _type: 1, _lineIndex: 4500, _lineLayer: -1500, _cutDirection: 1123 },
      { _time: 9002, _type: 0, _lineIndex: -2, _lineLayer: 4, _cutDirection: 1270 },
   ];
   source._notes!.push(...cases);
   source._obstacles!.push({
      _time: 9000,
      _lineIndex: -2500,
      _type: 2304301,
      _duration: 2,
      _width: 2500,
   });
   const original = JSON.stringify(source);
   const modern = json(saveDifficulty(loadDifficulty(source, 2), 3));
   const returned = json(saveDifficulty(loadDifficulty(modern, 3), 2));
   await t.step('every precise coordinate and clockwise cut orientation survives v3', () => {
      for (const expected of cases) {
         const actual = modern.colorNotes?.find((n) => n.b === expected._time);
         assertExists(actual);
         assertEquals([actual.x, actual.y], [expected._lineIndex, expected._lineLayer]);
         assertEquals(actual.d, 1);
         assertEquals(((360 - (actual.a ?? 0)) % 360 + 360) % 360, clockwiseAngle(expected));
      }
      const wall = modern.obstacles?.find((o) => o.b === 9000);
      assertExists(wall);
      assertEquals([wall.x, wall.y, wall.w, wall.h, wall.d], [-2500, 2500, 2500, 12500, 2]);
   });
   await t.step('downgrade retains equivalent v2 angles and precision wall type', () => {
      for (const expected of cases) {
         const actual = returned._notes?.find((n) => n._time === expected._time);
         assertExists(actual);
         assertEquals([actual._lineIndex, actual._lineLayer], [
            expected._lineIndex,
            expected._lineLayer,
         ]);
         assertEquals(clockwiseAngle(actual), clockwiseAngle(expected));
      }
      assertFixtureJson(
         returned._obstacles?.find((o) => o._time === 9000),
         source._obstacles!.at(-1),
      );
   });
   await t.step('explicit Mapping Extensions rejection remains independent of conversion', () => {
      assertThrows(
         () =>
            saveDifficulty(loadDifficulty(source, 2), 3, {
               validate: { compatibility: { enabled: true, throwOn: { mappingExtensions: true } } },
            }),
         Error,
         'Mapping Extensions',
      );
      assertEquals(JSON.stringify(source), original);
   });
});

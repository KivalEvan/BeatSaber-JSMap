// deno-lint-ignore no-import-prefix
import { build, emptyDir } from 'jsr:@deno/dnt@0.42.3';
import denoJson from './deno.json' with { type: 'json' };

await emptyDir('./npm');

// hack: we need to supply a dummy import map file so dnt won't force source replication for jsr specifiers
const importMap = './npm/.dnt-import-map.json';

await Deno.writeTextFile(importMap, JSON.stringify({ imports: {} }));

await build({
   entryPoints: Object.entries(denoJson.exports).map(
      ([k, v]) => ({
         name: k,
         path: v,
      }),
   ),
   outDir: './npm',
   test: false,
   shims: {
      deno: true,
   },
   importMap,
   typeCheck: 'both',
   declaration: 'separate',
   // declarationMap: false,
   // skipSourceOutput: true,
   mappings: {
      './src/shims/_path.ts': './src/shims/_path.js',
      './src/shims/_fs.ts': './src/shims/_fs.js',
      './src/shims/_fsp.ts': './src/shims/_fsp.js',
   },
   package: {
      name: 'bsmap',
      version: denoJson.version,
      description: 'General-purpose scripting module for Beat Saber beatmap using TypeScript.',
      keywords: ['beat', 'saber', 'beatsaber', 'beatmap'],
      license: 'MIT',
      dependencies: {
         // for deps with jsr -> npm equivalents, prefer their npm aliases in deno import maps to mitigate peer dependency resolution issues
         '@standard-schema/spec': denoJson.imports['@standard-schema/spec'].split('@')[2],
         'valibot': denoJson.imports['valibot'].split('@')[2],
      },
      repository: {
         type: 'git',
         url: 'git+https://github.com/KivalEvan/BeatSaber-JSMap.git',
      },
      bugs: {
         url: 'https://github.com/KivalEvan/BeatSaber-JSMap/issues',
      },
   },
   postBuild() {
      Deno.copyFileSync('LICENSE', 'npm/LICENSE');
      Deno.copyFileSync('README.md', 'npm/README.md');
      Deno.copyFileSync('BEATMAP.md', 'npm/BEATMAP.md');
      Deno.copyFileSync('CHANGELOG.md', 'npm/CHANGELOG.md');
      Deno.copyFileSync('GUIDE.md', 'npm/GUIDE.md');
   },
});

await Deno.remove(importMap);

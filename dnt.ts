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
   declarationMap: false,
   skipSourceOutput: true,
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

      const pkgJsonPath = './npm/package.json';
      const pkg = JSON.parse(Deno.readTextFileSync(pkgJsonPath));

      // Replace only the native adapters in browser bundles, before resolving Node built-ins.
      // Null preserves the public shims' missing-adapter errors and custom implementations.
      pkg.browser = {};
      for (const format of ['esm', 'script']) {
         const formatPkgPath = `./npm/${format}/package.json`;
         const formatPkg = JSON.parse(Deno.readTextFileSync(formatPkgPath));
         formatPkg.browser = {};
         const browserShim = `./${format}/shims/_browser.js`;
         Deno.writeTextFileSync(
            `./npm/${browserShim}`,
            format === 'esm' ? 'export default null;\n' : 'module.exports = null;\n',
         );
         for (const adapter of ['_fs', '_fsp', '_path']) {
            pkg.browser[`./${format}/shims/${adapter}.js`] = browserShim;
            formatPkg.browser[`./shims/${adapter}.js`] = './shims/_browser.js';
         }
         // dnt's nested package scopes also need mappings for relative imports within each format.
         Deno.writeTextFileSync(formatPkgPath, JSON.stringify(formatPkg, null, 2) + '\n');
      }

      // Keep side effects for dnt polyfills; otherwise let bundlers tree-shake the package.
      const hasPolyfills = ['./npm/esm/_dnt.polyfills.js', './npm/script/_dnt.polyfills.js']
         .some((path) => {
            try {
               return Deno.statSync(path).isFile;
            } catch {
               return false;
            }
         });
      pkg.sideEffects = hasPolyfills ? ['./**/_dnt.polyfills.js'] : false;
      Deno.writeTextFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
   },
});

await Deno.remove(importMap);

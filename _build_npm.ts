// ex. scripts/build_npm.ts
import { build, emptyDir } from 'https://deno.land/x/dnt@0.40.0/mod.ts';
// deno-lint-ignore no-import-assertions
import pkg from './deno.json' assert { type: 'json' };

await emptyDir('./npm');

await build({
   entryPoints: Object.entries(pkg.exports).map(([key, value]) => ({
      name: key,
      path: value,
   })),
   outDir: './npm',
   shims: {
      deno: true,
   },
   typeCheck: 'both',
   filterDiagnostic(diagnostic) {
      // shut up i dont care, i barely used u
      if (diagnostic.file?.fileName.includes('deno.land/std')) return false;
      return true;
   },
   test: false, // until i can redirect the test resource dir, this will just fail
   rootTestDir: './tests',
   package: {
      name: pkg.name,
      version: pkg.version,
      author: 'Kival Evan',
      keywords: [
         'beat',
         'saber',
         'beatsaber',
         'beatmap',
         'parser',
         'serializer',
      ],
      description: 'General-purpose scripting module for Beat Saber map using TypeScript.',
      license: 'MIT',
      repository: {
         type: 'git',
         url: 'git+https://github.com/KivalEvan/BeatSaber-Deno.git',
      },
      bugs: {
         url: 'https://github.com/KivalEvan/BeatSaber-Deno/issues',
      },
   },
   postBuild() {
      Deno.copyFileSync('LICENSE', 'npm/LICENSE');
      Deno.copyFileSync('README.md', 'npm/README.md');
   },
});

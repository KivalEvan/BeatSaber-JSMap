import { build, emptyDir } from 'jsr:@deno/dnt';
import denoJson from './deno.json' with { type: 'json' };

await emptyDir('./npm');

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
   package: {
      name: 'bsmap',
      version: denoJson.version,
      description: 'General-purpose scripting module for Beat Saber beatmap using TypeScript.',
      keywords: ['beat', 'saber', 'beatsaber', 'beatmap'],
      license: 'MIT',
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

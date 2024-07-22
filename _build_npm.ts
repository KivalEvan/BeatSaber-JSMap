import { build, emptyDir } from 'jsr:@deno/dnt';
import denoPackage from './deno.json' with { type: 'json' };

await emptyDir('./npm');

await build({
   entryPoints: Object.values(denoPackage.exports),
   outDir: './npm',
   scriptModule: false,
   test: false,
   shims: {
      // see JS docs for overview and more options
      deno: true,
   },
   package: {
      // package.json properties
      name: 'bsmap',
      version: denoPackage.version,
      description: 'General-purpose scripting module for Beat Saber beatmap using TypeScript. ',
      license: 'MIT',
      repository: {
         type: 'git',
         url: 'git+https://github.com/username/repo.git',
      },
      bugs: {
         url: 'https://github.com/username/repo/issues',
      },
   },
   postBuild() {
      // steps to run after building and before running the tests
      Deno.copyFileSync('LICENSE', 'npm/LICENSE');
      Deno.copyFileSync('README.md', 'npm/README.md');
      Deno.copyFileSync('BEATMAP.md', 'npm/BEATMAP.md');
      Deno.copyFileSync('CHANGELOG.md', 'npm/CHANGELOG.md');
      Deno.copyFileSync('GUIDE.md', 'npm/GUIDE.md');
   },
});

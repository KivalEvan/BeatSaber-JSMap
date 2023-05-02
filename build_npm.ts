// ex. scripts/build_npm.ts
import { build, emptyDir } from 'https://deno.land/x/dnt@0.34.0/mod.ts';

await emptyDir('./npm');

await build({
    entryPoints: ['./mod.ts'],
    outDir: './npm',
    typeCheck: false,
    shims: {
        // see JS docs for overview and more options
        deno: true,
        prompts: true,
    },
    package: {
        // package.json properties
        name: 'bsmap-lib',
        version: Deno.args[0],
        description: 'General-purpose scripting library for Beat Saber map.',
        license: 'MIT',
        repository: {
            type: 'git',
            url: 'git+https://github.com/KivalEvan/BeatSaber-Deno.git',
        },
        bugs: {
            url: 'https://github.com/KivalEvan/BeatSaber-Deno/issues',
        },
    },
});

// post build steps
Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');

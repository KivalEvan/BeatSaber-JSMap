// deno-lint-ignore-file require-await
import type { IFileSystem } from '../types/bsmap/_fs.ts';

function noFsFunctionProvided(): never {
   throw new Error(
      '`fs` function not provided; please supply an `fs` function inside the `fs` object from the module',
   );
}

export const fs: IFileSystem = {
   readTextFile: async () => noFsFunctionProvided(),
   readTextFileSync: noFsFunctionProvided,
   writeTextFile: async () => noFsFunctionProvided(),
   writeTextFileSync: noFsFunctionProvided,
};

export default fs;

// deno-lint-ignore no-explicit-any
declare let Deno: any;
// FIXME: this may need to be separated out in the future
if (typeof Deno !== 'undefined') {
   fs.readTextFile = Deno.readTextFile;
   fs.readTextFileSync = Deno.readTextFileSync;
   fs.writeTextFile = Deno.writeTextFile;
   fs.writeTextFileSync = Deno.writeTextFileSync;
}

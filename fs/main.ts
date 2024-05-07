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

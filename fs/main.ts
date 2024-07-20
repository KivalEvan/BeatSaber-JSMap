// deno-lint-ignore-file require-await no-explicit-any
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

// FIXME: this may need to be separated out in the future
declare let Deno: any;
declare let Bun: any;
declare let process: any;
if (typeof Deno !== 'undefined') {
   fs.readTextFile = Deno.readTextFile || noFsFunctionProvided;
   fs.readTextFileSync = Deno.readTextFileSync || noFsFunctionProvided;
   fs.writeTextFile = Deno.writeTextFile || noFsFunctionProvided;
   fs.writeTextFileSync = Deno.writeTextFileSync || noFsFunctionProvided;
} else if (
   typeof Bun !== 'undefined' ||
   (typeof process !== 'undefined' && process.release.name === 'node')
) {
   const { readFileSync, writeFileSync } = await import('node:fs');
   const { readFile, writeFile } = await import('node:fs/promises');

   fs.readTextFile = (path: string): Promise<string> => {
      return readFile(path, 'utf8');
   };
   fs.readTextFileSync = (path: string): string => {
      return readFileSync(path, 'utf8');
   };
   fs.writeTextFile = (path: string, data: string): Promise<void> => {
      return writeFile(path, data, 'utf8');
   };
   fs.writeTextFileSync = (path: string, data: string): void => {
      writeFileSync(path, data, 'utf8');
   };
}

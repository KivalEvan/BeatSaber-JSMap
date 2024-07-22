import type { IFileSystem } from '../types/bsmap/_fs.ts';
import { readFileSync, writeFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

function noFsFunctionProvided(): never {
   throw new Error(
      '`fs` function not provided; please supply `fs` function inside the `fs` object from the module',
   );
}

export const fs: IFileSystem = {
   readTextFile: noFsFunctionProvided,
   readTextFileSync: noFsFunctionProvided,
   writeTextFile: noFsFunctionProvided,
   writeTextFileSync: noFsFunctionProvided,
};

export default fs;

// deno-lint-ignore no-explicit-any
declare let Deno: any;
if (typeof Deno !== 'undefined') {
   fs.readTextFile = Deno.readTextFile || noFsFunctionProvided;
   fs.readTextFileSync = Deno.readTextFileSync || noFsFunctionProvided;
   fs.writeTextFile = Deno.writeTextFile || noFsFunctionProvided;
   fs.writeTextFileSync = Deno.writeTextFileSync || noFsFunctionProvided;
} else {
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
      return writeFileSync(path, data, 'utf8');
   };
}

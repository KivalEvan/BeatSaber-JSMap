import type { IFileSystem } from '../types/bsmap/_fs.ts';
import { readFileSync, writeFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

function noFsFunctionProvided(): never {
   throw new Error(
      '`fs` function not provided; please supply `fs` function inside the `fs` object from the module',
   );
}

/**
 * Wrapper for use in `read` and `write`.
 *
 * Do not use this as a mean to perform `fs` operations.
 * This module only serve to provide cross-platform compatibility.
 *
 * If your runtime or vendor does not contain `node:` built-in module,
 * you should provide `fs` function inside the `fs` object from the module.
 * If you are creating a web app, you may ignore this and use `load` and `save`.
 */
export const fs: IFileSystem = {
   readTextFile: noFsFunctionProvided,
   readTextFileSync: noFsFunctionProvided,
   writeTextFile: noFsFunctionProvided,
   writeTextFileSync: noFsFunctionProvided,
};

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

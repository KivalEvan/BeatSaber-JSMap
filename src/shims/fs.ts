// @ts-ignore: trick
import fsMod from './_fs.ts';
// @ts-ignore: trick
import fspMod from './_fsp.ts';
import type fsType from 'node:fs';
import type fspType from 'node:fs/promises';
import type { IShimsFileSystem } from '../types/bsmap/shims.ts';

function noFsFunctionProvided(): never {
   throw new Error(
      '`fs` function not provided; please supply `fs` function inside the `fs` object from the module',
   );
}

// @ts-ignore: trick
const _fs = fsMod as typeof fsType | null;

// @ts-ignore: trick
const _fsp = fspMod as typeof fspType | null;

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
export const fs: IShimsFileSystem = {
   readTextFile: noFsFunctionProvided,
   readTextFileSync: noFsFunctionProvided,
   writeTextFile: noFsFunctionProvided,
   writeTextFileSync: noFsFunctionProvided,
};

// deno-lint-ignore no-explicit-any
declare let Deno: any;
// deno-lint-ignore no-explicit-any
declare let Bun: any;
if (typeof Deno !== 'undefined') {
   fs.readTextFile = Deno.readTextFile || noFsFunctionProvided;
   fs.readTextFileSync = Deno.readTextFileSync || noFsFunctionProvided;
   fs.writeTextFile = Deno.writeTextFile || noFsFunctionProvided;
   fs.writeTextFileSync = Deno.writeTextFileSync || noFsFunctionProvided;
} else {
   if (typeof Bun !== 'undefined') {
      fs.readTextFile = (path: string): Promise<string> => {
         return Bun.file(path).text();
      };
      fs.writeTextFile = Bun.write;
   } else if (_fsp) {
      fs.readTextFile = (path: string): Promise<string> => {
         return _fsp.readFile(path, 'utf8');
      };
      fs.writeTextFile = (path: string, data: string): Promise<void> => {
         return _fsp.writeFile(path, data, 'utf8');
      };
   }
   if (_fs) {
      fs.readTextFileSync = (path: string): string => {
         return _fs?.readFileSync(path, 'utf8');
      };
      fs.writeTextFileSync = (path: string, data: string): void => {
         return _fs?.writeFileSync(path, data, 'utf8');
      };
   }
}

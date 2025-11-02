import fsMod from './_fs.ts';
import fspMod from './_fsp.ts';
import type { IShimsFileSystem } from './types.ts';

function noFsFunctionProvided(): never {
   throw new Error(
      '`fs` function not provided; please supply `fs` function inside the `fs` object from the module',
   );
}

// deno-lint-ignore no-explicit-any
declare let Deno: any;
// deno-lint-ignore no-explicit-any
declare let Bun: any;

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
   readTextFile: (path: string): Promise<string> => {
      if (typeof Deno !== 'undefined') {
         return Deno.readTextFile(path) ?? noFsFunctionProvided();
      }
      if (typeof Bun !== 'undefined') {
         return Bun.file(path).text() ?? noFsFunctionProvided();
      }
      if (fspMod) {
         return fspMod.readFile(path, 'utf8');
      }
      return noFsFunctionProvided();
   },
   readTextFileSync: (path: string): string => {
      if (typeof Deno !== 'undefined') {
         return Deno.readTextFileSync(path) ?? noFsFunctionProvided();
      }
      if (fsMod) {
         return fsMod.readFileSync(path, 'utf8');
      }
      return noFsFunctionProvided();
   },
   writeTextFile: (path: string, data: string): Promise<void> => {
      if (typeof Deno !== 'undefined') {
         return Deno.writeTextFile(path, data) ?? noFsFunctionProvided();
      }
      if (typeof Bun !== 'undefined') {
         Bun.write(path, data) ?? noFsFunctionProvided();
      }
      if (fspMod) {
         return fspMod.writeFile(path, data, 'utf8');
      }
      return noFsFunctionProvided();
   },
   writeTextFileSync: (path: string, data: string): void => {
      if (typeof Deno !== 'undefined') {
         return Deno.writeTextFileSync(path, data) ?? noFsFunctionProvided();
      }
      if (fsMod) {
         return fsMod.writeFileSync(path, data, 'utf8');
      }
      return noFsFunctionProvided();
   },
};

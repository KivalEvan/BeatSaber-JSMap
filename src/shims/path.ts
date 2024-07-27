import type { IShimsPath } from '../types/bsmap/shims.ts';
export type { IShimsPath } from '../types/bsmap/shims.ts';
import { basename, resolve } from 'node:path';

function noPathFunctionProvided(): never {
   throw new Error(
      '`path` function not provided; please supply `path` function inside the `path` object from the module',
   );
}

/**
 * Wrapper for use in `read`, `write` and `globals.directory`.
 *
 * Do not use this as a mean to perform `path` operations.
 * This module only serve to provide cross-platform compatibility.
 *
 * If your runtime or vendor does not contain `node:` built-in module,
 * you should provide `path` function inside the `path` object from the module.
 * If you are creating a web app, you may ignore this.
 */
export const path: IShimsPath = {
   resolve: resolve || noPathFunctionProvided,
   basename: basename || noPathFunctionProvided,
};

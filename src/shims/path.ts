// @ts-ignore: trick
import pathMod from './_path.ts';
import type pathType from 'node:path';
import type { IShimsPath } from '../types/bsmap/shims.ts';

function noPathFunctionProvided(): never {
   throw new Error(
      '`path` function not provided; please supply `path` function inside the `path` object from the module',
   );
}

// @ts-ignore: trick
const p = pathMod as typeof pathType | null;

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
   resolve: p?.resolve || noPathFunctionProvided,
   basename: p?.basename || noPathFunctionProvided,
};

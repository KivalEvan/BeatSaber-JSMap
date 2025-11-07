import pathMod from './_path.ts';
import type { IShimsPath } from './types.ts';

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
   resolve: (...pathSegments: string[]): string => {
      if (pathMod) {
         return pathMod.resolve(...pathSegments);
      }
      return noPathFunctionProvided();
   },
   basename: (path: string, suffix?: string): string => {
      if (pathMod) {
         return pathMod.basename(path, suffix);
      }
      return noPathFunctionProvided();
   },
};

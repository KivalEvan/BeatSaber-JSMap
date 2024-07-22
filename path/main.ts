// deno-lint-ignore-file no-explicit-any
import type { IPath } from '../types/bsmap/_path.ts';
import nodePath from 'node:path';

function noPathFunctionProvided(): never {
   throw new Error(
      '`path` function not provided; please supply `path` function inside the `path` object from the module',
   );
}

export const path: IPath = {
   resolve: noPathFunctionProvided,
   basename: noPathFunctionProvided,
};

// FIXME: this may need to be separated out in the future
declare let Deno: any;
declare let Bun: any;
declare let process: any;
if (
   typeof Deno !== 'undefined' ||
   typeof Bun !== 'undefined' ||
   (typeof process !== 'undefined' && process.release.name === 'node')
) {
   path.resolve = nodePath?.resolve || noPathFunctionProvided;
   path.basename = nodePath?.basename || noPathFunctionProvided;
}

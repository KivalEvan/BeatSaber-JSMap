import type { IPath } from '../types/bsmap/_path.ts';
import { basename, resolve } from 'node:path';

function noPathFunctionProvided(): never {
   throw new Error(
      '`path` function not provided; please supply `path` function inside the `path` object from the module',
   );
}

export const path: IPath = {
   resolve: resolve || noPathFunctionProvided,
   basename: basename || noPathFunctionProvided,
};

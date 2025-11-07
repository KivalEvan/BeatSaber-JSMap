import type pathType from 'node:path';
import { isBun, isDeno, isNode } from './utils.ts';

// deno-lint-ignore-file no-explicit-any
let path: typeof pathType | null = null;

if (isNode || isDeno || isBun) {
   try {
      path = await import('node' + ':path');
   } catch (e) {
      if (e instanceof TypeError) {
         path = null;
      } else {
         throw e;
      }
   }
}

export default path;

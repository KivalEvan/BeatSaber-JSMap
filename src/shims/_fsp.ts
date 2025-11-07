import type fsType from 'node:fs/promises';
import { isBun, isNode } from './utils.ts';

// deno-lint-ignore-file no-explicit-any
let fsp: typeof fsType | null = null;

if (isNode || isBun) {
   try {
      fsp = await import('node' + ':fs/promises');
   } catch (e) {
      if (e instanceof TypeError) {
         fsp = null;
      } else {
         throw e;
      }
   }
}

export default fsp;

import type fsType from 'node:fs';
import { isBun, isNode } from './utils.ts';

let fs: typeof fsType | null = null;

if (isNode || isBun) {
   try {
      fs = await import('node' + ':fs');
   } catch (e) {
      if (e instanceof TypeError) {
         fs = null;
      } else {
         throw e;
      }
   }
}

export default fs;

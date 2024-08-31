// deno-lint-ignore-file no-explicit-any
let fs = null;
if (
   // @ts-ignore: process is a global variable
   ('process' in globalThis &&
      'versions' in (globalThis as any).process &&
      // @ts-ignore: process is a global variable
      'node' in (globalThis.process as any).versions &&
      typeof globalThis.caches === 'undefined' &&
      typeof globalThis.addEventListener !== 'function') ||
   'Bun' in globalThis
) {
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

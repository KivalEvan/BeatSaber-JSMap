// deno-lint-ignore-file no-explicit-any
let path = null;
if (
   // @ts-ignore: process is a global variable
   ('process' in globalThis &&
      'versions' in (globalThis as any).process &&
      // @ts-ignore: process is a global variable
      'node' in (globalThis.process as any).versions &&
      typeof globalThis.caches === 'undefined' &&
      typeof globalThis.addEventListener !== 'function') ||
   'Deno' in globalThis ||
   'Bun' in globalThis
) {
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

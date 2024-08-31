// deno-lint-ignore-file no-explicit-any
let fsp = null;
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

// deno-lint-ignore-file no-explicit-any
export const isNode = 'process' in globalThis &&
   'versions' in (globalThis as any).process &&
   'node' in (globalThis.process as any).versions &&
   typeof globalThis.caches === 'undefined' &&
   typeof globalThis.addEventListener !== 'function';

export const isDeno = 'Deno' in globalThis;

export const isBun = 'Bun' in globalThis;

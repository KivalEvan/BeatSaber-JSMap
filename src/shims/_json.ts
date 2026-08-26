// deno-lint-ignore-file no-explicit-any
import { getLogger } from '../logger.ts';
import { fs } from './fs.ts';
import { path } from './path.ts';

function tag(name: string): string[] {
   return ['fs', name];
}

/** Reject non-finite numbers during `JSON.stringify`, including `toJSON` output. */
function assertFiniteNumberInTraversal(key: string, value: any): any {
   if (typeof value === 'number' && !Number.isFinite(value)) {
      throw new Error(
         key === ''
            ? 'Cannot serialise non-finite number at root of JSON (NaN or Infinity).'
            : `Cannot serialise non-finite number at key "${key}" during serialisation (NaN or Infinity).`,
      );
   }
   return value;
}

const temporarySeed = Math.floor(Math.random() * 36 ** 8)
   .toString(36)
   .padStart(8, '0');

const temporaryCounterMax = 36 ** 4;

let temporaryCounter = 0;

const activeTemporaryPaths = new Set<string>();

/**
 * Reserve a temporary path beside the destination.
 *
 * Active names are unique within this module instance. Other module instances
 * or execution contexts can collide.
 */
function reserveTemporaryPath(destination: string): string {
   const dir = path.dirname(destination);
   for (let attempt = 0; attempt < temporaryCounterMax; attempt++) {
      temporaryCounter = (temporaryCounter + 1) % temporaryCounterMax;
      const seq = temporaryCounter.toString(36).padStart(4, '0');
      const tmpPath = path.join(dir, `bsmap.${seq}.${temporarySeed}.tmp`);
      if (!activeTemporaryPaths.has(tmpPath)) {
         activeTemporaryPaths.add(tmpPath);
         return tmpPath;
      }
   }
   throw new Error(
      `Temporary path space exhausted for "${destination}" after ${temporaryCounterMax} attempts.`,
   );
}

function releaseTemporaryPath(tmpPath: string): void {
   activeTemporaryPaths.delete(tmpPath);
}

export function readJSONFile(path: string): Promise<Record<string, any>> {
   const logger = getLogger();
   logger?.tInfo(tag('readJSONFile'), `Async reading JSON file from ${path}`);
   return fs.readTextFile(path).then(JSON.parse);
}

export function readJSONFileSync(path: string): Record<string, any> {
   const logger = getLogger();
   logger?.tInfo(tag('readJSONFileSync'), `Sync reading JSON file from ${path}`);
   return JSON.parse(fs.readTextFileSync(path));
}

export function writeJSONFile(
   path: string,
   json: Record<string, any>,
   format?: number,
): Promise<void> {
   const logger = getLogger();
   logger?.tInfo(tag('writeJSONFile'), `Async writing JSON file to ${path}`);
   // Serialize before reservation so validation throws synchronously.
   const data = JSON.stringify(json, assertFiniteNumberInTraversal, format);
   const tmpPath = reserveTemporaryPath(path);
   const discard = async (): Promise<void> => {
      try {
         await fs.unlink(tmpPath);
      } catch {
         // temp file may not exist; cleanup must not mask the original error
      }
   };
   const fail = async (e: unknown): Promise<never> => {
      await discard();
      throw e;
   };
   try {
      return Promise.resolve(fs.writeTextFile(tmpPath, data))
         .then(() => fs.rename(tmpPath, path))
         .catch(fail)
         .finally(() => releaseTemporaryPath(tmpPath));
   } catch (e) {
      // shim threw before returning a promise; still reject with cleanup
      return fail(e).finally(() => releaseTemporaryPath(tmpPath));
   }
}

export function writeJSONFileSync(
   path: string,
   json: Record<string, any>,
   format?: number,
): void {
   const logger = getLogger();
   logger?.tInfo(tag('writeJSONFileSync'), `Sync writing JSON file to ${path}`);
   const data = JSON.stringify(json, assertFiniteNumberInTraversal, format);
   const tmpPath = reserveTemporaryPath(path);
   try {
      fs.writeTextFileSync(tmpPath, data);
      fs.renameSync(tmpPath, path);
   } catch (e) {
      try {
         fs.unlinkSync(tmpPath);
      } catch {
         // temp file may not exist if write failed early
      }
      throw e;
   } finally {
      releaseTemporaryPath(tmpPath);
   }
}

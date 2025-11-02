import { getLogger } from './logger.ts';
import { path } from './shims/path.ts';

function tag(str: string): string[] {
   return ['globals', str];
}

class Globals {
   #directory = './';

   /**
    * Global source and destination directory.
    *
    * Input will be resolved to absolute path, otherwise uses the current working directory (CWD).
    * ```ts
    * // CWD: C:\Users\user\Scripts
    * globals.directory = '.\\Maps'; // C:\Users\user\Scripts\Maps
    * globals.directory = 'C:\\Maps'; // C:\Maps
    * ```
    * **For Windows user:** use `\\` instead of `\` in input as it is an escape character.
    *
    * This will be overriden if directory is specified elsewhere.
    */
   get directory(): string {
      return this.#directory;
   }
   set directory(value: string) {
      const logger = getLogger();

      value = path.resolve(value.trim());
      this.#directory = value;
      logger?.tInfo(
         tag('directory'),
         `Global map directory is set to ${this.#directory}`,
      );
   }
}

/** Global variables. */
export const globals: Globals = /* @__PURE__ */ new Globals();

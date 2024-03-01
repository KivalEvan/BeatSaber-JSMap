import { resolve } from './deps.ts';
import logger from './logger.ts';

function tag(str: string): string[] {
   return ['globals', str];
}

class Globals {
   #directory = './';

   /**
    * Global source and destination directory.
    *
    * This will be overriden if directory is specified elsewhere.
    */
   get directory(): string {
      return this.#directory;
   }
   set directory(value: string) {
      value = resolve(value.trim());
      this.#directory = value;
      logger.tInfo(tag('directory'), `Global map directory is set to ${this.#directory}`);
   }

   /**
    * Set logging level to filter various information.
    * ```ts
    * 0 -> Verbose
    * 1 -> Debug
    * 2 -> Info
    * 3 -> Warn
    * 4 -> Error
    * 5 -> None
    * ```
    */
   get logLevel(): number {
      return logger.logLevel;
   }
   set logLevel(value: number) {
      logger.setLevel(value);
   }
}

const globals: Globals = new Globals();
/** Global settings. */
export default globals;

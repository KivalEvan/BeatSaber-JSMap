import { path } from './shims/path.ts';
import { logger } from './logger.ts';

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
      value = path.resolve(value.trim());
      this.#directory = value;
      logger.tInfo(
         tag('directory'),
         `Global map directory is set to ${this.#directory}`,
      );
   }
}

/** Global variables. */
export const globals: Globals = new Globals();

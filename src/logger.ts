// deno-lint-ignore-file no-explicit-any
// i got super annoyed about dependencies that i decided to yoink it from deno
function yellow(str: string): string {
   return `\x1b[33m${str}\x1b[39m`;
}

function red(str: string): string {
   return `\x1b[31m${str}\x1b[39m`;
}

function dim(str: string): string {
   return `\x1b[2m${str}\x1b[22m`;
}

enum LogLevels {
   NONE,
   ERROR,
   WARN,
   INFO,
   DEBUG,
   TRACE,
}

// really simple logger
/** Simple logging system class. */
export class Logger {
   static readonly LogLevels = LogLevels;

   static get LogPrefixes(): Map<LogLevels, string> {
      return new Map<LogLevels, string>([
         [LogLevels.TRACE, 'TRACE'],
         [LogLevels.DEBUG, 'DEBUG'],
         [LogLevels.INFO, 'INFO'],
         [LogLevels.WARN, yellow('WARN')],
         [LogLevels.ERROR, red('!!ERROR!!')],
         [LogLevels.NONE, 'NONE'],
      ]);
   }

   #logLevel = LogLevels.INFO;
   #tagPrint: (tags: string[], level: LogLevels) => string = (tags, level) =>
      `${Logger.LogPrefixes.get(level)} ${dim('>')} [${dim(tags.join('::'))}]`;
   #untagged = 'script';

   set logLevel(value: LogLevels) {
      this.#logLevel = value;
      this.tInfo(
         ['logger', 'logLevel'],
         `Log level set to ${Logger.LogPrefixes.get(value)}`,
      );
   }
   get logLevel(): LogLevels {
      return this.#logLevel;
   }

   set tagPrint(fn: (tags: string[], level: LogLevels) => string) {
      this.#tagPrint = fn;
      this.tInfo(['logger', 'tagPrint'], `Update tag print function`);
   }
   get tagPrint(): (tags: string[], level: LogLevels) => string {
      return this.#tagPrint;
   }

   set untagged(value: string) {
      this.#untagged = value.trim();
      this.tInfo(
         ['logger', 'untagged'],
         `Update untagged string to ${this.#untagged}`,
      );
   }
   get untagged(): string {
      return this.#untagged;
   }

   private log(level: LogLevels, tags: string[], args: any[]) {
      if (level > this.#logLevel) return;
      const tag = this.tagPrint(tags, level);

      switch (level) {
         case LogLevels.TRACE:
            return tag ? console.trace(tag, ...args) : console.trace(...args);
         case LogLevels.DEBUG:
            return tag ? console.debug(tag, ...args) : console.debug(...args);
         case LogLevels.INFO:
            return tag ? console.info(tag, ...args) : console.info(...args);
         case LogLevels.WARN:
            return tag ? console.warn(tag, ...args) : console.warn(...args);
         case LogLevels.ERROR:
            return tag ? console.error(tag, ...args) : console.error(...args);
         default:
            return tag ? console.log(tag, ...args) : console.log(...args);
      }
   }

   /**
    * Set logging level to filter various information.
    * ```ts
    * 0 -> None
    * 1 -> Error
    * 2 -> Warn
    * 3 -> Info
    * 4 -> Debug
    * 5 -> Trace
    * ```
    */
   setLevel(level: LogLevels) {
      level = Math.min(Math.max(level, 0), 5);
      this.#logLevel = level;
      this.tInfo(
         ['logger', 'setLevel'],
         `Log level set to ${Logger.LogPrefixes.get(level)}`,
      );
   }

   tTrace(tags: string[], ...args: any[]) {
      this.log(LogLevels.TRACE, tags, args);
   }

   tDebug(tags: string[], ...args: any[]) {
      this.log(LogLevels.DEBUG, tags, args);
   }

   tInfo(tags: string[], ...args: any[]) {
      this.log(LogLevels.INFO, tags, args);
   }

   tWarn(tags: string[], ...args: any[]) {
      this.log(LogLevels.WARN, tags, args);
   }

   tError(tags: string[], ...args: any[]) {
      this.log(LogLevels.ERROR, tags, args);
   }

   trace(...args: any[]) {
      this.tTrace([this.#untagged], ...args);
   }

   debug(...args: any[]) {
      this.tDebug([this.#untagged], ...args);
   }

   info(...args: any[]) {
      this.tInfo([this.#untagged], ...args);
   }

   warn(...args: any[]) {
      this.tWarn([this.#untagged], ...args);
   }

   error(...args: any[]) {
      this.tError([this.#untagged], ...args);
   }
}

let _logger: Logger | null;

/** Retrieves the global logging instance used across the module. */
export function getLogger(): Logger | null {
   return _logger;
}

/**
 * Enables logs for the library when called.
 * Call this at the top of your execution stack to output logs to console.
 *
 * @param newLogger A new logger object to optionally replace the global instance.
 */
export function setupLogger(newLogger?: Logger) {
   if (newLogger) {
      _logger = newLogger;
   } else {
      _logger = new Logger();
   }
}

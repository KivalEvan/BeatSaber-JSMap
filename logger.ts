// deno-lint-ignore-file no-explicit-any
import { dim, red, yellow } from './deps.ts';

// really simple logger
enum LogLevels {
    VERBOSE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    NONE,
}

const logPrefixes = new Map<LogLevels, string>([
    [LogLevels.VERBOSE, 'VERBOSE'],
    [LogLevels.DEBUG, 'DEBUG'],
    [LogLevels.INFO, 'INFO'],
    [LogLevels.WARN, yellow('WARN')],
    [LogLevels.ERROR, red('!!ERROR!!')],
    [LogLevels.NONE, 'NONE'],
]);

class Logger {
    #logLevel = LogLevels.INFO;
    #tagPrint: (tags: string[]) => string = (tags) => '[' + tags.join('::') + ']';

    set logLevel(value: LogLevels) {
        this.#logLevel = value;
        this.tInfo(['logger', 'logLevel'], `Log level set to ${logPrefixes.get(value)}`);
    }
    get logLevel() {
        return this.#logLevel;
    }

    set tagPrint(fn: (tags: string[]) => string) {
        this.#tagPrint = fn;
        this.tInfo(['logger', 'tagPrint'], `Update tag print function`);
    }
    get tagPrint() {
        return this.#tagPrint;
    }

    private log(level: LogLevels, ...args: any[]) {
        if (level < this.#logLevel) return;

        const log = [logPrefixes.get(level), dim('>'), ...args];

        switch (level) {
            case LogLevels.DEBUG:
                return console.debug(...log);
            case LogLevels.INFO:
                return console.info(...log);
            case LogLevels.WARN:
                return console.warn(...log);
            case LogLevels.ERROR:
                return console.error(...log);
            default:
                return console.log(...log);
        }
    }

    private prettyTag(tags: string[]): string {
        return this.tagPrint(tags);
    }

    /** Set logging level to filter various information.
     * ```ts
     * 0 -> Verbose
     * 1 -> Debug
     * 2 -> Info
     * 3 -> Warn
     * 4 -> Error
     * 5 -> None
     * ```
     */
    setLevel(level: LogLevels) {
        level = Math.min(Math.max(level, 0), 5);
        this.#logLevel = level;
        this.tInfo(['logger', 'setLevel'], `Log level set to ${logPrefixes.get(level)}`);
    }

    tVerbose(tag: string[], ...args: any[]) {
        this.log(LogLevels.VERBOSE, this.prettyTag(tag), ...args);
    }

    tDebug(tag: string[], ...args: any[]) {
        this.log(LogLevels.DEBUG, this.prettyTag(tag), ...args);
    }

    tInfo(tag: string[], ...args: any[]) {
        this.log(LogLevels.INFO, this.prettyTag(tag), ...args);
    }

    tWarn(tag: string[], ...args: any[]) {
        this.log(LogLevels.WARN, this.prettyTag(tag), ...args);
    }

    tError(tag: string[], ...args: any[]) {
        this.log(LogLevels.ERROR, this.prettyTag(tag), ...args);
    }

    verbose(...args: any[]) {
        this.tVerbose(['script'], ...args);
    }

    debug(...args: any[]) {
        this.tDebug(['script'], ...args);
    }

    info(...args: any[]) {
        this.tInfo(['script'], ...args);
    }

    warn(...args: any[]) {
        this.tWarn(['script'], ...args);
    }

    error(...args: any[]) {
        this.tError(['script'], ...args);
    }
}

/** Simple logging system. */
export default new Logger();

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
    [LogLevels.WARN, 'WARN'],
    [LogLevels.ERROR, 'ERROR'],
]);

class Logger {
    #logLevel = LogLevels.INFO;

    readonly logLevels = LogLevels;

    // deno-lint-ignore no-explicit-any
    private log(level: LogLevels, ...args: any[]) {
        if (level < this.#logLevel) return;

        const log = [logPrefixes.get(level), '>', ...args];

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

    /** Set logging level to filter various information.
     * ```ts
     * 0 -> Debug
     * 1 -> Info
     * 2 -> Warn
     * 3 -> Error
     * 4 -> None
     * ```
     */
    public setLevel(level: LogLevels) {
        this.#logLevel = level;
    }

    // deno-lint-ignore no-explicit-any
    public verbose(...args: any[]) {
        this.log(LogLevels.VERBOSE, ...args);
    }

    // deno-lint-ignore no-explicit-any
    public debug(...args: any[]) {
        this.log(LogLevels.DEBUG, ...args);
    }

    // deno-lint-ignore no-explicit-any
    public info(...args: any[]) {
        this.log(LogLevels.INFO, ...args);
    }

    // deno-lint-ignore no-explicit-any
    public warn(...args: any[]) {
        this.log(LogLevels.WARN, ...args);
    }

    // deno-lint-ignore no-explicit-any
    public error(...args: any[]) {
        this.log(LogLevels.ERROR, ...args);
    }
}

export default new Logger();

import logger from './logger.ts';

const tag = (str: string) => {
    return `[settings::${str}]`;
};

class globals {
    #path = '';

    /** Global map directory.
     * This will be overriden if path is specified elsewhere.
     */
    get path() {
        return this.#path;
    }
    set path(value: string) {
        value = value.trim();
        if (!(value.endsWith('\\') || value.endsWith('/'))) {
            logger.debug(tag('path'), `Adding missing end slash`);
            value += '/';
        }
        this.#path = value;
        logger.info(tag('path'), `Global map directory path is set to ${this.#path}`);
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
    get logLevel() {
        return logger.logLevel;
    }
    set logLevel(value: number) {
        logger.setLevel(value);
    }
}

/** Global settings. */
export default new globals();

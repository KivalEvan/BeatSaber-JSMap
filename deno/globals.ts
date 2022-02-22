import logger from './logger.ts';

const tag = (str: string) => {
    return `[settings::${str}]`;
};

class Globals {
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
}

export default new Globals();

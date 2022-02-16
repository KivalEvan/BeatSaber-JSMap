class Settings {
    #path = '';
    constructor() {}

    /** Global map directory. */
    get path() {
        return this.#path;
    }
    /** Global map directory. */
    set path(value: string) {
        value = value.trim();
        if (!(value.endsWith('\\') || value.endsWith('/'))) {
            value += '/';
        }
        this.#path = value;
    }
}

export default new Settings();

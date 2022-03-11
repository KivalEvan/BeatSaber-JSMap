import { Serializable } from '../../shared/types/serializable.ts';

/** Basic event types for keywords.
 * Used in basic event types with keywords.
 */
export interface IBasicEventTypesForKeywords {
    /** Keyword `<string>` of basic event types for keywords. */
    k: string;
    /** Event type `<int[]>` of basic event types for keywords. */
    e: number[];
}

/** Basic event types for keywords.
 * Used in basic event types with keywords.
 */
export class BasicEventTypesForKeywords extends Serializable<IBasicEventTypesForKeywords> {
    private k;
    private e;
    constructor(basicEventTypesForKeywords: IBasicEventTypesForKeywords) {
        super();
        this.k = basicEventTypesForKeywords.k;
        this.e = basicEventTypesForKeywords.e;
    }

    public toObject(): IBasicEventTypesForKeywords {
        return {
            k: this.keyword,
            e: this.events,
        };
    }

    /** Keyword `<string>` of basic event types for keywords. */
    get keyword() {
        return this.k;
    }
    set keyword(value: IBasicEventTypesForKeywords['k']) {
        this.k = value;
    }

    /** Event type `<int[]>` of basic event types for keywords. */
    get events() {
        return this.e;
    }
    set events(value: IBasicEventTypesForKeywords['e']) {
        this.e = value;
    }
}

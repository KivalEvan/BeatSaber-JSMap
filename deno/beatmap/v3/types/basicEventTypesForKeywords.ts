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
    constructor(basicEventTypesForKeywords: Required<IBasicEventTypesForKeywords>) {
        super();
        this.k = basicEventTypesForKeywords.k;
        this.e = basicEventTypesForKeywords.e;
    }

    static create(): BasicEventTypesForKeywords;
    static create(
        basicEventTypesForKeywords: Partial<IBasicEventTypesForKeywords>
    ): BasicEventTypesForKeywords;
    static create(
        ...basicEventTypesForKeywords: Partial<IBasicEventTypesForKeywords>[]
    ): BasicEventTypesForKeywords[];
    static create(
        ...basicEventTypesForKeywords: Partial<IBasicEventTypesForKeywords>[]
    ): BasicEventTypesForKeywords | BasicEventTypesForKeywords[] {
        const result: BasicEventTypesForKeywords[] = [];
        basicEventTypesForKeywords?.forEach((betfk) =>
            result.push(
                new BasicEventTypesForKeywords({
                    k: betfk.k ?? '',
                    e: betfk.e ?? [],
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new BasicEventTypesForKeywords({
            k: '',
            e: [],
        });
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

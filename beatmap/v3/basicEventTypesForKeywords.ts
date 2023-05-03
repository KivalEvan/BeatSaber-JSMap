import { IBasicEventTypesForKeywords } from '../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import { IWrapEventTypesForKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { WrapEventTypesForKeywords } from '../wrapper/eventTypesForKeywords.ts';

/** Basic event types for keywords beatmap v3 class object.
 *
 * Used in basic event types with keywords.
 */
export class BasicEventTypesForKeywords extends WrapEventTypesForKeywords<
    Required<IBasicEventTypesForKeywords>
> {
    static default: ObjectReturnFn<Required<IBasicEventTypesForKeywords>> = {
        k: '',
        e: () => [],
    };

    constructor();
    constructor(
        data: Partial<IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>>,
    );
    constructor(
        data:
            & Partial<IBasicEventTypesForKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>>,
    );
    constructor(
        data:
            & Partial<IBasicEventTypesForKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>> =
                {},
    ) {
        super({
            k: data.keyword ?? data.k ?? BasicEventTypesForKeywords.default.k,
            e: data.events ?? data.e ?? BasicEventTypesForKeywords.default.e(),
        });
    }

    static create(): BasicEventTypesForKeywords[];
    static create(
        ...data: Partial<
            IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>
        >[]
    ): BasicEventTypesForKeywords[];
    static create(
        ...data: (
            & Partial<IBasicEventTypesForKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>>
        )[]
    ): BasicEventTypesForKeywords[];
    static create(
        ...data: (
            & Partial<IBasicEventTypesForKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute<Required<IBasicEventTypesForKeywords>>>
        )[]
    ): BasicEventTypesForKeywords[] {
        const result: BasicEventTypesForKeywords[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): IBasicEventTypesForKeywords {
        return {
            k: this.keyword,
            e: this.events,
        };
    }

    get keyword() {
        return this.data.k;
    }
    set keyword(value: IBasicEventTypesForKeywords['k']) {
        this.data.k = value;
    }

    get events() {
        return this.data.e;
    }
    set events(value: IBasicEventTypesForKeywords['e']) {
        this.data.e = value;
    }
}

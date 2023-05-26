import { ISpecialEventsKeywordFiltersKeywords } from '../../types/beatmap/v2/specialEventsKeywordFiltersKeywords.ts';
import { IWrapEventTypesForKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import { ObjectReturnFn } from '../../types/utils.ts';
import { WrapEventTypesForKeywords } from '../wrapper/eventTypesForKeywords.ts';

/** Special event types for keywords beatmap v2 class object.
 *
 * Used in special event types with keywords.
 */
export class SpecialEventsKeywordFiltersKeywords extends WrapEventTypesForKeywords<
    Required<ISpecialEventsKeywordFiltersKeywords>
> {
    static default: ObjectReturnFn<Required<ISpecialEventsKeywordFiltersKeywords>> = {
        _keyword: '',
        _specialEvents: () => [],
    };

    constructor();
    constructor(data: Partial<IWrapEventTypesForKeywordsAttribute>);
    constructor(data: Partial<ISpecialEventsKeywordFiltersKeywords>);
    constructor(
        data:
            & Partial<ISpecialEventsKeywordFiltersKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute>,
    );
    constructor(
        data:
            & Partial<ISpecialEventsKeywordFiltersKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute> = {},
    ) {
        super();

        this._keyword = data.keyword ?? data._keyword ??
            SpecialEventsKeywordFiltersKeywords.default._keyword;
        this._events = data.events ??
            data._specialEvents ??
            SpecialEventsKeywordFiltersKeywords.default._specialEvents();
    }

    static create(): SpecialEventsKeywordFiltersKeywords[];
    static create(
        ...data: Partial<IWrapEventTypesForKeywordsAttribute>[]
    ): SpecialEventsKeywordFiltersKeywords[];
    static create(
        ...data: Partial<ISpecialEventsKeywordFiltersKeywords>[]
    ): SpecialEventsKeywordFiltersKeywords[];
    static create(
        ...data: (
            & Partial<ISpecialEventsKeywordFiltersKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute>
        )[]
    ): SpecialEventsKeywordFiltersKeywords[];
    static create(
        ...data: (
            & Partial<ISpecialEventsKeywordFiltersKeywords>
            & Partial<IWrapEventTypesForKeywordsAttribute>
        )[]
    ): SpecialEventsKeywordFiltersKeywords[] {
        const result: SpecialEventsKeywordFiltersKeywords[] = [];
        data.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): ISpecialEventsKeywordFiltersKeywords {
        return {
            _keyword: this.keyword,
            _specialEvents: this.events,
        };
    }

    get keyword() {
        return this._keyword;
    }
    set keyword(value: ISpecialEventsKeywordFiltersKeywords['_keyword']) {
        this._keyword = value;
    }

    get events() {
        return this._events;
    }
    set events(value: ISpecialEventsKeywordFiltersKeywords['_specialEvents']) {
        this._events = value;
    }
}

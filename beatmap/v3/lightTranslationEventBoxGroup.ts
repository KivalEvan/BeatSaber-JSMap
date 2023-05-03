import { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { WrapLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';

/** Light translation event box group beatmap v3 class object. */
export class LightTranslationEventBoxGroup extends WrapLightTranslationEventBoxGroup<
    Required<ILightTranslationEventBoxGroup>,
    Required<ILightTranslationEventBox>,
    Required<ILightTranslationBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightTranslationEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    private _e: LightTranslationEventBox[];

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightTranslationEventBoxGroup>);
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super({
            b: data.time ?? data.b ?? LightTranslationEventBoxGroup.default.b,
            g: data.id ?? data.g ?? LightTranslationEventBoxGroup.default.g,
            e: (data.boxes as ILightTranslationEventBox[]) ??
                (data.e as unknown as ILightTranslationEventBox[]) ??
                LightTranslationEventBoxGroup.default.e(),
            customData: data.customData ?? LightTranslationEventBoxGroup.default.customData(),
        });
        this._e = this.data.e.map((obj) => new LightTranslationEventBox(obj));
    }

    static create(): LightTranslationEventBoxGroup[];
    static create(
        ...data: DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
                Required<ILightTranslationEventBoxGroup>,
                Required<ILightTranslationEventBox>,
                Required<ILightTranslationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightTranslationEventBoxGroup>
            & DeepPartial<
                IWrapLightTranslationEventBoxGroupAttribute<
                    Required<ILightTranslationEventBoxGroup>,
                    Required<ILightTranslationEventBox>,
                    Required<ILightTranslationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightTranslationEventBoxGroup[] {
        const result: LightTranslationEventBoxGroup[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightTranslationEventBoxGroup> {
        return {
            b: this.time,
            g: this.id,
            e: this.boxes.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this.data.b;
    }
    set time(value: ILightTranslationEventBoxGroup['b']) {
        this.data.b = value;
    }

    get id() {
        return this.data.g;
    }
    set id(value: ILightTranslationEventBoxGroup['g']) {
        this.data.g = value;
    }

    get boxes(): LightTranslationEventBox[] {
        return this._e;
    }
    set boxes(value: LightTranslationEventBox[]) {
        this._e = value;
    }

    get customData(): NonNullable<ILightTranslationEventBoxGroup['customData']> {
        return this.data.customData;
    }
    set customData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>) {
        this.data.customData = value;
    }

    setCustomData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>): this {
        this.customData = value;
        return this;
    }
    addCustomData(object: ILightTranslationEventBoxGroup['customData']): this {
        this.customData = { ...this.customData, object };
        return this;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}

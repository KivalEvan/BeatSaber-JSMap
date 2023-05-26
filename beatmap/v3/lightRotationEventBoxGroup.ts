import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { WrapLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';

/** Light Rotation event box group beatmap v3 class object. */
export class LightRotationEventBoxGroup extends WrapLightRotationEventBoxGroup<
    Required<ILightRotationEventBoxGroup>,
    Required<ILightRotationEventBox>,
    Required<ILightRotationBase>,
    Required<IIndexFilter>
> {
    static default: ObjectReturnFn<Required<ILightRotationEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    constructor();
    constructor(
        data: DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
                Required<ILightRotationEventBoxGroup>,
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >,
    );
    constructor(data: DeepPartial<ILightRotationEventBoxGroup>);
    constructor(
        data:
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >,
    );
    constructor(
        data:
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            > = {},
    ) {
        super();

        this._time = data.time ?? data.b ?? LightRotationEventBoxGroup.default.b;
        this._id = data.id ?? data.g ?? LightRotationEventBoxGroup.default.g;
        this._boxes = (
            (data.boxes as ILightRotationEventBox[]) ??
                (data.e as unknown as ILightRotationEventBox[]) ??
                LightRotationEventBoxGroup.default.e()
        ).map((obj) => new LightRotationEventBox(obj));
        this._customData = data.customData ?? LightRotationEventBoxGroup.default.customData();
    }

    static create(): LightRotationEventBoxGroup[];
    static create(
        ...data: DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
                Required<ILightRotationEventBoxGroup>,
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...data: DeepPartial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...data: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartial<
                IWrapLightRotationEventBoxGroupAttribute<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBoxGroup[] {
        const result: LightRotationEventBoxGroup[] = [];
        data?.forEach((obj) => result.push(new this(obj)));
        if (result.length) {
            return result;
        }
        return [new this()];
    }

    toJSON(): Required<ILightRotationEventBoxGroup> {
        return {
            b: this.time,
            g: this.id,
            e: this.boxes.map((e) => e.toJSON()),
            customData: deepCopy(this.customData),
        };
    }

    get time() {
        return this._time;
    }
    set time(value: ILightRotationEventBoxGroup['b']) {
        this._time = value;
    }

    get id() {
        return this._id;
    }
    set id(value: ILightRotationEventBoxGroup['g']) {
        this._id = value;
    }

    get boxes() {
        return this._boxes as LightRotationEventBox[];
    }
    set boxes(value: LightRotationEventBox[]) {
        this._boxes = value;
    }

    get customData(): NonNullable<ILightRotationEventBoxGroup['customData']> {
        return this.customData;
    }
    set customData(value: NonNullable<ILightRotationEventBoxGroup['customData']>) {
        this.customData = value;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}

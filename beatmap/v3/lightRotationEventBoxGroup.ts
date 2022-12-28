import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { DeepPartial, DeepPartialWrapper, ObjectReturnFn } from '../../types/utils.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';
import { WrapLightRotationEventBoxGroup } from '../wrapper/lightRotationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import { IWrapLightRotationEventBoxGroup } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';

/** Light translation event box group beatmap v3 class object. */
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

    private _e: LightRotationEventBox[];
    protected constructor(
        eventBoxGroup: Required<ILightRotationEventBoxGroup>,
    ) {
        super(eventBoxGroup);
        this._e = eventBoxGroup.e.map((e) => LightRotationEventBox.create(e)[0]);
    }

    static create(): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: DeepPartialWrapper<
            IWrapLightRotationEventBoxGroup<
                Required<ILightRotationEventBoxGroup>,
                Required<ILightRotationEventBox>,
                Required<ILightRotationBase>,
                Required<IIndexFilter>
            >
        >[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartialWrapper<
                IWrapLightRotationEventBoxGroup<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: (
            & DeepPartial<ILightRotationEventBoxGroup>
            & DeepPartialWrapper<
                IWrapLightRotationEventBoxGroup<
                    Required<ILightRotationEventBoxGroup>,
                    Required<ILightRotationEventBox>,
                    Required<ILightRotationBase>,
                    Required<IIndexFilter>
                >
            >
        )[]
    ): LightRotationEventBoxGroup[] {
        const result: LightRotationEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new this({
                    b: ebg.time ?? ebg.b ??
                        LightRotationEventBoxGroup.default.b,
                    g: ebg.id ?? ebg.g ?? LightRotationEventBoxGroup.default.g,
                    e: (ebg.boxes as ILightRotationEventBox[]) ??
                        (ebg.e as unknown as ILightRotationEventBox[]) ??
                        LightRotationEventBoxGroup.default.e(),
                    customData: ebg.customData ??
                        LightRotationEventBoxGroup.default.customData(),
                }),
            )
        );
        if (result.length) {
            return result;
        }
        return [
            new this({
                b: LightRotationEventBoxGroup.default.b,
                g: LightRotationEventBoxGroup.default.g,
                e: LightRotationEventBoxGroup.default.e(),
                customData: LightRotationEventBoxGroup.default.customData(),
            }),
        ];
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
        return this.data.b;
    }
    set time(value: ILightRotationEventBoxGroup['b']) {
        this.data.b = value;
    }

    get id() {
        return this.data.g;
    }
    set id(value: ILightRotationEventBoxGroup['g']) {
        this.data.g = value;
    }

    get boxes(): LightRotationEventBox[] {
        return this._e;
    }
    set boxes(value: LightRotationEventBox[]) {
        this._e = value;
    }

    get customData(): NonNullable<ILightRotationEventBoxGroup['customData']> {
        return this.data.customData;
    }
    set customData(
        value: NonNullable<ILightRotationEventBoxGroup['customData']>,
    ) {
        this.data.customData = value;
    }

    isValid(): boolean {
        return this.id >= 0;
    }
}

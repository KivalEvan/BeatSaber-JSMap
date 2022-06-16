import { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import { DeepPartial, ObjectToReturn } from '../../types/utils.ts';
import { EventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { LightColorEventBox } from './lightColorEventBox.ts';

/** Light color event box group beatmap v3 class object. */
export class LightColorEventBoxGroup extends EventBoxGroupTemplate<ILightColorEventBox, LightColorEventBox> {
    static default: ObjectToReturn<Required<ILightColorEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    private constructor(eventBoxGroup: Required<ILightColorEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => LightColorEventBox.create(e)),
        );
    }

    static create(): LightColorEventBoxGroup;
    static create(eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>): LightColorEventBoxGroup;
    static create(...eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>[]): LightColorEventBoxGroup[];
    static create(
        ...eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>[]
    ): LightColorEventBoxGroup | LightColorEventBoxGroup[] {
        const result: LightColorEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new this({
                    b: ebg.b ?? LightColorEventBoxGroup.default.b,
                    g: ebg.g ?? LightColorEventBoxGroup.default.g,
                    e: (ebg as Required<ILightColorEventBoxGroup>).e ?? LightColorEventBoxGroup.default.e(),
                    customData: ebg.customData ?? LightColorEventBoxGroup.default.customData(),
                }),
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new this({
            b: LightColorEventBoxGroup.default.b,
            g: LightColorEventBoxGroup.default.g,
            e: LightColorEventBoxGroup.default.e(),
            customData: LightColorEventBoxGroup.default.customData(),
        });
    }
}

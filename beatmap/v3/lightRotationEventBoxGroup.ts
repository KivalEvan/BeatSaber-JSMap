import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { DeepPartial, ObjectReturnFn } from '../../types/utils.ts';
import { EventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';

/** Light rotation event box group beatmap v3 class object. */
export class LightRotationEventBoxGroup extends EventBoxGroupTemplate<ILightRotationEventBox, LightRotationEventBox> {
    static default: ObjectReturnFn<Required<ILightRotationEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    protected constructor(eventBoxGroup: Required<ILightRotationEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => LightRotationEventBox.create(e)[0]),
        );
    }

    static create(): LightRotationEventBoxGroup[];
    static create(...eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>[]): LightRotationEventBoxGroup[];
    static create(...eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>[]): LightRotationEventBoxGroup[] {
        const result: LightRotationEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new this({
                    b: ebg.b ?? LightRotationEventBoxGroup.default.b,
                    g: ebg.g ?? LightRotationEventBoxGroup.default.g,
                    e: (ebg as Required<ILightRotationEventBoxGroup>).e ?? LightRotationEventBoxGroup.default.e(),
                    customData: ebg.customData ?? LightRotationEventBoxGroup.default.customData(),
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
}

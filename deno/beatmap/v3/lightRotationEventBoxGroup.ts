import { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import { DeepPartial, ObjectToReturn } from '../../types/utils.ts';
import { EventBoxGroupTemplate } from './eventBoxGroupTemplate.ts';
import { LightRotationEventBox } from './lightRotationEventBox.ts';

export class LightRotationEventBoxGroup extends EventBoxGroupTemplate<
    ILightRotationEventBox,
    LightRotationEventBox
> {
    static default: ObjectToReturn<Required<ILightRotationEventBoxGroup>> = {
        b: 0,
        g: 0,
        e: () => [],
        customData: () => {
            return {};
        },
    };

    private constructor(eventBoxGroup: Required<ILightRotationEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => LightRotationEventBox.create(e))
        );
    }

    static create(): LightRotationEventBoxGroup;
    static create(
        eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>
    ): LightRotationEventBoxGroup;
    static create(
        ...eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: DeepPartial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup | LightRotationEventBoxGroup[] {
        const result: LightRotationEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new LightRotationEventBoxGroup({
                    b: ebg.b ?? LightRotationEventBoxGroup.default.b,
                    g: ebg.g ?? LightRotationEventBoxGroup.default.g,
                    e:
                        (ebg as Required<ILightRotationEventBoxGroup>).e ??
                        LightRotationEventBoxGroup.default.e(),
                    customData:
                        ebg.customData ??
                        LightRotationEventBoxGroup.default.customData(),
                })
            )
        );
        if (result.length === 1) {
            return result[0];
        }
        if (result.length) {
            return result;
        }
        return new LightRotationEventBoxGroup({
            b: LightRotationEventBoxGroup.default.b,
            g: LightRotationEventBoxGroup.default.g,
            e: LightRotationEventBoxGroup.default.e(),
            customData: LightRotationEventBoxGroup.default.customData(),
        });
    }
}

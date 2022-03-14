import { DeepPartial, ObjectToReturn } from '../../../utils.ts';
import {
    EventBoxGroupTemplate,
    IEventBoxGroupTemplate,
} from './eventBoxGroupTemplate.ts';
import {
    ILightRotationEventBox,
    LightRotationEventBox,
} from './lightRotationEventBox.ts';

// deno-lint-ignore no-empty-interface
export interface ILightRotationEventBoxGroup
    extends IEventBoxGroupTemplate<ILightRotationEventBox> {}

const defaultValue: ObjectToReturn<ILightRotationEventBoxGroup> = {
    b: 0,
    g: 0,
    e: () => [],
};

export class LightRotationEventBoxGroup extends EventBoxGroupTemplate<
    ILightRotationEventBox,
    LightRotationEventBox
> {
    constructor(eventBoxGroup: Required<ILightRotationEventBoxGroup>) {
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
                    b: ebg.b ?? defaultValue.b,
                    g: ebg.g ?? defaultValue.g,
                    e:
                        (ebg as Required<ILightRotationEventBoxGroup>).e ??
                        defaultValue.e(),
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
            b: defaultValue.b,
            g: defaultValue.g,
            e: defaultValue.e(),
        });
    }
}

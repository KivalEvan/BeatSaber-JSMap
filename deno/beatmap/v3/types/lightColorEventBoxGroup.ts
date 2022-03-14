import { DeepPartial, ObjectToReturn } from '../../../utils.ts';
import {
    IEventBoxGroupTemplate,
    EventBoxGroupTemplate,
} from './eventBoxGroupTemplate.ts';
import { ILightColorEventBox, LightColorEventBox } from './lightColorEventBox.ts';

// deno-lint-ignore no-empty-interface
export interface ILightColorEventBoxGroup
    extends IEventBoxGroupTemplate<ILightColorEventBox> {}

const defaultValue: ObjectToReturn<ILightColorEventBoxGroup> = {
    b: 0,
    g: 0,
    e: () => [],
};

export class LightColorEventBoxGroup extends EventBoxGroupTemplate<
    ILightColorEventBox,
    LightColorEventBox
> {
    constructor(eventBoxGroup: Required<ILightColorEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => LightColorEventBox.create(e))
        );
    }

    static create(): LightColorEventBoxGroup;
    static create(
        eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>
    ): LightColorEventBoxGroup;
    static create(
        ...eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>[]
    ): LightColorEventBoxGroup[];
    static create(
        ...eventBoxGroups: DeepPartial<ILightColorEventBoxGroup>[]
    ): LightColorEventBoxGroup | LightColorEventBoxGroup[] {
        const result: LightColorEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new LightColorEventBoxGroup({
                    b: ebg.b ?? defaultValue.b,
                    g: ebg.g ?? defaultValue.g,
                    e:
                        (ebg as Required<ILightColorEventBoxGroup>).e ??
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
        return new LightColorEventBoxGroup({
            b: defaultValue.b,
            g: defaultValue.g,
            e: defaultValue.e(),
        });
    }
}

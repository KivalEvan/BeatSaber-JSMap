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

export class LightRotationEventBoxGroup extends EventBoxGroupTemplate<
    ILightRotationEventBox,
    LightRotationEventBox
> {
    constructor(eventBoxGroup: Required<ILightRotationEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => new LightRotationEventBox(e))
        );
    }

    static create(): LightRotationEventBoxGroup;
    static create(
        eventBoxGroups: Partial<ILightRotationEventBoxGroup>
    ): LightRotationEventBoxGroup;
    static create(
        ...eventBoxGroups: Partial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup[];
    static create(
        ...eventBoxGroups: Partial<ILightRotationEventBoxGroup>[]
    ): LightRotationEventBoxGroup | LightRotationEventBoxGroup[] {
        const result: LightRotationEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new LightRotationEventBoxGroup({
                    b: ebg.b ?? 0,
                    g: ebg.g ?? 0,
                    e: ebg.e ?? [],
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
            b: 0,
            g: 0,
            e: [],
        });
    }
}

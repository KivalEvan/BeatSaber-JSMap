import {
    IEventBoxGroupTemplate,
    EventBoxGroupTemplate,
} from './eventBoxGroupTemplate.ts';
import { ILightColorEventBox, LightColorEventBox } from './lightColorEventBox.ts';

// deno-lint-ignore no-empty-interface
export interface ILightColorEventBoxGroup
    extends IEventBoxGroupTemplate<ILightColorEventBox> {}

export class LightColorEventBoxGroup extends EventBoxGroupTemplate<
    ILightColorEventBox,
    LightColorEventBox
> {
    constructor(eventBoxGroup: Required<ILightColorEventBoxGroup>) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => new LightColorEventBox(e))
        );
    }

    static create(): LightColorEventBoxGroup;
    static create(
        eventBoxGroups: Partial<ILightColorEventBoxGroup>
    ): LightColorEventBoxGroup;
    static create(
        ...eventBoxGroups: Partial<ILightColorEventBoxGroup>[]
    ): LightColorEventBoxGroup[];
    static create(
        ...eventBoxGroups: Partial<ILightColorEventBoxGroup>[]
    ): LightColorEventBoxGroup | LightColorEventBoxGroup[] {
        const result: LightColorEventBoxGroup[] = [];
        eventBoxGroups?.forEach((ebg) =>
            result.push(
                new LightColorEventBoxGroup({
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
        return new LightColorEventBoxGroup({
            b: 0,
            g: 0,
            e: [],
        });
    }
}

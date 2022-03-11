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
    constructor(eventBoxGroup: ILightColorEventBoxGroup) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => new LightColorEventBox(e))
        );
    }
}

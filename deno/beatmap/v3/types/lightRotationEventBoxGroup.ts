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
    constructor(eventBoxGroup: ILightRotationEventBoxGroup) {
        super(
            eventBoxGroup,
            eventBoxGroup.e.map((e) => new LightRotationEventBox(e))
        );
    }
}

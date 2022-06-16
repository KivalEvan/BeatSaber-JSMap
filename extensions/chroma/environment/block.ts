import { LookupMethod } from '../../../types/beatmap/shared/chroma.ts';
import { Vector3 } from '../../../types/beatmap/shared/heck.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';

/** **IMPORTANT:** Manually adjust block to be 1x1x1 unity unit (1x1x1 scale does usually not work) */
export class EnvironmentBlock implements IChromaEnvironment {
    id: string;
    lookupMethod: LookupMethod;
    track?: string;
    duplicate?: number;
    active?: boolean;
    scale: Vector3;
    position?: Vector3;
    rotation?: Vector3;
    localPosition?: Vector3;
    localRotation?: Vector3;
    lightID?: number;
    origin: Vector3;
    protected constructor(data: IChromaEnvironment, origin: Vector3) {
        this.id = data.id;
        this.lookupMethod = data.lookupMethod;
        this.track = data.track;
        this.duplicate = 1;
        this.active = data.active;
        this.scale = data.scale || [1, 1, 1];
        this.position = data.position;
        this.rotation = data.rotation;
        this.localPosition = data.localPosition;
        this.localRotation = data.localRotation;
        this.lightID = data.lightID;
        this.origin = origin;
    }
    static create(data: IChromaEnvironment, origin: Vector3) {
        return new this(data, origin);
    }

    place(pos: Vector3, scale: Vector3, rotation: Vector3, insertTo?: never): IChromaEnvironment;
    place(pos: Vector3, scale: Vector3, rotation: Vector3, insertTo: IChromaEnvironment[]): void;
    place(pos: Vector3, scale: Vector3, rotation: Vector3, insertTo?: IChromaEnvironment[]): IChromaEnvironment | void {
        const data = {
            id: this.id,
            lookupMethod: this.lookupMethod,
            track: this.track,
            duplicate: this.duplicate,
            active: this.active,
            scale: [scale[0] * this.scale[0], scale[1] * this.scale[1], scale[2] * this.scale[2]],
            position: [pos[0] + this.origin[0], pos[1] + this.origin[1], pos[2] + this.origin[2]],
            rotation: [rotation[0], rotation[1], rotation[2]],
            localPosition: this.localPosition,
            localRotation: this.localRotation,
            lightID: this.lightID,
        } as IChromaEnvironment;
        if (insertTo) {
            insertTo.push(data);
            return;
        }
        return data;
    }
}

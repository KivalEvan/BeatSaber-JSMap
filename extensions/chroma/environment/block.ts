import { LookupMethod } from '../../../types/beatmap/shared/chroma.ts';
import { Vector3 } from '../../../types/beatmap/shared/heck.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';
import { IChromaEnvironmentBlock, IChromaEnvironmentPlacement } from '../types/environment.ts';

/** **IMPORTANT:** Manually adjust block to be exactly 1x1x1 unity unit (1x1x1 scale does usually not work) */
export class EnvironmentBlock implements IChromaEnvironment {
    id: string;
    lookupMethod: LookupMethod;
    track?: never;
    readonly duplicate = 1;
    active?: never;
    scale: Vector3;
    position: Vector3;
    rotation: Vector3;
    localPosition?: never;
    localRotation?: never;
    lightID?: never;
    anchor: Vector3;
    protected constructor(data: IChromaEnvironmentBlock, anchor: Vector3) {
        this.id = data.id;
        this.lookupMethod = data.lookupMethod;
        this.track = data.track;
        this.active = data.active;
        this.scale = data.scale ?? [1, 1, 1];
        this.position = data.position ?? [0, 0, 0];
        this.rotation = data.rotation ?? [0, 0, 0];
        this.localPosition = data.localPosition;
        this.localRotation = data.localRotation;
        this.lightID = data.lightID;
        this.anchor = anchor;
    }
    static create(data: IChromaEnvironmentBlock, anchor: Vector3) {
        return new this(data, anchor);
    }

    place(options: IChromaEnvironmentPlacement, insertTo?: never): IChromaEnvironment;
    place(options: IChromaEnvironmentPlacement, insertTo: IChromaEnvironment[]): void;
    place(options: IChromaEnvironmentPlacement, insertTo?: IChromaEnvironment[]): IChromaEnvironment | void {
        const scale = options.scale ? (this.scale.map((s, i) => s * options.scale![i]) as Vector3) : this.scale;
        const position = options.position
            ? (options.position.map((p, i) => p + this.anchor[i] * (options.scale?.[i] || 1)) as Vector3)
            : (this.position.map((p, i) => p + this.anchor[i] * (options.scale?.[i] || 1)) as Vector3);
        const rotation = options.rotation
            ? (options.rotation.map((r, i) => r + this.rotation[i]) as Vector3)
            : this.rotation;
        const data = {
            id: this.id,
            lookupMethod: this.lookupMethod,
            track: this.track,
            duplicate: this.duplicate,
            active: this.active,
            scale,
            position,
            rotation,
            lightID: options.lightID,
        } as IChromaEnvironment;
        if (insertTo) {
            insertTo.push(data);
            return;
        }
        return data;
    }
}

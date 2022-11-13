import { Vector3 } from '../../../types/beatmap/shared/custom/heck.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/custom/chroma.ts';
import { IChromaEnvironmentPlacement } from '../types/environment.ts';

/** **IMPORTANT:** Manually adjust block to be exactly 1x1x1 unity unit (1x1x1 scale does usually not work) */
export class EnvironmentBlock {
    data;
    anchor;
    lightType?: number;
    static startLightID = 100;
    static index = 0;
    protected constructor(
        data: IChromaEnvironment,
        anchor: Vector3,
        lightType?: number,
    ) {
        this.data = data;
        this.anchor = anchor;
        this.lightType = lightType;
    }
    static create(data: IChromaEnvironment, anchor: Vector3, lightType?: number) {
        return new this(data, anchor, lightType);
    }

    place(options: IChromaEnvironmentPlacement, insertTo?: never): IChromaEnvironment;
    place(options: IChromaEnvironmentPlacement, insertTo: IChromaEnvironment[]): void;
    place(
        options: IChromaEnvironmentPlacement,
        insertTo?: IChromaEnvironment[],
    ): IChromaEnvironment | void {
        const scale = options.scale
            ? ((this.data.scale ? this.data.scale : [1, 1, 1]).map(
                (s, i) => s * options.scale![i],
            ) as Vector3)
            : this.data.scale;
        const position = options.position
            ? (options.position.map(
                (p, i) => p + this.anchor[i] * (options.scale?.[i] || 1),
            ) as Vector3)
            : ((this.data.position ? this.data.position : [0, 0, 0]).map(
                (p, i) => p + this.anchor[i] * (options.scale?.[i] ?? 1),
            ) as Vector3);
        const rotation = options.rotation
            ? (options.rotation.map(
                (r, i) => r + (this.data.rotation?.[i] ?? 0),
            ) as Vector3)
            : this.data.rotation;
        const components = {
            ...this.data.components,
        };
        if (typeof this.lightType === 'number') {
            components.ILightWithId = {
                type: this.lightType,
                lightID: EnvironmentBlock.startLightID + EnvironmentBlock.index++,
            };
        }
        const data = {
            ...this.data,
            scale,
            position,
            rotation,
            components,
        };
        if (insertTo) {
            insertTo.push(data);
            return;
        }
        return data;
    }
}

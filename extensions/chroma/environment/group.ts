import { Vector3 } from '../../../types/beatmap/shared/heck.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';
import { deepCopy } from '../../../utils/misc.ts';

export class EnvironmentGroup {
    data: IChromaEnvironment[];
    origin: Vector3;
    protected constructor(data: IChromaEnvironment[], origin: Vector3) {
        this.data = data;
        this.origin = origin;
    }
    static create(data: IChromaEnvironment[], origin: Vector3) {
        return new this(data, origin);
    }

    place(
        pos: Vector3,
        scale: Vector3,
        rotation: Vector3,
        insertTo?: never,
    ): IChromaEnvironment[];
    place(
        pos: Vector3,
        scale: Vector3,
        rotation: Vector3,
        insertTo: IChromaEnvironment[],
    ): void;
    place(
        pos: Vector3,
        scale: Vector3,
        rotation: Vector3,
        insertTo?: IChromaEnvironment[],
    ): IChromaEnvironment[] | void {
        const data = deepCopy(this.data);
        data.forEach((d) => {
            d.position = d.position!.map((p, i) => p * scale[i] + pos[i]) as Vector3;
            d.scale = d.scale?.map((s, i) => s * scale[i]) as Vector3;
            d.rotation = d.rotation?.map((r, i) => (r + rotation[i]) % 360) as Vector3;
        });
        if (insertTo) {
            insertTo.push(...data);
            return;
        }
        return data;
    }
}

import { Vector3 } from '../../../types/beatmap/shared/heck.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/chroma.ts';
import { IChromaEnvironmentPlacement } from '../types/environment.ts';
import { deepCopy } from '../../../utils/misc.ts';

export class EnvironmentGroup {
    data: IChromaEnvironment[];
    anchor: Vector3;
    protected constructor(data: IChromaEnvironment[], anchor: Vector3) {
        this.data = data;
        this.anchor = anchor;
    }
    static create(data: IChromaEnvironment[], anchor: Vector3) {
        return new this(data, anchor);
    }

    place(options: IChromaEnvironmentPlacement, insertTo?: never): IChromaEnvironment[];
    place(options: IChromaEnvironmentPlacement, insertTo: IChromaEnvironment[]): void;
    place(options: IChromaEnvironmentPlacement, insertTo?: IChromaEnvironment[]): IChromaEnvironment[] | void {
        const data = deepCopy(this.data);
        data.forEach((d) => {
            d.position = d.position!.map(
                (p, i) => (this.anchor[i] + p) * (options.scale?.[i] ?? 1) + (options.position?.[i] ?? 0),
            ) as Vector3;
            d.scale = d.scale?.map((s, i) => s * (options.scale?.[i] ?? 1)) as Vector3;
        });
        if (insertTo) {
            insertTo.push(...data);
            return;
        }
        return data;
    }
}

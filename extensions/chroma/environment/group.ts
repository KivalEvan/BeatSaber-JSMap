import { Vector3 } from '../../../types/vector.ts';
import { IChromaEnvironment } from '../../../types/beatmap/v3/custom/chroma.ts';
import { IChromaEnvironmentPlacement } from '../types/environment.ts';
import { deepCopy } from '../../../utils/misc.ts';
import { vectorRotate, vectorScale } from '../../../utils/vector.ts';
import { degToRad } from '../../../utils/math.ts';

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

    place(options: IChromaEnvironmentPlacement): IChromaEnvironment[];
    place(
        options: IChromaEnvironmentPlacement,
        insertTo: IChromaEnvironment[],
    ): void;
    place(
        options: IChromaEnvironmentPlacement,
        insertTo?: IChromaEnvironment[],
    ): IChromaEnvironment[] | void {
        const data = deepCopy(this.data);
        data.forEach((d) => {
            if (d.rotation) {
                d.rotation = vectorRotate(d.rotation, options.rotation);
            } else d.rotation = options.rotation;

            // im only doing Y rotation for now
            if (options.rotation && d.position) {
                const yRad = degToRad(options.rotation[1]);
                const cos = Math.cos(yRad);
                const sin = Math.sin(yRad);

                const nx = cos * d.position[0] + sin * d.position[2];
                const ny = cos * d.position[2] - sin * d.position[0];

                // i dont understand why negative assignment work but ok
                d.position[0] = -nx;
                d.position[2] = -ny;
            }

            d.position = d.position!.map(
                (p, i) =>
                    (this.anchor[i] + p) * (options.scale?.[i] ?? 1) +
                    (options.position?.[i] ?? 0),
            ) as Vector3;

            d.scale = vectorScale(d.scale, options.scale);

            if (
                typeof d.components?.ILightWithId?.type === 'number' &&
                typeof options.type === 'number'
            ) {
                d.components.ILightWithId.type = options.type;
            }
        });
        if (insertTo) {
            insertTo.push(...data);
            return;
        }
        return data;
    }
}

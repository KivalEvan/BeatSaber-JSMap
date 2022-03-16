import { IBaseObject } from '../../types/beatmap/v2/object.ts';
import { Serializable } from '../shared/serializable.ts';

export abstract class BeatmapObject<T extends IBaseObject> extends Serializable<T> {
    /** Beat time `<float>` of beatmap object. */
    get time() {
        return this.data._time;
    }
    set time(value: number) {
        this.data._time = value;
    }
}

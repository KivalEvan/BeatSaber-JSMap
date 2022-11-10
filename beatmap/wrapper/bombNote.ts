import { WrapGridObject } from './gridObject.ts';
import { IWrapBombNote } from '../../types/beatmap/wrapper/bombNote.ts';

/** Bomb note beatmap class object. */
export abstract class WrapBombNote<T extends Record<keyof T, unknown>> extends WrapGridObject<T>
    implements IWrapBombNote<T> {
    isMappingExtensions() {
        return this.posX > 3 || this.posX < 0 || this.posY > 2 || this.posY < 0;
    }

    isValid() {
        return !this.isMappingExtensions();
    }
}

import type { IWrapChainLink } from '../schema/wrapper/types/chain.ts';
import { deepCopy } from '../../utils/misc/json.ts';
import { BaseNote } from './abstract/baseNote.ts';
import { createChainLink } from '../schema/wrapper/chainLink.ts';

/**
 * Core beatmap chain link.
 */
export class ChainLink extends BaseNote implements IWrapChainLink {
   static defaultValue: IWrapChainLink = createChainLink();

   static createOne(data: Partial<IWrapChainLink> = {}): ChainLink {
      return new this(data);
   }
   static create(...data: Partial<IWrapChainLink>[]): ChainLink[] {
      return data.length ? data.map((obj) => new this(obj)) : [new this()];
   }
   constructor(data: Partial<IWrapChainLink> = {}) {
      super();
      this.time = data.time ?? ChainLink.defaultValue.time;
      this.posX = data.posX ?? ChainLink.defaultValue.posX;
      this.posY = data.posY ?? ChainLink.defaultValue.posY;
      this.color = data.color ?? ChainLink.defaultValue.color;
      this.direction = data.direction ?? ChainLink.defaultValue.direction;
      this.angle = data.angle ?? ChainLink.defaultValue.angle;
      this.laneRotation = data.laneRotation ?? ChainLink.defaultValue.laneRotation;
      this.chain = data.chain ?? null;
      this.customData = deepCopy(
         data.customData ?? ChainLink.defaultValue.customData,
      );
   }

   override isValid(fn?: (object: this) => boolean, _?: boolean): boolean {
      return fn?.(this) ?? true;
   }

   angle: IWrapChainLink['angle'];
   chain: IWrapChainLink['chain'];

   setAngle(value: this['angle']): this {
      this.angle = value;
      return this;
   }
   setChain(value: this['chain']): this {
      this.chain = value;
      return this;
   }
}

import { IHeckCustomEvent } from './heck.ts';
import { IChromaCustomEvent } from './chroma.ts';
import { INECustomEvent } from './noodleExtensions.ts';

export type ICustomEvent = IHeckCustomEvent | IChromaCustomEvent | INECustomEvent;

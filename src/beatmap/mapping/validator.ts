import { DifficultySchema as V1DifficultySchema } from '../schema/v1/declaration/difficulty.ts';
import { InfoSchema as V1InfoSchema } from '../schema/v1/declaration/info.ts';
import { BPMInfoSchema as V2AudioSchema } from '../schema/v2/declaration/audioData.ts';
import { InfoSchema as V2InfoSchema } from '../schema/v2/declaration/info.ts';
import { AudioDataSchema as V4AudioSchema } from '../schema/v4/declaration/audioData.ts';
import { DifficultySchema as V2DifficultySchema } from '../schema/v2/declaration/difficulty.ts';
import { InfoSchema as V4InfoSchema } from '../schema/v4/declaration/info.ts';
import { DifficultySchema as V3DifficultySchema } from '../schema/v3/declaration/difficulty.ts';
import { DifficultySchema as V4DifficultySchema } from '../schema/v4/declaration/difficulty.ts';
import { LightshowSchema as V3LightshowSchema } from '../schema/v3/declaration/lightshow.ts';
import { LightshowSchema as V4LightshowSchema } from '../schema/v4/declaration/lightshow.ts';

/** Data check version map for schema beatmap info. */
export const infoCheckMap = {
   1: V1InfoSchema,
   2: V2InfoSchema,
   4: V4InfoSchema,
} as const;

/** Data check version map for schema beatmap audio data. */
export const audioSchemaMap = {
   2: V2AudioSchema,
   4: V4AudioSchema,
} as const;

/** Data check version map for schema beatmap difficulty. */
export const difficultyCheckMap = {
   1: V1DifficultySchema,
   2: V2DifficultySchema,
   3: V3DifficultySchema,
   4: V4DifficultySchema,
} as const;

/** Data check version map for schema beatmap lightshow. */
export const lightshowCheckMap = {
   3: V3LightshowSchema,
   4: V4LightshowSchema,
} as const;

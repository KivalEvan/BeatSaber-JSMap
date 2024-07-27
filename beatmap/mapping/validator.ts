import type { ISchemaDeclaration } from '../../types/beatmap/shared/schema.ts';
import {
   DifficultySchema as V1DifficultySchema,
   InfoSchema as V1InfoSchema,
} from '../schema/v1/declaration.ts';
import {
   BPMInfoSchema as V2AudioSchema,
   DifficultySchema as V2DifficultySchema,
   InfoSchema as V2InfoSchema,
} from '../schema/v2/declaration.ts';
import {
   DifficultySchema as V3DifficultySchema,
   LightshowSchema as V3LightshowSchema,
} from '../schema/v3/declaration.ts';
import {
   AudioDataSchema as V4AudioSchema,
   DifficultySchema as V4DifficultySchema,
   InfoSchema as V4InfoSchema,
   LightshowSchema as V4LightshowSchema,
} from '../schema/v4/declaration.ts';

/** Data check version map for schema beatmap info. */
export const infoCheckMap: Record<number, Record<string, ISchemaDeclaration>> = {
   1: V1InfoSchema,
   2: V2InfoSchema,
   4: V4InfoSchema,
};

/** Data check version map for schema beatmap audio data. */
export const audioSchemaMap: Record<number, Record<string, ISchemaDeclaration>> = {
   2: V2AudioSchema,
   4: V4AudioSchema,
};

/** Data check version map for schema beatmap difficulty. */
export const difficultyCheckMap: Record<number, Record<string, ISchemaDeclaration>> = {
   1: V1DifficultySchema,
   2: V2DifficultySchema,
   3: V3DifficultySchema,
   4: V4DifficultySchema,
};

/** Data check version map for schema beatmap lightshow. */
export const lightshowCheckMap: Record<number, Record<string, ISchemaDeclaration>> = {
   3: V3LightshowSchema,
   4: V4LightshowSchema,
};

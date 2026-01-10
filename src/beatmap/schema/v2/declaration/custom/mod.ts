import * as bookmark from './bookmark.ts';

/** Schema for v2 custom `Bookmark`. */
export const CustomBookmarkSchema: ReturnType<typeof bookmark.CustomBookmarkSchema> =
   /* @__PURE__ */ bookmark.CustomBookmarkSchema();

import * as bpmChange from './bpmChange.ts';

/** Schema for v2 custom `BPM Change (Old)`. */
export const CustomBPMChangeOldSchema: ReturnType<typeof bpmChange.CustomBPMChangeOldSchema> =
   /* @__PURE__ */ bpmChange.CustomBPMChangeOldSchema();
/** Schema for v2 custom `BPM Change`. */
export const CustomBPMChangeSchema: ReturnType<typeof bpmChange.CustomBPMChangeSchema> =
   /* @__PURE__ */ bpmChange.CustomBPMChangeSchema();

import * as colorScheme from './colorScheme.ts';

/** Schema for v2 custom `Color`. */
export const CustomColorObjectSchema: ReturnType<typeof colorScheme.CustomColorObjectSchema> =
   /* @__PURE__ */ colorScheme.CustomColorObjectSchema();
/** Schema for v2 custom `Color Scheme`. */
export const CustomColorSchemeSchema: ReturnType<typeof colorScheme.CustomColorSchemeSchema> =
   /* @__PURE__ */ colorScheme.CustomColorSchemeSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v2 `Difficulty` custom data. */
export const CustomDataDifficultySchema: ReturnType<typeof difficulty.CustomDataDifficultySchema> =
   /* @__PURE__ */ difficulty.CustomDataDifficultySchema();

import * as editor from './editor.ts';

/** Schema for v2 custom `Editor Info`. */
export const CustomEditorInfoSchema: ReturnType<typeof editor.CustomEditorInfoSchema> =
   /* @__PURE__ */ editor.CustomEditorInfoSchema();
/** Schema for v2 custom `Editor`. */
export const CustomEditorSchema: ReturnType<typeof editor.CustomEditorSchema> =
   /* @__PURE__ */ editor.CustomEditorSchema();

import * as info from './info.ts';

/** Schema for v2 `Info` custom data. */
export const CustomDataInfoSchema: ReturnType<typeof info.CustomDataInfoSchema> =
   /* @__PURE__ */ info.CustomDataInfoSchema();
/** Schema for v2 `Info Set` custom data. */
export const CustomDataInfoSetSchema: ReturnType<typeof info.CustomDataInfoSetSchema> =
   /* @__PURE__ */ info.CustomDataInfoSetSchema();
/** Schema for v2 `Info Set Difficulty` custom data. */
export const CustomDataInfoSetDifficultySchema: ReturnType<
   typeof info.CustomDataInfoSetDifficultySchema
> = /* @__PURE__ */ info.CustomDataInfoSetDifficultySchema();

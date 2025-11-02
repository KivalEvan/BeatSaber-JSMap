import * as bookmark from './bookmark.ts';

/** Schema for v2 custom `Bookmark`. */
export const CustomBookmarkSchema = /* @__PURE__ */ bookmark.CustomBookmarkSchema();

import * as bpmChange from './bpmChange.ts';

/** Schema for v2 custom `BPM Change (Old)`. */
export const CustomBPMChangeOldSchema = /* @__PURE__ */ bpmChange.CustomBPMChangeOldSchema();
/** Schema for v2 custom `BPM Change`. */
export const CustomBPMChangeSchema = /* @__PURE__ */ bpmChange.CustomBPMChangeSchema();

import * as colorScheme from './colorScheme.ts';

/** Schema for v2 custom `Color`. */
export const CustomColorObjectSchema = /* @__PURE__ */ colorScheme.CustomColorObjectSchema();
/** Schema for v2 custom `Color Scheme`. */
export const CustomColorSchemeSchema = /* @__PURE__ */ colorScheme.CustomColorSchemeSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v2 `Difficulty` custom data. */
export const CustomDataDifficultySchema = /* @__PURE__ */ difficulty.CustomDataDifficultySchema();

import * as editor from './editor.ts';

/** Schema for v2 custom `Editor Info`. */
export const CustomEditorInfoSchema = /* @__PURE__ */ editor.CustomEditorInfoSchema();
/** Schema for v2 custom `Editor`. */
export const CustomEditorSchema = /* @__PURE__ */ editor.CustomEditorSchema();

import * as info from './info.ts';

/** Schema for v2 `Info` custom data. */
export const CustomDataInfoSchema = /* @__PURE__ */ info.CustomDataInfoSchema();
/** Schema for v2 `Info Set` custom data. */
export const CustomDataInfoSetSchema = /* @__PURE__ */ info.CustomDataInfoSetSchema();
/** Schema for v2 `Info Set Difficulty` custom data. */
export const CustomDataInfoSetDifficultySchema = /* @__PURE__ */ info
   .CustomDataInfoSetDifficultySchema();

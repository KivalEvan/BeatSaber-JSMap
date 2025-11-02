import * as bookmark from './bookmark.ts';

/** Schema for v3 custom `Bookmark`. */
export const CustomBookmarkSchema = /* @__PURE__ */ bookmark.CustomBookmarkSchema();

import * as bpmChange from './bpmChange.ts';

/** Schema for v3 custom `BPM Change`. */
export const CustomBPMChangeSchema = /* @__PURE__ */ bpmChange.CustomBPMChangeSchema();

import * as difficulty from './difficulty.ts';

/** Schema for v3 `Difficulty` custom data. */
export const CustomDataDifficultySchema = /* @__PURE__ */ difficulty.CustomDataDifficultySchema();

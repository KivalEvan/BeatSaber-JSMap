import { hasOwn } from '../../../utils/misc/hasOwn.ts';

export function renameKey(obj: Record<string, unknown>, original: string, rename: string) {
   obj[rename] ??= obj[original];
   delete obj[original];
}

export function renameCustomDataKey(
   objects: readonly { customData: Record<string, unknown> }[],
   original: string,
   rename: string,
): void {
   for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (object.customData[original] !== undefined) {
         renameKey(object.customData, original, rename);
      }
   }
}

export function renameKeys(
   obj: object,
   names: Record<string, string>,
): Record<string, unknown> {
   const source = obj as Record<string, unknown>;
   const result: Record<string, unknown> = {};
   for (const original in names) {
      const renamed = names[original];
      result[renamed] = source[renamed] ?? source[original];
   }
   for (const key in source) {
      if (hasOwn(source, key) && !hasOwn(names, key) && !hasOwn(result, key)) {
         result[key] = source[key];
      }
   }
   return result;
}

export const animationV3Names = {
   _color: 'color',
   _definitePosition: 'definitePosition',
   _dissolve: 'dissolve',
   _dissolveArrow: 'dissolveArrow',
   _interactable: 'interactable',
   _localRotation: 'localRotation',
   _position: 'offsetPosition',
   _rotation: 'offsetWorldRotation',
   _scale: 'scale',
   _time: 'time',
};

export const animationV2Names = {
   color: '_color',
   definitePosition: '_definitePosition',
   dissolve: '_dissolve',
   dissolveArrow: '_dissolveArrow',
   interactable: '_interactable',
   localRotation: '_localRotation',
   offsetPosition: '_position',
   offsetWorldRotation: '_rotation',
   scale: '_scale',
   time: '_time',
};

export function hasOwn(object: object, property: PropertyKey): boolean {
   return Object.prototype.hasOwnProperty.call(object, property);
}

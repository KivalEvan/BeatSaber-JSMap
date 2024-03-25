// deno-lint-ignore-file no-explicit-any
import logger from '../logger.ts';

function tag(name: string): string[] {
   return ['utils', '_fs', name];
}

export function readJSONFile(path: string): Promise<Record<string, any>> {
   logger.tInfo(tag('readJSONFile'), `Async reading JSON file from ${path}`);
   return Deno.readTextFile(path).then(JSON.parse);
}

export function readJSONFileSync(path: string): Record<string, any> {
   logger.tInfo(tag('readJSONFileSync'), `Sync reading JSON file from ${path}`);
   return JSON.parse(Deno.readTextFileSync(path));
}

export function writeJSONFile(
   data: Record<string, unknown>,
   path: string,
   format?: number,
): Promise<void> {
   logger.tInfo(tag('writeJSONFile'), `Async writing JSON file to ${path}`);
   return Deno.writeTextFile(path, JSON.stringify(data, null, format));
}

export function writeJSONFileSync(
   data: Record<string, unknown>,
   path: string,
   format?: number,
): void {
   logger.tInfo(tag('writeJSONFileSync'), `Sync writing JSON file to ${path}`);
   Deno.writeTextFileSync(path, JSON.stringify(data, null, format));
}

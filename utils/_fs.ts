import logger from '../logger.ts';

function tag(name: string): string[] {
   return ['utils', '_fs', name];
}

export function readJSONFile(path: string) {
   logger.tInfo(tag('readJSONFile'), `Async reading JSON file from ${path}`);
   return Deno.readTextFile(path).then(JSON.parse) as Promise<
      Record<string, unknown>
   >;
}

export function readJSONFileSync(path: string) {
   logger.tInfo(tag('readJSONFileSync'), `Sync reading JSON file from ${path}`);
   return JSON.parse(Deno.readTextFileSync(path)) as Record<string, unknown>;
}

export function writeJSONFile(
   data: Record<string, unknown>,
   path: string,
   format?: number,
) {
   logger.tInfo(tag('writeJSONFile'), `Async writing JSON file to ${path}`);
   return Deno.writeTextFile(path, JSON.stringify(data, null, format));
}

export function writeJSONFileSync(
   data: Record<string, unknown>,
   path: string,
   format?: number,
) {
   logger.tInfo(tag('writeJSONFileSync'), `Sync writing JSON file to ${path}`);
   Deno.writeTextFileSync(path, JSON.stringify(data, null, format));
}

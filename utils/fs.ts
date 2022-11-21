import logger from '../logger.ts';

const tag = (name: string) => {
    return `[utils::fs::${name}]`;
};

export async function exists(filename: string): Promise<boolean> {
    try {
        await Deno.stat(filename);
        // successful, file or directory must exist
        return true;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            // file or directory does not exist
            return false;
        } else {
            // unexpected error, maybe permissions, pass it along
            throw error;
        }
    }
}

export function sanitizeDir(dir: string) {
    dir = dir.trim();
    if (dir && !(dir.endsWith('\\') || dir.endsWith('/'))) {
        logger.debug(tag('fixDirectory'), `Adding missing end slash`);
        dir += '/';
    }
    if (!dir || dir === '/') {
        dir = './';
    }
    return dir;
}

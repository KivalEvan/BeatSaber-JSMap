/**
 * Filesystem operations required by the `read` and `write` modules.
 */
export interface IShimsFileSystem {
   /** Read a text file asynchronously. */
   readTextFile: (path: string) => Promise<string>;
   /** Read a text file synchronously. */
   readTextFileSync: (path: string) => string;
   /** Create or replace a text file asynchronously. */
   writeTextFile: (path: string, content: string) => Promise<void>;
   /** Create or replace a text file synchronously. */
   writeTextFileSync: (path: string, content: string) => void;
   /** Atomically replace a destination file asynchronously where supported. */
   rename: (oldPath: string, newPath: string) => Promise<void>;
   /** Atomically replace a destination file synchronously where supported. */
   renameSync: (oldPath: string, newPath: string) => void;
   /** Remove a non-directory entry asynchronously; Deno requires read permission. */
   unlink: (path: string) => Promise<void>;
   /** Remove a non-directory entry synchronously; Deno requires read permission. */
   unlinkSync: (path: string) => void;
}

/**
 * Path operations required by `read`, `write`, and `globals`.
 */
export interface IShimsPath {
   /** Resolve path segments into an absolute path. */
   resolve: (...pathSegments: string[]) => string;
   /** Get the last part of a path. */
   basename: (path: string, suffix?: string) => string;
   /** Get the directory part of a path. */
   dirname: (path: string) => string;
   /** Join and normalize path segments. */
   join: (...pathSegments: string[]) => string;
}

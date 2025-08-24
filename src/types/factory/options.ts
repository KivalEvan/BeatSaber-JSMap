/** The options to pass to the validator. */
export interface IValidateOptions {
   /** Whether the validator should throw when the supplied data is invalid. */
   throwable?: boolean;
}

/** The options to pass to the logger. */
export interface ILoggerOptions {
   /** The tags for the log message. */
   tags: string[];
}

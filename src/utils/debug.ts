/* eslint-disable deprecate/member-expression */

/**
 * Those utils aims to demontrate how eslint-plugin-deprecate works
 * It's pretty useless (unless you want to avoid `console.X` to be more specific)
 */

export const debug = {
  error: (...args: string[]) => {
    console.error(...args);
  },

  log: (message: string) => {
    console.log(message);
  },

  warn: (message: string) => {
    console.warn(message);
  },
};

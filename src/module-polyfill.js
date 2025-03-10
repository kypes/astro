/**
 * Module polyfill for Cloudflare Workers environment
 * This handles path-browserify and other Node.js module system dependencies
 */

// Create a global module object if it doesn't exist
if (typeof module === "undefined") {
  // @ts-ignore
  self.module = { exports: {} };
}

// Create a global require function if it doesn't exist
if (typeof require === "undefined") {
  // @ts-ignore
  self.require = function (moduleName) {
    console.warn(`[Module Polyfill] Attempted to require: ${moduleName}`);

    // Handle specific modules that might be required
    if (moduleName === "path") {
      // Return a simplified path module with common functions
      return {
        resolve: (...parts) => parts.join("/").replace(/\/+/g, "/"),
        join: (...parts) => parts.join("/").replace(/\/+/g, "/"),
        dirname: (path) => path.split("/").slice(0, -1).join("/") || ".",
        basename: (path) => path.split("/").pop(),
        extname: (path) => {
          const base = path.split("/").pop() || "";
          const idx = base.lastIndexOf(".");
          return idx > 0 ? base.slice(idx) : "";
        },
      };
    }

    // Return an empty object for other modules
    return {};
  };
}

// Export nothing - this file is only for its side effects
export {};

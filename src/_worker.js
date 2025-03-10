// Import polyfills first
import "./module-polyfill.js";

// Define global if it doesn't exist
if (typeof global === "undefined") {
  // @ts-ignore
  self.global = self;
}

// Inject MessageChannel polyfill directly
if (typeof MessageChannel === "undefined") {
  class MessagePort {
    constructor() {
      this.onmessage = null;
    }
    postMessage() {}
    start() {}
    close() {}
  }

  self.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = new MessagePort();
      this.port2 = new MessagePort();
    }
  };
}

// Create empty process object if it doesn't exist
if (typeof process === "undefined") {
  global.process = {
    env: {},
    nextTick: (fn) => setTimeout(fn, 0),
    version: "",
    versions: {},
    platform: "browser",
  };
}

// Polyfill for Buffer if it doesn't exist
if (typeof Buffer === "undefined") {
  global.Buffer = {
    isBuffer: () => false,
    from: (data) => new Uint8Array(data),
  };
}

// Polyfill for Node.js module system
if (typeof module === "undefined") {
  global.module = {
    exports: {},
  };
}

if (typeof require === "undefined") {
  global.require = function (moduleName) {
    console.warn(`[Worker] Attempted to require: ${moduleName}`);

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

// Import and re-export the default handler from Astro
export { default } from "astro/dist/entries/cloudflare/worker";

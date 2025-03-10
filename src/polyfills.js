/**
 * Polyfills for Cloudflare Workers environment
 * These are needed for React server-side rendering in Cloudflare Workers
 */

// Define global if it doesn't exist
if (typeof global === "undefined") {
  // @ts-ignore
  self.global = self;
}

// MessageChannel polyfill
if (typeof MessageChannel === "undefined") {
  global.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = {
        onmessage: null,
        postMessage: () => {},
        close: () => {},
        start: () => {},
      };
      this.port2 = {
        onmessage: null,
        postMessage: () => {},
        close: () => {},
        start: () => {},
      };
    }
  };
}

// Create empty process object if it doesn't exist
if (typeof process === "undefined") {
  global.process = { env: {}, nextTick: (fn) => setTimeout(fn, 0) };
}

// Polyfill for Buffer if it doesn't exist
if (typeof Buffer === "undefined") {
  global.Buffer = {
    isBuffer: () => false,
    from: (data) => new Uint8Array(data),
  };
}

// Export nothing - this is just for side effects
export {};

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

// Import and re-export the default handler from Astro
export { default } from "astro/dist/entries/cloudflare/worker";

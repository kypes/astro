// Define global if it doesn't exist
if (typeof global === "undefined") {
  // @ts-ignore
  self.global = self;
}

// MessageChannel polyfill needed for React DOM Server
class MessagePort {
  constructor() {
    this.onmessage = null;
  }

  postMessage() {}
  start() {}
  close() {}
}

class MessageChannelPolyfill {
  constructor() {
    this.port1 = new MessagePort();
    this.port2 = new MessagePort();
  }
}

// Apply polyfills
global.MessageChannel = MessageChannelPolyfill;

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

// Import and re-export the Astro worker
export { default } from "./dist/server/entry.mjs";

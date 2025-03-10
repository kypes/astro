/**
 * Polyfills for Cloudflare Workers environment
 */

// This file is referenced in astro.config.mjs and will be included in the build
// It provides necessary polyfills for React server-side rendering in Cloudflare

// MessageChannel polyfill for React DOM Server
class MessagePort {
  constructor() {
    this.onmessage = null;
  }
  postMessage() {}
  start() {}
  close() {}
}

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort();
    this.port2 = new MessagePort();
  }
}

// Export the polyfills for global use
export { MessageChannel };

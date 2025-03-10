// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    auth(),
  ],
  output: "server", // Server output is required for Auth Astro
  adapter: cloudflare(), // Use Cloudflare adapter with default settings

  // Add vite configuration to handle Node.js modules
  vite: {
    ssr: {
      external: ["node:path"],
      noExternal: ["auth-astro", "@auth/core"],
    },
    resolve: {
      alias: {
        "node:path": "path-browserify",
      },
    },
    define: {
      // Define global variables for the browser environment
      "process.env.BROWSER": "true",
      "process.version": '"v16.0.0"',
      "global.module": "{}",
    },
    build: {
      minify: false, // Disable minification for better error messages
    },
    plugins: [
      {
        name: "inject-polyfills",
        enforce: "pre",
        transform(code, id) {
          // Only apply to the worker entry file
          if (id.includes("_worker.js") || id.includes("worker-entry.js")) {
            return {
              code: `
                // Define global if it doesn't exist
                if (typeof global === "undefined") {
                  // @ts-ignore
                  self.global = self;
                }
                
                // Polyfill for MessageChannel
                if (typeof MessageChannel === 'undefined') {
                  class MessagePort {
                    constructor() { this.onmessage = null; }
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

                // Polyfill for module
                if (typeof module === 'undefined') {
                  self.module = { exports: {} };
                }
                if (typeof require === 'undefined') {
                  self.require = function(mod) { 
                    console.warn('Require called but not available:', mod);
                    return {}; 
                  };
                }
                ${code}
              `,
              map: null,
            };
          }
        },
      },
    ],
  },
});

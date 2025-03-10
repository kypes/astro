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
  adapter: cloudflare(), // Use Cloudflare adapter for deployment

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
    // Add our polyfill as a client entry
    build: {
      rollupOptions: {
        input: {
          polyfill: "./src/polyfills.js",
        },
      },
    },
  },
});

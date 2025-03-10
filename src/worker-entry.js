// Import polyfills first
import "./polyfills.js";

// Re-export the handler from Astro's default entry
export { default as default } from "astro/dist/entries/cloudflare/worker";

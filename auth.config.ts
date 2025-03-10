import Discord from "@auth/core/providers/discord";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Discord({
      clientId: import.meta.env.DISCORD_CLIENT_ID,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  trustHost: true, // Required for Cloudflare Pages
  secret: import.meta.env.AUTH_SECRET,
});

import OpenAuth from "@openauthjs/openauth";
import { DiscordProvider } from "@openauthjs/openauth/providers";

/**
 * OpenAuth.js Discord authentication handler for Cloudflare Pages Functions
 * This middleware handles all auth-related routes
 */
export async function onRequest(context) {
  const { request, env } = context;

  console.log("Auth middleware called, path:", new URL(request.url).pathname);

  // Initialize the OpenAuth.js instance
  const openauth = new OpenAuth({
    // Secret used to encrypt cookies and tokens
    secret: env.AUTH_SECRET || "your-secret-key-change-in-production",

    // The base URL of your application
    baseUrl: env.AUTH_URL || "https://astro2-5ew.pages.dev",

    // Pages URL structure
    pages: {
      // Where to redirect after sign in
      signIn: "/login",
      // Where to redirect after sign out
      signOut: "/",
      // Error page
      error: "/error",
    },

    // Configure providers
    providers: [
      DiscordProvider({
        clientId: env.DISCORD_CLIENT_ID || "",
        clientSecret: env.DISCORD_CLIENT_SECRET || "",
        // Optional: Specific permissions to request
        scopes: ["identify", "email"],
      }),
    ],

    // Debug mode (disable in production)
    debug: true,
  });

  // Let OpenAuth.js handle the request
  try {
    return await openauth.handleRequest(request);
  } catch (error) {
    console.error("Auth handler error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

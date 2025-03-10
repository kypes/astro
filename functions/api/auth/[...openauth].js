import OpenAuth from "@openauthjs/openauth";
import Discord from "@openauthjs/openauth/providers/discord";

/**
 * OpenAuth.js Discord authentication handler for Cloudflare Pages Functions
 * This handles all auth-related routes (login, callback, etc.)
 *
 * @param {Request} request - The incoming request
 * @param {Object} env - Environment variables and bindings
 * @param {Object} ctx - Execution context
 * @returns {Response} Authentication response
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Initialize the OpenAuth.js instance
  const openauth = new OpenAuth({
    // Secret used to encrypt cookies and tokens
    secret: env.AUTH_SECRET || "your-secret-key-change-in-production",

    // The base URL of your application
    baseUrl: env.AUTH_URL || "https://main.astro2-5ew.pages.dev",

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
      Discord({
        clientId: env.DISCORD_CLIENT_ID || "",
        clientSecret: env.DISCORD_CLIENT_SECRET || "",
        // Optional: Specific permissions to request
        scopes: ["identify", "email"],
      }),
    ],

    // Optional: Database adapter for persisting users
    // This would connect to Cloudflare D1 in a production setup
    // For now, we'll use the default in-memory store
    // adapter: D1Adapter(env.DB),

    // Debug mode (disable in production)
    debug: true,
  });

  // Let OpenAuth.js handle the request
  return await openauth.handleRequest(request);
}

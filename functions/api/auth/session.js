import OpenAuth from "@openauthjs/openauth";
import Discord from "@openauthjs/openauth/providers/discord";

/**
 * API endpoint to get current user session data
 * This is used by the client to check if the user is logged in
 *
 * @param {Request} request - The incoming request
 * @param {Object} env - Environment variables and bindings
 * @returns {Response} Session data response
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Initialize OpenAuth.js with the same configuration
  const openauth = new OpenAuth({
    secret: env.AUTH_SECRET || "your-secret-key-change-in-production",
    baseUrl: env.AUTH_URL || "https://main.astro2-5ew.pages.dev",
    providers: [
      Discord({
        clientId: env.DISCORD_CLIENT_ID || "",
        clientSecret: env.DISCORD_CLIENT_SECRET || "",
        scopes: ["identify", "email"],
      }),
    ],
    debug: true,
  });

  try {
    // Get the current session
    const session = await openauth.getSession(request);

    // Return session data as JSON
    return new Response(
      JSON.stringify({
        authenticated: !!session,
        session: session || null,
        expires: session?.expires || null,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          // Allow CORS for development
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({
        authenticated: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

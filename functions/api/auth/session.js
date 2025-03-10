import OpenAuth from "@openauthjs/openauth";

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

  console.log("Session API called:", new URL(request.url).pathname);

  // Initialize OpenAuth.js with the same configuration
  const openauth = new OpenAuth({
    secret: env.AUTH_SECRET || "your-secret-key-change-in-production",
    baseUrl: env.AUTH_URL || "https://astro2-5ew.pages.dev",
    providers: [
      {
        id: "discord",
        name: "Discord",
        type: "oauth",
        clientId: env.DISCORD_CLIENT_ID || "",
        clientSecret: env.DISCORD_CLIENT_SECRET || "",
      },
    ],
    debug: true,
  });

  try {
    // Get the current session
    console.log("Trying to get session...");
    const session = await openauth.getSession(request);
    console.log("Session result:", session ? "Found" : "Not found");

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
    console.error("Session error:", error);

    // Return error response
    return new Response(
      JSON.stringify({
        authenticated: false,
        error: error.message || "Failed to retrieve session",
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

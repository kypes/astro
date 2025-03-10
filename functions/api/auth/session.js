import { issuer } from "@openauthjs/openauth";
import { createSubjects } from "@openauthjs/openauth/subject";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";

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

  // Set CORS headers for all responses
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  };

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Define subjects (user data shape) - must match the one in _middleware.js
  const subjects = createSubjects({
    user: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string", optional: true },
        email: { type: "string", optional: true },
        image: { type: "string", optional: true },
      },
    },
  });

  try {
    // Initialize OpenAuth.js with the same configuration
    const openauth = issuer({
      secret: env.AUTH_SECRET || "your-secret-key-change-in-production",
      baseUrl: env.AUTH_URL || "https://astro2-5ew.pages.dev",

      // Storage adapter (using memory for now, will implement D1 later)
      storage: MemoryStorage(),

      // Subjects definition
      subjects,

      // Configure providers as an object, not an array
      providers: {
        discord: {
          id: "discord",
          name: "Discord",
          type: "oauth",
          clientId: env.DISCORD_CLIENT_ID || "",
          clientSecret: env.DISCORD_CLIENT_SECRET || "",
        },
      },
      debug: true,
    });

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
          ...corsHeaders,
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
          ...corsHeaders,
        },
      }
    );
  }
}

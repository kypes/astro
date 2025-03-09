import type { APIRoute } from "astro";

/**
 * Simple API endpoint using Cloudflare Workers
 * Returns a greeting message with timestamp
 */
export const GET: APIRoute = async ({ request }) => {
  // Get client IP address from Cloudflare headers
  const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";

  return new Response(
    JSON.stringify({
      message: "Hello from Cloudflare Workers!",
      timestamp: new Date().toISOString(),
      clientIP: clientIP,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * POST handler for the same endpoint
 * Accepts JSON data and returns it with a timestamp
 */
export const POST: APIRoute = async ({ request }) => {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({
      message: "Data received successfully",
      data: body,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

import type { APIRoute } from "astro";

// Make this a static JSON endpoint
export const prerender = true;

/**
 * Simple API endpoint that returns static data
 * For a real API, you would use Cloudflare Workers or Functions
 */
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: "Hello from a static API endpoint!",
      timestamp: new Date().toISOString(),
      note: "In production, dynamic API endpoints would use Cloudflare Workers",
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
 * Note: This is prerendered, so it only provides documentation on how to use real APIs
 */
export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: "This is a static POST response",
      note: "In a real application, POST requests would be handled by Cloudflare Workers",
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

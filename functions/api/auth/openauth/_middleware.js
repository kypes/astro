import { issuer } from "@openauthjs/openauth";
import { createSubjects } from "@openauthjs/openauth/subject";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";

/**
 * OpenAuth.js Discord authentication handler for Cloudflare Pages Functions
 * This middleware handles all auth-related routes
 */
export async function onRequest(context) {
  const { request, env } = context;

  console.log("Auth middleware called, path:", new URL(request.url).pathname);

  // Define subjects (user data shape)
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

  // Initialize the OpenAuth.js instance
  const openauth = issuer({
    // Secret used to encrypt cookies and tokens
    secret: env.AUTH_SECRET || "your-secret-key-change-in-production",

    // The base URL of your application
    baseUrl: env.AUTH_URL || "https://astro2-5ew.pages.dev",

    // Storage adapter (using memory for now, will implement D1 later)
    storage: MemoryStorage(),

    // Subjects definition
    subjects,

    // Pages URL structure
    pages: {
      // Where to redirect after sign in
      signIn: "/login",
      // Where to redirect after sign out
      signOut: "/",
      // Error page
      error: "/error",
    },

    // Configure providers as an object, not an array
    providers: {
      discord: {
        id: "discord",
        name: "Discord",
        type: "oauth",
        clientId: env.DISCORD_CLIENT_ID || "",
        clientSecret: env.DISCORD_CLIENT_SECRET || "",
        authorization: {
          url: "https://discord.com/api/oauth2/authorize",
          params: {
            scope: "identify email",
            response_type: "code",
          },
        },
        token: "https://discord.com/api/oauth2/token",
        userinfo: {
          url: "https://discord.com/api/users/@me",
          async request(context) {
            if (!context?.tokens?.access_token) return null;

            const res = await fetch("https://discord.com/api/users/@me", {
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
            });

            if (!res.ok) {
              console.error("Error getting Discord user info");
              return null;
            }

            const user = await res.json();

            return {
              id: user.id,
              name: user.username,
              email: user.email,
              image: user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                : null,
            };
          },
        },
      },
    },

    // Debug mode (disable in production)
    debug: true,

    // Success callback - required for OpenAuth.js
    async success(ctx, value) {
      console.log("Authentication successful for provider:", value.provider);

      if (value.provider === "discord") {
        // Extract user information from the value
        const { id, name, email, image } = value;

        // Return a subject with the user data
        return ctx.subject("user", {
          id,
          name,
          email,
          image,
        });
      }

      // If we reach here, we had an unexpected provider
      throw new Error(`Unsupported provider: ${value.provider}`);
    },
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

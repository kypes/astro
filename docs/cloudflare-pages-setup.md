# Cloudflare Pages Deployment Setup

This document outlines the steps to properly deploy our Astro application with Auth Astro integration to Cloudflare Pages.

## Build Configuration

The build configuration in Cloudflare Pages should be set as follows:

| Setting                | Value           |
| ---------------------- | --------------- |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node.js version        | 18 or higher    |

## Environment Variables

The following environment variables need to be configured in the Cloudflare Pages dashboard for authentication to work correctly:

| Variable                | Description                                                                      | Example                           |
| ----------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `AUTH_SECRET`           | Secret key for Auth Astro authentication, generated using `openssl rand -hex 32` | `openauth_astro2_secret_key_2024` |
| `AUTH_TRUST_HOST`       | Required for Cloudflare Pages to trust the hosting environment                   | `true`                            |
| `DISCORD_CLIENT_ID`     | Discord OAuth application client ID                                              | `1348459038651842644`             |
| `DISCORD_CLIENT_SECRET` | Discord OAuth application client secret                                          | (your secret)                     |

These variables must be set for both the **Production** and **Preview** environments.

## Compatibility Flags

Cloudflare Pages Functions requires certain compatibility flags to work with Auth Astro:

1. Go to **Workers & Pages** > **Your project** > **Settings** > **Functions** > **Compatibility flags**
2. Add the following flag: `nodejs_compat`

This is required because Auth Astro uses Node.js features that need to be enabled in the Cloudflare Workers environment.

## Discord OAuth Configuration

Ensure your Discord OAuth application has the correct redirect URI configured:

- Redirect URI: `https://your-site.pages.dev/api/auth/callback/discord`

Replace `your-site.pages.dev` with your actual Cloudflare Pages domain.

## Deployment Process

The application is set up to deploy automatically when changes are pushed to the main branch on GitHub. If you need to manually deploy:

1. Push changes to GitHub: `git push origin main`
2. Cloudflare Pages will automatically detect the changes and start the build process
3. Check the build logs in the Cloudflare dashboard for any errors

## Troubleshooting

If you encounter authentication issues after deployment:

1. Verify all environment variables are correctly set
2. Ensure the `nodejs_compat` compatibility flag is enabled
3. Check that the Discord OAuth callback URL is correctly configured
4. Review the Function logs in the Cloudflare dashboard

## Local Development

For local development, create a `.dev.vars` file in the project root with the same environment variables listed above.

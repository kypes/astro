# ✨ Astro + Cloudflare Application

<div align="center">

![Astro Badge](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=fff&style=for-the-badge)
![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![TailwindCSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge)
![Cloudflare Badge](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=fff&style=for-the-badge)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)

A modern, full-stack web application with authentication, built using Astro, React, and Cloudflare technologies.

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[Project Structure](#-project-structure) •
[Deployment](#-deployment) •
[API Endpoints](#-api-endpoints)

</div>

---

## 🎯 Features

- **⚡ Performance-First**: Leverages Astro for fast, optimized static site generation
- **🔐 Authentication**: Secure Discord OAuth integration with OpenAuth.js
- **🛡️ Protected Routes**: Route-based access control for authenticated users
- **🎨 Modern UI**: Beautiful interface with TailwindCSS and DaisyUI
- **🌑 Dark Mode**: Built-in theme toggle for light/dark mode
- **☁️ Cloudflare Infrastructure**: Deployed on Cloudflare Pages with serverless Functions
- **🧩 Component-Based**: Modular architecture with reusable React components

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) - The web framework for content-driven websites
- **UI Library**: [React](https://reactjs.org/) - Component-based UI development
- **Styling**:
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [DaisyUI](https://daisyui.com/) - Component library for Tailwind
- **Icons**: [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- **Authentication**: [OpenAuth.js](https://github.com/openauthlabs/openauth) - Flexible authentication library
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) - Fast global deployment
- **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless edge functions
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - Serverless SQL database

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Cloudflare account (for deployment)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/kypes/astro.git
   cd astro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .dev.vars.example .dev.vars
   # Edit .dev.vars with your Discord OAuth credentials and secrets
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:4321

## 📂 Project Structure

```
/
├── functions/             # Cloudflare Pages Functions
│   └── api/               # API endpoints
│       ├── hello.js       # Example API endpoint
│       └── auth/          # Authentication endpoints
├── src/
│   ├── components/        # UI components
│   │   ├── layout/        # Layout components
│   │   └── shared/        # Shared components
│   ├── hooks/             # React hooks
│   │   └── useAuth.tsx    # Authentication hook
│   ├── layouts/           # Page layouts
│   └── pages/             # Page templates and routes
│       ├── index.astro    # Homepage
│       ├── login.astro    # Login page
│       └── dashboard.astro # Protected dashboard
├── public/                # Static assets
├── docs/                  # Documentation
│   ├── architecture.mermaid  # System architecture
│   ├── status.md         # Project progress
│   └── tasks.md          # Development tasks
└── package.json          # Project dependencies
```

## 🌐 API Endpoints

| Endpoint                     | Method | Description                                |
| ---------------------------- | ------ | ------------------------------------------ |
| `/api/hello`                 | GET    | Returns a greeting message                 |
| `/api/auth/session`          | GET    | Returns the current authentication session |
| `/api/auth/signin/discord`   | GET    | Initiates Discord OAuth flow               |
| `/api/auth/callback/discord` | GET    | Handles OAuth callback                     |
| `/api/auth/signout`          | GET    | Signs out the current user                 |

## 🚢 Deployment

This project is deployed to Cloudflare Pages:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   npm run deploy
   ```

## 🔧 Environment Setup

### Required Environment Variables

| Variable                | Description                  |
| ----------------------- | ---------------------------- |
| `AUTH_SECRET`           | Secret key for encryption    |
| `AUTH_URL`              | Base URL of your application |
| `DISCORD_CLIENT_ID`     | Discord OAuth client ID      |
| `DISCORD_CLIENT_SECRET` | Discord OAuth client secret  |

### Cloudflare D1 Setup (In Progress)

1. Create a D1 database

   ```bash
   wrangler d1 create astro-auth-db
   ```

2. Update your wrangler.toml with the database ID

3. Run migrations
   ```bash
   wrangler d1 migrations apply astro-auth-db
   ```

## 🧪 Testing (Future Development)

Run tests with:

```bash
npm test
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <sub>Built with ❤️ by the Astro community</sub>
</div>

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

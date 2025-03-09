# Astro Application

A modern web application built with Astro, React, TailwindCSS, and Cloudflare.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/)

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Cloudflare account (for deployment)

### Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Environment variables

   ```bash
   cp .env.example .env
   # Edit .env with your Cloudflare credentials
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
/
├── src/
│   ├── components/      # UI components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page templates and API routes
│   ├── styles/          # Global styles
│   └── assets/          # Static assets
├── public/              # Public assets
├── docs/                # Documentation
│   ├── architecture.mermaid  # System architecture
│   ├── technical.md     # Technical specifications
│   ├── status.md        # Project progress
│   └── tasks.md         # Development tasks
└── package.json         # Project dependencies
```

## 🌐 API Endpoints

The application includes API endpoints powered by Cloudflare Workers:

- `GET /api/hello` - Returns a greeting message
- `POST /api/hello` - Accepts and returns JSON data

## 🚢 Deployment

This project is configured for deployment to Cloudflare Pages:

1. Build the project

   ```bash
   npm run build
   ```

2. Deploy to Cloudflare Pages
   ```bash
   npm run deploy
   ```

## 🛠️ Development

### Cloudflare D1 Setup

1. Create a D1 database

   ```bash
   wrangler d1 create <DATABASE_NAME>
   ```

2. Update your wrangler.toml with the database ID

3. Run migrations
   ```bash
   wrangler d1 migrations apply <DATABASE_NAME>
   ```

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

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

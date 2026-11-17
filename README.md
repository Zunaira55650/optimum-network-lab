# Optimum Network Lab

Optimum Network Lab is a browser-based learning experience for decentralized networking. It contains nine guided lesson modules, module quizzes, and interactive teaching demos. The demos model concepts in the browser; they do not connect to a live Optimum or Ethereum network. The dashboard's standalone Network Simulator is marked as coming soon and is not implemented.

Lesson completion, quiz results, and the selected theme are saved in the current browser's local storage. Progress is not synchronized between browsers or accounts.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by the installed Vite version)
- npm

## Install

From the project directory, install the locked dependencies:

```sh
npm ci
```

## Development

Start the Vite development server:

```sh
npm run dev
```

Open the local URL printed by Vite. Stop the server with `Ctrl+C`.

## Quality checks

Run Oxlint:

```sh
npm run lint
```

Run the application TypeScript check without emitting files:

```sh
npx tsc --project tsconfig.app.json --noEmit --incremental false
```

## Production build

Create the production site in `dist/`:

```sh
npm run build
```

To inspect the generated build locally:

```sh
npm run preview
```

## Deployment

This project is a static Vite application and does not require runtime environment variables or a backend service. Run `npm ci` and `npm run build`, then publish the contents of `dist/` to a static web host. The default Vite configuration assumes the site is served from the host's root path. For a subpath deployment, configure Vite's `base` option for that path and verify the resulting asset and favicon URLs before publishing.

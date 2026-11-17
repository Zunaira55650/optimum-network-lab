# Optimum Network Lab

An interactive learning space for exploring Optimum, peer-to-peer networking, and decentralized message delivery.

[Live demo](https://optimum-network-lab.vercel.app) · [GitHub repository](https://github.com/Zunaira55650/optimum-network-lab)

## About

Optimum Network Lab combines guided lessons, quizzes, and small interactive demonstrations to make networking concepts easier to explore. The demonstrations are teaching models: they do not connect to a live Optimum or Ethereum network, and they are not performance simulations.

## Learning path

The learning path contains nine modules:

| # | Module | Topics |
|---|---|---|
| 01 | Introduction to Optimum | Optimum's purpose, network components, and message flow |
| 02 | Peer-to-Peer Networking | Peer discovery, identities, connections, and message exchange |
| 03 | GossipSub | Topics, mesh propagation, and protocol control messages |
| 04 | Random Linear Network Coding (RLNC) | Coded shards, finite-field arithmetic, and decoding |
| 05 | mump2p | Mesh architecture, message propagation, and access paths |
| 06 | Gateway Architecture | Gateway components, message bridging, configuration, and operations |
| 07 | Beacon Node Integration | Beacon Node, Validator Client, and Gateway roles and message paths |
| 08 | Signal: Gateway Connectivity & Network Discovery | Gateway enrollment, connectivity checks, and discovery |
| 09 | Consumer Block Stream | Block delivery to consumers and stream operation |

Across the modules, the project includes **72 quiz questions** with hints and explanations, and **9 interactive demos**—one for each module.

## Features

- Guided explanations, examples, and key takeaways for each module
- Interactive, browser-based demonstrations of networking concepts
- Module quizzes with saved results, including latest and best scores
- Learning progress and theme preference saved in the browser's `localStorage`
- Dark and light themes
- **Network Simulator — Coming Soon**

Saved progress and preferences are local to the current browser; they are not synchronized across browsers or accounts.

## Tech stack

Based on the dependencies declared in [`package.json`](./package.json):

- **React 19** and **React DOM 19**
- **TypeScript 7**
- **Vite 8**
- **Tailwind CSS 4** with the Tailwind Vite plugin
- **Motion 14** for animations
- **Lucide React** for icons
- **XYFlow React** (declared dependency)

## Getting started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install dependencies

```sh
npm ci
```

### Start the development server

```sh
npm run dev
```

Open the local URL printed by Vite.

## Build and lint

Create a production build in `dist/`:

```sh
npm run build
```

Run the project linter:

```sh
npm run lint
```

To serve the production build locally after building:

```sh
npm run preview
```

## Links

- **Live website:** [optimum-network-lab.vercel.app](https://optimum-network-lab.vercel.app)
- **Source code:** [github.com/Zunaira55650/optimum-network-lab](https://github.com/Zunaira55650/optimum-network-lab)

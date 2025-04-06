# Stack Overview

| Layer           | Technology           | Rationale                                                                                                   |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Core Engine** | TypeScript Module    | Centralizes all business logic. Reusable across CLI, backend, and frontend if needed                        |
| **CLI**         | Node.js + TypeScript | Simple CLI interface to run simulations from the terminal. Reuses the core engine                           |
| **Backend**     | Node.js + Express    | Lightweight API layer that reads configuration, accepts uploaded files, and returns the success probability |
| **Frontend**    | React + TypeScript   | SPA for uploading Empire data and displaying the result. Provides a responsive and user-friendly interface  |
| **Database**    | SQLite               | In-memory graph database describing the routes. Fast and simple integration                                 |
| **Testing**     | Jest                 | Well-known and reliable tools to ensure coverage for logic, CLI, API, and UI layers                         |

## Why this stack?

# Pnpm

## Why Pnpm?

- **Fast**: Pnpm is faster than npm and yarn
- **Space-efficient**: Pnpm uses a content-addressable storage system to store packages, which reduces redundancy and saves disk space
- **Isolated**: Pnpm creates a unique lockfile for each project, which ensures that the dependencies are installed exactly as specified in the lockfile

### TypeScript

Using **TypeScript** from backend to frontend provides:

- Strong typing & better developer confidence
- Early error detection
- Shared types between CLI, API and engine

### Core Engine Modularity

All domain logic (pathfinding, capture risk calculation, time/autonomy tracking) is isolated in the `core/` module

- **Pure functions** for easy testing
- **Reusable** across environments (CLI/API)

### CLI

The CLI tool (`give-me-the-odds`) is built using Node.js and calls the engine

- Quick validation of the logic without starting a server

### Backend API

The backend is a simple Express app that exposes a single endpoint:

- `POST /odds`: Accepts `empire.json`, reads local Falcon config & SQLite DB, and returns the success percentage.
- Error handling and validation centralized in this layer

### Frontend SPA

The React frontend:

- Allows upload of the `empire.json`
- Shows the success rate (0–100%) with contextual visual feedback
- Extensible: could include path visualization, custom configs, or history

### SQLite

The use of a SQLite file for route data:

- No need for a remote DB
- Compatible with both CLI and server environments
- Simple schema (routes only), fits well into memory

## Why a Monorepo?

We chose a monorepo architecture to structure this project because it provides several benefits, especially for a fullstack application with multiple entry points (CLI, API, and frontend) that share business logic:

1. Shared core logic
2. Simpler testing strategy
3. Easier to maintain

## Testing Philosophy

- **Unit tests** for core logic (`computeSuccessProbability`)
- **Integration tests** for CLI and API using example scenarios
- **Frontend tests** for UI and file upload
- Test coverage ensures confidence when iterating on business logic

## Dev Experience

- Monorepo structure (`core/`, `cli/`, `backend/`, `frontend/`) for better modularity
- Local dev setup uses `pnpm` workspaces
- Documentation + TypeScript typings make it easy to onboard or extend the app

This stack is chosen to be **simple, powerful, and evolutive** — aligned with the spirit of the challenge and built to highlight code quality and technical depth.

May the odds be ever in your favor

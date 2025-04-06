# Millennium Falcon Challenge

A web application that calculates the odds of the Millennium Falcon successfully completing its mission while avoiding capture by the Empire.

## Overview

This project is a solution to the Millennium Falcon challenge, which involves calculating the probability of successfully completing a journey while avoiding capture by bounty hunters. The application consists of four main components:

| Layer        | Technology           | Rationale                                                                                                   |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Core**     | TypeScript Module    | Centralizes all business logic. Reusable across CLI, backend, and frontend if needed                        |
| **CLI**      | Node.js + TypeScript | Simple CLI interface to run simulations from the terminal. Reuses the core engine                           |
| **Backend**  | Node.js + Express    | Lightweight API layer that reads configuration, accepts uploaded files, and returns the success probability |
| **Frontend** | React + TypeScript   | SPA for uploading Empire data and displaying the result. Provides a responsive and user-friendly interface  |

## Why a Monorepo?

We chose a monorepo architecture to structure this project because it provides several benefits, especially for a fullstack application with multiple entry points (CLI, API, and frontend) that share business logic:

1. Shared core logic
2. Simpler testing strategy
3. Easier to maintain

## Technical Stack

### Pnpm

- **Fast**: Pnpm is faster than npm and yarn
- **Space-efficient**: Pnpm uses a content-addressable storage system to store packages, which reduces redundancy and saves disk space
- **Isolated**: Pnpm creates a unique lockfile for each project, which ensures that the dependencies are installed exactly as specified in the lockfile

### Backend

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type-safe development

### Frontend

- **React**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Build tool and development server
- **TailwindCSS**: Styling
- **Framer Motion**: Animations

### Core Package

- **TypeScript**: Shared types and logic
- **Mocha**: Testing framework

### CLI

- **TypeScript**: Type-safe development
- **Commander**: Command-line interface

## Project Structure

```
millenium-falcon-challenge/
├── packages/
│   ├── core/           # Shared types and logic
│   ├── frontend/       # React web interface
│   ├── backend/        # Express server
│   └── cli/            # Command-line tool
├── package.json        # Root package configuration
└── README.md           # Project documentation
```

## Features

### Backend

- RESTful API endpoints
- Error handling middleware
- CORS configuration
- Health check endpoint

### Frontend

- Modern, responsive UI
- File upload with drag-and-drop
- Real-time validation
- Animated results display
- Error handling with specific error codes

### Core Package

- Type definitions
- Probability calculation engine
- Validation utilities
- Error handling
- Test utilities

### CLI

- Command-line interface for calculations
- File validation
- Error handling

## Installation

1. Clone the repository:

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

You will be prompted to choose which package to build 'esbuild' or 'tsc'

4. Make the CLI available globally:

```bash
pnpm link --global
```

or

```bash
pnpm link
```

## Development

1. Start the development servers:

```bash
pnpm dev
```

This will start the backend & frontend servers.

2. Run tests:

```bash
pnpm test
```

## CLI

```bash
give-me-the-odds ./examples/example1/millennium-falcon.json ./examples/example1/empire.json
```

## API Endpoints

### Backend

- `POST /api/calculate-odds`: Calculate success probability
- `GET /api/health`: Health check endpoint

### Configuration Files

#### Millennium Falcon Configuration (millennium-falcon.json)

```json
{
  "autonomy": 6,
  "departure": "Tatooine",
  "arrival": "Endor",
  "routes_db": "universe.db"
}
```

#### Empire Configuration (empire.json)

```json
{
  "countdown": 7,
  "bounty_hunters": [
    {
      "planet": "Hoth",
      "day": 6
    },
    {
      "planet": "Hoth",
      "day": 7
    },
    {
      "planet": "Hoth",
      "day": 8
    }
  ]
}
```

## Known Limitations

1. **Memory Usage**: Large route databases may consume significant memory

## Future Improvements

1. **Performance Optimization**

   - Implement caching for route calculations
   - Optimize database queries
   - Add parallel processing for large datasets

2. **Feature Enhancements**

   - Add visualization of routes
   - Implement route optimization
   - Add historical calculations

3. **Testing**

   - Add integration tests
   - Implement performance benchmarks

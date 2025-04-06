# Developer notes: thought process and execution plan

This document outlines how I approached the Millennium Falcon challenge—from understanding the problem, to designing the system and validating the solution. It focuses on the reasoning behind key design choices, trade-offs made, and how the work was executed.

## Problem analysis

Before writing any code, I spent time thoroughly analyzing the challenge. The objective was to compute the best possible success probability for the Millennium Falcon to reach Endor before the Empire’s countdown, while avoiding capture by bounty hunters.

Only the `empire.json` file is dynamic and uploaded by the user. The Falcon’s configuration (`millennium-falcon.json`) and the route database (`universe.db`) are considered static and stored on the backend.

### Key constraints:

- Autonomy (number of days the Falcon can travel before refueling)
- Bounty hunter encounters on specific planets and days
- Countdown limit (must arrive before or on this day)
- Risk of capture increases with each bounty hunter encounter using a known exponential decay formula

## Assumptions and design decisions

- The frontend uploads only `empire.json`; the backend loads the rest
- Core logic is pure and testable in isolation
- Routes are bidirectional
- Refueling costs one day and is only done when necessary
- Capture probability follows the exact formula provided

I chose a DFS-based approach to pathfinding for its simplicity and clarity, but intentionally structured it so a more advanced algorithm could be added later (e.g., memoized search or A\*).

## Planning and execution strategy

I treated the project like a small product and designed it as a modular monorepo. Each layer is focused on a specific concern:

- `core/`: shared logic (pure functions, algorithms, and types)
- `cli/`: local command-line tool for simulation and debugging
- `backend/`: lightweight API layer that reads Falcon config and routes
- `frontend/`: React SPA for uploading `empire.json` and displaying the result

Execution steps:

1. Implement and test core logic
2. Add a CLI for quick simulations
3. Expose the core logic via a backend API
4. Create a frontend UI for interaction

## Core logic

The core logic is built on three main pure functions:

- `findAllPaths(...)`: generates all valid paths from the departure to the arrival planet, taking into account autonomy, travel time, and refuels
- `calculateCaptureProbability(...)`: computes the probability of capture based on bounty hunter encounters
- `calculateSuccessProbability(...)`: combines both to find the best (safest) path and returns its success rate

I used a TDD approach, writing tests first for each step

- Initial example inputs (`example1` to `example4`)
- Other cases (no path, multiple bounty hunters, refuels, duplicate visits)

## CLI

The CLI (`give-me-the-odds`) allows the engine to be used locally via the terminal. It accepts `millennium-falcon.json` and `empire.json` as inputs and prints the success probability.

While optional, the CLI proved useful for:

- Validating the core logic
- Running local scenarios quickly
- Debugging independently from the API and frontend

## Backend

The backend exposes a single endpoint:

```sh
POST /api/odds
```

It:

- Accepts an `empire.json` payload
- Loads the Falcon config (`millennium-falcon.json`)
- Reads the route map from `universe.db` (based on `routes_db`)
- Calculates and returns the odds using the core logic

This approach reflects the challenge specification: only the Empire’s plan is dynamic, everything else is known in advance.

## Frontend

The frontend is a minimal React app that:

- Lets users upload `empire.json`
- Submits the data to the backend
- Displays the result (success probability as a percentage)

The focus was on correctness and simplicity, not advanced styling or UX.

## Trade-offs and potential improvements

| Area | Current approach | Possible improvements |
|------|------------------|----------------------|
| Frontend | minimal upload + result | Add route animated visualization |
| Backend | single endpoint | Expose best path details |
| Testing | core logic + example validation | Add E2E and integration tests |

## Development workflow

1. Analyze the spec and define types
2. Implement pure logic in `core/` and test thoroughly
3. Create CLI for simulation
4. Add backend API and wire it to the core
5. Build a minimal frontend to connect the flow end-to-end
6. Test with real examples and error scenarios
7. Fix bugs
8. Implement optimizations, error handling and UI animations
9. Documentation

## Closing thoughts

This challenge was a great opportunity to demonstrate not only problem solving and fullstack delivery, but also clarity in decision-making and clean architecture. I approached it like a real product, with a focus on testability, separation of concerns, and maintainability.

Let me know if you'd like me to drop this into your repo as `PLAN.md` or insert it as a section at the bottom of your `README.md`.

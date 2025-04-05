# Give Me The Odds CLI

A command-line tool that calculates the probability of success for the Millennium Falcon's mission based on the given configuration files

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Local Installation

1. Navigate to the CLI package directory:

```bash
cd packages/cli
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the package:

```bash
pnpm build
```

### Global Installation

To make the CLI available globally:

```bash
# From the CLI package directory
npm install -g .
```

## Usage

The CLI takes two file paths as input:

1. Path to the Millennium Falcon configuration file (`millennium-falcon.json`)
2. Path to the Empire configuration file (`empire.json`)

```bash
give-me-the-odds <millennium-falcon.json> <empire.json>
```

### Example

```bash
give-me-the-odds examples/example1/millennium-falcon.json examples/example1/empire.json
```

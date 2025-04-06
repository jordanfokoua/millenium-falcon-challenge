# Millennium Falcon Challenge

A web application that calculates the odds of the Millennium Falcon successfully completing its mission while avoiding capture by the Empire.

## Technical Choices

### Architecture
- **Monorepo Structure**: Using pnpm workspaces for better dependency management and code sharing
- **Core Package**: Contains shared types and business logic
- **Backend**: Express.js with TypeScript for API endpoints
- **Frontend**: React with TypeScript, TailwindCSS, and Framer Motion
- **CLI**: Node.js with TypeScript for command-line interface

### Why These Choices?
- **TypeScript**: Strong typing for better code quality and developer experience
- **React**: Popular, well-supported framework with great developer tools
- **TailwindCSS**: Utility-first CSS for rapid development and consistent styling
- **Framer Motion**: Smooth animations for better user experience
- **Express.js**: Lightweight, flexible backend framework
- **pnpm**: Fast, disk-space efficient package manager with workspace support

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Start development servers
pnpm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
packages/
├── core/           # Shared types and business logic
├── frontend/       # React web application
├── backend/        # Express.js API server
└── cli/            # Command-line interface
```

## Features

- **File Upload**: Drag and drop or select empire.json file
- **Real-time Validation**: Immediate feedback on file format and content
- **Animated Results**: Smooth animations for odds display
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Clear error messages and recovery options

## API Endpoints

- `POST /api/odds`: Calculate success probability
- `GET /api/health`: Check API health status

## Development

### Running Tests
```bash
# Run all tests
pnpm run test

# Run tests for a specific package
pnpm run test:core
pnpm run test:backend
pnpm run test:frontend
```

### Building for Production
```bash
# Build all packages
pnpm run build

# Start production servers
pnpm run start
```

## Known Limitations

1. **Performance**: The path-finding algorithm could be optimized for very large route networks
2. **Error Handling**: Could add more specific error types and recovery strategies
3. **Testing**: Could add more integration and end-to-end tests
4. **Documentation**: Could add more detailed API documentation

## Future Improvements

1. **Performance Optimizations**:
   - Add caching for frequently requested calculations
   - Implement parallel processing for large route networks
   - Add request rate limiting

2. **Features**:
   - Add user authentication
   - Implement file history
   - Add visualization of possible routes
   - Add detailed calculation breakdown

3. **Testing**:
   - Add more comprehensive test coverage
   - Implement performance benchmarks
   - Add load testing

4. **Documentation**:
   - Add API documentation with Swagger/OpenAPI
   - Add more detailed code comments
   - Create user documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

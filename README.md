# NestBoard Micro-Frontends

This repository contains the full NestBoard micro-frontend ecosystem, including:

- `nest-board-api` — backend API server used by both frontend applications
- `map-remore-mfe` — remote micro-frontend that exposes map functionality
- `nest-board-host-mfe` — host application that loads the remote map micro-frontend at runtime

The experience is built as a runtime integration using Vite Module Federation. The host application fetches the remote micro-frontend from the separate `map-remore-mfe` app, which allows independent development, deployment, and runtime error handling.

## Repository Structure

- `nest-board-api/` — dummy backend API server
- `map-remore-mfe/` — remote micro-frontend for map and location features
- `nest-board-host-mfe/` — shell/host application for the NestBoard frontend

## High-Level Flow

1. Start the `nest-board-api` backend.
2. Build and preview the `map-remore-mfe` remote micro-frontend.
3. Start the `nest-board-host-mfe` shell application.
4. The host app loads the remote map micro-frontend dynamically.

## Prerequisites

- Node.js installed
- npm available on your machine

## Step 1: Run the backend API

Open a terminal and run:

```bash
cd nest-board-api
npm install
npm start
```

This starts the backend at:

```bash
http://localhost:3001
```

The backend provides REST endpoints for property data, including:

- `GET /api/properties`
- `GET /api/properties/:id`
- `POST /api/properties`
- `PUT /api/properties/:id`
- `DELETE /api/properties/:id`

## Step 2: Run the Map Remote Micro-Frontend

Open a second terminal and run:

```bash
cd map-remore-mfe
npm install
npm run build
npm run preview
```

This exposes the remote micro-frontend in production preview mode at:

```bash
http://localhost:5184
```

The remote app is responsible for:

- property location visualization
- interactive map UI
- reusable map modules consumed by the host
- dynamic runtime exposure via `remoteEntry.js`

## Step 3: Run the Host Micro-Frontend Application

Open a third terminal and run:

```bash
cd nest-board-host-mfe
npm install
npm run dev
```

The host application should start at the default Vite port, typically:

```bash
http://localhost:5173
```

The host app provides:

- main NestBoard shell
- routing and page layout
- authentication and role-based UI
- property browsing and detail pages
- admin dashboard and management features
- runtime integration with the remote map micro-frontend

## What to Expect in the Host App

- The host app loads the map micro-frontend from `map-remore-mfe` at runtime.
- If the remote micro-frontend is down or unavailable, the host detects the error and displays a fallback error state.
- A reload button is available so users can reattempt loading the remote app without restarting the host.
- This demonstrates the value of micro-frontends: independent deployment, runtime integration, and graceful failure handling.

## Why This Architecture

This project is designed to show a real micro-frontend architecture:

- independent frontend applications
- separate development and build lifecycle for host and remote
- backend API shared by both frontend apps
- runtime module loading via Vite Module Federation
- error handling when the remote app is unavailable

## Notes

- `nest-board-api` is a dummy backend; data is stored in memory and resets on restart.
- `map-remore-mfe` must be built and previewed before the host can load its remote modules correctly.
- The host app will still run without the remote, but the map feature will show an error and a reload option.

## Quick Commands

```bash
# Run backend
cd nest-board-api && npm install && npm start

# Build + preview remote micro-frontend
cd map-remore-mfe && npm install && npm run build && npm run preview

# Run host shell application
cd nest-board-host-mfe && npm install && npm run dev
```

## Additional References

- `nest-board-api/README.md` — backend API details
- `map-remore-mfe/README.md` — remote micro-frontend details
- `nest-board-host-mfe/README.md` — host application details

# NestBoard Frontend

**NestBoard** is a co-living space booking platform that allows users to **explore, book, and manage properties** such as **apartments**, **villas**, and **houses**.

This application now follows a **Micro-Frontend Architecture** using **Vite Module Federation**.

This repository represents the **Shell / Host Application** of the NestBoard frontend ecosystem.

![NESTBOARD!](public/nest-board-readme-res.jpg)

---

# Micro-Frontend Architecture

NestBoard frontend is structured using a **Shell + Remote Micro-Frontend** architecture.

## Shell Application (This Repository)

The shell application is responsible for:

- Main application layout
- Routing
- Authentication
- Global state management
- Shared UI structure
- Loading remote micro-frontends dynamically

## Remote Micro-Frontend

The shell application integrates a remote micro-frontend:

| Micro-Frontend   | Responsibility                                      |
| ---------------- | --------------------------------------------------- |
| `map-remote-mfe` | Property map visualization and map-related features |

The remote application is dynamically loaded into the shell using the **Vite Module Federation Plugin**.

---

# User-Facing Features

- **Home Page**: Browse a list of available properties with filtering options such as location, price range, and property type.
- **Property Detail Page**: View detailed property information including rooms, pricing, facilities, and images.
- **Bookings**: Reserve rooms directly from the property detail page and manage existing bookings.
- **User Profile**: Manage personal details, booking history, and saved properties.
- **Map Integration**: View property locations using the remote Map Micro-Frontend.
- **Dynamic Theme Switching**: UI adapts based on user roles.

---

# Admin Features

- **Admin Dashboard**
- **Add/Edit/Delete Properties**
- **Room Management**
- **User Management**
- **Admin-Specific Theme**

---

# User Roles

## Normal User

- Browse properties
- View property details
- Make bookings
- Manage personal profile

## Admin User

- Full CRUD access
- Property and room management
- User management capabilities

---

# Technology Stack

## Frontend

- **React with TypeScript**
- **Vite**
- **Vite Module Federation Plugin**
- **shadcn/ui**
- **Tailwind CSS**
- **TanStack Query**
- **Zustand**
- **React Router**
- **Clerk Authentication**

## Backend

- **Node.js**
- **Express.js**
- **Dummy Backend API**

---

# Getting Started

Follow these steps to run NestBoard locally.

---

## 1. Clone the Repository

```bash
git clone git@github.com:abhimax/nest-board-micro-frontends.git
cd nest-board-host-mfe
2. Install Dependencies
npm install
3. Start the Shell Application
npm run dev

The shell application will run on:

http://localhost:5183
Running the Remote Map MFE

The shell application depends on the map-remote-mfe application for map-related functionality.

Make sure the remote micro-frontend is also running.

Example:

cd map-remote-mfe
npm install
npm run build
npm run preview

Example remote application URL:

http://localhost:5184
Module Federation Integration

The shell application dynamically loads remote modules at runtime using the Vite Module Federation Plugin.

Architecture flow:

Shell Application (Host)
        ↓
Loads remoteEntry.js
        ↓
Map Remote MFE
        ↓
Renders Map Feature

Benefits of this architecture:

Independent feature development
Better scalability
Faster deployments
Team ownership separation
Lazy-loaded frontend modules
Build for Production
npm run build

This will create an optimized production build inside the dist/ folder.

API Simulation

Repository:
https://github.com/abhimax/nest-board-api

1. Clone the Backend Repository
git clone <backend-repo-url>
2. Go to the Project Folder
cd <backend-folder>
3. Install Dependencies
npm install
4. Start the Backend Server
npm start
Available API Endpoints
GET /properties
GET /properties/:id
POST /properties
PUT /properties/:id
DELETE /properties/:id
```

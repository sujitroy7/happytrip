# HappyTrip

HappyTrip is an AI-powered travel planning application designed to turn natural-language requests into rich, structured, and personalized travel itineraries.

## Architecture

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, Node.js
- **Database**: MongoDB (via Mongoose)

## Project Structure

This repository is structured as two independent applications:

```text
happytrip/
├── frontend/          # React + Vite client application
├── backend/           # NestJS API application
├── .gitignore         # Root Git ignore rules
└── README.md          # Project documentation
```

Frontend and backend have separate `package.json` files, dependencies, TypeScript configs, and build setups.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or a remote MongoDB instance)

## Setup & Running

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (optional for default settings):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Production build and linting:
   ```bash
   npm run build
   npm run lint
   ```

Frontend runs by default at: [http://localhost:5173](http://localhost:5173)

---

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```
5. Build, lint, and test:
   ```bash
   npm run build
   npm run lint
   npm test
   npm run test:e2e
   ```

Backend API runs by default at: [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Frontend (`frontend/.env.example`)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Backend (`backend/.env.example`)

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/happytrip
```

Copy the respective `.env.example` to `.env` in each directory:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

## API

All API endpoints are served under the `/api` global prefix.

- **GET `/api/health`**: Health check reporting service status and MongoDB connection state.
  - Example response:
    ```json
    {
      "status": "ok",
      "database": "connected"
    }
    ```

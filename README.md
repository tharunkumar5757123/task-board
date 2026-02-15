# Task Board - Frontend Internship Assignment

## Stack
- React (Vite + TypeScript)
- React Router for route protection
- LocalStorage for persistence
- Vitest for basic tests

## Demo Login
- Email: `intern@demo.com`
- Password: `intern123`

## Features Implemented
- Static login page with validation and clear error message
- Remember me support using localStorage
- Logout support
- Route protection (`/board` requires authentication)
- Fixed board columns: Todo, Doing, Done
- Task fields:
  - Title (required)
  - Description
  - Priority (low/medium/high)
  - Due Date
  - Tags
  - CreatedAt
- Task create/edit/delete
- Drag and drop between columns
- Search by title
- Filter by priority
- Sort by due date (empty due dates last)
- Persistent board state across refresh
- Safe handling of missing/invalid storage payloads
- Reset board with confirmation
- Activity log (latest actions):
  - Task created
  - Task edited
  - Task moved
  - Task deleted

## State Management
- `AuthContext` for authentication state
- `BoardContext` + reducer for board state and activity events
- Reducer actions keep state transitions predictable and testable

## Project Structure
- `src/state`: context + reducer logic
- `src/pages`: routed pages
- `src/components`: reusable UI components
- `src/utils`: helpers for filtering/sorting/storage
- `src/**/*.test.ts`: basic tests

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm run test
   ```

## Tests Included
- `src/utils/storage.test.ts`
- `src/utils/tasks.test.ts`
- `src/state/boardReducer.test.ts`

## Submission Items
- Deployed application URL: _add your deployed URL here_
- ZIP file of source code: _export this repository as ZIP and submit_

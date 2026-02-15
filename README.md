# Task Board - Frontend Internship Assignment

Live Demo: https://imaginative-meringue-2a19c8.netlify.app/login

## Stack

- React (Vite + TypeScript)
- React Router for route protection
- LocalStorage for persistence
- Vitest for basic tests

## Demo Login

- Email: intern@demo.com
- Password: intern123

## Features Implemented

- Static login page with validation and clear error message
- Remember me support using localStorage
- Logout support
- Route protection (/board requires authentication)
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

- AuthContext for authentication state
- BoardContext + reducer for board state and activity events
- Reducer actions keep state transitions predictable and testable

## Project Structure

- src/state: context + reducer logic
- src/pages: routed pages
- src/components: reusable UI components
- src/utils: helpers for filtering/sorting/storage
- src/**/*.test.ts: basic tests

## Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

## Tests Included

- src/utils/storage.test.ts
- src/utils/tasks.test.ts
- src/state/boardReducer.test.ts

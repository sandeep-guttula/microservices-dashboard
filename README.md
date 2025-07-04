# MonitoCorp - Live Service Monitoring Dashboard

This is a proof-of-concept for an internal dashboard for MonitoCorp's Site Reliability Engineering (SRE) team to monitor the health of microservices in real-time. The dashboard provides live status updates, service management capabilities, and detailed views of service health, all wrapped in a modern, responsive, and professionally designed user interface.

## Features

- **Main Dashboard View**: A clean, organized table displaying all monitored services with their name, type, and current status.
- **Live Status Updates**: Automatically polls for status updates every 15 seconds, updating the UI without full-page reloads. Data is also refreshed automatically when the browser tab is refocused.
- **Service Management (CRUD)**: Intuitive modals for adding, editing, and deleting services with optimistic UI updates for a seamless experience.
- **Service Details & Historical Events**: A dedicated view for each service showing its configuration and a history of status events, implemented with infinite scrolling for performance.
- **Filtering and Searching**: Performant, real-time filtering by service status and searching by name.
- **Responsive Design**: The application is fully responsive and works on all screen sizes.

## Architectural Decisions & Tech Stack

The primary goal was to create a "live" and highly responsive dashboard. The technology choices and architectural patterns were selected to meet this requirement.

### Core Technologies

- **Framework**: [Next.js](https://nextjs.org/) (React) was chosen for its hybrid rendering capabilities, file-based routing, and overall developer experience.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/ui](https://ui.shadcn.com/) components were used to build a modern, polished, and responsive UI quickly.
- **State Management**:
  - **Server State**: [TanStack Query (React Query)](https://tanstack.com/query/latest) is the cornerstone of the state management architecture. It handles all server state, including data fetching, caching, polling, and optimistic updates. This was chosen for its powerful features that simplify complex asynchronous state management.
  - **Client State**: [Zustand](https://zustand-demo.pmnd.rs/) is used for managing global client-side state, such as the state of modals or filters. It was chosen for its simplicity and minimal boilerplate.
- **Mock API**: [Mock Service Worker (MSW)](https://mswjs.io/) is used to simulate a realistic API backend. It intercepts network requests and returns mock data, allowing for the development and testing of the frontend in isolation.
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for schema validation is used for all forms, providing a robust and type-safe way to handle user input.

### State Management Strategy

The application clearly separates server state from client state.

- **Server State (managed by TanStack Query)**:
  - **Caching**: Service lists and details are cached to avoid unnecessary network requests. `staleTime` is configured to refetch data intelligently.
  - **Polling**: A custom `usePolling` hook is implemented to refetch service statuses every 15 seconds, providing the "live" feel.
  - **Optimistic Updates**: All CRUD operations (Create, Update, Delete) are implemented optimistically. The UI is updated instantly, and then reverted only if the API call fails.
  - **Refetch on Focus**: TanStack Query's default `refetchOnWindowFocus` behavior is leveraged to ensure data is fresh when a user returns to the application.

- **Client State (managed by Zustand)**:
  - Global stores are used for state that is not tied to the server, such as the open/closed state of the "Add Service" dialog.

## Getting Started

To run the application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd monito-corp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase for errors.
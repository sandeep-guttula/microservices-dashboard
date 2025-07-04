# MonitoCorp - Live Service Monitoring Dashboard

This is a proof-of-concept for a new internal dashboard at “MonitoCorp.” This dashboard is used by the Site Reliability Engineering (SRE) team to monitor the health of our various microservices. The key requirement is that the dashboard must feel live and highly responsive and professionally designed, providing engineers with up-to-the-second information without requiring them to manually refresh the page.

## Core Features

*   **Main Dashboard View**: Display a list of all monitored services in a clean, well-organized table.
*   **Live Status Updates**: The status of a service is volatile and can change at any moment. The dashboard automatically polls for status updates for all visible services periodically (e.g., every 15 seconds), updating the UI without a full-page re-render.
*   **Service Management (CRUD)**: Provide an intuitive way for users to add, edit, and delete services. These actions could be triggered from a modal or a dedicated form view.
*   **Service Details & Historical Events**: Clicking on a service in the list should navigate the user to a dedicated “Service Details” view with a smooth transition.
*   **Filtering and Searching**: The main dashboard should allow users to filter the list of services by their status and include a text input to search by name…

## Technical Specifications

*   **Framework**: React/Next.js
*   **API**: Mock Service Worker (MSW) is used to simulate a backend API.
*   **Styling**: Tailwind CSS with Radix UI for a polished component library.
*   **State Management**: TanStack Query for server state and Zustand for client state.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architectural Decisions

### State Management

The core of this application is its state management architecture. We've chosen to use a combination of TanStack Query and Zustand to manage the application's state.

*   **TanStack Query (formerly React Query)** is used to manage all server state. This includes fetching, caching, and updating data from the API. TanStack Query is an excellent choice for this application because it provides a number of features that are essential for building a "live" dashboard, such as:
    *   **Automatic Caching**: TanStack Query automatically caches data from the API, which helps to improve performance and reduce the number of network requests.
    *   **Background Refetching**: TanStack Query can automatically refetch data in the background, which ensures that the data displayed in the UI is always up-to-date.
    *   **Optimistic Updates**: TanStack Query allows you to perform optimistic updates, which makes the UI feel more responsive.

*   **Zustand** is used to manage all client state. This includes things like the current search query, the selected filters, and the state of the modals. Zustand is a lightweight and flexible state management library that is easy to use and has a small bundle size.

### API Mocking

We've used Mock Service Worker (MSW) to simulate a backend API. MSW is a powerful library that allows you to intercept network requests and return mock responses. This is a great way to develop and test a frontend application without having to build a real backend.

### Styling

We've used Tailwind CSS with Radix UI for styling. Tailwind CSS is a utility-first CSS framework that makes it easy to build beautiful and responsive user interfaces. Radix UI is a collection of unstyled, accessible, and customizable UI components that can be used to build a design system.
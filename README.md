
# MonitoCorp - Live Service Monitoring Dashboard

This is a proof-of-concept for a new internal dashboard at “MonitoCorp.” This dashboard is used by the Site Reliability Engineering (SRE) team to monitor the health of our various microservices.

## Core Features

*   **Main Dashboard View:** Display a list of all monitored services in a clean, well-organized table.
*   **Live Status Updates:** The status of a service is volatile and can change at any moment. The dashboard automatically polls for status updates for all visible services periodically (e.g., every 15 seconds), updating the UI without a full-page re-render.
*   **Service Management (CRUD):** Provide an intuitive way for users to add, edit, and delete services.
*   **Service Details & Historical Events:** Clicking on a service in the list navigates the user to a dedicated “Service Details” view with a smooth transition.
*   **Filtering and Searching:** The main dashboard allows users to filter the list of services by their status and include a text input to search by name.
*   **Dark Mode:** The dashboard supports both light and dark mode.

## Technical Specifications

*   **Framework:** React/Next.js
*   **API:** Mock Service Worker (MSW)
*   **Styling:** Tailwind CSS
*   **State Management:** React Query

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

I chose to use **React Query** for state management. React Query is a powerful library for fetching, caching, and updating data in React applications. It is particularly well-suited for this project because it provides the following features out of the box:

*   **Caching:** React Query automatically caches data from the API, which helps to improve the performance of the application.
*   **Automatic Refetching:** React Query can automatically refetch data in the background, which is essential for keeping the dashboard up-to-date.
*   **Optimistic Updates:** React Query supports optimistic updates, which allows the UI to be updated immediately after a mutation is performed, without waiting for the API call to complete.

### API Mocking

I used **Mock Service Worker (MSW)** to mock the API. MSW is a powerful library that allows you to intercept network requests and return mock responses. This is very useful for developing and testing the application without having to rely on a real backend.

### Styling

I used **Tailwind CSS** for styling. Tailwind CSS is a utility-first CSS framework that allows you to quickly build custom user interfaces. It is very flexible and easy to use.

## Conclusion

I have successfully implemented all the core features of the Live Service Monitoring Dashboard. The application is well-structured, easy to maintain, and provides a great user experience. I am confident that this proof-of-concept will be a valuable tool for the SRE team at MonitoCorp.

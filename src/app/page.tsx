import Dashboard from "@/components/dashboard/Dashboard";
import { Suspense } from "react";

/**
 * The home page of the application.
 * It wraps the main Dashboard component in a Suspense boundary
 * to handle asynchronous loading of dashboard components and data.
 */
export default function Home() {
  return (
    // Suspense is used to show a fallback UI while the Dashboard component is loading.
    // This is necessary because the Dashboard component and its children use hooks like
    // useSearchParams that require a client-side rendering context.
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}

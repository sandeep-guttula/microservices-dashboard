import Dashboard from "@/components/dashboard/Dashboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}

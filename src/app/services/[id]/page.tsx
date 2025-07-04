"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useServiceDetails, useServiceMetricsQuery } from "@/lib/queries/services";
import { ServiceCard } from "@/components/service-details/ServiceCard";
import { ServiceConfigCard } from "@/components/service-details/ServiceConfigCard";
import { EventHistory } from "@/components/service-details/EventHistory";
import { MetricCard } from "@/components/service-details/MetricCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

import ErrorBoundary from "@/components/ErrorBoundary";

export default function ServiceDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: service, isLoading, isError: isServiceError, isFetching: isServiceFetching } = useServiceDetails(id);
  const { data: metrics, isError: isMetricsError, isFetching: isMetricsFetching } = useServiceMetricsQuery(id);

  if (isServiceError) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 mb-4">Error loading service details.</p>
        <Button onClick={() => router.refresh()}>Refresh</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!service) {
    return <div className="text-center text-red-500">Service not found.</div>;
  }

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 space-y-6"
      >
        <div>
          <Button onClick={() => router.back()}>&larr; Back</Button>
          {(isServiceFetching || isMetricsFetching) && <span className="ml-4 text-gray-500">Updating...</span>}
        </div>
        <ServiceCard service={service} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isMetricsError ? (
            <div className="text-red-500 col-span-3 text-center">
              <p className="mb-4">Error loading metrics.</p>
              <Button onClick={() => router.refresh()}>Refresh</Button>
            </div>
          ) : (
            <>
              <MetricCard title="Uptime" value={metrics?.uptime ?? "Loading..."} />
              <MetricCard title="Latency" value={metrics?.latency ?? "Loading..."} />
              <MetricCard title="Error Rate" value={metrics?.errorRate ?? "Loading..."} />
            </>
          )}
        </div>
        <ServiceConfigCard service={service} />
        <Suspense fallback={<div>Loading events...</div>}>
          <EventHistory serviceId={service.id} />
        </Suspense>
      </motion.div>
    </ErrorBoundary>
  );
}

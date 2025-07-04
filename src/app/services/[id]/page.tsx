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
  const { data: service, isLoading, isError } = useServiceDetails(id);
  const { data: metrics, isLoading: metricsLoading } = useServiceMetricsQuery(id);

  if (isError) {
    return <div className="text-red-500">Error loading service details.</div>;
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
        </div>
        <ServiceCard service={service} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard title="Uptime" value={metrics?.uptime ?? "Loading..."} />
          <MetricCard title="Latency" value={metrics?.latency ?? "Loading..."} />
          <MetricCard title="Error Rate" value={metrics?.errorRate ?? "Loading..."} />
        </div>
        <ServiceConfigCard service={service} />
        <Suspense fallback={<div>Loading events...</div>}>
          <EventHistory serviceId={service.id} />
        </Suspense>
      </motion.div>
    </ErrorBoundary>
  );
}

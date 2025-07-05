"use client";

import { useParams, useRouter } from "next/navigation";
import { useServiceDetails } from "@/lib/queries/services";
import { ServiceCard } from "@/components/service-details/ServiceCard";
import { EventHistory } from "@/components/service-details/EventHistory";
import { MetricCard } from "@/components/service-details/MetricCard";
import { ServiceConfigCard } from "@/components/service-details/ServiceConfigCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ServiceDetailsSkeleton } from "@/components/service-details/ServiceDetailsSkeleton";

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: service, isLoading, isError, error } = useServiceDetails(id);

  if (isLoading) {
    return <ServiceDetailsSkeleton />;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  if (!service) {
    return <div className="flex justify-center items-center h-screen">Service not found</div>;
  }

  return (
    <div className="bg-background min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex items-center mb-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <ServiceCard service={service} />
            <EventHistory serviceId={service.id} />
          </div>
          <div className="space-y-8">
            <MetricCard serviceId={service.id} />
            <ServiceConfigCard service={service} />
          </div>
        </div>
      </div>
    </div>
  );
}
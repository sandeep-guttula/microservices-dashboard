"use client";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { ServiceItem } from "@/components/dashboard/ServiceItem";
import { useAllServicesQuery } from "@/lib/queries/services";
import ServicesList from "@/components/dashboard/ServicesList";
import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdWarning,
} from "react-icons/io";
import { IoLayersOutline } from "react-icons/io5";

import { STATUS } from "@/lib/constants";
import { AddServiceDialog } from "@/components/dashboard/AddServiceDialog";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  const { data: services, isLoading, isError, error } = useAllServicesQuery();

  if (isLoading) {
    return <div>Loading service counts...</div>;
  }

  if (isError) {
    return <div>Error loading service counts: {error?.message}</div>;
  }

  const onlineServices =
    services?.filter((s) => s.status === STATUS.ONLINE).length || 0;
  const degradedServices =
    services?.filter((s) => s.status === STATUS.WARNING).length || 0;
  const offlineServices =
    services?.filter((s) => s.status === STATUS.OFFLINE).length || 0;
  const totalServices = services?.length || 0;

  return (
    <ErrorBoundary>
      <div className="bg-[#F9FAFB] min-h-screen flex justify-center items-start py-10 px-4">
        <section className="flex flex-col items-center w-full max-w-6xl gap-6">
          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold">
                Service Overview
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Monitor and manage your microservices in real-time
              </p>
            </div>
            <div className="self-start md:self-center">
              <AddServiceDialog />
            </div>
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <ServiceItem
              icon={<IoMdCheckmarkCircle className="text-green-500" />}
              label="Online"
              value={onlineServices}
            />
            <ServiceItem
              icon={<IoMdWarning className="text-yellow-500" />}
              label="Degraded"
              value={degradedServices}
            />
            <ServiceItem
              icon={<IoMdCloseCircle className="text-red-500" />}
              label="Offline"
              value={offlineServices}
            />
            <ServiceItem
              icon={<IoLayersOutline className="text-gray-700" />}
              label="Total Services"
              value={totalServices}
            />
          </section>
          <FiltersBar />
          <ServicesList />
        </section>
      </div>
    </ErrorBoundary>
  );
}

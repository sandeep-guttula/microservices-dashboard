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
import { ServiceRowSkeleton } from "@/components/dashboard/ServiceRowSkeleton";
import { AddServiceDialog } from "@/components/dashboard/AddServiceDialog";
import ErrorBoundary from "@/components/ErrorBoundary";

/**
 * The main dashboard component.
 * It fetches and displays a list of services, including their status and other details.
 * It also provides filtering and service creation functionalities.
 */
export default function Dashboard() {
  // Fetch all services using a custom query hook.
  const { data: services, isLoading, isError, error } = useAllServicesQuery();

  // Show an error message if the service query fails.
  if (isError) {
    return <div>Error loading service counts: {error?.message}</div>;
  }

  // Calculate service counts based on their status.
  const onlineServices =
    services?.filter((s) => s.status === STATUS.ONLINE).length || 0;
  const degradedServices =
    services?.filter((s) => s.status === STATUS.DEGRADED).length || 0;
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
              {/* Dialog to add a new service */}
              <AddServiceDialog />
            </div>
          </div>
          {/* Display service status cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <ServiceItem
              icon={<IoMdCheckmarkCircle className="text-green-500" />}
              label="Online"
              value={onlineServices}
              isLoading={isLoading}
            />
            <ServiceItem
              icon={<IoMdWarning className="text-yellow-500" />}
              label="Degraded"
              value={degradedServices}
              isLoading={isLoading}
            />
            <ServiceItem
              icon={<IoMdCloseCircle className="text-red-500" />}
              label="Offline"
              value={offlineServices}
              isLoading={isLoading}
            />
            <ServiceItem
              icon={<IoLayersOutline className="text-gray-700" />}
              label="Total Services"
              value={totalServices}
              isLoading={isLoading}
            />
          </section>
          {/* Filters for the services list */}
          <FiltersBar />
          {/* Show a skeleton loader while services are being fetched */}
          {isLoading ? (
            <div className="bg-white rounded-lg border shadow-sm w-full">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Services</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b">
                    <tr>
                      <th className="px-6 py-3">Service</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Last Check</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {/* Show skeleton rows while loading */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ServiceRowSkeleton key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Render the list of services once data is available */
            <ServicesList />
          )}
        </section>
      </div>
    </ErrorBoundary>
  );
}

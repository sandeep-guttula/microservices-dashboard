"use client";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { ServiceItem } from "@/components/dashboard/ServiceItem";
import ServicesList from "@/components/dashboard/ServicesList";
import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdWarning,
} from "react-icons/io";
import { IoLayersOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useMswStore } from "@/lib/stores/useMswStore";
import { useServiceStore } from "@/lib/stores/useServiceStore";

import { STATUS } from "@/lib/constants";
import { AddServiceDialog } from "@/components/dashboard/AddServiceDialog";

export default function Home() {
  const mswReady = useMswStore((state) => state.mswReady);
  const { setServices, services, filteredServices } = useServiceStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          console.log("Failed to fetch services:", response.statusText);
          return;
        }
        const data = await response.json();
        console.log("Fetched services:", data);
        setServices(data);
      } catch (error) {
        console.log("Error fetching services:", error);
        setServices([]);
      }
    };
    fetchServices();
  }, [mswReady, setServices]);

  return (
    <>
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
              value={services.filter((s) => s.status === STATUS.ONLINE).length}
            />
            <ServiceItem
              icon={<IoMdWarning className="text-yellow-500" />}
              label="Degraded"
              value={services.filter((s) => s.status === STATUS.WARNING).length}
            />
            <ServiceItem
              icon={<IoMdCloseCircle className="text-red-500" />}
              label="Offline"
              value={services.filter((s) => s.status === STATUS.OFFLINE).length}
            />
            <ServiceItem
              icon={<IoLayersOutline className="text-gray-700" />}
              label="Total Services"
              value={services.length}
            />
          </section>
          <FiltersBar />
          <ServicesList services={filteredServices} />
        </section>
      </div>
    </>
  );
}

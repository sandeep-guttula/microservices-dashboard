import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { ServiceItem } from "@/components/dashboard/ServiceItem";
import ServicesList from "@/components/dashboard/ServicesList";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/types";
import {
  IoMdAdd,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdWarning,
} from "react-icons/io";
import { IoLayersOutline } from "react-icons/io5";

const services: Service[] = [
  {
    name: "User Service",
    id: "us-001",
    type: "API",
    status: "Online",
    lastCheck: "2 seconds ago",
  },
  {
    name: "Order Service",
    id: "os-002",
    type: "API",
    status: "Degraded",
    lastCheck: "5 minutes ago",
  },
  {
    name: "Payment Service",
    id: "ps-003",
    type: "API",
    status: "Offline",
    lastCheck: "10 minutes ago",
  },
  {
    name: "Inventory Service",
    id: "is-004",
    type: "Database",
    status: "Online",
    lastCheck: "1 minute ago",
  },
];

export default function Home() {
  return (
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
            <Button className="flex items-center">
              <IoMdAdd className="mr-2" />
              Add Service
            </Button>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <ServiceItem
            icon={<IoMdCheckmarkCircle className="text-green-500" />}
            label="Online"
            value={24}
          />
          <ServiceItem
            icon={<IoMdWarning className="text-yellow-500" />}
            label="Degraded"
            value={3}
          />
          <ServiceItem
            icon={<IoMdCloseCircle className="text-red-500" />}
            label="Offline"
            value={2}
          />
          <ServiceItem
            icon={<IoLayersOutline className="text-gray-700" />}
            label="Total Services"
            value={29}
          />
        </section>
        <FiltersBar />
        <ServicesList services={services} />
      </section>
    </div>
  );
}

import EventHistory from "@/components/service-details/EventHistory";
import MetricCard from "@/components/service-details/MetricCard";
import ServiceCard from "@/components/service-details/ServiceCard";
import ServiceConfigCard from "@/components/service-details/ServiceConfigCard";
import {
  InfoCircledIcon,
  ReloadIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center py-10 px-4 flex-col">
      <div className="flex flex-col gap-6">
        <ServiceCard
          title="User Database Service"
          status="Online"
          type="Database"
          id="db-user-001"
          description="Primary user database handling authentication, profiles, and user preferences. Critical service with 99.9% uptime requirement."
        />
        <div className="flex w-full max-w-6xl flex-wrap gap-4 mt-6">
          <MetricCard
            title="Uptime"
            value="99.94%"
            change="+0.02% from last week"
            changeColor="green"
            icon={<ClockIcon className="w-4 h-4 text-gray-400" />}
          />
          <MetricCard
            title="Response Time"
            value="145ms"
            change="-12ms from yesterday"
            changeColor="green"
            icon={<InfoCircledIcon className="w-4 h-4 text-gray-400" />}
          />
          <MetricCard
            title="Error Rate"
            value="0.06%"
            change="+0.01% from yesterday"
            changeColor="red"
            icon={<ExclamationTriangleIcon className="w-4 h-4 text-gray-400" />}
          />
          <MetricCard
            title="Last Check"
            value="2s ago"
            subtext="Auto-refresh enabled"
            icon={<ReloadIcon className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <ServiceConfigCard
          serviceName="User Database Service"
          serviceType="Database"
          environment="Production"
          endpoint="db-user-001.internal.monitocorp.com"
          port={5432}
          healthCheckInterval="15 seconds"
        />
        <EventHistory />
      </div>
    </div>
  );
};

export default page;

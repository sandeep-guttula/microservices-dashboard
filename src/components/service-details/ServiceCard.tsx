import { Service } from "@/types/types";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Service Details</h3>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h4 className="font-medium">{service.name}</h4>
          <p className="text-sm text-muted-foreground">{service.id}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Status</p>
          <StatusBadge status={service.status} />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="text-sm">{service.type}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Last Check</p>
          <p className="text-sm">{service.lastCheck}</p>
        </div>
      </div>
    </div>
  );
}
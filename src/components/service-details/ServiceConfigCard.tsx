
import { Service } from "@/types/types";

interface ServiceConfigCardProps {
  service: Service;
}

export function ServiceConfigCard({ service }: ServiceConfigCardProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Configuration</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="text-sm">{service.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="text-sm">{service.type}</p>
        </div>
      </div>
    </div>
  );
}

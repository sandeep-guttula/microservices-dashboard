import { Service } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceConfigCardProps {
  service: Service;
}

export function ServiceConfigCard({ service }: ServiceConfigCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Endpoint:</p>
            <p className="font-medium">{service.endpoint || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Region:</p>
            <p className="font-medium">{service.region || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Owner:</p>
            <p className="font-medium">{service.owner || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created At:</p>
            <p className="font-medium">{service.createdAt || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
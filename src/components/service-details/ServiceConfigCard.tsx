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
            <p className="text-muted-foreground">Version:</p>
            <p className="font-medium">{service.version || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Description:</p>
            <p className="font-medium">{service.description || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
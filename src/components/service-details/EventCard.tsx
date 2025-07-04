import { ServiceEvent } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface EventCardProps {
  event: ServiceEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{event.type}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(event.timestamp), "PPP p")}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{event.description}</p>
      </CardContent>
    </Card>
  );
}
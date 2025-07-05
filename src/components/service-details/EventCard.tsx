
import { ServiceEvent } from "@/types/types";

interface EventCardProps {
  event: ServiceEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="border-b py-4">
      <p className="font-medium">{event.type}</p>
      <p className="text-sm text-gray-500">{event.timestamp}</p>
      <p className="text-sm">{event.message}</p>
    </div>
  );
}

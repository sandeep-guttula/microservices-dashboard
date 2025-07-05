import { useServiceEvents } from "@/lib/queries/services";
import { EventCard } from "./EventCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface EventHistoryProps {
  serviceId: string;
}

export function EventHistory({ serviceId }: EventHistoryProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useServiceEvents(serviceId);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (isError) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Event History</h3>
      </div>
      <div className="p-6 space-y-4">
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ))}
        <div ref={ref} className="h-10">
          {isFetchingNextPage && <div className="text-muted-foreground">Loading more events...</div>}
        </div>
      </div>
    </div>
  );
}
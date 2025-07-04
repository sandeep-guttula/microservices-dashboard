"use client";
import { useServiceEvents } from "@/lib/queries/services";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface EventHistoryProps {
  serviceId: string;
}

export function EventHistory({ serviceId }: EventHistoryProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useServiceEvents(serviceId);

  const lastEventRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lastEventRef);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
        </CardHeader>
        <CardContent>Loading events...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
        </CardHeader>
        <CardContent className="text-red-500">
          Error loading events.
        </CardContent>
      </Card>
    );
  }

  const allEvents = data?.pages.flatMap((page) => page.events) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Event History</CardTitle>
      </CardHeader>
      <CardContent>
        {allEvents.length === 0 ? (
          <p className="text-muted-foreground">
            No events found for this service.
          </p>
        ) : (
          <div>
            {allEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
            <div ref={lastEventRef} />
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-full mt-4"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

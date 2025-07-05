"use client";

import { useServicesQuery } from "@/lib/queries/services";
import { ServiceRow } from "./ServiceRow";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceRowSkeleton } from "./ServiceRowSkeleton";
import { AnimatePresence } from "framer-motion";

export default function ServicesList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const filters = {
    name_like: searchParams.get("search") || undefined,
    status:
      searchParams.get("status") === "all"
        ? undefined
        : searchParams.get("status") || undefined,
    type:
      searchParams.get("type") === "all"
        ? undefined
        : searchParams.get("type") || undefined,
  };

  useEffect(() => {
    setPage(1);
  }, [filters.name_like, filters.status, filters.type]);

  const { data, isLoading, isError, error, isPlaceholderData, isFetching } =
    useServicesQuery({
      ...filters,
      page,
      limit: 10,
    });

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm w-full">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Services</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs border-b">
            <tr>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Last Check</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-card-foreground">
            <AnimatePresence>
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <ServiceRowSkeleton key={i} />
                  ))
                : data?.map((service) => (
                    <ServiceRow key={service.id} service={service} />
                  ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {data?.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          No services found.
        </div>
      )}

      <div className="flex justify-between items-center px-6 py-3 text-sm text-muted-foreground border-t">
        <span>
          Showing {(data?.length ?? 0) > 0 ? `1 to ${data?.length ?? 0}` : 0} of{" "}
          {data?.length ?? 0} services
        </span>
        <div className="space-x-2 flex items-center">
          {isFetching && <span className="text-sm text-muted-foreground">Loading...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => setPage((old) => old + 1)}
            disabled={isPlaceholderData || !data || data.length < 10}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

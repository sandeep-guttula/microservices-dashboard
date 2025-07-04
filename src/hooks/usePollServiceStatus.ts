import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServiceById } from "@/lib/queries/services";
import { servicesKeys } from "@/lib/queries/services";
import { useEffect, useRef } from "react";
import { Service } from "@/types/types.d";

export const usePollServiceStatus = (serviceId: string) => {
  const queryClient = useQueryClient();
  const previousStatus = useRef<string | null>(null);

  const { data: service, ...rest } = useQuery<Service>({
    queryKey: servicesKeys.detail(serviceId),
    queryFn: () => fetchServiceById(serviceId),
    refetchInterval: 15 * 1000, // Poll every 15 seconds
    staleTime: 15 * 1000,
  });

  useEffect(() => {
    if (service && previousStatus.current && service.status !== previousStatus.current) {
      // Status has changed, log the event
      console.log(
        `Status changed from ${previousStatus.current} to ${service.status}`
      );
    }
    if (service) {
      previousStatus.current = service.status;
    }
  }, [service, queryClient]);

  return { service, ...rest };
};

import { useQuery } from "@tanstack/react-query";
import { fetchServiceById } from "@/lib/queries/services";
import { servicesKeys } from "@/lib/queries/services";

export const usePollServiceStatus = (serviceId: string) => {
  return useQuery({
    queryKey: servicesKeys.detail(serviceId),
    queryFn: () => fetchServiceById(serviceId),
    refetchInterval: 15 * 1000, // Poll every 15 seconds
    staleTime: 15 * 1000,
  });
};

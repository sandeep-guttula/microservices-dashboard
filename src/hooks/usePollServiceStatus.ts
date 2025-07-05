import { useQuery } from "@tanstack/react-query";
import { fetchServiceById } from "@/lib/queries/services";
import { Service } from "@/types/types";
import { servicesKeys } from "@/lib/queries/services";

export const usePollServiceStatus = (id: string, initialStatus: string) => {
  return useQuery<Service>({
    queryKey: servicesKeys.detail(id),
    queryFn: () => fetchServiceById(id),
    refetchInterval: 15000, // Poll every 15 seconds
    staleTime: 0,
    initialData: () => ({ id, status: initialStatus } as Service),
    enabled: true,
  });
};
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchServiceById,
  fetchServiceEvents,
  fetchServices,
  fetchServiceStatuses,
  fetchServiceMetrics,
} from "@/lib/api";

// Query Keys
export const servicesKeys = {
  all: ["services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
  list: (filters: object) => [...servicesKeys.lists(), filters] as const,
  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (id: string) => [...servicesKeys.details(), id] as const,
  statuses: () => [...servicesKeys.all, "statuses"] as const,
  events: () => [...servicesKeys.all, "events"] as const,
  eventList: (id: string) => [...servicesKeys.events(), id] as const,
  metrics: (id: string) => [...servicesKeys.all, "metrics", id] as const,
};

/**
 * 1. useServicesQuery(filters) – paginated & filterable
 */
export const useServicesQuery = (filters: {
  page?: number;
  limit?: number;
  status?: string;
  name_like?: string;
}) => {
  return useQuery({
    queryKey: servicesKeys.list(filters),
    queryFn: () => fetchServices(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * 2. useServiceStatusPolling() – polls statuses every 15s
 */
import { usePolling } from "@/hooks/usePolling";

export const useServiceStatusPolling = () => {
  const queryResult = useQuery({
    queryKey: servicesKeys.statuses(),
    queryFn: fetchServiceStatuses,
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  usePolling({
    queryKey: servicesKeys.statuses(),
    interval: 15 * 1000, // 15 seconds
    enabled: true, // Polling is always enabled for status
  });

  return queryResult;
};

/**
 * 3. useServiceDetails(id) – fetches single service
 */
export const useServiceDetails = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: () => fetchServiceById(id),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
  });
};

/**
 * 4. useServiceEvents(id) – infinite query for events list
 */
export const useServiceEvents = (id: string) => {
  const queryResult = useInfiniteQuery({
    queryKey: servicesKeys.eventList(id),
    queryFn: ({ pageParam }) => fetchServiceEvents(id, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  usePolling({
    queryKey: servicesKeys.eventList(id),
    interval: 15 * 1000, // 15 seconds
    enabled: true,
  });

  return queryResult;
};

/**
 * 5. useAllServicesQuery() – fetches all services for counts
 */
export const useAllServicesQuery = () => {
  return useQuery({
    queryKey: servicesKeys.lists(),
    queryFn: () => fetchServices({}), // Fetch all services
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * 6. useServiceMetricsQuery(id) – fetches service metrics
 */
export const useServiceMetricsQuery = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.metrics(id),
    queryFn: () => fetchServiceMetrics(id),
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};
import {
  useInfiniteQuery,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { Service, ServiceEvent, ServiceMetrics } from "@/types/types";

// API Fetch Functions
const API_BASE_URL = "/api";

export const fetchServices = async (
  filters: {
    page?: number;
    limit?: number;
    status?: string;
    name_like?: string;
  } = {}
): Promise<Service[]> => {
  const params = new URLSearchParams();
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.status) params.append("status", filters.status);
  if (filters.name_like) params.append("name_like", filters.name_like);

  const response = await fetch(`${API_BASE_URL}/services?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return response.json();
};

export const fetchServiceById = async (id: string): Promise<Service> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch service details");
  }
  return response.json();
};

export const fetchServiceEvents = async (
  id: string,
  pageParam = 1,
  limit = 10
): Promise<{ events: ServiceEvent[]; nextPage: number | null }> => {
  const response = await fetch(
    `${API_BASE_URL}/services/${id}/events?page=${pageParam}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch service events");
  }

  const data = await response.json();

  const events: ServiceEvent[] = Array.isArray(data?.events)
    ? data.events
    : Array.isArray(data)
      ? data
      : [];

  return {
    events,
    nextPage: events.length === limit ? pageParam + 1 : null,
  };
};

export const fetchServiceMetrics = async (
  id: string
): Promise<ServiceMetrics> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}/metrics`);
  if (!response.ok) {
    throw new Error("Failed to fetch service metrics");
  }
  return response.json();
};

export const createService = async (
  service: Omit<Service, "id">
): Promise<Service> => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error("Failed to create service");
  }
  return response.json();
};

export const updateService = async (service: Service): Promise<Service> => {
  const response = await fetch(`${API_BASE_URL}/services/${service.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error("Failed to update service");
  }
  return response.json();
};

export const deleteService = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete service");
  }
  return;
};

export const createServiceEvent = async (
  serviceId: string,
  event: Omit<ServiceEvent, "id" | "serviceId">
): Promise<ServiceEvent> => {
  const response = await fetch(`${API_BASE_URL}/services/${serviceId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error("Failed to create service event");
  }
  return response.json();
};

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

// React Query Hooks

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

export const useServiceDetails = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: () => fetchServiceById(id),
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
  });
};

export const useServiceEvents = (id: string) => {
  return useInfiniteQuery({
    queryKey: servicesKeys.eventList(id),
    queryFn: ({ pageParam }) => fetchServiceEvents(id, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    refetchInterval: 15 * 1000, // 15 seconds
  });
};

export const useAllServicesQuery = () => {
  return useQuery({
    queryKey: servicesKeys.lists(),
    queryFn: () => fetchServices({}),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useServiceMetricsQuery = (id: string) => {
  return useQuery({
    queryKey: servicesKeys.metrics(id),
    queryFn: () => fetchServiceMetrics(id),
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

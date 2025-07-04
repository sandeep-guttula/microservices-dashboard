import { Service, ServiceEvent, ServiceMetrics } from "@/types/types";

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
export const fetchServiceStatuses = async (): Promise<
  Pick<Service, "id" | "status">[]
> => {
  const response = await fetch(`${API_BASE_URL}/services?limit=1000`); // Fetch all for status check
  if (!response.ok) {
    throw new Error("Failed to fetch service statuses");
  }
  const services: Service[] = await response.json();
  return services.map(({ id, status }) => ({ id, status }));
};

export const fetchServiceMetrics = async (id: string): Promise<ServiceMetrics> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}/metrics`);
  if (!response.ok) {
    throw new Error("Failed to fetch service metrics");
  }
  return response.json();
};

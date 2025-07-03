import { create } from "zustand";
import { Service } from "@/types/types";

interface ServiceFilters {
  search: string;
  status: string;
  type: string;
}

interface ServiceStore {
  services: Service[];
  filteredServices: Service[];
  filters: ServiceFilters;
  setServices: (services: Service[]) => void;
  setFilter: (key: keyof ServiceFilters, value: string) => void;
  addService: (service: Service) => void;
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: [],
  filteredServices: [],
  filters: {
    search: "",
    status: "",
    type: "",
  },
  setServices: (services) => {
    const { filters } = get();
    const filtered = applyFilters(services, filters);
    set({ services, filteredServices: filtered });
  },
  setFilter: (key, value) => {
    const filters = { ...get().filters, [key]: value };
    const filtered = applyFilters(get().services, filters);
    set({ filters, filteredServices: filtered });
  },
  addService: (service: Service) => {
    const current = get().services;
    const updated = [...current, service];
    const filters = get().filters;
    const filtered = applyFilters(updated, filters);
    set({ services: updated, filteredServices: filtered });
  },
}));

function applyFilters(services: Service[], filters: ServiceFilters): Service[] {
  return services.filter((service) => {
    const matchesSearch =
      !filters.search ||
      service.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || service.status === filters.status;

    const matchesType = !filters.type || service.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });
}

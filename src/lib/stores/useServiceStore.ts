import { create } from "zustand";
import { Service } from "@/types/types";

interface ServiceStore {
  services: Service[];
  filteredServices: Service[];
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: [],
  filteredServices: [],
  setServices: (services) => {
    set({ services, filteredServices: services });
  },
  addService: (service: Service) => {
    const current = get().services;
    const updated = [...current, service];
    set({ services: updated, filteredServices: updated });
  },
}));

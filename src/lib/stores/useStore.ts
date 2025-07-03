
import { create } from 'zustand';

interface StoreState {
  filters: {
    status: string;
    search: string;
  };
  modalState: {
    isOpen: boolean;
    serviceId?: string;
  };
  setFilters: (filters: { status: string; search: string }) => void;
  openModal: (serviceId?: string) => void;
  closeModal: () => void;
}

export const useStore = create<StoreState>((set) => ({
  filters: {
    status: 'all',
    search: '',
  },
  modalState: {
    isOpen: false,
  },
  setFilters: (filters) => set({ filters }),
  openModal: (serviceId) => set({ modalState: { isOpen: true, serviceId } }),
  closeModal: () => set({ modalState: { isOpen: false } }),
}));

import { create } from "zustand";

interface MswStore {
  mswReady: boolean;
  setMswReady: (ready: boolean) => void;
}

export const useMswStore = create<MswStore>((set) => ({
  mswReady: false,
  setMswReady: (ready) => set({ mswReady: ready }),
}));

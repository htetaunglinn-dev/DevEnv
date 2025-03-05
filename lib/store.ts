import { create } from "zustand";

interface StoreState {
  searchText: string;

  setSearchText: (searchText: string) => void;
  clearSearchText: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  searchText: "",

  // Actions to update state
  setSearchText: (searchText: string) => set({ searchText }),
  clearSearchText: () => set({ searchText: "" }),
}));

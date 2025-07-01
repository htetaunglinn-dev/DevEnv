import { create } from "zustand";

interface StoreState {
  searchText: string;
  searchMenu: string;

  setSearchText: (searchText: string) => void;
  clearSearchText: () => void;

  setSearchMenu: (searchMenu: string) => void;
  clearSearchMenu: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  searchText: "",
  searchMenu: "",

  //Search Articles
  setSearchText: (searchText: string) => set({ searchText }),
  clearSearchText: () => set({ searchText: "" }),

  //Search Menu
  setSearchMenu: (searchMenu: string) => set({ searchMenu }),
  clearSearchMenu: () => set({ searchMenu: "" }),
}));

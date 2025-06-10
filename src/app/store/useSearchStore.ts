import { create } from "zustand";

interface SearchStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
  sessionId: string;
  setSessionId: (sessionId: string) => void;
}
const useSearchStore = create<SearchStoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  isSearching: false,
  setIsSearching: (isSearching: boolean) => set({ isSearching }),
  sessionId: "",
  setSessionId: (sessionId: string) => set({ sessionId }),
}));

export default useSearchStore;

import { create } from "zustand";
import { RefObject } from "react";

type MainRef = RefObject<HTMLDivElement>;

interface ScrollStore {
  mainRef: MainRef | null;
  setMainRef: (ref: React.RefObject<HTMLDivElement | null> | null) => void;
  scrollTo: (position: number, behavior?: ScrollBehavior) => void;
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  mainRef: null,
  setMainRef: (ref) => set({ mainRef: ref }),
  scrollTo: (position, behavior = "smooth") => {
    const { mainRef } = get();
    if (mainRef?.current) {
      mainRef.current.scrollTo({
        top: position,
        behavior,
      });
    }
  },
}));

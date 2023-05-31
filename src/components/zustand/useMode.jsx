import { create } from "zustand";

const useMode = create((set, get) => ({
  mode: JSON.parse(window.localStorage.getItem("mode")) || { mode: false },

  setMode: () => {
    set((state) => ({ mode: !state.mode }));

    window.localStorage.setItem("mode", JSON.stringify({ mode: get().mode }));
  },
}));

export default useMode;

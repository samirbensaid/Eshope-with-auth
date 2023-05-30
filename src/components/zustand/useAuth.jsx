import { create } from "zustand";

const useAuth = create((set) => ({
  user: {},
  
  setUser: (x) => {
    set(() => ({ user: x }));
    window.localStorage.setItem("token", JSON.stringify(x.token));
  },
  
}));

export default useAuth;

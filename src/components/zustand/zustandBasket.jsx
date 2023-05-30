import { create } from "zustand";

const useBasket = create((set, get) => ({
  basket: JSON.parse(window.localStorage.getItem("myBasket")) || [],
  //   add: (x) => set((state) => ({ basket: [...state.basket, x] })),
  add: (x) => {
    set((state) => ({ basket: [...state.basket, x] }));

    window.localStorage.setItem("myBasket", JSON.stringify(get().basket));
  },
  //  deleteOne: (y) => set((state) => ({ basket: state.basket.splice(y, 1) })),
  //   reset: () => set({ basket: [] }),
  reset: () => {
    set(() => ({ basket: [] }));
    window.localStorage.setItem("myBasket", JSON.stringify([]));
  },
  deleteOne: (x) => {
    set((state) => ({
      basket: state.basket.filter((_, index) => index !== x),
    }));

    window.localStorage.setItem("myBasket", JSON.stringify(get().basket));
  },
  edit: (index, value) => {
    // set((state) => {
    //   state.basket[index].count = value;
    // });
    let test = get().basket;
    test[index].count = value;

    window.localStorage.setItem("myBasket", JSON.stringify(test));
    set(() => ({
      basket: test,
    }));
  },
}));

export default useBasket;

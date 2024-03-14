import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const useCountStore = createStore(
  persist(
    (set) => ({
      usuari: {
        nom: "Pepito",
        cognom: "Grillo",
        email: "pepito@gmail.com",
        id: null,
        avatar: 0,
        classe: '',
      },
    }),
    {
      name: 'countStore', // nombre único para el almacenamiento local
    }
  )
);

export const { getState, setState, subscribe } = useCountStore;

export default useCountStore;
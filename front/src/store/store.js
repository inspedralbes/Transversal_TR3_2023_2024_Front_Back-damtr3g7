import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const useUserStore = createStore(
  persist(
    (set) => ({
      usuari: {
        nom: "",
        cognom: "",
        email: "",
        id: null,
        avatar: 0,
        classe: '',
      },
    }),
    {
      name: 'userStore', // nombre único para el almacenamiento local
    }
  )
);

export const { getState, setState, subscribe } = useUserStore;

export default useUserStore;
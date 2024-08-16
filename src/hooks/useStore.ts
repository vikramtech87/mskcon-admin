import { AuthState } from "@/types/auth-state";
import { create } from "zustand";

type AuthStore = {
  isLoaded: boolean;
  authState?: AuthState;
};

type Store = {
  authStore: AuthStore;
  setAuth: (state?: AuthState) => void;
};

export const useStore = create<Store>()((set) => ({
  authStore: {
    isLoaded: false,
    authState: undefined,
  },
  setAuth: (state?: AuthState) => {
    set(() => ({
      authStore: {
        isLoaded: true,
        authState: state,
      },
    }));
  },
}));

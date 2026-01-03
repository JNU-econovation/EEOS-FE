import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  // State
  accessToken: string | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  setAccessToken: (token: string) => Promise<void>;
  clearAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isLoading: true,
  isInitialized: false,

  initialize: async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      set({
        accessToken: token,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      console.error("[AuthStore] Initialize failed:", error);
      set({
        accessToken: null,
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  setAccessToken: async (token: string) => {
    try {
      await SecureStore.setItemAsync("accessToken", token);
      set({ accessToken: token });
    } catch (error) {
      console.error("[AuthStore] Set token failed:", error);
      throw error;
    }
  },

  clearAccessToken: async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      set({ accessToken: null });
    } catch (error) {
      console.error("[AuthStore] Clear token failed:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      set({ accessToken: null });
    } catch (error) {
      console.error("[AuthStore] Logout failed:", error);
      throw error;
    }
  },
}));

export default useAuthStore;

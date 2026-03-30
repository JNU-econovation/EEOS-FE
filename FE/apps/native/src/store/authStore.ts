import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  // State
  accessToken: string | null;
  tokenExpiration: string | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setAccessToken: (token: string, expiredTime: number) => Promise<void>;
  setRefreshToken: (token: string) => Promise<void>;
  clearAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  tokenExpiration: null,
  isLoading: true,
  isInitialized: false,

  setAccessToken: async (token: string, expiredTime: number) => {
    const previousToken = useAuthStore.getState().accessToken;
    const previousExpiration = useAuthStore.getState().tokenExpiration;

    // 만료 시간 계산 (현재 시간 + 만료 시간)
    const expirationDate = new Date().getTime() + expiredTime;
    const expirationString = expirationDate.toString();

    // 1. 먼저 상태 업데이트 (즉시 UI 반영)
    set({ accessToken: token, tokenExpiration: expirationString });

    // 2. 백그라운드에서 SecureStore에 저장
    try {
      await SecureStore.setItemAsync("accessToken", token);
      await SecureStore.setItemAsync("tokenExpiration", expirationString);
    } catch (error) {
      console.error("[AuthStore] Set token failed:", error);
      // 3. 실패 시 이전 상태로 롤백
      set({ accessToken: previousToken, tokenExpiration: previousExpiration });
      throw error;
    }
  },

  setRefreshToken: async (token: string) => {
    try {
      await SecureStore.setItemAsync("refreshToken", token);
    } catch (error) {
      console.error("[AuthStore] Set refresh token failed:", error);
      throw error;
    }
  },

  clearAccessToken: async () => {
    const previousToken = useAuthStore.getState().accessToken;
    const previousExpiration = useAuthStore.getState().tokenExpiration;

    // 1. 먼저 상태 업데이트
    set({ accessToken: null, tokenExpiration: null });

    // 2. 백그라운드에서 SecureStore에서 삭제
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("tokenExpiration");
    } catch (error) {
      console.error("[AuthStore] Clear token failed:", error);
      // 3. 실패 시 이전 상태로 롤백
      set({ accessToken: previousToken, tokenExpiration: previousExpiration });
      throw error;
    }
  },

  logout: async () => {
    const previousToken = useAuthStore.getState().accessToken;
    const previousExpiration = useAuthStore.getState().tokenExpiration;

    // 1. 먼저 상태 업데이트
    set({ accessToken: null, tokenExpiration: null });

    // 2. 백그라운드에서 SecureStore에서 삭제
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("tokenExpiration");
    } catch (error) {
      console.error("[AuthStore] Logout failed:", error);
      // 3. 실패 시 이전 상태로 롤백
      set({ accessToken: previousToken, tokenExpiration: previousExpiration });
      throw error;
    }
  },
}));

/**
 * AuthStore 초기화 함수
 * SecureStore에서 토큰을 읽어와 상태를 초기화합니다.
 * app/index.tsx에서 호출하여 스플래시 화면 제어와 함께 사용됩니다.
 */
export const initializeAuth = async (): Promise<void> => {
  try {
    const token = await SecureStore.getItemAsync("accessToken"); //TODO: key 상수화
    const expiration = await SecureStore.getItemAsync("tokenExpiration");
    const { isInitialized } = useAuthStore.getState();
    if (isInitialized) return;

    if (token && expiration)
      return useAuthStore.setState({
        accessToken: token,
        tokenExpiration: expiration,
        isLoading: false,
        isInitialized: true,
      });

    useAuthStore.setState({
      accessToken: null,
      tokenExpiration: null,
      isLoading: false,
      isInitialized: true,
    });
  } catch (error) {
    console.error("[AuthStore] Initialize failed:", error);
    useAuthStore.setState({
      accessToken: null,
      tokenExpiration: null,
      isLoading: false,
      isInitialized: true,
    });
  }
};

export default useAuthStore;

import { bridge, linkBridge as originalLinkBridge } from "@webview-bridge/react-native";
import type { SyncTokenParams, BridgeResponse } from "./types";

/**
 * Native 측 Bridge 설정
 * 웹에서 호출하는 메서드들을 처리
 */
export const appBridge = bridge({
  /**
   * 웹에서 앱으로 토큰 동기화
   */
  async syncToken(params: SyncTokenParams): Promise<BridgeResponse> {
    try {
      console.log("[Native Bridge] 토큰 수신:", params);

      // AsyncStorage 또는 SecureStore에 저장
      // await AsyncStorage.setItem('token', params.token);
      // if (params.refreshToken) {
      //   await AsyncStorage.setItem('refreshToken', params.refreshToken);
      // }

      return {
        success: true,
        data: { message: "토큰이 저장되었습니다" },
      };
    } catch (error) {
      console.error("[Native Bridge] 토큰 저장 실패:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  /**
   * 웹에서 앱에 저장된 토큰 요청
   */
  async requestToken(): Promise<BridgeResponse<SyncTokenParams>> {
    try {
      console.log("[Native Bridge] 토큰 요청 수신");

      // AsyncStorage 또는 SecureStore에서 로드
      // const token = await AsyncStorage.getItem('token');
      // const refreshToken = await AsyncStorage.getItem('refreshToken');

      // 임시 구현
      return {
        success: true,
        data: {
          token: "",
          refreshToken: "",
        },
      };
    } catch (error) {
      console.error("[Native Bridge] 토큰 로드 실패:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  /**
   * 토큰 삭제 (로그아웃)
   */
  async clearToken(): Promise<BridgeResponse> {
    try {
      console.log("[Native Bridge] 토큰 삭제 요청");

      // AsyncStorage 또는 SecureStore에서 삭제
      // await AsyncStorage.removeItem('token');
      // await AsyncStorage.removeItem('refreshToken');

      return {
        success: true,
      };
    } catch (error) {
      console.error("[Native Bridge] 토큰 삭제 실패:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

/**
 * WebView에 bridge를 연결하기 위한 헬퍼
 *
 * @example
 * ```tsx
 * <WebView
 *   source={{ uri: "https://example.com" }}
 *   ref={linkBridge(appBridge)}
 * />
 * ```
 */
export const linkBridge = originalLinkBridge;

import { bridge } from "@webview-bridge/web";
import type { AppBridgeMethods, SyncTokenParams, BridgeResponse } from "./types";

/**
 * Web 측 Bridge
 * Native 앱의 메서드를 호출할 수 있음
 */
export const appBridge = bridge<AppBridgeMethods>();

/**
 * 웹에서 앱으로 토큰 전송
 */
export async function syncTokenToApp(
  token: string,
  refreshToken?: string
): Promise<BridgeResponse> {
  try {
    const params: SyncTokenParams = { token, refreshToken };
    const response = await appBridge.syncToken(params);
    return response;
  } catch (error) {
    console.error("[Web Bridge] 토큰 동기화 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 앱에 저장된 토큰 요청
 */
export async function requestTokenFromApp(): Promise<BridgeResponse<SyncTokenParams>> {
  try {
    const response = await appBridge.requestToken();
    return response;
  } catch (error) {
    console.error("[Web Bridge] 토큰 요청 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 앱의 토큰 삭제 요청
 */
export async function clearTokenInApp(): Promise<BridgeResponse> {
  try {
    const response = await appBridge.clearToken();
    return response;
  } catch (error) {
    console.error("[Web Bridge] 토큰 삭제 실패:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

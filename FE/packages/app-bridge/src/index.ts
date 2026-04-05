/**
 * @eeos/app-bridge
 *
 * WebView Bridge for EEOS Native and Web apps
 *
 * @example Native 사용법
 * ```tsx
 * import { appBridge, linkBridge } from '@eeos/app-bridge/native';
 *
 * <WebView
 *   source={{ uri: "https://example.com" }}
 *   ref={linkBridge(appBridge)}
 * />
 * ```
 *
 * @example Web 사용법
 * ```tsx
 * import { syncTokenToApp, requestTokenFromApp } from '@eeos/app-bridge/web';
 *
 * // 토큰 전송
 * await syncTokenToApp(token, refreshToken);
 *
 * // 토큰 요청
 * const result = await requestTokenFromApp();
 * ```
 */

// 공통 타입 export
export type {
  SyncTokenParams,
  BridgeResponse,
  AppBridgeMethods,
} from "./types";

// Native export
export * as native from "./native";

// Web export
export * as web from "./web";

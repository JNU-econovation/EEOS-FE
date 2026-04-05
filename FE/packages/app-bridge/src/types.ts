/**
 * WebView Bridge에서 사용하는 공통 타입 정의
 */

/**
 * 토큰 동기화 파라미터
 */
export interface SyncTokenParams {
  token: string;
  refreshToken?: string;
}

/**
 * Bridge 응답 타입
 */
export interface BridgeResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Bridge 메서드 정의
 */
export interface AppBridgeMethods {
  /**
   * 웹에서 앱으로 토큰 전송
   * @param params 토큰 정보
   */
  syncToken(params: SyncTokenParams): Promise<BridgeResponse>;

  /**
   * 앱에서 웹으로 토큰 요청
   */
  requestToken(): Promise<BridgeResponse<SyncTokenParams>>;

  /**
   * 로그아웃 시 토큰 삭제
   */
  clearToken(): Promise<BridgeResponse>;
}

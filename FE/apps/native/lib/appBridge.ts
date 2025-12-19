import { bridge } from "@webview-bridge/react-native";

/**
 * 첫 접속 시 토큰 동기화
 * 웹에서 앱으로
 */
export const appBridge = bridge({
  // 앱에서는 토큰을 받는 로직 필요
  async syncToken() {
    // 토큰이 존재하는 경우 웹에 토큰 전송?
  },
});

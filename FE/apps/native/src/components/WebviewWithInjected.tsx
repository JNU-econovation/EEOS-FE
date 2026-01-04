import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@/src/constants/scripts";
import useAuthStore from "@/src/store/authStore";
import { useMemo } from "react";
import WebView from "react-native-webview";

interface WebviewWithInjectedProps
  extends React.ComponentProps<typeof WebView> {}

const WebviewWithInjected = (props: WebviewWithInjectedProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const tokenExpiration = useAuthStore((state) => state.tokenExpiration);

  // 페이지 로드 전에 토큰 주입
  const INJECTED_JAVASCRIPT_BEFORE_LOAD = useMemo(
    () => INJECT_TOKEN(accessToken ?? "", tokenExpiration ?? ""),
    [accessToken, tokenExpiration],
  );

  // 페이지 로드 후 UI 설정
  const INJECTED_JAVASCRIPT_AFTER_LOAD = useMemo(
    () =>
      `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}`,
    [],
  );

  return (
    <WebView
      allowsBackForwardNavigationGestures
      webviewDebuggingEnabled={process.env.EXPO_PUBLIC_ENV === "development"}
      injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT_BEFORE_LOAD}
      injectedJavaScript={INJECTED_JAVASCRIPT_AFTER_LOAD}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={["*"]}
      mixedContentMode="always"
      collapsable={false}
      onShouldStartLoadWithRequest={(request) => {
        if (
          request.url.includes("mobile") ||
          request.mainDocumentURL?.includes("mobile")
        ) {
          return true;
        }

        return false;
      }}
      {...props}
    />
  );
};

export default WebviewWithInjected;

import WebView from "react-native-webview";
import { useMemo } from "react";
import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@/src/constants/scripts";
import useAuthStore from "@/src/store/authStore";

interface WebviewWithInjectedProps
  extends React.ComponentProps<typeof WebView> {}

const WebviewWithInjected = (props: WebviewWithInjectedProps) => {
  const accessToken = useAuthStore(({ accessToken }) => accessToken);

  const INJECTED_JAVASCRIPT = useMemo(
    () =>
      `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}${INJECT_TOKEN(
        accessToken ?? "",
      )}`,
    [accessToken],
  );

  return (
    <WebView
      allowsBackForwardNavigationGestures
      webviewDebuggingEnabled={process.env.EXPO_PUBLIC_ENV === "development"}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={['*']}
      mixedContentMode="always"
      {...props}
    />
  );
};

export default WebviewWithInjected;

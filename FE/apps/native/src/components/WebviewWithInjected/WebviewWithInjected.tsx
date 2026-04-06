import { WebviewWithBridge } from "@geongyu/bridge/native";
import WebView from "react-native-webview";
import { IS_DEV } from "../../app";
import { SSO_BASE_URL, WEBVIEW_PATH } from "../../constants/webview";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "../../types/bridge";
import useMiddleware from "./useMiddleware/useMiddleware";
import useScript from "./useScript";

interface WebviewWithInjectedProps
  extends React.ComponentProps<typeof WebView> {}

// TODO: 현재는 도메인에 너무 강결합 되어있으므로, 게층에 맞추어 분리 필요

const WebviewWithInjected = (props: WebviewWithInjectedProps) => {
  const { INJECTED_JAVASCRIPT_AFTER_LOAD, INJECTED_JAVASCRIPT_BEFORE_LOAD } =
    useScript();
  const middleware = useMiddleware();

  return (
    <WebviewWithBridge<MessageEventRequestData, MessageEventResponseData>
      middleware={middleware}
      allowsBackForwardNavigationGestures
      webviewDebuggingEnabled={IS_DEV}
      injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT_BEFORE_LOAD}
      injectedJavaScript={INJECTED_JAVASCRIPT_AFTER_LOAD}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={["*"]}
      mixedContentMode="always"
      collapsable={false}
      cacheEnabled
      onShouldStartLoadWithRequest={(request) => {
        if (
          request.url.includes("/mobile") ||
          request.url.includes(SSO_BASE_URL) ||
          request.url.includes(WEBVIEW_PATH.OAUTH_REDIRECT) ||
          request.mainDocumentURL?.includes("/mobile") ||
          request.mainDocumentURL?.includes(SSO_BASE_URL) ||
          request.mainDocumentURL?.includes(WEBVIEW_PATH.OAUTH_REDIRECT)
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

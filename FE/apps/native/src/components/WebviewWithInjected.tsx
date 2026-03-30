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
import { WebviewWithBridge } from "@geongyu/bridge/native";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "../types/bridge";
import { router } from "expo-router";
import { IS_DEV } from "../app";
import useDeletePushTokenMutation from "../hooks/query/useDeletePushTokenMutation";
import useNotification from "../hooks/notification/useNotification";
import { SSO_BASE_URL } from "../constants/webview";

interface WebviewWithInjectedProps
  extends React.ComponentProps<typeof WebView> {}

// TODO: 현재는 도메인에 너무 강결합 되어있으므로, 게층에 맞추어 분리 필요

const WebviewWithInjected = (props: WebviewWithInjectedProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const tokenExpiration = useAuthStore((state) => state.tokenExpiration);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const { pushToken } = useNotification();

  const { mutate: deletePushToken } = useDeletePushTokenMutation();

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

  const middleware = (message: MessageEventRequestData) => {
    if (IS_DEV) console.log("Webview Message:", message);

    const { method, name, body } = message;

    // 로그아웃 처리
    if (name === "logout" && method === "DELETE") {
      clearAccessToken();
      deletePushToken(pushToken);
      if (router.canDismiss()) router.dismiss();
      if (IS_DEV) {
        return router.replace("/login-dev");
      }
      router.replace("/login");
    }

    // 일정 생성 모달 열기
    if (
      name === "open-event-create-form-modal" &&
      method === "POST" &&
      typeof body === "object" &&
      body !== null &&
      "year" in body &&
      "month" in body &&
      "date" in body &&
      typeof body.year === "number" &&
      typeof body.month === "number" &&
      typeof body.date === "number"
    ) {
      router.push(
        `/createEvent/${new Date(
          body.year,
          body.month - 1,
          body.date,
        ).getTime()}`,
      );
    }

    // 뒤로 가기 처리
    if (name === "go-back" && method === "DELETE") {
      if (router.canDismiss()) router.back();
    }
  };

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
      onShouldStartLoadWithRequest={(request) => {
        if (
          request.url.includes("/mobile") ||
          request.mainDocumentURL?.includes("/mobile") ||
          request.url.includes(SSO_BASE_URL)
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

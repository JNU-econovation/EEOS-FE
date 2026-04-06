import { IS_DEV } from "@/src/app";
import useNotification from "@/src/hooks/notification/useNotification";
import useDeletePushTokenMutation from "@/src/hooks/query/useDeletePushTokenMutation";
import useAuthStore from "@/src/store/authStore";
import { MessageEventRequestData } from "@/src/types/bridge";
import { Href, router } from "expo-router";

const isRoutablePath = (value: string): value is Extract<Href, string> => {
  return (
    value.startsWith("/") || value.startsWith("./") || value.startsWith("../")
  );
};

const useMiddleware = () => {
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  const { pushToken } = useNotification();

  const { mutate: deletePushToken } = useDeletePushTokenMutation();

  return (message: MessageEventRequestData) => {
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

    /**
     *  일정 생성 모달 열기
     */
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

    /**
     * 뒤로 가기
     */
    if (name === "go-back" && method === "DELETE") {
      if (router.canDismiss()) router.back();
    }

    /**
     * 새 WebView 스크린으로 이동
     */
    if (
      name === "route-to-webview-screen" &&
      method === "POST" &&
      typeof body === "object" &&
      body !== null &&
      "uri" in body &&
      typeof body.uri === "string"
    ) {
      router.push(`/webview/${encodeURIComponent(body.uri)}`);
    }

    /**
     * 토큰 저장 처리 (OAuth 로그인 콜백)
     */
    if (
      name === "put-token" &&
      method === "PUT" &&
      typeof body === "object" &&
      body !== null &&
      "accessToken" in body &&
      "refreshToken" in body &&
      "accessExpiredTime" in body &&
      typeof body.accessToken === "string" &&
      typeof body.refreshToken === "string" &&
      typeof body.accessExpiredTime === "string"
    ) {
      const { accessToken, refreshToken, accessExpiredTime } = body;

      const expiredTimeNumber = Number(accessExpiredTime);
      if (isNaN(expiredTimeNumber)) return;

      setAccessToken(accessToken, expiredTimeNumber)
        .then(() => setRefreshToken(refreshToken))
        .then(() => {
          if (router.canDismiss()) router.dismiss();
          router.replace("/(tabs)/home");
        })
        .catch((error: unknown) => {
          console.error("[WebviewWithInjected] put-token failed:", error);
        });
    }

    /**
     * 앱 라우팅 처리
     * - path
     * - routeType : push | replace
     */
    if (
      name === "route-to" &&
      method === "POST" &&
      typeof body === "object" &&
      body !== null &&
      "path" in body &&
      "routeType" in body &&
      typeof body.path === "string" &&
      (body.routeType === "push" || body.routeType === "replace")
    ) {
      const { path, routeType } = body;
      if (!isRoutablePath(path)) return;

      if (routeType === "push") {
        router.push(path);
      } else {
        router.replace(path);
      }
    }
  };
};

export default useMiddleware;

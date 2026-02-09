import { Redirect } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import useAuthStore, { initializeAuth } from "@/src/store/authStore";
import useNotification from "../hooks/notification/useNotification";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

export const IS_DEV = process.env.EXPO_PUBLIC_ENV === "development";

export default function Index() {
  const { accessToken, isInitialized } = useAuthStore();
  const { requestUserPermission } = useNotification();

  if (IS_DEV) console.log("[DEV] 앱 초기화_로그인 여부:", accessToken);

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
      await requestUserPermission();
    };

    initialize().then(async () => await SplashScreen.hideAsync());
  }, [requestUserPermission]);

  // 초기화 중에는 null 반환 (스플래시 유지)
  if (!isInitialized) return null;

  // 로그인 되어 있으면 홈으로, 아니면 로그인으로
  if (!!accessToken) {
    return <Redirect href="/(tabs)/home" />;
  }

  if (process.env.EXPO_PUBLIC_ENV === "development")
    return <Redirect href="/login-dev" />;

  return <Redirect href="/login" />;
}

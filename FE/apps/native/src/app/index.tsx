import { Redirect } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import useSecureStore from "@/src/hooks/useSecureStore";

export default function Index() {
  const { accessToken, isLoading } = useSecureStore();

  useEffect(() => {
    if (!isLoading) {
      // 토큰 확인 완료 후 스플래시 숨김
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // 로딩 중에는 null 반환 (스플래시 유지)
  if (isLoading) {
    return null;
  }

  // 로그인 되어 있으면 홈으로, 아니면 로그인으로
  if (accessToken) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}

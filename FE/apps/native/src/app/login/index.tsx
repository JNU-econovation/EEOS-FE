// import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import WebviewWithInjected from "@/src/components/WebviewWithInjected";
import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import useAuthStore from "@/src/store/authStore";
import { router } from "expo-router";
import { SSO_PATH } from "@/src/constants/webview";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function LoginScreen() {
  const { mutate: postLogin } = useLoginMutation();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onPressLogin = async () => {
    try {
      postLogin(undefined, {
        onSuccess: async ({ accessToken, accessExpiredTime }) => {
          // API 응답: { accessToken: string, accessExpiredTime: number }
          // accessExpiredTime은 밀리초 단위의 상대 시간 (예: 3600000 = 1시간)
          await setAccessToken(accessToken, accessExpiredTime);
          router.replace("/(tabs)/home");
        },
      });
    } catch (error) {
      console.error("[Login] Failed:", error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["left", "right", "top", "bottom"]}
    >
      <WebviewWithInjected
        className="h-full"
        source={{ uri: SSO_PATH.LOGIN }}
      />
    </SafeAreaView>
  );
}

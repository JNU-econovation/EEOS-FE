import WebviewWithInjected from "@/src/components/WebviewWithInjected";
import { SSO_PATH } from "@/src/constants/webview";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function LoginScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["left", "right", "top", "bottom"]}
    >
      <WebviewWithInjected
        className="h-full z-10"
        source={{ uri: SSO_PATH.LOGIN }}
      />
    </SafeAreaView>
  );
}

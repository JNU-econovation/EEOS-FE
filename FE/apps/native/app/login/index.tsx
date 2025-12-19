import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function ProgramScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        className="flex-1"
        source={{ uri: "http://localhost:3000/login" }}
      />
    </SafeAreaView>
  );
}

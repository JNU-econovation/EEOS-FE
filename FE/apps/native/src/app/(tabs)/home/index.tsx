import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { WEBVIEW_PATH } from "@/src/constants/webview";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["left", "right", "top"]}
    >
      <WebView
        className="flex-1 h-full overflow-hidden"
        source={{ uri: WEBVIEW_PATH.MAIN }}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}

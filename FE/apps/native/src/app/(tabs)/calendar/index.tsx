import { WEBVIEW_PATH } from "@/src/constants/webview";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function CalendarScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["left", "right", "top"]}
    >
      <WebView
        className="flex-1"
        source={{ uri: WEBVIEW_PATH.CALENDAR }}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}

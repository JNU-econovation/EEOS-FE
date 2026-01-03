import WebviewWithInjected from "@/src/components/WebviewWithInjected";
import { WEBVIEW_PATH } from "@/src/constants/webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["left", "right", "top"]}
    >
      <WebviewWithInjected
        className="flex-1 h-full overflow-hidden"
        source={{ uri: WEBVIEW_PATH.MAIN }}
      />
    </SafeAreaView>
  );
}

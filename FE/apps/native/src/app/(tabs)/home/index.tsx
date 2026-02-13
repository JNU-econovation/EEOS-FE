import WebviewWithInjected from "@/src/components/WebviewWithInjected";
import { WEBVIEW_PATH } from "@/src/constants/webview";
import useNotification from "@/src/hooks/notification/useNotification";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { requestUserPermission } = useNotification();

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

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

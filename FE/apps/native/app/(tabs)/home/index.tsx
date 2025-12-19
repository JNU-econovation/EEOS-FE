import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "https://www.eeos.econovation.kr/" }}
      />
    </SafeAreaView>
  );
}
